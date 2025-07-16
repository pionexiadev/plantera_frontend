import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Package, Leaf, MoreVertical, Clipboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Harvest } from '@/types/harvest';
import { SaleDialog } from '../sales/SaleDialog';
import { HarvestDialog } from './HarvestDialog';
import { HarvestDetails } from './HarvestDetails';
import { Field } from '@/types/field';
import { Culture } from '@/types/culture';

interface HarvestCardProps {
  harvest: Harvest;
  onStatusChange: (id: number, status: Harvest['statut']) => Promise<void> | void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<Harvest>) => void;
  onCreateSale: (harvestId: number, quantity: number) => void;
  fields: Field[];
  cultures: Culture[];
}

export function HarvestCard({
  harvest,
  onStatusChange,
  onDelete,
  onUpdate,
  onCreateSale,
  fields,
  cultures,
}: HarvestCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  const getStatusColor = (status: Harvest['statut']) => {
    switch (status) {
      case 'Planifiée': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'En cours': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Réalisée': return 'bg-green-100 text-green-800 border-green-200';
      case 'Annulée': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getQualityText = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'Excellente';
      case 'good': return 'Bonne';
      case 'average': return 'Moyenne';
      case 'poor': return 'Faible';
      default: return quality;
    }
  };

  const getCardStyle = () => {
    const cultureStyles: Record<string, string> = {
      'Maïs': 'from-amber-50 to-amber-100 border-amber-200',
      'Blé': 'from-amber-50 to-yellow-100 border-amber-200',
      'Riz': 'from-blue-50 to-teal-100 border-blue-200',
      'Soja': 'from-green-50 to-emerald-100 border-green-200',
      'Orge': 'from-amber-50 to-orange-100 border-amber-200',
      'Avoine': 'from-stone-50 to-yellow-100 border-stone-200',
      'Sorgho': 'from-red-50 to-red-100 border-red-200',
      'Millet': 'from-amber-50 to-stone-100 border-amber-200',
      'Tournesol': 'from-yellow-50 to-orange-100 border-yellow-200',
      'Colza': 'from-yellow-50 to-lime-100 border-yellow-200',
    };

    return cultureStyles[harvest.culture.nom] || 'from-white to-[#F2FCE2] border-green-200';
  };

  // Gestion du changement de statut avec blocage temporaire
  const handleStatusChange = async (newStatus: Harvest['statut']) => {
    if (isStatusUpdating) return;
    setIsStatusUpdating(true);
    try {
      await onStatusChange(harvest.id, newStatus);
    } finally {
      setIsStatusUpdating(false);
    }
  };

  return (
    <>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg border rounded-xl bg-gradient-to-b ${getCardStyle()} hover:scale-[1.01] group`}>
        <CardHeader className="pb-2 relative">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg text-amber-800">{harvest.parcelle.nom}</CardTitle>
              <p className="text-sm text-green-700 mt-1 font-medium">{harvest.culture.nom}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(harvest.statut)} shadow-sm`}>{harvest.statut}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-black/5">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-lg border border-green-100 shadow-lg bg-white">
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Modifier</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={isStatusUpdating} onClick={() => handleStatusChange('Planifiée')}>Marquer comme planifiée</DropdownMenuItem>
                  <DropdownMenuItem disabled={isStatusUpdating} onClick={() => handleStatusChange('En cours')}>Marquer en cours</DropdownMenuItem>
                  <DropdownMenuItem disabled={isStatusUpdating} onClick={() => handleStatusChange('Réalisée')}>Marquer terminée</DropdownMenuItem>
                  <DropdownMenuItem disabled={isStatusUpdating} onClick={() => handleStatusChange('Annulée')}>Marquer comme annulée</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsSaleDialogOpen(true)}>Créer une vente</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDelete(harvest.id)} className="text-red-600">Supprimer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 shadow-sm">
                <CalendarDays className="h-4 w-4 text-amber-700" />
                <span className="text-sm font-medium">{new Date(harvest.dateRecolte).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 shadow-sm">
                <Leaf className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">{getQualityText(harvest.qualite)}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 shadow-sm">
                <Package className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">{harvest.quantite} kg</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 rounded-md p-1.5 shadow-sm">
                <Clipboard className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">{harvest.couts ? `${harvest.couts}€` : 'N/A'}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 flex justify-between bg-white/70 border-t border-green-100">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-amber-600" />
            <span className="text-xs text-amber-800/80">
              Récolté le {new Date(harvest.dateRecolte).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDetailsDialogOpen(true)}
            className="border-green-200 hover:border-green-300 hover:bg-green-50"
          >
            Détails
          </Button>
        </CardFooter>
      </Card>

      {isEditDialogOpen && (
        <HarvestDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={(data) => {
            onUpdate(harvest.id, data);
            setIsEditDialogOpen(false);
          }}
          harvest={harvest}
          isEditing={true}
          fields={fields}
          cultures={cultures}
          parcelles={fields}
        />
      )}

      {isDetailsDialogOpen && (
        <HarvestDetails
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          harvest={harvest}
          cultures={cultures}
        />
      )}

      {isSaleDialogOpen && (
        <SaleDialog
          isOpen={isSaleDialogOpen}
          onClose={() => setIsSaleDialogOpen(false)}
          onSubmit={(data) => {
            onCreateSale(harvest.id, data.quantity || 0);
            setIsSaleDialogOpen(false);
          }}
          harvestId={harvest.id.toString()}
          maxQuantity={harvest.quantite}
          culture={harvest.culture.nom}
          fieldName={harvest.parcelle.nom}
        />
      )}
    </>
  );
}
