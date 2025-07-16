import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  CalendarDays,
  Package,
  Clipboard,
  ThermometerSun,
  Timer,
  CloudRain,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SingleFieldMap from '../cultures/SingleFieldMap';
import { HarvestDetailsData } from '@/types/harvest';
import { Culture } from '@/types/culture';

interface HarvestDetailsProps {
  harvest: HarvestDetailsData;
  isOpen: boolean;
  onClose: () => void;
  cultures: Culture[]; // liste complète des cultures disponibles
}

export function HarvestDetails({
  harvest,
  isOpen,
  onClose,
  cultures,
}: HarvestDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planifiée':
        return 'bg-blue-100 text-blue-800';
      case 'En cours':
        return 'bg-amber-100 text-amber-800';
      case 'Réalisée':
        return 'bg-green-100 text-green-800';
      case 'Annulée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityText = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'Excellente';
      case 'good':
        return 'Bonne';
      case 'average':
        return 'Moyenne';
      case 'poor':
        return 'Faible';
      default:
        return quality;
    }
  };

  const getWeatherText = (weather?: string) => {
    switch (weather) {
      case 'sunny':
        return 'Ensoleillé';
      case 'cloudy':
        return 'Nuageux';
      case 'rainy':
        return 'Pluvieux';
      case 'windy':
        return 'Venteux';
      case 'stormy':
        return 'Orageux';
      default:
        return weather || 'Non spécifié';
    }
  };

  // 🔍 Rechercher la culture par cultureId si harvest.culture est absent ou incomplet
  const culture = harvest.culture?.nom
    ? harvest.culture
    : cultures.find((c) => c.id === (harvest.culture?.id || (harvest as any).cultureId));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Détails de la récolte – {harvest.parcelle.nom}
            <span className={`text-sm px-2 py-0.5 rounded-full ${getStatusColor(harvest.statut)}`}>
              {harvest.statut}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Culture</p>
              <p className="font-medium">
                {culture
                  ? `${culture.nom} (${culture.varieté})`
                  : 'Culture non spécifiée'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Surface</p>
              <p className="font-medium">{harvest.parcelle.surface} m²</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Date de récolte</p>
              <p className="font-medium flex items-center gap-1">
                <CalendarDays className="h-4 w-4 text-plantera-green" />
                {new Date(harvest.dateRecolte).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Quantité récoltée</p>
              <p className="font-medium flex items-center gap-1">
                <Package className="h-4 w-4 text-amber-600" />
                {harvest.quantite} kg
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Qualité</p>
              <p className="font-medium flex items-center gap-1">
                <ThermometerSun className="h-4 w-4 text-amber-500" />
                {getQualityText(harvest.qualite)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Conditions météo</p>
              <p className="font-medium flex items-center gap-1">
                <CloudRain className="h-4 w-4 text-blue-500" />
                {getWeatherText(harvest.conditionsMeteo)}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Coûts</p>
              <p className="font-medium flex items-center gap-1">
                <Clipboard className="h-4 w-4 text-red-500" />
                {harvest.couts ? `${harvest.couts} €` : 'Non spécifié'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Heures de travail</p>
              <p className="font-medium flex items-center gap-1">
                <Timer className="h-4 w-4 text-blue-600" />
                {harvest.heuresTravail ? `${harvest.heuresTravail} heures` : 'Non spécifié'}
              </p>
            </div>
          </div>

          {harvest.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-gray-500 mb-1">Notes</p>
                <div className="bg-gray-50 p-3 rounded-md text-sm">{harvest.notes}</div>
              </div>
            </>
          )}

          <Separator />

          <div>
            <p className="text-sm text-gray-500 mb-2">Localisation</p>
            <SingleFieldMap field={harvest.parcelle as any} />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
