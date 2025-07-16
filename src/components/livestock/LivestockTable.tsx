
import React from 'react';
import { Button } from '@/components/ui/button';
import { Animal } from '@/types/livestock';
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface LivestockTableProps {
  animals: Animal[];
  onUpdateAnimal: (id: string, data: Partial<Animal>) => void;
  onDeleteAnimal: (id: string) => void;
}

export function LivestockTable({ animals, onUpdateAnimal, onDeleteAnimal }: LivestockTableProps) {
  const getHealthBadge = (health: Animal['health']) => {
    switch(health) {
      case 'good': return <span className="text-green-600">Bonne</span>;
      case 'average': return <span className="text-amber-600">Moyenne</span>;
      case 'attention': return <span className="text-red-600">Attention requise</span>;
      default: return <span>{health}</span>;
    }
  };

  const getStatusText = (status: Animal['status']) => {
    switch(status) {
      case 'active': return <span className="text-green-600">Actif</span>;
      case 'quarantine': return <span className="text-amber-600">Quarantaine</span>;
      case 'sick': return <span className="text-red-600">Malade</span>;
      case 'treatment': return <span className="text-blue-600">En traitement</span>;
      default: return <span>{status}</span>;
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const ageMonths = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    return ageMonths < 12 
      ? `${ageMonths} mois` 
      : `${Math.floor(ageMonths / 12)} an${Math.floor(ageMonths / 12) > 1 ? 's' : ''}`;
  };

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Type / Race</TableHead>
            <TableHead>Âge</TableHead>
            <TableHead>Poids (kg)</TableHead>
            <TableHead>Santé</TableHead>
            <TableHead>État</TableHead>
            <TableHead>Dernier contrôle</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animals.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell className="font-medium">{animal.name}</TableCell>
              <TableCell>{animal.type} / {animal.breed}</TableCell>
              <TableCell>{calculateAge(animal.birthDate)}</TableCell>
              <TableCell>{animal.weight}</TableCell>
              <TableCell>{getHealthBadge(animal.health)}</TableCell>
              <TableCell>{getStatusText(animal.status)}</TableCell>
              <TableCell>{new Date(animal.lastCheckup).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onUpdateAnimal(animal.id, {})}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDeleteAnimal(animal.id)}>
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
