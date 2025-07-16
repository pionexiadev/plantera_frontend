import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassCard } from '@/components/ui/glass-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, BarChart3, Euro, TrendingUp, Package, CheckCircle, Clock } from 'lucide-react';
import { useSales } from '@/hooks/use-sales';
import { useHarvests } from '@/hooks/use-harvests';
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
import { Sale } from '@/types/sale';
import { SimpleSaleCard } from '@/components/sales/SimpleSaleCard';
import { SaleDialog } from '@/components/sales/SaleDialog';

const SaleManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sales");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<string | null>(null);
  const [selectedHarvestId, setSelectedHarvestId] = useState<string | null>(null);
  
  const {
    sales,
    isLoading: isLoadingSales,
    addSale,
    updateSaleStatus,
    deleteSale,
    updateSale,
  } = useSales();
  
  const {
    harvests,
    isLoading: isLoadingHarvests,
  } = useHarvests();

  const handleAddSale = async (saleData: any) => {
    try {
      await addSale({
        ...saleData,
        status: saleData.status || 'pending'
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error in handleAddSale:", error);
    }
  };

  const handleDelete = (id: string) => {
    setSaleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (saleToDelete) {
      await deleteSale(saleToDelete);
      setDeleteDialogOpen(false);
      setSaleToDelete(null);
    }
  };

  const handleOpenAddSaleDialog = (harvestId?: string) => {
    setSelectedHarvestId(harvestId || null);
    setIsAddDialogOpen(true);
  };

  // Stats
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const confirmedSales = sales.filter(s => s.status === 'confirmed' || s.status === 'delivered' || s.status === 'paid').length;
  const pendingSales = sales.filter(s => s.status === 'pending').length;

  // Get completed harvests that can be sold
  const availableHarvests = harvests.filter(h => 
    h.status === 'completed' && 
    h.quantity > sales
      .filter(s => s.harvestId === h.id && s.status !== 'canceled')
      .reduce((sum, s) => sum + s.quantity, 0)
  );

  const selectedHarvest = selectedHarvestId ? 
    harvests.find(h => h.id === selectedHarvestId) : null;
  
  const maxAvailableQuantity = selectedHarvest ? 
    selectedHarvest.quantity - sales
      .filter(s => s.harvestId === selectedHarvest.id && s.status !== 'canceled')
      .reduce((sum, s) => sum + s.quantity, 0) : 0;

  const isLoading = isLoadingSales || isLoadingHarvests;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête moderne */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gradient-primary flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-glow">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              Gestion des Ventes
            </h1>
            <p className="text-lg text-plantera-slate/70 font-medium max-w-2xl">
              Gérez vos ventes et optimisez vos revenus agricoles
            </p>
          </div>
          <div>
            <Button 
              onClick={() => handleOpenAddSaleDialog()}
              className="bg-gradient-to-br from-blue-500 to-purple-600 hover:shadow-glow transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-3" />
              Nouvelle Vente
            </Button>
          </div>
        </div>

        {/* Section Statistiques */}
        <GlassCard className="overflow-hidden hover:shadow-glow transition-all duration-300 animate-fade-up">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-plantera-slate/60 font-semibold">Total ventes</p>
                  <p className="text-4xl font-bold text-gradient-primary animate-fade-up">{totalSales}</p>
                  <p className="text-xs text-plantera-slate/50">cette saison</p>
                </div>
              </div>
              
              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-primary rounded-3xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Euro className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-plantera-slate/60 font-semibold">Chiffre d'affaires</p>
                  <p className="text-4xl font-bold text-gradient-primary animate-fade-up">{totalRevenue.toLocaleString()}€</p>
                  <p className="text-xs text-plantera-slate/50">revenus totaux</p>
                </div>
              </div>
              
              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-sunset rounded-3xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-plantera-slate/60 font-semibold">Ventes confirmées</p>
                  <p className="text-4xl font-bold text-gradient-primary animate-fade-up">{confirmedSales}</p>
                  <p className="text-xs text-plantera-slate/50">finalisées</p>
                </div>
              </div>
              
              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-plantera-slate/60 font-semibold">En attente</p>
                  <p className="text-4xl font-bold text-gradient-primary animate-fade-up">{pendingSales}</p>
                  <p className="text-xs text-plantera-slate/50">à traiter</p>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {/* Récoltes disponibles pour vente */}
        {availableHarvests.length > 0 && (
          <GlassCard className="border-blue-200/30 hover:shadow-glow transition-all duration-300 animate-fade-up">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-glow">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <span className="text-gradient-primary">Récoltes disponibles à la vente</span>
              </CardTitle>
              <CardDescription>
                Ces récoltes sont prêtes à être vendues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableHarvests.map(harvest => {
                  const soldQuantity = sales
                    .filter(s => s.harvestId === harvest.id && s.status !== 'canceled')
                    .reduce((sum, s) => sum + s.quantity, 0);
                  const remainingQuantity = harvest.quantity - soldQuantity;

                  return (
                    <div key={harvest.id} className="p-4 bg-gradient-field rounded-2xl border border-blue-200/20 hover:shadow-card transition-all duration-300">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-plantera-darkGreen">Récolte #{harvest.id.slice(0, 8)}</h4>
                          <p className="text-sm text-plantera-slate/70">
                            {remainingQuantity} kg disponibles sur {harvest.quantity} kg
                          </p>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleOpenAddSaleDialog(harvest.id)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform w-full"
                        >
                          Vendre
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </GlassCard>
        )}

        {/* Tabs pour la gestion */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 bg-gradient-glass border border-white/30 p-2 rounded-2xl max-w-md">
            <TabsTrigger 
              value="sales" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ventes
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analyses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6 mt-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <GlassCard key={i} className="h-64 animate-pulse">
                    <div className="h-full bg-gradient-glass rounded-3xl"></div>
                  </GlassCard>
                ))}
              </div>
            ) : sales.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-glass rounded-3xl inline-block">
                    <ShoppingCart className="h-12 w-12 text-plantera-slate/50" />
                  </div>
                  <h3 className="text-2xl font-bold text-plantera-darkGreen">Aucune vente enregistrée</h3>
                  <p className="text-plantera-slate/70 font-medium max-w-md mx-auto">
                    Commencez par créer votre première vente pour gérer vos revenus agricoles.
                  </p>
                  <Button 
                    onClick={() => handleOpenAddSaleDialog()}
                    className="mt-6"
                    size="lg"
                  >
                    Créer une vente
                  </Button>
                </div>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sales.map(sale => (
                  <SimpleSaleCard
                    key={sale.id}
                    sale={sale}
                    onDelete={handleDelete}
                    onStatusChange={updateSaleStatus}
                    onUpdate={updateSale}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-8">
            <GlassCard>
              <CardHeader>
                <CardTitle className="text-gradient-primary">Analyses des Ventes</CardTitle>
                <CardDescription>
                  Visualisez vos performances de vente et vos revenus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center text-plantera-slate/60">
                  Graphiques et analyses des ventes à venir
                </div>
              </CardContent>
            </GlassCard>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <SaleDialog
          isOpen={isAddDialogOpen}
          onClose={() => {
            setIsAddDialogOpen(false);
            setSelectedHarvestId(null);
          }}
          onSubmit={handleAddSale}
          harvestId={selectedHarvestId}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cette vente ? Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default SaleManagement;