
import React from 'react';
import { Button } from "@/components/ui/button";
import { Beef } from 'lucide-react';

interface EmptyLivestockStateProps {
  onAddAnimal: () => void;
}

const EmptyLivestockState = ({ onAddAnimal }: EmptyLivestockStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-muted/10">
      <Beef className="h-16 w-16 text-plantera-brown/40 mb-4" />
      <h3 className="text-xl font-medium mb-2">Commencez à gérer votre bétail</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Ajoutez votre premier animal pour commencer à suivre votre cheptel, sa santé et ses performances.
      </p>
      <Button onClick={onAddAnimal} className="bg-plantera-brown hover:bg-plantera-brown/80 text-white">
        Ajouter votre premier animal
      </Button>
    </div>
  );
};

export default EmptyLivestockState;
