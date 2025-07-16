
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Animal } from "@/types/livestock";

export interface LivestockDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (animal: Partial<Animal>) => void;
  animalData?: Animal;
  isEditing?: boolean;
}

export function LivestockDialog({
  isOpen,
  onClose,
  onSubmit,
  animalData,
  isEditing = false,
}: LivestockDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<string>("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");

  // Types d'animaux disponibles
  const animalTypes = ["Bovin", "Ovin", "Porcin", "Caprin"];

  useEffect(() => {
    if (animalData && isEditing) {
      setName(animalData.name);
      setType(animalData.type);
      setBreed(animalData.breed);
      setBirthDate(animalData.birthDate);
      setWeight(animalData.weight.toString());
    }
  }, [animalData, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type || !breed || !birthDate || !weight) {
      return;
    }

    onSubmit({
      name,
      type,
      breed,
      birthDate,
      weight: parseFloat(weight),
      health: 'good',
      status: 'active',
      lastCheckup: new Date().toISOString().split('T')[0],
    });

    if (!isEditing) {
      setName("");
      setType("");
      setBreed("");
      setBirthDate("");
      setWeight("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[475px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Modifier un animal" : "Ajouter un nouvel animal"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Modifiez les informations de votre animal ci-dessous."
                : "Remplissez les informations pour ajouter un nouvel animal à votre cheptel."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Marguerite"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger className="col-span-3" id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {animalTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="breed" className="text-right">
                Race
              </Label>
              <Input
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="col-span-3"
                placeholder="Holstein"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthDate" className="text-right">
                Date de naissance
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Poids (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="col-span-3"
                placeholder="500"
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" className="bg-plantera-brown hover:bg-plantera-brown/80 text-white">
              {isEditing ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
