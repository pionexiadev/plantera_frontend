
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Culture } from '@/types/culture';
import { getStatusText } from '@/utils/cultureUtils';
import { CultureCardMenu } from './CultureCardMenu';

interface CultureCardHeaderProps {
  field: Culture;
  onStatusChange: (status: Culture['statut']) => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function CultureCardHeader({ field, onStatusChange, onDelete, onEdit }: CultureCardHeaderProps) {
  const getCultureIcon = (name: string | null | undefined) => {
    const lowerName = (name || '').toLowerCase();
    if (lowerName.includes('blé') || lowerName.includes('orge')) return '🌾';
    if (lowerName.includes('maïs')) return '🌽';
    if (lowerName.includes('tomate')) return '🍅';
    if (lowerName.includes('pomme')) return '🍎';
    if (lowerName.includes('carotte')) return '🥕';
    if (lowerName.includes('salade') || lowerName.includes('laitue')) return '🥬';
    return '🌱';
  };


  return (
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start gap-3">
        <div className="space-y-2 flex-1 min-w-0">
          <CardTitle className="text-xl text-gradient-primary flex items-center gap-3">
            <div className="p-2 bg-gradient-glass rounded-2xl border border-white/30 backdrop-blur-sm flex-shrink-0">
              <span className="text-xl">{getCultureIcon(field.nom)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="truncate block">{field.nom}</span>
              <p className="text-sm text-plantera-slate/70 mt-1 font-medium">{field.varieté}</p>
            </div>
          </CardTitle>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <Badge
            variant={field.statut === 'ready' ? 'default' : field.statut === 'growing' ? 'secondary' : field.statut === 'harvested' ? 'outline' : 'default'}
            className="shadow-card text-xs px-2 py-1"
          >
            {getStatusText(field.statut)}
          </Badge>
          <CultureCardMenu
            onEdit={onEdit}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        </div>
      </div>

      {(field.sante < 70 || field.irrigation < 60) && (
        <div className="absolute -top-1 -left-1">
          <div className="bg-amber-500 rounded-full p-1 shadow-md animate-pulse">
            <AlertTriangle className="h-3.5 w-3.5 text-white" />
          </div>
        </div>
      )}
    </CardHeader>
  );
}
