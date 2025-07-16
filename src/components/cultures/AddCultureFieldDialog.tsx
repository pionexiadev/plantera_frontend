
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CultureFieldDialog } from "./CultureFieldDialog";
import { useToast } from "@/hooks/use-toast";
import { Culture } from '@/types/culture';

interface AddCultureFieldDialogProps {
  onAddField: (field: Partial<Culture>) => Promise<void> | void;
  initialOpen?: boolean;
}

export function AddCultureFieldDialog({ onAddField, initialOpen = false }: AddCultureFieldDialogProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const { toast } = useToast();

  useEffect(() => {
    if (initialOpen) {
      setIsOpen(true);
    }
  }, [initialOpen]);

  const handleSubmit = async (fieldData: any) => {
    try {
      await onAddField(fieldData);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding field:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la parcelle.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <CultureFieldDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
