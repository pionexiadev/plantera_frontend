import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, Package, Banknote, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sale } from '@/types/sale';

interface SimpleSaleCardProps {
  sale: Sale;
  onStatusChange: (id: string, status: Sale['status']) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Sale>) => void;
}

export function SimpleSaleCard({ 
  sale, 
  onStatusChange, 
  onDelete, 
  onUpdate 
}: SimpleSaleCardProps) {
  
  const getStatusColor = (status: Sale['status']) => {
    switch(status) {
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'delivered': return 'bg-violet-100 text-violet-800 border-violet-200';
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: Sale['status']) => {
    switch(status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'delivered': return 'Livrée';
      case 'paid': return 'Payée';
      case 'canceled': return 'Annulée';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <Card className="border-slate-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-500" />
              <h3 className="font-semibold text-slate-900">{sale.clientName}</h3>
            </div>
            <Badge className={`text-xs border ${getStatusColor(sale.status)}`}>
              {getStatusLabel(sale.status)}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onUpdate(sale.id, sale)}>
                Modifier
              </DropdownMenuItem>
              {sale.status === 'pending' && (
                <DropdownMenuItem onClick={() => onStatusChange(sale.id, 'confirmed')}>
                  Confirmer
                </DropdownMenuItem>
              )}
              {sale.status === 'confirmed' && (
                <DropdownMenuItem onClick={() => onStatusChange(sale.id, 'delivered')}>
                  Marquer comme livrée
                </DropdownMenuItem>
              )}
              {sale.status === 'delivered' && (
                <DropdownMenuItem onClick={() => onStatusChange(sale.id, 'paid')}>
                  Marquer comme payée
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(sale.id)}
                className="text-red-600 focus:text-red-600"
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-slate-500" />
            <span className="text-slate-600">Quantité:</span>
            <span className="font-medium">{sale.quantity} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4 text-slate-500" />
            <span className="text-slate-600">Prix/kg:</span>
            <span className="font-medium">{formatCurrency(sale.price)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="h-4 w-4 text-slate-500" />
          <span className="text-slate-600">Date de vente:</span>
          <span className="font-medium">{formatDate(sale.saleDate)}</span>
        </div>
        
        {sale.notes && (
          <div className="text-sm">
            <span className="text-slate-600">Notes:</span>
            <p className="text-slate-800 mt-1">{sale.notes}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-bold text-plantera-blue">
            {formatCurrency(sale.totalAmount)}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            className="border-blue-200 hover:border-blue-300 hover:bg-blue-50"
          >
            Détails
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}