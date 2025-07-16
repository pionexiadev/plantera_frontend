import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CulturePayload } from "@/types/culture";

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
import { Culture } from "@/types/culture";
import { useFields } from "@/hooks/use-fields";

interface CultureFieldDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cultureData: CulturePayload) => void;
  fieldData?: Culture;
  isEditing?: boolean;
}

export function CultureFieldDialog({
  isOpen,
  onClose,
  onSubmit,
  fieldData,
  isEditing = false,
}: CultureFieldDialogProps) {
  const { fields } = useFields();

  const [nom, setNom] = useState("");
  const [variete, setVariete] = useState("");
  const [surface, setSurface] = useState("");
  const [datePlantation, setDatePlantation] = useState("");
  const [dateRecolteEstimee, setDateRecolteEstimee] = useState("");
  const [rendement, setRendement] = useState("");
  const [notes, setNotes] = useState("");
  const [parcelleId, setParcelleId] = useState<number | "">("");

  // Champs manquants dans payload
  const [irrigation, setIrrigation] = useState("80");
  const [sante, setSante] = useState("90");
  const [typeSol, setTypeSol] = useState("");
  const [localisation, setLocalisation] = useState("");

  useEffect(() => {
    if (fieldData && isEditing) {
      setNom(fieldData.nom);
      setVariete(fieldData.varieté || "");
      setSurface(fieldData.surface.toString());
      setDatePlantation(fieldData.datePlantation);
      setDateRecolteEstimee(fieldData.dateRecolteEstimee);
      setRendement(fieldData.rendement?.toString() || "");
      setNotes(fieldData.notes ?? "");
      setParcelleId(fieldData.parcelleId ?? "");
      setIrrigation(fieldData.irrigation?.toString() || "80");
      setSante(fieldData.sante?.toString() || "90");
      setTypeSol(fieldData.typeSol || "");
      setLocalisation(fieldData.localisation || "");
    }
  }, [fieldData, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nom || !variete || !surface || !datePlantation || !dateRecolteEstimee || !rendement || !parcelleId) {
      return;
    }

    const culturePayload: CulturePayload = {
      nom,
      varieté: variete,
      surface: parseFloat(surface),
      datePlantation,
      dateRecolteEstimee,
      rendementAttendu: parseFloat(rendement),
      notes,
      parcelle: {
        id: typeof parcelleId === "string" ? parseInt(parcelleId) : parcelleId,
      },
      irrigation: parseFloat(irrigation),
      sante: parseFloat(sante),
      typeSol: typeSol as 'argileux' | 'sableux' | 'limoneux' | 'calcaire',
      localisation,
      statut: isEditing ? fieldData?.statut || "planted" : "planted",
      rendement: 0,
      parcelleId: 0
    };


    onSubmit(culturePayload);

    if (!isEditing) {
      setNom("");
      setVariete("");
      setSurface("");
      setDatePlantation("");
      setDateRecolteEstimee("");
      setRendement("");
      setNotes("");
      setParcelleId("");
      setIrrigation("80");
      setSante("90");
      setTypeSol("");
      setLocalisation("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[475px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Modifier une culture" : "Ajouter une culture"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Modifiez les informations de votre culture."
                : "Ajoutez une nouvelle culture à votre parcelle."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">

            {/* Parcelle */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parcelle" className="text-right">Parcelle</Label>
              <Select
                value={parcelleId.toString()}
                onValueChange={(val) => setParcelleId(parseInt(val))}
                required
              >
                <SelectTrigger className="col-span-3" id="parcelle">
                  <SelectValue placeholder="Sélectionner une parcelle" />
                </SelectTrigger>
                <SelectContent>
                  {fields.map((field) => (
                    <SelectItem key={field.id} value={field.id.toString()}>
                      {field.nom} ({field.surface} ha)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nom */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nom" className="text-right">Culture</Label>
              <Input
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="col-span-3"
                placeholder="Ex: Tomates"
                required
              />
            </div>

            {/* Variété */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="variete" className="text-right">Variété</Label>
              <Input
                id="variete"
                value={variete}
                onChange={(e) => setVariete(e.target.value)}
                className="col-span-3"
                placeholder="Ex: Roma, Durum"
              />
            </div>

            {/* Surface */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="surface" className="text-right">Surface (ha)</Label>
              <Input
                id="surface"
                type="number"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                className="col-span-3"
                min="0.1"
                step="0.1"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="datePlantation" className="text-right">Date de plantation</Label>
              <Input
                id="datePlantation"
                type="date"
                value={datePlantation}
                onChange={(e) => setDatePlantation(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateRecolte" className="text-right">Date récolte estimée</Label>
              <Input
                id="dateRecolte"
                type="date"
                value={dateRecolteEstimee}
                onChange={(e) => setDateRecolteEstimee(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            {/* Rendement */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rendement" className="text-right">Rendement (kg)</Label>
              <Input
                id="rendement"
                type="number"
                value={rendement}
                onChange={(e) => setRendement(e.target.value)}
                className="col-span-3"
                min="1"
                required
              />
            </div>

            {/* Type de sol */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="typeSol" className="text-right">Type de sol</Label>
              <Select
                value={typeSol}
                onValueChange={(val) => setTypeSol(val as 'argileux' | 'sableux' | 'limoneux' | 'calcaire')}
                required
              >
                <SelectTrigger className="col-span-3" id="typeSol">
                  <SelectValue placeholder="Sélectionner le type de sol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="argileux">Argileux</SelectItem>
                  <SelectItem value="sableux">Sableux</SelectItem>
                  <SelectItem value="limoneux">Limoneux</SelectItem>
                  <SelectItem value="calcaire">Calcaire</SelectItem>
                </SelectContent>
              </Select>
            </div>


            {/* Localisation */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="localisation" className="text-right">Localisation</Label>
              <Input
                id="localisation"
                value={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
                className="col-span-3"
                placeholder="Ex: Casablanca"
              />
            </div>

            {/* Notes */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="col-span-3"
                placeholder="Observations éventuelles"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-plantera-green text-white hover:bg-plantera-lightGreen">
              {isEditing ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
