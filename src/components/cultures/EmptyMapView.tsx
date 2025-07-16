
import React from 'react';
import { Map } from 'lucide-react';

interface EmptyMapViewProps {
  message?: string;
}

const EmptyMapView = ({ message = "Aucune parcelle ne correspond à vos critères." }: EmptyMapViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[600px] border rounded-lg bg-muted/10 p-8">
      <Map className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Aucune parcelle à afficher</h3>
      <p className="text-muted-foreground text-center max-w-md">{message}</p>
    </div>
  );
};

export default EmptyMapView;
