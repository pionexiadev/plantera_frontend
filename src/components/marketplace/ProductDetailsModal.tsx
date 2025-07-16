import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, ShoppingCart, Heart, Share2, MapPin, Truck, Shield } from 'lucide-react';
import { MarketplaceProduct } from '@/types/marketplace';

interface ProductDetailsModalProps {
  product: MarketplaceProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: MarketplaceProduct) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
          <DialogDescription className="text-lg">
            Vendu par {product.seller}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images du produit */}
          <div className="space-y-4">
            <AspectRatio ratio={1/1} className="bg-slate-50 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover h-full w-full"
              />
            </AspectRatio>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <AspectRatio key={i} ratio={1/1} className="bg-slate-100 rounded-md overflow-hidden opacity-60">
                  <img
                    src={product.image}
                    alt={`${product.title} ${i + 1}`}
                    className="object-cover h-full w-full"
                  />
                </AspectRatio>
              ))}
            </div>
          </div>

          {/* Informations du produit */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-slate-500">(24 avis)</span>
                </div>
                <Badge variant="outline" className="bg-slate-50">
                  {product.category}
                </Badge>
              </div>
              
              <p className="text-3xl font-bold text-plantera-green mb-4">
                {formatPrice(product.price)}
              </p>

              <div className="flex gap-2 mb-4">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-plantera-blue/10 text-plantera-blue">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-green-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Qualité garantie</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Truck className="h-4 w-4" />
                  <span className="text-sm">Livraison rapide</span>
                </div>
                <div className="flex items-center gap-2 text-orange-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Local</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-slate-600 leading-relaxed">
                Ce produit de qualité supérieure est idéal pour votre exploitation agricole. 
                Fabriqué selon les normes les plus strictes, il vous garantit des résultats optimaux 
                et une durabilité exceptionnelle.
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Informations vendeur</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 bg-plantera-green/10 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-plantera-green">
                    {product.seller.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{product.seller}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm">4.8 (156 ventes)</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Vendeur vérifié • Membre depuis 2019 • Réponse sous 2h
              </p>
            </div>

            <div className="flex gap-3 pt-6">
              <Button
                className="flex-1"
                disabled={!product.inStock}
                onClick={() => onAddToCart?.(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;