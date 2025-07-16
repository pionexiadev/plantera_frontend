import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { CultureProgressBar } from "./CultureProgressBar";
import { Culture } from '@/types/culture';
import { CultureFieldDialog } from './CultureFieldDialog';
import { CultureFieldDetails } from './CultureFieldDetails';
import { CultureCardHeader } from './card/CultureCardHeader';
import { CultureCardMetrics } from './card/CultureCardMetrics';
import { getCardStyle } from '@/utils/cultureUtils';
import { useCultureProgress } from '@/hooks/use-culture-progress';

interface CultureFieldCardProps {
  field: Culture;
  onStatusChange: (status: Culture['statut']) => void;
  onDelete: () => void;
  onEdit: (id: number, field: Culture) => void;
}

export function CultureFieldCard({ field, onStatusChange, onDelete, onEdit }: CultureFieldCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const { daysUntilHarvest, growthProgress, growthStageText } = useCultureProgress(field);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <Card className={`glass-card hover:shadow-card-hover hover:scale-[1.02] group animate-fade-up bg-gradient-to-br ${getCardStyle(field.nom)}`}>
        <CultureCardHeader
          field={field}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={handleEdit}
        />
        <CardContent className="pb-3 px-4">
          <div className="space-y-4">
            <CultureCardMetrics field={field} />

            <span className={`inline-block text-xs px-2 py-1 rounded-full font-semibold 
                ${field.statut === 'planted' ? 'bg-blue-100 text-blue-800' :
                field.statut === 'growing' ? 'bg-green-100 text-green-800' :
                field.statut === 'ready' ? 'bg-yellow-100 text-yellow-800' :
                field.statut === 'harvested' ? 'bg-gray-200 text-gray-800' : ''}`}>
              {getStatusLabel(field.statut)}
            </span>

            <div className="space-y-3">
              <CultureProgressBar
                value={growthProgress}
                label={growthStageText}
                colorScheme="growth"
                striped={field.statut === 'growing'}
                animated={field.statut === 'growing'}
              />

              <div className="grid grid-cols-2 gap-2">
                <CultureProgressBar
                  value={field.sante}
                  label="Santé"
                  size="sm"
                  colorScheme="health"
                />
                <CultureProgressBar
                  value={field.irrigation}
                  label="Irrigation"
                  size="sm"
                  colorScheme="irrigation"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-3 px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-glass/50 border-t border-white/20">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-sunset rounded-lg">
              <Timer className="h-3.5 w-3.5 text-plantera-darkGreen" />
            </div>
            {field.statut !== 'harvested' ? (
              <span className="text-xs text-plantera-slate/70 font-medium">
                {daysUntilHarvest} jours avant récolte
              </span>
            ) : (
              <span className="text-xs text-plantera-slate/70 font-medium">
                Récolté le {new Date(field.dateRecolteEstimee).toLocaleDateString('fr-FR')}
              </span>

            )}
          </div>
          <Button
            variant="glass"
            size="sm"
            onClick={() => setIsDetailsDialogOpen(true)}
            className="hover:scale-105 transition-transform w-full sm:w-auto"
          >
            Détails
          </Button>
        </CardFooter>
      </Card>

      {isEditDialogOpen && (
        <CultureFieldDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          fieldData={field}
          isEditing={true}
          onSubmit={(data) => {
            onEdit(field.id, field);
            setIsEditDialogOpen(false);
          }}
        />
      )}

      {isDetailsDialogOpen && (
        <CultureFieldDetails
          field={field}
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
        />
      )}
    </>
  );


  function getStatusLabel(status: Culture['statut']) {
    switch (status) {
      case 'planted':
        return 'Semée';
      case 'growing':
        return 'En croissance';
      case 'ready':
        return 'Prête à récolter';
      case 'harvested':
        return 'Récoltée';
      default:
        return 'Inconnu';
    }
  }

}
