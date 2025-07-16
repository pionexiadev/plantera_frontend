
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CultureFieldFiltersProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  fieldsCount: number;
}

export function CultureFieldFilters({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  fieldsCount 
}: CultureFieldFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une parcelle..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        
        <div className="hidden md:block text-sm text-muted-foreground">
          {fieldsCount} parcelle{fieldsCount !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <Button
          variant={activeFilter === null ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(null)}
          className={activeFilter === null ? "bg-amber-600 hover:bg-amber-700" : ""}
        >
          Toutes
        </Button>
        <Button
          variant={activeFilter === 'planted' ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange('planted')}
          className={activeFilter === 'planted' ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Semées
        </Button>
        <Button
          variant={activeFilter === 'growing' ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange('growing')}
          className={activeFilter === 'growing' ? "bg-green-600 hover:bg-green-700" : ""}
        >
          En croissance
        </Button>
        <Button
          variant={activeFilter === 'ready' ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange('ready')}
          className={activeFilter === 'ready' ? "bg-amber-600 hover:bg-amber-700" : ""}
        >
          Prêtes
        </Button>
        <Button
          variant={activeFilter === 'harvested' ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange('harvested')}
          className={activeFilter === 'harvested' ? "bg-gray-600 hover:bg-gray-700" : ""}
        >
          Récoltées
        </Button>
      </div>
    </div>
  );
}
