import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Map, TreePine, Calendar, BarChart3, Loader2, Info } from 'lucide-react';
import { useFields } from '@/hooks/use-fields';
import { useToast } from '@/hooks/use-toast';
import { Field } from '@/types/field';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// FieldDialog.tsx (ou dans le même fichier que `FieldManagement`)

const fieldFormSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  surface: z.coerce.number().min(0.1, 'La surface doit être supérieure à 0'),
  location: z.string().min(1, 'La localisation est requise'),
  soilType: z.enum(['argileux', 'sableux', 'limoneux', 'calcaire']), // ✅ ici aussi
  irrigationSystem: z.enum(['aspersion', 'goutte_à_goutte', 'gravitaire', 'none']),
  notes: z.string().optional(),
});



interface FieldDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Field>) => void;
  field?: Field;
  isEditing?: boolean;
}

function FieldDialog({ isOpen, onClose, onSubmit, field, isEditing = false }: FieldDialogProps) {
  const form = useForm<z.infer<typeof fieldFormSchema>>({
    resolver: zodResolver(fieldFormSchema),
    defaultValues: {
      name: field?.nom || '',
      surface: field?.surface || 0,
      location: field?.localisation || '',
      soilType: field?.typeSol || 'limoneux',
      irrigationSystem: field?.systemeIrrigation || 'none',
      notes: field?.notes || '',
    },
  });

  const handleSubmit = (values: z.infer<typeof fieldFormSchema>) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier la parcelle' : 'Ajouter une parcelle'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la parcelle</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="surface"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surface (hectares)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localisation</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="soilType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de sol</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="argileux">Argileux</SelectItem>
                        <SelectItem value="sableux">Sableux</SelectItem>
                        <SelectItem value="limoneux">Limoneux</SelectItem>
                        <SelectItem value="calcaire">Calcaire</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="irrigationSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Système d'irrigation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un système" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aspersion">Aspersion</SelectItem>
                        <SelectItem value="goutte_à_goutte">Goutte-à-goutte</SelectItem>
                        <SelectItem value="gravitaire">Gravitaire</SelectItem>
                        <SelectItem value="none">Aucun</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Annuler
              </Button>
              <Button type="submit" className="bg-plantera-green hover:bg-plantera-green/90 text-white w-full sm:w-auto">
                {isEditing ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function FieldCard({ field, onEdit, onDelete }: { field: Field; onEdit: (field: Field) => void; onDelete: (id: string) => void }) {
  const getSoilTypeText = (type: string) => {
    switch (type) {
      case 'argileux': return 'Argileux';
      case 'sableux': return 'Sableux';
      case 'limoneux': return 'Limoneux';
      case 'calcaire': return 'Calcaire';
      default: return type;
    }
  };

  const getIrrigationSystemText = (system: string) => {
    switch (system) {
      case 'aspersion': return 'Aspersion';
      case 'goutte_à_goutte': return 'Goutte-à-goutte';
      case 'gravitaire': return 'Gravitaire';
      case 'none': return 'Aucun';
      default: return system;
    }
  };

  return (
    <Card className="glass-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 group animate-fade-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1 min-w-0">
            <CardTitle className="text-lg text-gradient-primary flex items-center gap-2">
              <div className="p-1.5 bg-gradient-glass rounded-xl border border-white/30 backdrop-blur-sm flex-shrink-0">
                <TreePine className="h-4 w-4 text-plantera-darkGreen" />
              </div>
              <span className="truncate">{field.nom}</span>
            </CardTitle>
            <CardDescription className="text-sm text-plantera-slate/70 font-medium">
              📍 {field.localisation}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1 flex-shrink-0">
            <Button
              variant="glass"
              size="sm"
              onClick={() => onEdit(field)}
              className="hover:scale-105 transition-transform text-xs px-2 h-7"
            >
              Modifier
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(field.id.toString())}
              className="hover:scale-105 transition-transform text-xs px-2 h-7"
            >
              Supprimer
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center gap-3 bg-gradient-glass rounded-xl p-3 border border-white/20 backdrop-blur-sm">
            <div className="p-1.5 bg-gradient-harvest rounded-lg flex-shrink-0">
              <Map className="h-4 w-4 text-plantera-darkGreen" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-plantera-slate/60 font-medium">Surface</p>
              <p className="text-sm font-semibold text-plantera-darkGreen">{field.surface} ha</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gradient-glass rounded-xl p-3 border border-white/20 backdrop-blur-sm">
            <div className="p-1.5 bg-gradient-soil rounded-lg flex-shrink-0">
              <TreePine className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-plantera-slate/60 font-medium">Sol</p>
              <p className="text-sm font-semibold text-plantera-darkGreen">{getSoilTypeText(field.typeSol)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gradient-glass rounded-xl p-3 border border-white/20 backdrop-blur-sm">
          <div className="p-1.5 bg-gradient-ocean rounded-lg flex-shrink-0">
            <TreePine className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-plantera-slate/60 font-medium">Irrigation</p>
            <p className="text-sm font-semibold text-plantera-darkGreen">{getIrrigationSystemText(field.systemeIrrigation)}</p>
          </div>
        </div>

        {field.notes && (
          <div className="bg-gradient-glass rounded-xl p-3 border border-white/20 backdrop-blur-sm">
            <p className="text-xs text-plantera-slate/60 font-medium mb-2">Notes</p>
            <p className="text-xs text-plantera-slate/80 leading-relaxed">{field.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const FieldManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    fields,
    isLoading,
    stats,
    addField,
    updateField,
    deleteField
  } = useFields();



  const handleAddField = async (formData: z.infer<typeof fieldFormSchema>) => {
    const mappedData = {
      nom: formData.name,
      surface: formData.surface,
      localisation: formData.location,
      typeSol: formData.soilType,
      systemeIrrigation: formData.irrigationSystem,
      notes: formData.notes || '',
      disponible: true,
    };

    await addField(mappedData);
    setIsAddDialogOpen(false);
  };


  const handleEditField = async (formData: z.infer<typeof fieldFormSchema>) => {
    if (editingField) {
      const mappedData = {
        nom: formData.name,
        surface: formData.surface,
        localisation: formData.location,
        typeSol: formData.soilType,
        systemeIrrigation: formData.irrigationSystem,
        notes: formData.notes || '',
        disponible: true,
      };

      await updateField(editingField.id, mappedData);
      setEditingField(null);
    }
  };  


  const handleDelete = (id: string) => {
    setFieldToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (fieldToDelete) {
      await deleteField(Number(fieldToDelete));
      setDeleteDialogOpen(false);
      setFieldToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient-primary flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-2xl shadow-glow flex-shrink-0">
                <TreePine className="h-6 w-6 text-white" />
              </div>
              <span className="truncate">Gestion des Parcelles</span>
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
                      Le module de gestion des parcelles vous permet de créer et gérer vos terrains agricoles.
                      Chaque parcelle peut contenir une ou plusieurs cultures.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </h1>
            <p className="text-sm text-plantera-slate/70 font-medium">
              Gérez vos terrains agricoles avec précision et optimisez votre production
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="w-full sm:w-auto bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle Parcelle
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <GlassCard className="overflow-hidden hover:shadow-glow transition-all duration-300 animate-fade-up">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-primary rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <TreePine className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-plantera-slate/60 font-semibold">Total des parcelles</p>
                  <p className="text-3xl font-bold text-gradient-primary animate-fade-up">{stats.totalParcelles}</p>
                  <p className="text-xs text-plantera-slate/50">parcelles enregistrées</p>
                </div>
              </div>

              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-soil rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Map className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-plantera-slate/60 font-semibold">Surface totale</p>
                  <p className="text-3xl font-bold text-gradient-primary animate-fade-up">
                    {fields.reduce((sum, field) => sum + field.surface, 0).toFixed(1)} ha
                  </p>
                  <p className="text-xs text-plantera-slate/50">hectares disponibles</p>
                </div>
              </div>

              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-harvest rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-plantera-slate/60 font-semibold">Disponibles</p>
                  <p className="text-3xl font-bold text-gradient-primary animate-fade-up">{fields.length}</p>
                  <p className="text-xs text-plantera-slate/50">prêtes pour culture</p>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-plantera-green" />
          </div>
        ) : fields.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <div className="space-y-4">
              <div className="p-6 bg-gradient-glass rounded-3xl inline-block">
                <TreePine className="h-12 w-12 text-plantera-slate/50" />
              </div>
              <h3 className="text-2xl font-bold text-plantera-darkGreen">Aucune parcelle</h3>
              <p className="text-plantera-slate/70 font-medium max-w-md mx-auto">
                Commencez par créer votre première parcelle pour pouvoir y ajouter des cultures.
              </p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-6"
                size="lg"
              >
                Créer une parcelle
              </Button>
            </div>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {fields.map((field) => (
              <FieldCard
                key={field.id}
                field={field}
                onEdit={setEditingField}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <FieldDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddField}
      />

      <FieldDialog
        isOpen={!!editingField}
        onClose={() => setEditingField(null)}
        onSubmit={handleEditField}
        field={editingField || undefined}
        isEditing={true}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette parcelle ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default FieldManagement;
