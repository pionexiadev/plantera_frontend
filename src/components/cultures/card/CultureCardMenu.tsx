import React from 'react';
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Culture } from '@/types/culture';

interface CultureCardMenuProps {
  onEdit: () => void;
  onStatusChange: (status: Culture['statut']) => void;
  onDelete: () => void;
}

export function CultureCardMenu({ onEdit, onStatusChange, onDelete }: CultureCardMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary-100/50">
          <MoreVertical className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass-card">
        <DropdownMenuItem 
          onClick={onEdit}
          className="cursor-pointer hover:bg-green-50 focus:bg-green-50"
        >
          Modifier
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => onStatusChange('planted')}
          className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50"
        >
          Marquer comme semé
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange('growing')}
          className="cursor-pointer hover:bg-green-50 focus:bg-green-50"
        >
          Marquer en croissance
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange('ready')}
          className="cursor-pointer hover:bg-amber-50 focus:bg-amber-50"
        >
          Marquer prêt à récolter
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange('harvested')} 
          className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
        >
          Marquer comme récolté
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onDelete}
          className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 font-semibold"
        >
          🗑️ Supprimer la parcelle
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}