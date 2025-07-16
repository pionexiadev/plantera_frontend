
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassCard } from '@/components/ui/glass-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Heart, Calendar, BarChart3, Loader2, Info, Users, TrendingUp, Package, Activity } from 'lucide-react';
import { LivestockCard } from '@/components/livestock/LivestockCard';
import { LivestockDialog } from '@/components/livestock/LivestockDialog';
import LivestockStats from '@/components/livestock/LivestockStats';
import { LivestockTable } from '@/components/livestock/LivestockTable';
import LivestockFilters from '@/components/livestock/LivestockFilters';
import EmptyLivestockState from '@/components/livestock/EmptyLivestockState';
import { Animal } from '@/types/livestock';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Données d'exemple pour l'élevage - corrigées pour correspondre au type Animal
const sampleLivestock: Animal[] = [
  {
    id: '1',
    name: 'Vache Bella',
    type: 'Bovins',
    breed: 'Holstein',
    birthDate: '2020-03-15',
    weight: 650,
    health: 'excellent',
    status: 'active',
    lastCheckup: '2024-01-15',
    gender: 'female',
    notes: 'Excellente productrice de lait'
  },
  {
    id: '2',
    name: 'Taureau Max',
    type: 'Bovins',
    breed: 'Charolais',
    birthDate: '2018-05-20',
    weight: 900,
    health: 'good',
    status: 'active',
    lastCheckup: '2024-01-10',
    gender: 'male',
    notes: 'Reproducteur principal'
  },
  {
    id: '3',
    name: 'Brebis Luna',
    type: 'Ovins',
    breed: 'Mérinos',
    birthDate: '2021-08-12',
    weight: 70,
    health: 'good',
    status: 'active',
    lastCheckup: '2024-01-12',
    gender: 'female',
    notes: 'Gestation en cours'
  }
];

const LivestockManagement = () => {
  const [livestock, setLivestock] = useState<Animal[]>(sampleLivestock);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("animals");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    searchQuery: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddAnimal = async (newAnimal: Omit<Animal, 'id'>) => {
    const animal: Animal = {
      ...newAnimal,
      id: crypto.randomUUID(),
    };
    setLivestock(prev => [...prev, animal]);
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setAnimalToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (animalToDelete) {
      setLivestock(prev => prev.filter(animal => animal.id !== animalToDelete));
      setDeleteDialogOpen(false);
      setAnimalToDelete(null);
    }
  };

  const handleUpdate = (id: string, data: Partial<Animal>) => {
    setLivestock(prev => prev.map(animal => 
      animal.id === id ? { ...animal, ...data } : animal
    ));
  };

  // Filtrer les animaux
  const filteredLivestock = livestock.filter(animal => {
    const matchesType = filters.type === 'all' || animal.type === filters.type;
    const matchesStatus = filters.status === 'all' || animal.status === filters.status;
    const matchesSearch = animal.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(filters.searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  // Stats
  const totalAnimals = livestock.length;
  const healthyAnimals = livestock.filter(a => a.health === 'excellent' || a.health === 'good').length;
  const needAttention = livestock.filter(a => a.health === 'poor' || a.health === 'attention').length;
  const inTreatment = livestock.filter(a => a.status === 'treatment').length;
  const totalWeight = livestock.reduce((sum, a) => sum + a.weight, 0);

  // Types d'animaux disponibles
  const animalTypes = Array.from(new Set(livestock.map(animal => animal.type)));
  const animalStatuses = [
    { value: 'active', label: 'Actif' },
    { value: 'quarantine', label: 'Quarantaine' },
    { value: 'sick', label: 'Malade' },
    { value: 'treatment', label: 'En traitement' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête moderne */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient-primary flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-glow flex-shrink-0">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="truncate">Gestion de l'Élevage</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-primary-100/50 transition-all duration-300 flex-shrink-0">
                    <Info className="h-4 w-4 text-primary-600" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 glass-card" align="start">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-plantera-darkGreen">À propos de ce module</h4>
                    <p className="text-xs text-plantera-slate/70 leading-relaxed">
                      Le module d'élevage vous permet de gérer votre cheptel, suivre la santé des animaux,
                      planifier les soins vétérinaires et optimiser la production.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </h1>
            <p className="text-sm text-plantera-slate/70 font-medium">
              Gérez votre cheptel avec précision pour optimiser la santé et la productivité
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-br from-orange-500 to-red-600 hover:shadow-glow transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouvel Animal
            </Button>
          </div>
        </div>

        {/* Section Statistiques */}
        <LivestockStats
          totalAnimals={totalAnimals}
          needAttention={needAttention}
          inTreatment={inTreatment}
          healthyAnimals={healthyAnimals}
        />

        {/* Tabs pour la gestion */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 bg-gradient-glass border border-white/30 p-2 rounded-2xl w-full sm:max-w-md">
            <TabsTrigger 
              value="animals" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-3 py-2 font-semibold text-sm"
            >
              <Heart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Animaux</span>
            </TabsTrigger>
            <TabsTrigger 
              value="health" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-3 py-2 font-semibold text-sm"
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Santé</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-3 py-2 font-semibold text-sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Analyses</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="animals" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filtres */}
              <div className="lg:col-span-1">
                <GlassCard className="p-4">
                  <LivestockFilters
                    filters={filters}
                    setFilters={setFilters}
                    animalTypes={animalTypes}
                    animalStatuses={animalStatuses}
                  />
                </GlassCard>
              </div>

              {/* Liste des animaux */}
              <div className="lg:col-span-3">
                {isLoading ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <GlassCard key={i} className="h-64 animate-pulse">
                        <div className="h-full bg-gradient-glass rounded-3xl"></div>
                      </GlassCard>
                    ))}
                  </div>
                ) : filteredLivestock.length === 0 ? (
                  <EmptyLivestockState onAddAnimal={() => setIsAddDialogOpen(true)} />
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredLivestock.map(animal => (
                      <LivestockCard
                        key={animal.id}
                        animal={animal}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-6 mt-8">
            <GlassCard>
              <CardHeader>
                <CardTitle className="text-gradient-primary">Suivi Sanitaire</CardTitle>
                <CardDescription>
                  Planifiez et suivez les soins vétérinaires de votre cheptel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center text-plantera-slate/60">
                  Module de suivi sanitaire à venir
                </div>
              </CardContent>
            </GlassCard>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-8">
            <GlassCard>
              <CardHeader>
                <CardTitle className="text-gradient-primary">Analyses de l'Élevage</CardTitle>
                <CardDescription>
                  Analysez les performances et la rentabilité de votre élevage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center text-plantera-slate/60">
                  Graphiques et analyses à venir
                </div>
              </CardContent>
            </GlassCard>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <LivestockDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddAnimal}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cet animal ? Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="w-full sm:w-auto">Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="w-full sm:w-auto">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default LivestockManagement;
