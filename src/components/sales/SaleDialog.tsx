
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
import { Sale } from '@/types/sale';

const saleFormSchema = z.object({
  harvestId: z.string().min(1, 'La récolte est requise'),
  clientName: z.string().min(1, 'Le nom du client est requis'),
  quantity: z.coerce.number().min(0.01, 'Quantité doit être positive'),
  price: z.coerce.number().min(0.01, 'Prix doit être positif'),
  saleDate: z.string().min(1, 'Date de vente requise'),
  deliveryDate: z.string().optional(),
  paymentDate: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'delivered', 'paid', 'canceled']),
  notes: z.string().optional(),
});

interface SaleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof saleFormSchema>) => void;
  sale?: Sale;
  isEditing?: boolean;
  harvestId?: string;
  maxQuantity?: number;
  culture?: string;
  fieldName?: string;
}

export function SaleDialog({ 
  isOpen, 
  onClose, 
  onSubmit, 
  sale, 
  isEditing = false,
  harvestId,
  maxQuantity = 0,
  culture = '',
  fieldName = ''
}: SaleDialogProps) {
  
  const todayDate = new Date().toISOString().split('T')[0];
  
  const defaultValues = {
    harvestId: sale?.harvestId || harvestId || '',
    clientName: sale?.clientName || '',
    quantity: sale?.quantity || (maxQuantity > 0 ? maxQuantity : 0),
    price: sale?.price || 0,
    saleDate: sale?.saleDate || todayDate,
    deliveryDate: sale?.deliveryDate || '',
    paymentDate: sale?.paymentDate || '',
    status: sale?.status || 'pending',
    notes: sale?.notes || '',
  };

  const form = useForm<z.infer<typeof saleFormSchema>>({
    resolver: zodResolver(saleFormSchema),
    defaultValues,
  });

  const handleFormSubmit = (values: z.infer<typeof saleFormSchema>) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  // Calculate total based on quantity and price
  const calculateTotal = () => {
    const quantity = form.watch('quantity') || 0;
    const price = form.watch('price') || 0;
    return (quantity * price).toFixed(2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier la vente' : 'Ajouter une vente'}
            {culture && fieldName && !isEditing && (
              <p className="text-sm font-normal text-muted-foreground mt-1">
                {culture} - {fieldName} (Disponible: {maxQuantity}kg)
              </p>
            )}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="harvestId"
              render={({ field }) => (
                <input type="hidden" {...field} />
              )}
            />
            
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du client" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantité (kg)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        {...field} 
                        max={isEditing ? undefined : maxQuantity}
                      />
                    </FormControl>
                    {!isEditing && maxQuantity > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Maximum disponible: {maxQuantity}kg
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix par kg (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Total: <span className="font-bold">{calculateTotal()}€</span></p>
            </div>
            
            <FormField
              control={form.control}
              name="saleDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de vente</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de livraison (optionnel)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de paiement (optionnel)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="confirmed">Confirmée</SelectItem>
                      <SelectItem value="delivered">Livrée</SelectItem>
                      <SelectItem value="paid">Payée</SelectItem>
                      <SelectItem value="canceled">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                    <Textarea placeholder="Notes ou commentaires" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
              <Button type="submit" className="bg-plantera-green hover:bg-plantera-lightGreen text-white">
                {isEditing ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
