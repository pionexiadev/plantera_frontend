import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassCard } from '@/components/ui/glass-card';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Calendar, BarChart3, Wheat, TrendingUp, Package, CheckCircle, Clock } from 'lucide-react';
import { useHarvests } from '@/hooks/use-harvests';
import { useCultures } from '@/hooks/use-cultures';
import { HarvestCard } from '@/components/harvests/HarvestCard';
import { HarvestDialog } from '@/components/harvests/HarvestDialog';
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
import { Harvest } from '@/types/harvest';
import { Culture } from '@/types/culture';
import { useFields } from '@/hooks/use-fields';
import { Field } from '@/types/field';
import { HarvestPayload } from '@/types/harvest';

const HarvestManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("harvests");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [harvestToDelete, setHarvestToDelete] = useState<number | null>(null);

  const {
    harvests = [],
    isLoading: isLoadingHarvests,
    addHarvest,
    deleteHarvest,
    updateHarvest,
  } = useHarvests();

  const {
    cultures = [],
    isLoading: isLoadingCultures,
  } = useCultures();

  const {
    fields = [],
    isLoading: isLoadingFields,
  } = useFields();

  const isLoading = isLoadingHarvests || isLoadingCultures || isLoadingFields;

  // Local state des récoltes
  const [localHarvests, setLocalHarvests] = useState<Harvest[]>([]);

  useEffect(() => {
    setLocalHarvests(harvests);
  }, [harvests]);

  const totalHarvests = localHarvests.length;
  const totalHarvestedQuantity = localHarvests.reduce((sum, h) => sum + h.quantite, 0);
  const completedHarvests = localHarvests.filter(h => h.statut === 'Réalisée').length;
  const scheduledHarvests = localHarvests.filter(h => h.statut === 'Planifiée').length;

  const handleAddHarvest = async (payload: HarvestPayload) => {
    try {
      await addHarvest(payload);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une récolte:", error);
    }
  };

  const handleDelete = (id: number) => {
    setHarvestToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (harvestToDelete !== null) {
      await deleteHarvest(harvestToDelete);
      setDeleteDialogOpen(false);
      setHarvestToDelete(null);
    }
  };

  const handleStatusChange = async (id: number, newStatus: Harvest['statut']) => {
    // Mise à jour du state local
    setLocalHarvests(prev =>
      prev.map(h =>
        h.id === id ? { ...h, statut: newStatus } : h
      )
    );

    // Mise à jour dans la BDD via API
    await updateHarvest(id, { statut: newStatus });
  };

  const handleCreateSale = async (harvestId: number, quantity: number) => {
    console.log("Créer vente pour", harvestId, quantity);
  };

  const readyFields = cultures.filter(c => c.statut === 'ready');

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* En-tête */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient-primary flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-glow">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <span>Gestion des Récoltes</span>
            </h1>
            <p className="text-sm text-plantera-slate/70 font-medium">
              Planifiez et suivez vos récoltes pour optimiser votre production agricole
            </p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-br from-green-500 to-emerald-600 hover:shadow-glow transition-all duration-300 hover:scale-105"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Planifier une Récolte
          </Button>
        </div>

        {/* Statistiques */}
        <GlassCard>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatBlock icon={<Wheat />} label="Total récoltes" value={totalHarvests} subtitle="cette saison" />
              <StatBlock icon={<Package />} label="Quantité totale" value={`${totalHarvestedQuantity} kg`} subtitle="kg récoltés" />
              <StatBlock icon={<CheckCircle />} label="Terminées" value={completedHarvests} subtitle="complétées" />
              <StatBlock icon={<Clock />} label="Planifiées" value={scheduledHarvests} subtitle="à venir" />
            </div>
          </CardContent>
        </GlassCard>

        {/* Champs prêts */}
        {readyFields.length > 0 && (
          <GlassCard>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-white" />
                <span className="text-gradient-primary">Champs prêts pour la récolte</span>
              </CardTitle>
              <CardDescription>Ces champs sont maintenant prêts à être récoltés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {readyFields.map((field: Culture) => (
                  <div key={field.id} className="p-4 bg-gradient-field rounded-xl border hover:shadow-card">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-plantera-darkGreen">{field.nom}</h4>
                        <p className="text-sm text-plantera-slate/70">{field.varieté} • {field.surface || 0} ha</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setIsAddDialogOpen(true)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105"
                      >
                        Récolter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </GlassCard>
        )}

        {/* Onglets */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-2 w-full sm:max-w-md bg-gradient-glass border border-white/30 p-2 rounded-2xl">
            <TabsTrigger value="harvests" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl">
              <Calendar className="h-4 w-4 mr-2" /> Récoltes
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl">
              <BarChart3 className="h-4 w-4 mr-2" /> Analyses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="harvests" className="mt-8 space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <GlassCard key={i} className="h-64 animate-pulse" />
                ))}
              </div>
            ) : localHarvests.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <div className="space-y-4">
                  <Wheat className="h-12 w-12 text-plantera-slate/50" />
                  <h3 className="text-2xl font-bold">Aucune récolte planifiée</h3>
                  <p className="text-plantera-slate/70">Planifiez votre première récolte pour commencer le suivi.</p>
                  <Button onClick={() => setIsAddDialogOpen(true)} size="lg">
                    Planifier une récolte
                  </Button>
                </div>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {localHarvests.map(harvest => (
                  <HarvestCard
                    key={harvest.id}
                    harvest={harvest}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                    onUpdate={updateHarvest}
                    onCreateSale={handleCreateSale}
                    fields={fields}
                    cultures={cultures}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <GlassCard>
              <CardHeader>
                <CardTitle className="text-gradient-primary">Analyses des Récoltes</CardTitle>
                <CardDescription>Graphiques et performances agricoles (à venir)</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center text-plantera-slate/60">
                (Composants graphiques ici prochainement)
              </CardContent>
            </GlassCard>
          </TabsContent>
        </Tabs>

        {/* Dialog ajout récolte */}
        <HarvestDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddHarvest}
          fields={fields}
          cultures={cultures}
          parcelles={fields}
          isEditing={false}
        />

        {/* Confirmation suppression */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Supprimer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

const StatBlock = ({ icon, label, value, subtitle }) => (
  <div className="text-center space-y-3 group">
    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-glow group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <p className="text-xs uppercase tracking-wider text-plantera-slate/60 font-semibold">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-gradient-primary">{value}</p>
      <p className="text-xs text-plantera-slate/50">{subtitle}</p>
    </div>
  </div>
);

export default HarvestManagement;
