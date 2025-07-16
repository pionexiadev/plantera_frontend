
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SaleWithHarvest } from '@/types/sale';
import { CalendarDays, Package, User, Banknote, Box, Check, Truck, Calendar, Receipt } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface SaleDetailsProps {
  sale: SaleWithHarvest;
  isOpen: boolean;
  onClose: () => void;
}

export function SaleDetails({ sale, isOpen, onClose }: SaleDetailsProps) {
  const getStatusColor = (status: SaleWithHarvest['status']) => {
    switch(status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-amber-100 text-amber-800';
      case 'delivered': return 'bg-violet-100 text-violet-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: SaleWithHarvest['status']) => {
    switch(status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'delivered': return 'Livrée';
      case 'paid': return 'Payée';
      case 'canceled': return 'Annulée';
      default: return status;
    }
  };
  
  const getStatusIcon = (status: SaleWithHarvest['status']) => {
    switch(status) {
      case 'pending': return <Calendar className="h-4 w-4" />;
      case 'confirmed': return <Check className="h-4 w-4" />;
      case 'delivered': return <Truck className="h-4 w-4" />;
      case 'paid': return <Receipt className="h-4 w-4" />;
      case 'canceled': return <Box className="h-4 w-4" />;
      default: return <Box className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Détails de la vente
            <Badge className={`ml-2 ${getStatusColor(sale.status)}`}>
              <span className="flex items-center gap-1">
                {getStatusIcon(sale.status)}
                {getStatusText(sale.status)}
              </span>
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-medium flex items-center gap-1">
                <User className="h-4 w-4 text-blue-600" />
                {sale.clientName}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Date de vente</p>
              <p className="font-medium flex items-center gap-1">
                <CalendarDays className="h-4 w-4 text-blue-600" />
                {new Date(sale.saleDate).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Culture</p>
              <p className="font-medium">{sale.field.culture}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Parcelle</p>
              <p className="font-medium flex items-center gap-1">
                <Box className="h-4 w-4 text-green-600" />
                {sale.field.name}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Quantité</p>
              <p className="font-medium flex items-center gap-1">
                <Package className="h-4 w-4 text-amber-600" />
                {sale.quantity} kg
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Prix unitaire</p>
              <p className="font-medium">{sale.price.toFixed(2)}€/kg</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-blue-800">Montant total</p>
              <p className="text-xl font-bold text-blue-800">{sale.totalAmount.toFixed(2)}€</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Date de livraison</p>
              <p className="font-medium flex items-center gap-1">
                <Truck className="h-4 w-4 text-violet-600" />
                {sale.deliveryDate ? new Date(sale.deliveryDate).toLocaleDateString('fr-FR') : 'Non spécifiée'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Date de paiement</p>
              <p className="font-medium flex items-center gap-1">
                <Banknote className="h-4 w-4 text-green-600" />
                {sale.paymentDate ? new Date(sale.paymentDate).toLocaleDateString('fr-FR') : 'Non spécifiée'}
              </p>
            </div>
          </div>
          
          {sale.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-gray-500 mb-1">Notes</p>
                <div className="bg-gray-50 p-3 rounded-md text-sm">
                  {sale.notes}
                </div>
              </div>
            </>
          )}
          
          <Separator />
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Informations sur la récolte</p>
            <div className="bg-green-50 p-3 rounded-md border border-green-100">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Date de récolte</p>
                  <p className="text-sm font-medium">{new Date(sale.harvest.harvestDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Quantité récoltée</p>
                  <p className="text-sm font-medium">{sale.harvest.quantity} kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Qualité</p>
                  <p className="text-sm font-medium">{sale.harvest.quality}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
