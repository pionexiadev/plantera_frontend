
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Heart, Calendar, MapPin, Phone, Clock, AlertTriangle, Send, Euro } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConsultationRequest {
  id: string;
  farmerName: string;
  farmerLocation: string;
  farmerPhone: string;
  animalName: string;
  animalType: string;
  breed: string;
  symptoms: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  preferredDate: string;
  createdAt: string;
  status: 'pending' | 'assigned' | 'completed';
}

interface VeterinaryOffer {
  id: string;
  consultationId: string;
  proposedDate: string;
  estimatedCost: number;
  description: string;
  travelIncluded: boolean;
  emergencyAvailable: boolean;
  status: 'pending' | 'accepted' | 'rejected';
}

// Données d'exemple
const consultationRequests: ConsultationRequest[] = [
  {
    id: '1',
    farmerName: 'Jean Dupont',
    farmerLocation: 'Ferme des Chênes, Normandie',
    farmerPhone: '+33 6 12 34 56 78',
    animalName: 'Bella',
    animalType: 'Bovins',
    breed: 'Holstein',
    symptoms: 'Diminution de la production laitière, température élevée, perte d\'appétit',
    urgencyLevel: 'high',
    preferredDate: '2024-07-10',
    createdAt: '2024-07-07',
    status: 'pending'
  },
  {
    id: '2',
    farmerName: 'Marie Martin',
    farmerLocation: 'Exploitation Martin, Bretagne',
    farmerPhone: '+33 6 98 76 54 32',
    animalName: 'Mouton n°47',
    animalType: 'Ovins',
    breed: 'Mérinos',
    symptoms: 'Boiterie, gonflement au niveau du sabot',
    urgencyLevel: 'medium',
    preferredDate: '2024-07-12',
    createdAt: '2024-07-06',
    status: 'pending'
  },
  {
    id: '3',
    farmerName: 'Pierre Leblanc',
    farmerLocation: 'Élevage Leblanc, Loire',
    farmerPhone: '+33 6 11 22 33 44',
    animalName: 'Cochon n°23',
    animalType: 'Porcins',
    breed: 'Large White',
    symptoms: 'Diarrhée persistante, léthargie',
    urgencyLevel: 'medium',
    preferredDate: '2024-07-11',
    createdAt: '2024-07-05',
    status: 'pending'
  }
];

const myOffers: VeterinaryOffer[] = [
  {
    id: '1',
    consultationId: '1',
    proposedDate: '2024-07-10T09:00:00',
    estimatedCost: 120,
    description: 'Examen clinique complet, prélèvements si nécessaire',
    travelIncluded: true,
    emergencyAvailable: true,
    status: 'pending'
  }
];

