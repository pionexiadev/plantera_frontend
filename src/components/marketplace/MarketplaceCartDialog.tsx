import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { MarketplaceProduct } from '@/types/marketplace';

interface CartItem extends MarketplaceProduct {
  quantity: number;
}

interface MarketplaceCartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const MarketplaceCartDialog: React.FC<MarketplaceCartDialogProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Panier ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})
          </DialogTitle>
          <DialogDescription>
            Vérifiez vos articles avant de passer commande
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Votre panier est vide</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg bg-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.title}</h4>
                      <p className="text-xs text-slate-500 mb-2">{item.seller}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-plantera-blue">
                          {formatPrice(item.price)}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500 hover:text-red-700"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="text-lg font-bold text-plantera-blue">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </>
        )}

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Continuer les achats
          </Button>
          {cartItems.length > 0 && (
            <Button onClick={onCheckout} className="bg-plantera-blue hover:bg-plantera-blue/90">
              Passer commande
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarketplaceCartDialog;