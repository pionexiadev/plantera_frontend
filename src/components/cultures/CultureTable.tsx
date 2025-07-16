import React from 'react';
import { Button } from '@/components/ui/button';
import { Culture } from '@/types/culture';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CultureTableProps {
  fields: Culture[];
  onEdit: (id: string, field: Culture) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Culture['statut']) => void;
}

export function CultureTable({ fields, onEdit, onDelete, onStatusChange }: CultureTableProps) {
  const getStatusText = (status: Culture['statut']) => {
    switch (status) {
      case 'planted':
        return 'Semé';
      case 'growing':
        return 'En croissance';
      case 'ready':
        return 'Prêt à récolter';
      case 'harvested':
        return 'Récolté';
      default:
        return status;
    }
  };

  const getStatusClass = (status: Culture['statut']) => {
    switch (status) {
      case 'planted':
        return 'text-blue-700';
      case 'growing':
        return 'text-green-700';
      case 'ready':
        return 'text-amber-700';
      case 'harvested':
        return 'text-gray-600';
      default:
        return '';
    }
  };

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader className="bg-[#FEF7CD]">
          <TableRow>
            <TableHead className="text-amber-800">Culture</TableHead>
            <TableHead className="text-amber-800">Variété</TableHead>
            <TableHead className="text-amber-800">Surface (ha)</TableHead>
            <TableHead className="text-amber-800">Parcelle</TableHead>
            <TableHead className="text-amber-800">Statut</TableHead>
            <TableHead className="text-amber-800">Plantation</TableHead>
            <TableHead className="text-amber-800 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id.toString()} className="hover:bg-[#FEF7CD]/20">
              <TableCell className="font-medium text-amber-800">{field.nom}</TableCell>
              <TableCell>{field.varieté || "—"}</TableCell>
              <TableCell>{field.surface}</TableCell>
              <TableCell>{field.nom || `Parcelle #${field.id}`}</TableCell>
              <TableCell className={getStatusClass(field.statut)}>{getStatusText(field.statut)}</TableCell>
              <TableCell>{new Date(field.datePlantation).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Ouvrir menu</span>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(field.id.toString(), field)}>
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onStatusChange(field.id.toString(), 'planted')}>
                      Marquer comme semé
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(field.id.toString(), 'growing')}>
                      Marquer en croissance
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(field.id.toString(), 'ready')}>
                      Marquer prêt à récolter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(field.id.toString(), 'harvested')}>
                      Marquer comme récolté
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" onClick={() => onDelete(field.id.toString())}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
