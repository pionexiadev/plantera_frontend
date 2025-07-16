import React, { useState } from 'react';
import { Culture } from '@/types/culture';
import { Field } from '@/types/field';
import { CultureFieldProps } from './CultureField'; // Assure-toi que ce type existe
import SimpleInteractiveMap from './SimpleInteractiveMap';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Map, MapPin, Leaf } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CultureFieldMapProps {
  cultures: Culture[];
  fields: Field[];
}

// ✅ Conversion correcte vers CultureFieldProps
const convertCultureToFieldProps = (culture: Culture, field?: Field): CultureFieldProps => ({
  id: culture.id, // ✅ Correct (number)
  name: culture.nom,
  culture: culture.varieté,
  surface: culture.surface,
  statut: culture.statut,
  datePlantation: culture.datePlantation,
  dateRecolteEstimee: culture.dateRecolteEstimee,
  sante: culture.sante,
  irrigation: culture.irrigation,
  position: field?.localisation || 'Inconnue',
});

const CultureFieldMap = ({ cultures, fields }: CultureFieldMapProps) => {
  const [selectedView, setSelectedView] = useState<'interactive' | 'satellite'>('interactive');
  const [selectedField, setSelectedField] = useState<CultureFieldProps | null>(null);

  const fieldsForMap: CultureFieldProps[] = cultures.map(culture => {
    const field = fields.find(f => f.id === culture.parcelleId);
    return convertCultureToFieldProps(culture, field);
  });

  if (cultures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-plantera-softBlue/30 rounded-lg border border-dashed border-plantera-lightGreen/40">
        <Map className="h-16 w-16 text-plantera-lightGreen/50 mb-4" />
        <h3 className="text-xl font-medium text-plantera-green">Aucune culture à afficher</h3>
        <p className="text-plantera-green/70 mt-2 max-w-md text-center">
          Ajoutez des cultures pour les voir apparaître sur la carte
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="interactive" onValueChange={(value) => setSelectedView(value as 'interactive' | 'satellite')}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="interactive" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span>Carte interactive</span>
            </TabsTrigger>
            <TabsTrigger value="satellite" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Vue géographique</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <span className="text-sm text-plantera-green/70">
              {cultures.length} culture{cultures.length > 1 ? 's' : ''} •{' '}
              {cultures.reduce((sum, culture) => sum + culture.surface, 0).toFixed(1)} ha
            </span>
          </div>
        </div>

        <TabsContent value="interactive" className="mt-0 animate-fadeIn">
          <SimpleInteractiveMap fields={fieldsForMap} onSelectField={setSelectedField} />
        </TabsContent>

        <TabsContent value="satellite" className="mt-0 animate-fadeIn">
          <div className="p-6 text-center space-y-4 bg-plantera-softGreen/30 rounded-lg border border-dashed border-plantera-lightGreen/40 h-[600px] flex flex-col items-center justify-center">
            <MapPin className="h-12 w-12 text-plantera-lightGreen/70" />
            <div>
              <h3 className="text-xl font-medium text-plantera-green">Vue géographique</h3>
              <p className="mt-2 text-plantera-green/70 max-w-md">
                Cette vue utilise des coordonnées géographiques réelles et nécessite un abonnement premium.
              </p>
              <Button variant="outline" className="mt-4 border-plantera-green/30 text-plantera-green">
                Activer l'abonnement premium
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {selectedField && (
        <Card className="p-4 border-t-4 animate-fadeIn" style={{ borderTopColor: getStatusColor(selectedField.statut) }}>
          <div className="flex items-center gap-3">
            <div className="bg-plantera-softGreen p-2 rounded-full">
              <Leaf className="h-5 w-5 text-plantera-green" />
            </div>
            <div>
              <h3 className="font-medium">{selectedField.name}</h3>
              <p className="text-sm text-plantera-green/70">{selectedField.culture} • {selectedField.surface} ha</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-xs text-plantera-green/70">Statut</p>
              <p className="font-medium">{getStatusText(selectedField.statut)}</p>
            </div>
            <div>
              <p className="text-xs text-plantera-green/70">Planté le</p>
              <p className="font-medium">{new Date(selectedField.datePlantation).toLocaleDateString('fr-FR')}</p>
            </div>
            <div>
              <p className="text-xs text-plantera-green/70">Récolte estimée</p>
              <p className="font-medium">
                {selectedField.dateRecolteEstimee
                  ? new Date(selectedField.dateRecolteEstimee).toLocaleDateString('fr-FR')
                  : 'Non définie'}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'planted': return '#3b82f6';
    case 'growing': return '#22c55e';
    case 'ready': return '#f59e0b';
    case 'harvested': return '#6b7280';
    default: return '#6b7280';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'planted': return 'Semé';
    case 'growing': return 'En croissance';
    case 'ready': return 'Prêt à récolter';
    case 'harvested': return 'Récolté';
    default: return status;
  }
};

export default CultureFieldMap;
