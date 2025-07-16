
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlassCard } from '@/components/ui/glass-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Leaf, Map, BarChart3, Info, Sprout, TrendingUp, Package, CheckCircle } from 'lucide-react';
import { useCultures } from '@/hooks/use-cultures';
import { useFields } from '@/hooks/use-fields';
import { useToast } from '@/hooks/use-toast';
import { Culture } from '@/types/culture';
import { CultureCards } from '@/components/cultures/CultureCards';
import { CultureFieldDialog } from '@/components/cultures/CultureFieldDialog';
import { CultureTable } from '@/components/cultures/CultureTable';
import { CultureFieldFilters } from '@/components/cultures/CultureFieldFilters';
import CultureFieldMap from '@/components/cultures/CultureFieldMap';
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
import EmptyCultureState from '@/components/cultures/EmptyCultureState';

const CultureManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("cultures");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cultureToDelete, setCultureToDelete] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<Culture['statut'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const {
    cultures,
    isLoading: isLoadingCultures,
    addCulture,
    updateCultureStatus,
    deleteCulture,
    updateCulture,
  } = useCultures();

  const {
    fields,
    isLoading: isLoadingFields,
  } = useFields();

  const handleAddCulture = async (newCulture) => {
    try {
      await addCulture(newCulture);
      setIsAddDialogOpen(false);
      toast({
        title: "Culture ajoutée",
        description: "La nouvelle culture a été créée avec succès.",
      });
    } catch (error) {
      console.error("Error in handleAddCulture:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la culture.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: number) => {
    setCultureToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (cultureToDelete !== null) {
      await deleteCulture(cultureToDelete); // ✅ OK ici
      setDeleteDialogOpen(false);
      setCultureToDelete(null);
      toast({
        title: "Culture supprimée",
        description: "La culture a été supprimée avec succès.",
      });
    }
  };

  const handleEdit = (id: number, culture: Culture) => {
    console.log('Edit culture:', id, culture);
  };

  const safeCultures = Array.isArray(cultures) ? cultures : [];

  const filteredCultures = safeCultures.filter(culture => {
    const matchesStatus = filterStatus === 'all' || culture.statut === filterStatus;

    const varieté = culture.varieté || '';
    const nom = culture.nom || '';

    const matchesSearch =
      nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      varieté.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });



  // Stats
  const totalCultures = safeCultures.length;
  const activeCultures = safeCultures.filter(c => c.statut === 'growing').length;
  const readyCultures = safeCultures.filter(c => c.statut === 'ready').length;
  const totalSurface = safeCultures.reduce((sum, c) => sum + c.surface, 0);

  const isLoading = isLoadingCultures || isLoadingFields;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête moderne */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient-primary flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-glow flex-shrink-0">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="truncate">Gestion des Cultures</span>
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
                      Le module de gestion des cultures vous permet de suivre l'évolution de vos plantations,
                      surveiller leur santé et optimiser les récoltes.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </h1>
            <p className="text-sm text-plantera-slate/70 font-medium">
              Suivez et optimisez vos cultures pour maximiser votre rendement agricole
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-br from-green-500 to-emerald-600 hover:shadow-glow transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle Culture
            </Button>
          </div>
        </div>

        {/* Section Statistiques */}
        <GlassCard className="overflow-hidden hover:shadow-glow transition-all duration-300 animate-fade-up">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center space-y-3 group">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-plantera-slate/60 font-semibold">Total cultures</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gradient-primary animate-fade-up">{totalCultures}</p>
                  <p className="text-xs text-plantera-slate/50">en cours</p>
                </div>
              </div>

              <div className="text-center space-y-3 group">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-primary rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-plantera-slate/60 font-semibold">En croissance</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gradient-primary animate-fade-up">{activeCultures}</p>
                  <p className="text-xs text-plantera-slate/50">actives</p>
                </div>
              </div>

              <div className="text-center space-y-3 group">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-sunset rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-plantera-slate/60 font-semibold">Prêtes</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gradient-primary animate-fade-up">{readyCultures}</p>
                  <p className="text-xs text-plantera-slate/50">à récolter</p>
                </div>
              </div>

              <div className="text-center space-y-3 group">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-plantera-slate/60 font-semibold">Surface totale</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gradient-primary animate-fade-up">{totalSurface.toFixed(1)}</p>
                  <p className="text-xs text-plantera-slate/50">hectares</p>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {/* Tabs pour la gestion */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 bg-gradient-glass border border-white/30 p-2 rounded-2xl w-full sm:max-w-md">
            <TabsTrigger
              value="cultures"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-3 py-2 font-semibold text-sm"
            >
              <Leaf className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Cultures</span>
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-3 py-2 font-semibold text-sm"
            >
              <Map className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Carte</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-3 py-2 font-semibold text-sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Analyses</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cultures" className="space-y-6 mt-8">
            {/* Filtres */}
            <CultureFieldFilters
              activeFilter={filterStatus === 'all' ? null : filterStatus}
              onFilterChange={(filter) => setFilterStatus(filter as Culture['statut'] | 'all' || 'all')}
              searchQuery={searchTerm}
              onSearchChange={setSearchTerm}
              fieldsCount={filteredCultures.length}
            />

            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <GlassCard key={i} className="h-64 animate-pulse">
                    <div className="h-full bg-gradient-glass rounded-3xl"></div>
                  </GlassCard>
                ))}
              </div>
            ) : filteredCultures.length === 0 ? (
              <EmptyCultureState onAddCulture={() => setIsAddDialogOpen(true)} />
            ) : (
              <CultureCards
                fields={filteredCultures}
                onStatusChange={updateCultureStatus}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-6 mt-8">
            <GlassCard>
              <CardHeader>
                <CardTitle className="text-gradient-primary">Carte des Cultures</CardTitle>
                <CardDescription>
                  Visualisez l'emplacement et l'état de vos cultures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CultureFieldMap cultures={filteredCultures} fields={fields} />
              </CardContent>
            </GlassCard>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-8">
            <GlassCard>
              <CardHeader>
                <CardTitle className="text-gradient-primary">Analyses des Cultures</CardTitle>
                <CardDescription>
                  Suivez les performances et l'évolution de vos cultures
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
        <CultureFieldDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddCulture}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cette culture ? Cette action est irréversible.
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

export default CultureManagement;
