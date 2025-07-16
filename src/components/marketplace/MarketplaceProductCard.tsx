
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, ShoppingCart, Info } from "lucide-react";
import { MarketplaceProduct } from '@/types/marketplace';

interface MarketplaceProductCardProps {
  product: MarketplaceProduct;
  viewMode: 'grid' | 'list';
  onAddToCart?: (product: MarketplaceProduct) => void;
  onViewDetails?: (product: MarketplaceProduct) => void;
  isOwner?: boolean;
}

const MarketplaceProductCard = ({ 
  product, 
  viewMode, 
  onAddToCart,
  onViewDetails,
  isOwner = false 
}: MarketplaceProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 2
    }).format(price);
  };
  
  if (viewMode === 'list') {
    return (
      <Card className="border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-40 overflow-hidden bg-slate-50 border-r border-slate-100">
            <AspectRatio ratio={1/1} className="h-full">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
          <div className="flex-1 p-4">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                  <p className="font-bold text-lg text-plantera-green">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <p className="text-slate-600 text-sm mb-2">{product.description}</p>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-slate-500">• {product.seller}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-slate-50 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {isOwner ? (
                  <Button variant="outline" className="flex-1">
                    Gérer l'annonce
                  </Button>
                ) : (
                  <Button 
                    className="flex-1" 
                    disabled={!product.inStock}
                    onClick={() => onAddToCart?.(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="bg-white"
                  onClick={() => onViewDetails?.(product)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <AspectRatio ratio={4/3} className="bg-slate-50">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover h-full w-full"
          />
        </AspectRatio>
        {!product.inStock && (
          <Badge className="absolute top-2 right-2 bg-amber-500">
            Rupture de stock
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold line-clamp-1">{product.title}</h3>
          </div>
          <p className="text-slate-600 text-sm line-clamp-2 mb-2 h-10">
            {product.description}
          </p>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-slate-500">• {product.seller}</span>
          </div>
          <div className="flex gap-1 flex-wrap mb-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-slate-50 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="font-bold text-xl text-plantera-green">
            {formatPrice(product.price)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        {isOwner ? (
          <Button variant="outline" className="flex-1">
            Gérer l'annonce
          </Button>
        ) : (
          <Button 
            className="flex-1" 
            disabled={!product.inStock}
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Ajouter' : 'Rupture'}
          </Button>
        )}
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white"
          onClick={() => onViewDetails?.(product)}
        >
          <Info className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketplaceProductCard;
