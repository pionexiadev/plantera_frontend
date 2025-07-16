
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

interface EmptyCultureStateProps {
  onAddCulture: () => void;
}

const EmptyCultureState = ({ onAddCulture }: EmptyCultureStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-muted/10">
      <MessageSquare className="h-16 w-16 text-plantera-green/40 mb-4" />
      <h3 className="text-xl font-medium mb-2 text-plantera-green">Commencez à gérer vos cultures</h3>
      <p className="text-plantera-green/70 text-center max-w-md mb-6">
        Ajoutez votre première parcelle pour commencer à surveiller et à gérer vos cultures.
      </p>
      <Button onClick={onAddCulture} className="bg-plantera-green hover:bg-plantera-green/90 text-white">
        Ajouter votre première parcelle
      </Button>
    </div>
  );
};

export default EmptyCultureState;
