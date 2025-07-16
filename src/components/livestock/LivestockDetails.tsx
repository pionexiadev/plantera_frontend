import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Package, Stethoscope, FileText } from "lucide-react";
import { Animal } from '@/types/livestock';

interface LivestockDetailsProps {
  animal: Animal;
  isOpen: boolean;
  onClose: () => void;
}

export function LivestockDetails({ animal, isOpen, onClose }: LivestockDetailsProps) {
  const getHealthColor = (health: string) => {
    switch(health) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'average': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHealthText = (health: string) => {
    switch(health) {
      case 'excellent': return 'Excellente';
      case 'good': return 'Bonne';
      case 'average': return 'Moyenne';
      case 'poor': return 'Faible';
      default: return health;
    }
  };

  const getAnimalIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'bovin': return '🐄';
      case 'porc': return '🐷';
      case 'mouton': return '🐑';
      case 'chèvre': return '🐐';
      case 'volaille': return '🐔';
      default: return '🐾';
    }
  };

  const age = animal.birthDate ? 
    Math.floor((new Date().getTime() - new Date(animal.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365)) 
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span className="text-2xl">{getAnimalIcon(animal.type)}</span>
            Détails de {animal.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800">Informations générales</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Type</span>
                  <span className="font-medium">{animal.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Race</span>
                  <span className="font-medium">{animal.breed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Sexe</span>
                  <span className="font-medium">{animal.gender === 'male' ? 'Mâle' : 'Femelle'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">État de santé</span>
                  <Badge className={getHealthColor(animal.health)}>
                    {getHealthText(animal.health)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800">Données physiques</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Âge</span>
                  <span className="font-medium">{age} ans</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Poids</span>
                  <span className="font-medium">{animal.weight} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Date de naissance</span>
                  <span className="font-medium">
                    {animal.birthDate ? new Date(animal.birthDate).toLocaleDateString('fr-FR') : 'Non renseignée'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Suivi vétérinaire */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Suivi vétérinaire
            </h3>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Dernière visite vétérinaire</span>
                <span className="font-medium">
                  {animal.lastVetVisit ? new Date(animal.lastVetVisit).toLocaleDateString('fr-FR') : 'Aucune visite enregistrée'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Notes */}
          {animal.notes && (
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes
              </h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-700">{animal.notes}</p>
              </div>
            </div>
          )}
          
          {/* Indicateurs visuels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-xs text-blue-600">Âge</div>
                <div className="font-semibold text-blue-800">{age} ans</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
              <Package className="h-5 w-5 text-amber-600" />
              <div>
                <div className="text-xs text-amber-600">Poids</div>
                <div className="font-semibold text-amber-800">{animal.weight} kg</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-xs text-red-500">Sexe</div>
                <div className="font-semibold text-red-700">
                  {animal.gender === 'male' ? 'Mâle' : 'Femelle'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Stethoscope className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-xs text-green-600">Santé</div>
                <div className="font-semibold text-green-800">{getHealthText(animal.health)}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}