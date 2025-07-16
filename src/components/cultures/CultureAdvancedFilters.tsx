
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SlidersHorizontal, RotateCw } from 'lucide-react';

interface CultureAdvancedFiltersProps {
  onApplyFilters: (filters: {
    status?: string | null;
    culture?: string | null;
    minSurface?: number | null;
    maxSurface?: number | null;
    minHealth?: number | null;
    minIrrigation?: number | null;
    harvestPeriod?: string | null;
    sortBy?: { field: string; direction: 'asc' | 'desc' };
  }) => void;
  availableCultures: string[];
}

const harvestPeriods = [
  { value: 'this-week', label: 'Cette semaine' },
  { value: 'this-month', label: 'Ce mois-ci' },
  { value: 'next-month', label: 'Mois prochain' },
  { value: 'next-3-months', label: 'Trois prochains mois' },
];

export function CultureAdvancedFilters({ onApplyFilters, availableCultures }: CultureAdvancedFiltersProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [culture, setCulture] = useState<string | null>(null);
  const [surfaceRange, setSurfaceRange] = useState<[number, number]>([0, 100]);
  const [minHealth, setMinHealth] = useState<number | null>(null);
  const [minIrrigation, setMinIrrigation] = useState<number | null>(null);
  const [harvestPeriod, setHarvestPeriod] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    setStatus(null);
    setCulture(null);
    setSurfaceRange([0, 100]);
    setMinHealth(null);
    setMinIrrigation(null);
    setHarvestPeriod(null);
    setSortField('created_at');
    setSortDirection('desc');
  };

  const handleApply = () => {
    onApplyFilters({
      status,
      culture,
      minSurface: surfaceRange[0] > 0 ? surfaceRange[0] : null,
      maxSurface: surfaceRange[1] < 100 ? surfaceRange[1] : null,
      minHealth,
      minIrrigation,
      harvestPeriod,
      sortBy: { field: sortField, direction: sortDirection }
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 border-plantera-green/30 text-plantera-green hover:text-plantera-green hover:bg-plantera-green/10 hover:border-plantera-green"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filtres avancés</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Filtres avancés</span>
            <Button variant="ghost" size="icon" onClick={handleReset} className="h-8 w-8">
              <RotateCw className="h-4 w-4" />
            </Button>
          </SheetTitle>
          <SheetDescription>
            Affinez votre recherche de parcelles en utilisant les filtres ci-dessous
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1" className="border-b border-green-100">
              <AccordionTrigger className="text-plantera-green hover:text-plantera-green hover:no-underline">
                Filtres de base
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select value={status || 'null'} onValueChange={(value) => setStatus(value === 'null' ? null : value)}>
                    <SelectTrigger id="status" className="border-green-100 focus-visible:ring-plantera-green">
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">Tous les statuts</SelectItem>
                      <SelectItem value="planted">Semé</SelectItem>
                      <SelectItem value="growing">En croissance</SelectItem>
                      <SelectItem value="ready">Prêt à récolter</SelectItem>
                      <SelectItem value="harvested">Récolté</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="culture">Type de culture</Label>
                  <Select value={culture || 'null'} onValueChange={(value) => setCulture(value === 'null' ? null : value)}>
                    <SelectTrigger id="culture" className="border-green-100 focus-visible:ring-plantera-green">
                      <SelectValue placeholder="Toutes les cultures" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">Toutes les cultures</SelectItem>
                      {availableCultures.map((culture) => (
                        <SelectItem key={culture} value={culture}>
                          {culture}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-green-100">
              <AccordionTrigger className="text-plantera-green hover:text-plantera-green hover:no-underline">
                Santé et irrigation
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2 space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="minHealth">Santé minimum</Label>
                      <span className="text-sm text-green-700">{minHealth ?? 0}%</span>
                    </div>
                    <Slider
                      id="minHealth"
                      min={0}
                      max={100}
                      step={5}
                      value={minHealth !== null ? [minHealth] : [0]}
                      onValueChange={(value) => setMinHealth(value[0])}
                      className="bg-plantera-green/20"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="minIrrigation">Irrigation minimum</Label>
                      <span className="text-sm text-green-700">{minIrrigation ?? 0}%</span>
                    </div>
                    <Slider
                      id="minIrrigation"
                      min={0}
                      max={100}
                      step={5}
                      value={minIrrigation !== null ? [minIrrigation] : [0]}
                      onValueChange={(value) => setMinIrrigation(value[0])}
                      className="bg-plantera-green/20"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-green-100">
              <AccordionTrigger className="text-plantera-green hover:text-plantera-green hover:no-underline">
                Surface et récolte
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Surface (hectares)</Label>
                    <div className="text-sm text-plantera-green">
                      {surfaceRange[0]} - {surfaceRange[1] === 100 ? '∞' : surfaceRange[1]}
                    </div>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={surfaceRange}
                    onValueChange={(value: [number, number]) => setSurfaceRange(value)}
                    className="bg-plantera-green/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="harvestPeriod">Période de récolte</Label>
                  <Select value={harvestPeriod || 'null'} onValueChange={(value) => setHarvestPeriod(value === 'null' ? null : value)}>
                    <SelectTrigger id="harvestPeriod" className="border-green-100 focus-visible:ring-plantera-green">
                      <SelectValue placeholder="Toutes les périodes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">Toutes les périodes</SelectItem>
                      {harvestPeriods.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-green-100">
              <AccordionTrigger className="text-plantera-green hover:text-plantera-green hover:no-underline">
                Tri et ordre
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sortField">Trier par</Label>
                  <Select value={sortField} onValueChange={setSortField}>
                    <SelectTrigger id="sortField" className="border-green-100 focus-visible:ring-plantera-green">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Date d'ajout</SelectItem>
                      <SelectItem value="planted_date">Date de plantation</SelectItem>
                      <SelectItem value="estimated_harvest_date">Date de récolte</SelectItem>
                      <SelectItem value="name">Nom</SelectItem>
                      <SelectItem value="surface">Surface</SelectItem>
                      <SelectItem value="health">Santé</SelectItem>
                      <SelectItem value="irrigation">Irrigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sortDirection">Ordre</Label>
                  <Select value={sortDirection} onValueChange={(value: 'asc' | 'desc') => setSortDirection(value)}>
                    <SelectTrigger id="sortDirection" className="border-green-100 focus-visible:ring-plantera-green">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Décroissant</SelectItem>
                      <SelectItem value="asc">Croissant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      
        <SheetFooter className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>Annuler</Button>
          <Button className="flex-1 bg-plantera-green hover:bg-plantera-lightGreen" onClick={handleApply}>Appliquer</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
