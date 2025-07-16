
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface Category {
  id: string;
  name: string;
}

interface MarketplaceFiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: Category[];
}

const MarketplaceFilters = ({ 
  activeCategory, 
  setActiveCategory,
  categories 
}: MarketplaceFiltersProps) => {
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [availability, setAvailability] = React.useState({
    inStock: false,
    freeShipping: false,
  });
  
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-slate-900">Catégories</h4>
        <RadioGroup 
          value={activeCategory} 
          onValueChange={setActiveCategory}
          className="space-y-1.5"
        >
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <RadioGroupItem value={category.id} id={`category-${category.id}`} />
              <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h4 className="font-medium text-slate-900">Prix</h4>
        <div>
          <Slider
            value={priceRange}
            min={0}
            max={5000}
            step={50}
            minStepsBetweenThumbs={1}
            onValueChange={(values) => setPriceRange(values)}
            className="py-4"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">{priceRange[0]}€</span>
            <span className="text-sm">{priceRange[1]}€</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h4 className="font-medium text-slate-900">Disponibilité</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="in-stock" 
              checked={availability.inStock}
              onCheckedChange={(checked) => 
                setAvailability({...availability, inStock: checked as boolean})
              }
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">En stock uniquement</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="free-shipping" 
              checked={availability.freeShipping}
              onCheckedChange={(checked) => 
                setAvailability({...availability, freeShipping: checked as boolean})
              }
            />
            <Label htmlFor="free-shipping" className="text-sm cursor-pointer">Livraison gratuite</Label>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h4 className="font-medium text-slate-900">Caractéristiques</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="bio" />
            <Label htmlFor="bio" className="text-sm cursor-pointer">Bio</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="certified" />
            <Label htmlFor="certified" className="text-sm cursor-pointer">Certifié</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="eco-friendly" />
            <Label htmlFor="eco-friendly" className="text-sm cursor-pointer">Éco-responsable</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
