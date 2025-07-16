import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
import { Field } from '@/types/field';
import { Culture } from '@/types/culture';
import { Harvest } from '@/types/harvest';

const harvestFormSchema = z.object({
  cultureId: z.coerce.number().min(1, 'Culture requise'),
  parcelleId: z.coerce.number().min(1, 'Parcelle requise'),
  dateRecolte: z.string().min(1, 'Date requise'),
  quantite: z.coerce.number().min(0, 'Quantité invalide'),
  qualite: z.enum(['excellent', 'good', 'average', 'poor']),
  statut: z.enum(['Planifiée', 'En cours', 'Réalisée', 'Annulée']),
  couts: z.coerce.number().min(0, 'Coûts invalides'),
  heuresTravail: z.coerce.number().min(0, 'Heures invalides'),
  conditionsMeteo: z.string().optional(),
  notes: z.string().optional(),
});

type HarvestPayload = z.infer<typeof harvestFormSchema>;

interface HarvestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: HarvestPayload) => void;
  harvest?: Harvest;
  isEditing?: boolean;
  cultures: Culture[];
  parcelles: Field[];
  fields: Field[];

}

export function HarvestDialog({
  isOpen,
  onClose,
  onSubmit,
  harvest,
  isEditing = false,
  cultures,
  parcelles,
}: HarvestDialogProps) {
  const form = useForm<HarvestPayload>({
    resolver: zodResolver(harvestFormSchema),
    defaultValues: {
      cultureId: harvest?.culture?.id ?? 0,
      parcelleId: harvest?.parcelle?.id ?? 0,
      dateRecolte: harvest?.dateRecolte ?? new Date().toISOString().slice(0, 10),
      quantite: harvest?.quantite ?? 0,
      qualite: harvest?.qualite ?? 'good',
      statut: harvest?.statut ?? 'Planifiée',
      couts: harvest?.couts ?? 0,
      heuresTravail: harvest?.heuresTravail ?? 0,
      conditionsMeteo: harvest?.conditionsMeteo ?? '',
      notes: harvest?.notes ?? '',
    },
  });

  const handleSubmit = (values: HarvestPayload) => {
    onSubmit(values); // <-- ici, onSubmit reçoit déjà { cultureId, parcelleId, ... }
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Modifier la récolte' : 'Nouvelle récolte'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Culture */}
            <FormField
              control={form.control}
              name="cultureId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Culture</FormLabel>
                  <Select onValueChange={val => field.onChange(Number(val))} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une culture" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cultures.map(culture => (
                        <SelectItem key={culture.id} value={culture.id.toString()}>
                          {culture.nom} ({culture.varieté})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Parcelle */}
            <FormField
              control={form.control}
              name="parcelleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcelle</FormLabel>
                  <Select onValueChange={val => field.onChange(Number(val))} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une parcelle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {parcelles.map(parcelle => (
                        <SelectItem key={parcelle.id} value={parcelle.id.toString()}>
                          {parcelle.nom} - {parcelle.surface} m²
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date de récolte */}
            <FormField
              control={form.control}
              name="dateRecolte"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de récolte</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantité */}
            <FormField
              control={form.control}
              name="quantite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Qualité */}
            <FormField
              control={form.control}
              name="qualite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualité</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une qualité" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="excellent">Excellente</SelectItem>
                      <SelectItem value="good">Bonne</SelectItem>
                      <SelectItem value="average">Moyenne</SelectItem>
                      <SelectItem value="poor">Faible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Statut */}
            <FormField
              control={form.control}
              name="statut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Statut de la récolte" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Planifiée">Planifiée</SelectItem>
                      <SelectItem value="En cours">En cours</SelectItem>
                      <SelectItem value="Réalisée">Réalisée</SelectItem>
                      <SelectItem value="Annulée">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Coûts & Heures */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="couts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coûts (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heuresTravail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heures de travail</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Conditions météo */}
            <FormField
              control={form.control}
              name="conditionsMeteo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conditions météo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex : Ensoleillé, pluvieux..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Remarques éventuelles" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Boutons */}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
              <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
                {isEditing ? 'Modifier' : 'Ajouter'}
              </Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