const VeterinaryConsultations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('requests');
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationRequest | null>(null);
  const [offerData, setOfferData] = useState({
    proposedDate: '',
    proposedTime: '',
    estimatedCost: '',
    description: '',
    travelIncluded: false,
    emergencyAvailable: false
  });
  const { toast } = useToast();

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUrgencyLabel = (level: string) => {
    switch (level) {
      case 'emergency': return 'Urgence';
      case 'high': return 'Élevée';
      case 'medium': return 'Moyenne';
      case 'low': return 'Faible';
      default: return 'Non spécifiée';
    }
  };

  const filteredRequests = consultationRequests.filter(request =>
    request.animalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.animalType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.symptoms.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendOffer = () => {
    if (!selectedConsultation) return;

    // Simulation d'envoi d'offre
    console.log('Envoi offre:', {
      consultationId: selectedConsultation.id,
      ...offerData
    });

    toast({
      title: "Offre envoyée",
      description: `Votre offre de soins pour ${selectedConsultation.animalName} a été envoyée à ${selectedConsultation.farmerName}`,
    });

    setIsOfferDialogOpen(false);
    setOfferData({
      proposedDate: '',
      proposedTime: '',
      estimatedCost: '',
      description: '',
      travelIncluded: false,
      emergencyAvailable: false
    });
  };

  const openOfferDialog = (consultation: ConsultationRequest) => {
    setSelectedConsultation(consultation);
    setIsOfferDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient-primary flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-glow">
                <Heart className="h-6 w-6 text-white" />
              </div>
              Consultations Vétérinaires
            </h1>
            <p className="text-sm text-plantera-slate/70 font-medium">
              Consultez les demandes de soins et envoyez vos offres aux agriculteurs
            </p>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-plantera-darkGreen">
                  {consultationRequests.filter(r => r.urgencyLevel === 'emergency' || r.urgencyLevel === 'high').length}
                </p>
                <p className="text-sm text-plantera-slate/70">Cas urgents</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-plantera-darkGreen">
                  {consultationRequests.filter(r => r.status === 'pending').length}
                </p>
                <p className="text-sm text-plantera-slate/70">En attente</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Send className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-plantera-darkGreen">
                  {myOffers.length}
                </p>
                <p className="text-sm text-plantera-slate/70">Mes offres</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 bg-gradient-glass border border-white/30 p-2 rounded-2xl w-full sm:max-w-md">
            <TabsTrigger 
              value="requests" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-3 py-2 font-semibold text-sm"
            >
              Demandes
            </TabsTrigger>
            <TabsTrigger 
              value="offers" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-3 py-2 font-semibold text-sm"
            >
              Mes Offres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6 mt-8">
            {/* Barre de recherche */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-plantera-slate/50" />
              <Input
                placeholder="Rechercher par animal, type, agriculteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 border-plantera-sage/30"
              />
            </div>

            {/* Liste des demandes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRequests.map((request) => (
                <GlassCard key={request.id} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="space-y-4">
                    {/* En-tête */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-plantera-darkGreen">
                          {request.animalName} ({request.animalType})
                        </h3>
                        <p className="text-sm text-plantera-slate/70">{request.breed}</p>
                      </div>
                      <Badge className={getUrgencyColor(request.urgencyLevel)}>
                        {getUrgencyLabel(request.urgencyLevel)}
                      </Badge>
                    </div>

                    {/* Informations agriculteur */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-plantera-sage" />
                        <span>{request.farmerName} - {request.farmerLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-plantera-sage" />
                        <span>{request.farmerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-plantera-sage" />
                        <span>Préférence: {new Date(request.preferredDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    {/* Symptômes */}
                    <div>
                      <h4 className="font-medium text-plantera-darkGreen mb-2">Symptômes:</h4>
                      <p className="text-sm text-plantera-slate/80 bg-plantera-sage/10 p-3 rounded-lg">
                        {request.symptoms}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-plantera-slate/60">
                        Créée le {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                      <Button 
                        onClick={() => openOfferDialog(request)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Faire une offre
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-plantera-slate/30 mb-4" />
                <h3 className="text-lg font-semibold text-plantera-slate/60 mb-2">
                  Aucune demande trouvée
                </h3>
                <p className="text-plantera-slate/50">
                  Aucune demande de consultation ne correspond à votre recherche
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="offers" className="space-y-6 mt-8">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-plantera-darkGreen mb-4">Mes offres envoyées</h3>
              
              {myOffers.length === 0 ? (
                <div className="text-center py-8">
                  <Send className="h-12 w-12 mx-auto text-plantera-slate/30 mb-4" />
                  <p className="text-plantera-slate/60">Vous n'avez pas encore envoyé d'offres</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myOffers.map((offer) => {
                    const consultation = consultationRequests.find(r => r.id === offer.consultationId);
                    return (
                      <div key={offer.id} className="border border-plantera-sage/20 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{consultation?.animalName} - {consultation?.farmerName}</h4>
                            <p className="text-sm text-plantera-slate/70">
                              Offre envoyée le {new Date(offer.proposedDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <Badge variant={offer.status === 'accepted' ? 'default' : 'secondary'}>
                            {offer.status === 'pending' ? 'En attente' : 
                             offer.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{offer.description}</p>
                        <p className="text-sm font-medium text-plantera-darkGreen">
                          Coût estimé: {offer.estimatedCost}€
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </GlassCard>
          </TabsContent>
        </Tabs>

        {/* Dialog pour faire une offre */}
        <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Faire une offre de soins</DialogTitle>
              <DialogDescription>
                Envoyez votre proposition de soins pour {selectedConsultation?.animalName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date proposée</Label>
                  <Input
                    id="date"
                    type="date"
                    value={offerData.proposedDate}
                    onChange={(e) => setOfferData({...offerData, proposedDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Heure proposée</Label>
                  <Input
                    id="time"
                    type="time"
                    value={offerData.proposedTime}
                    onChange={(e) => setOfferData({...offerData, proposedTime: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cost">Coût estimé (€)</Label>
                <Input
                  id="cost"
                  type="number"
                  placeholder="120"
                  value={offerData.estimatedCost}
                  onChange={(e) => setOfferData({...offerData, estimatedCost: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="description">Description des soins proposés</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez les soins que vous proposez..."
                  value={offerData.description}
                  onChange={(e) => setOfferData({...offerData, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={offerData.travelIncluded}
                    onChange={(e) => setOfferData({...offerData, travelIncluded: e.target.checked})}
                  />
                  <span className="text-sm">Déplacement inclus dans le prix</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={offerData.emergencyAvailable}
                    onChange={(e) => setOfferData({...offerData, emergencyAvailable: e.target.checked})}
                  />
                  <span className="text-sm">Disponible pour urgences</span>
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOfferDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                onClick={handleSendOffer}
                className="bg-gradient-to-r from-blue-500 to-indigo-600"
              >
                <Send className="h-4 w-4 mr-2" />
                Envoyer l'offre
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default VeterinaryConsultations;
