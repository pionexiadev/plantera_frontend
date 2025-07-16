
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";

interface LivestockFiltersProps {
  filters: {
    type: string;
    status: string;
    searchQuery: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    type: string;
    status: string;
    searchQuery: string;
  }>>;
  animalTypes: string[];
  animalStatuses: { value: string; label: string }[];
}

const LivestockFilters = ({ 
  filters, 
  setFilters, 
  animalTypes, 
  animalStatuses 
}: LivestockFiltersProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-8 bg-white"
            value={filters.searchQuery}
            onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Type d'animal</Label>
        <Select 
          value={filters.type} 
          onValueChange={(value) => setFilters({...filters, type: value})}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Tous les types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {animalTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">État</Label>
        <RadioGroup 
          value={filters.status}
          onValueChange={(value) => setFilters({...filters, status: value})}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all-status" />
            <Label htmlFor="all-status" className="text-sm cursor-pointer">Tous</Label>
          </div>
          {animalStatuses.map((status) => (
            <div key={status.value} className="flex items-center space-x-2">
              <RadioGroupItem value={status.value} id={`status-${status.value}`} />
              <Label htmlFor={`status-${status.value}`} className="text-sm cursor-pointer">{status.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default LivestockFilters;
