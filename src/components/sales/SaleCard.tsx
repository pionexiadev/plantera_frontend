
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Box, Package, Banknote, MoreVertical, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SaleWithHarvest } from '@/types/sale';
import { SaleDialog } from './SaleDialog';
import { SaleDetails } from './SaleDetails';

interface SaleCardProps {
  sale: SaleWithHarvest;
  onStatusChange: (id: string, status: SaleWithHarvest['status']) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<SaleWithHarvest>) => void;
}

export function SaleCard({ 
  sale, 
  onStatusChange, 
  onDelete, 
  onUpdate 
}: SaleCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  const getStatusColor = (status: SaleWithHarvest['status']) => {
    switch(status) {
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'delivered': return 'bg-violet-100 text-violet-800 border-violet-200';
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  // Get card style based on culture type
  const getCardStyle = () => {
    const cultureStyles: Record<string, string> = {
      'Maïs': 'from-blue-50 to-green-100 border-blue-200',
      'Blé': 'from-amber-50 to-yellow-100 border-amber-200',
      'Riz': 'from-blue-50 to-teal-100 border-blue-200',
      'Soja': 'from-green-50 to-emerald-100 border-green-200',
      'Orge': 'from-amber-50 to-orange-100 border-amber-200',
      'Avoine': 'from-stone-50 to-yellow-100 border-stone-200',
      'Sorgho': 'from-red-50 to-red-100 border-red-200',
      'Millet': 'from-amber-50 to-stone-100 border-amber-200',
      'Tournesol': 'from-yellow-50 to-orange-100 border-yellow-200',
      'Colza': 'from-yellow-50 to-lime-100 border-yellow-200'
    };
    
    return cultureStyles[sale.field.culture] || 'from-blue-50 to-[#e7f0fd] border-blue-200';
  };

  return (
    <>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg border rounded-xl bg-gradient-to-b ${getCardStyle()} hover:scale-[1.01] group`}>
        <CardHeader className="pb-2 relative">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg text-blue-800">{sale.clientName}</CardTitle>
              <p className="text-sm text-green-700 mt-1 font-medium">{sale.field.culture}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(sale.status)} shadow-sm`}>{getStatusText(sale.status)}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-black/5">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-lg border border-blue-100 shadow-lg bg-white">
                  <DropdownMenuItem 
                    onClick={() => setIsEditDialogOpen(true)}
                    className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50"
                  >
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(sale.id, 'pending')}
                    className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50"
                  >
                    Marquer en attente
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(sale.id, 'confirmed')}
                    className="cursor-pointer hover:bg-amber-50 focus:bg-amber-50"
                  >
                    Marquer confirmée
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(sale.id, 'delivered')}
                    className="cursor-pointer hover:bg-violet-50 focus:bg-violet-50"
                  >
                    Marquer livrée
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(sale.id, 'paid')}
                    className="cursor-pointer hover:bg-green-50 focus:bg-green-50"
                  >
                    Marquer payée
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onStatusChange(sale.id, 'canceled')} 
                    className="cursor-pointer hover:bg-red-50 focus:bg-red-50"
                  >
                    Marquer annulée
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onDelete(sale.id)}
                    className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50"
                  >
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 shadow-sm">
                <User className="h-4 w-4 text-blue-700" />
                <span className="text-sm font-medium">{sale.clientName}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 shadow-sm">
                <CalendarDays className="h-4 w-4 text-blue-700" />
                <span className="text-sm font-medium">{new Date(sale.saleDate).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 shadow-sm">
                <Package className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{sale.quantity} kg</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 shadow-sm">
                <Box className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">{sale.field.name}</span>
              </div>
            </div>
            
            <div className="bg-white/70 p-2 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-800">Total:</span>
                <span className="text-lg font-bold text-blue-800">{sale.totalAmount.toFixed(2)}€</span>
              </div>
              <div className="text-xs text-blue-600 mt-1">
                {sale.price.toFixed(2)}€/kg × {sale.quantity}kg
              </div>
            </div>
            
          </div>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between bg-white/70 border-t border-blue-100">
          <div className="flex items-center gap-1">
            <Banknote className="h-4 w-4 text-green-600" />
            <span className="text-xs text-blue-800/80">
              {sale.paymentDate ? 
                `Payé le ${new Date(sale.paymentDate).toLocaleDateString('fr-FR')}` : 
                sale.status === 'paid' ? 
                'Payé' : 'Non payé'
              }
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsDetailsDialogOpen(true)}
            className="border-blue-200 hover:border-blue-300 hover:bg-blue-50"
          >
            Détails
          </Button>
        </CardFooter>
      </Card>
      
      {isEditDialogOpen && (
        <SaleDialog 
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={(data) => {
            onUpdate(sale.id, data);
            setIsEditDialogOpen(false);
          }}
          sale={sale}
          isEditing={true}
        />
      )}
      
      {isDetailsDialogOpen && (
        <SaleDetails
          sale={sale}
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
        />
      )}
    </>
  );
}
