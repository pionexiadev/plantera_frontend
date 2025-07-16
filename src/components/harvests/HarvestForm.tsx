import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage
} from '@/components/ui/form';

import { Culture } from '@/types/culture';
import { Field } from '@/types/field';
import { Harvest } from '@/types/harvest';

const harvestFormSchema = z.object({
  parcelleId: z.coerce.number().min(1, 'Champ requis'),
  cultureId: z.coerce.number().min(1, 'Culture requise'),
  dateRecolte: z.string().min(1, 'Date requise'),
  quantite: z.number().min(1, 'Quantité requise'),
  qualite: z.enum(['excellent', 'good', 'average', 'poor']),
  statut: z.enum(['Planifiée', 'En cours', 'Réalisée', 'Annulée']),
  couts: z.number().min(0, 'Coûts invalides'),
  heuresTravail: z.number().min(0, 'Heures invalides'),
  conditionsMeteo: z.string().min(1, 'Conditions météo requises'),
  notes: z.string().optional(),
});

type HarvestFormData = z.infer<typeof harvestFormSchema>;

interface HarvestFormProps {
  onSubmit: (data: HarvestFormData) => void;
  onCancel: () => void;
  initialData?: Partial<Harvest>;
  isEditing?: boolean;
  fields: Field[];
  cultures: Culture[];
}

export function HarvestForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  fields,
  cultures
}: HarvestFormProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [availableCultures, setAvailableCultures] = useState<Culture[]>([]);

  const form = useForm<HarvestFormData>({
    resolver: zodResolver(harvestFormSchema),
    defaultValues: {
      parcelleId: initialData?.parcelle?.id ?? 0,
      cultureId: initialData?.culture?.id ?? 0,
      dateRecolte: initialData?.dateRecolte || new Date().toISOString().split('T')[0],
      quantite: initialData?.quantite || 0,
      qualite: initialData?.qualite || 'good',
      statut: initialData?.statut || 'Planifiée',
      couts: initialData?.couts || 0,
      heuresTravail: initialData?.heuresTravail || 0,
      conditionsMeteo: initialData?.conditionsMeteo || '',
      notes: initialData?.notes || '',
    },
  });

  useEffect(() => {
    if (selectedFieldId !== null) {
      const filtered = cultures.filter(
        c => c.parcelleId === selectedFieldId && c.statut === 'ready'
      );
      setAvailableCultures(filtered);
      if (filtered.length === 1 && !form.getValues('cultureId')) {
        form.setValue('cultureId', filtered[0].id);
      }
    } else {
      setAvailableCultures([]);
    }
  }, [selectedFieldId, cultures, form]);

  useEffect(() => {
    if (initialData?.parcelle?.id) {
      setSelectedFieldId(initialData.parcelle.id);
    }
  }, [initialData]);

  const handleSubmit = (data: HarvestFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

        {/* Champ (parcelle) */}
        <FormField
          control={form.control}
          name="parcelleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Champ</FormLabel>
              <Select
                onValueChange={(val) => {
                  const id = parseInt(val);
                  field.onChange(id);
                  setSelectedFieldId(id);
                  form.setValue('cultureId', 0);
                }}
                value={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un champ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fields.map((f) => (
                    <SelectItem key={f.id} value={f.id.toString()}>
                      {f.nom} ({f.surface} ha)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Culture */}
        <FormField
          control={form.control}
          name="cultureId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Culture</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(parseInt(val))}
                value={field.value.toString()}
                disabled={!selectedFieldId}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une culture" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableCultures.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.nom} ({c.surface} ha)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date + Quantité */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dateRecolte"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de récolte</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantité (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Qualité + Statut */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="qualite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualité</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualité" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="excellent">Excellente</SelectItem>
                    <SelectItem value="good">Bonne</SelectItem>
                    <SelectItem value="average">Moyenne</SelectItem>
                    <SelectItem value="poor">Faible</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="statut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Planifiée">Planifiée</SelectItem>
                    <SelectItem value="En cours">En cours</SelectItem>
                    <SelectItem value="Réalisée">Réalisée</SelectItem>
                    <SelectItem value="Annulée">Annulée</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* Coûts + Heures */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="couts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coûts (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
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
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Météo + Notes */}
        <FormField
          control={form.control}
          name="conditionsMeteo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conditions météo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Ensoleillé, Pluvieux..." />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optionnel)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Remarques supplémentaires" />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Boutons */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} type="button">Annuler</Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            {isEditing ? 'Modifier' : 'Ajouter'} la récolte
          </Button>
        </div>
      </form>
    </Form>
  );
}
