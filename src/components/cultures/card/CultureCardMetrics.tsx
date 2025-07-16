
import React from 'react';
import { CalendarDays, Droplet, Sun, ThermometerSun, AlertTriangle } from "lucide-react";
import { Culture } from '@/types/culture';

interface CultureCardMetricsProps {
  field: Culture;
}

export function CultureCardMetrics({ field }: CultureCardMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="flex items-center gap-3 bg-gradient-glass rounded-xl p-3 border border-white/20 backdrop-blur-sm">
        <div className="p-2 bg-gradient-sunset rounded-xl flex-shrink-0">
          <Sun className="h-4 w-4 text-plantera-darkGreen" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-plantera-slate/60 font-medium">Surface</p>
          <p className="text-sm font-semibold text-plantera-darkGreen">{field.surface} hectares</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-gradient-glass rounded-xl p-3 border border-white/20 backdrop-blur-sm">
        <div className="p-2 bg-gradient-harvest rounded-xl flex-shrink-0">
          <CalendarDays className="h-4 w-4 text-plantera-darkGreen" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-plantera-slate/60 font-medium">Plantation</p>
          <p className="text-sm font-semibold text-plantera-darkGreen">{new Date(field.datePlantation).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-gradient-glass rounded-xl p-3 border border-white/20 backdrop-blur-sm">
          <div className="p-1.5 bg-gradient-growth rounded-lg flex-shrink-0">
            <ThermometerSun className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-plantera-slate/60 font-medium">Santé</p>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-plantera-darkGreen">
                {Number.isFinite(field.sante) ? `${field.sante}%` : 'N/A'}
              </p>
              {field.sante < 70 && <AlertTriangle className="h-3 w-3 text-amber-500" />}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gradient-glass rounded-xl p-3 border border-white/20 backdrop-blur-sm">
          <div className="p-1.5 bg-gradient-ocean rounded-lg flex-shrink-0">
            <Droplet className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-plantera-slate/60 font-medium">Irrigation</p>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-plantera-darkGreen">
                {Number.isFinite(field.irrigation) ? `${field.irrigation}%` : 'N/A'}
              </p>
              {field.irrigation < 60 && <AlertTriangle className="h-3 w-3 text-amber-500" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
