import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Droplet,
  Sun,
  Thermometer,
  Timer,
  Map,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { Culture } from "@/types/culture";
import { CultureProgressBar } from "./CultureProgressBar";
import { Separator } from "@/components/ui/separator";

interface CultureFieldDetailsProps {
  field: Culture;
  isOpen: boolean;
  onClose: () => void;
}

export function CultureFieldDetails({ field, isOpen, onClose }: CultureFieldDetailsProps) {
  const calculateGrowthProgress = () => {
    const plantDate = new Date(field.datePlantation);
    const harvestDate = new Date(field.dateRecolteEstimee);
    const today = new Date();

    const totalDuration = harvestDate.getTime() - plantDate.getTime();
    const currentProgress = today.getTime() - plantDate.getTime();

    if (field.statut === "harvested") return 100;
    if (currentProgress < 0) return 0;
    if (currentProgress > totalDuration) return 100;

    return Math.round((currentProgress / totalDuration) * 100);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "planted":
        return "Semé";
      case "growing":
        return "En croissance";
      case "ready":
        return "Prêt à récolter";
      case "harvested":
        return "Récolté";
      default:
        return status;
    }
  };

  const daysUntilHarvest = () => {
    const today = new Date();
    const harvestDate = new Date(field.dateRecolteEstimee);
    const diffTime = harvestDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{field.nom} - Détails</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2 text-plantera-green">
                Informations générales
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-plantera-green" />
                  <span className="text-sm text-plantera-green/70">
                    Culture:{" "}
                    <span className="font-medium text-plantera-green">
                      {field.nom} - {field.varieté}
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-plantera-green" />
                  <span className="text-sm text-plantera-green/70">
                    Surface:{" "}
                    <span className="font-medium text-plantera-green">
                      {field.surface} hectares
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-plantera-green" />
                  <span className="text-sm text-plantera-green/70">
                    Statut:{" "}
                    <span className="font-medium text-plantera-green">
                      {getStatusText(field.statut)}
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-plantera-brown" />
                  <span className="text-sm text-plantera-green/70">
                    Date de semis:{" "}
                    <span className="font-medium text-plantera-green">
                      {new Date(field.datePlantation).toLocaleDateString("fr-FR")}
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-plantera-brown" />
                  <span className="text-sm text-plantera-green/70">
                    Date estimée de récolte:{" "}
                    <span className="font-medium text-plantera-green">
                      {new Date(field.dateRecolteEstimee).toLocaleDateString("fr-FR")}
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 text-plantera-green">Santé et Irrigation</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-plantera-green" />
                  <span className="text-sm text-plantera-green/70">Santé des plantes:</span>
                  {field.sante < 70 && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                </li>
                <li className="mb-2">
                  <CultureProgressBar value={field.sante || 90} size="md" colorScheme="health" />
                </li>
                <li className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-plantera-green" />
                  <span className="text-sm text-plantera-green/70">Niveau d'irrigation:</span>
                  {field.irrigation < 60 && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                </li>
                <li className="mb-2">
                  <CultureProgressBar
                    value={field.irrigation || 85}
                    size="md"
                    colorScheme="irrigation"
                  />
                </li>
              </ul>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2 text-plantera-green">Progression de la culture</h4>
            <CultureProgressBar
              value={calculateGrowthProgress()}
              label="Croissance"
              size="lg"
              colorScheme="growth"
              striped={field.statut === "growing"}
              animated={field.statut === "growing"}
            />

            <div className="flex items-center gap-1 mt-2">
              <Timer className="h-4 w-4 text-plantera-green" />
              {field.statut !== "harvested" ? (
                <span className="text-xs text-plantera-green/70">
                  {daysUntilHarvest()} jours avant récolte
                </span>
              ) : (
                <span className="text-xs text-plantera-green/70">
                  Récolté le {new Date(field.dateRecolteEstimee).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button>Voir sur la carte</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
