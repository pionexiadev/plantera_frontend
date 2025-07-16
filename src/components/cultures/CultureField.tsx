import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Droplet,
  Sun,
  ThermometerSun,
  Timer,
  MoreVertical,
  AlertTriangle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CultureFieldDialog } from "./CultureFieldDialog";
import { CultureFieldDetails } from "./CultureFieldDetails";
import { CultureProgressBar } from "./CultureProgressBar";

export interface CultureFieldProps {
  id: number;
  name: string;
  culture: string;
  surface: number;
  position?: string;
  statut: "planted" | "growing" | "ready" | "harvested";
  datePlantation: string;
  dateRecolteEstimee: string;
  sante?: number;
  irrigation?: number;
}

export function CultureField({
  id,
  name,
  culture,
  surface,
  statut,
  datePlantation,
  dateRecolteEstimee,
  sante = 90,
  irrigation = 85
}: CultureFieldProps) {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'planted': return 'bg-blue-100 text-blue-800';
      case 'growing': return 'bg-green-100 text-green-800';
      case 'ready': return 'bg-amber-100 text-amber-800';
      case 'harvested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'planted': return 'Semé';
      case 'growing': return 'En croissance';
      case 'ready': return 'Prêt à récolter';
      case 'harvested': return 'Récolté';
      default: return statut;
    }
  };

  const getHealthColor = (sante: number) => {
    if (sante > 80) return 'text-green-600';
    if (sante > 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getIrrigationColor = (irrigation: number) => {
    if (irrigation > 70) return 'text-blue-600';
    if (irrigation > 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const handleDelete = () => {
    toast({
      title: "Supprimer la parcelle",
      description: `Êtes-vous sûr de vouloir supprimer la parcelle ${name}?`,
      action: (
        <Button
          variant="destructive"
          onClick={() => {
            toast({
              title: "Parcelle supprimée",
              description: `La parcelle ${name} a été supprimée`,
            });
          }}
        >
          Confirmer
        </Button>
      ),
    });
  };

  const handleUpdateStatus = (newStatut: CultureFieldProps["statut"]) => {
    toast({
      title: "Statut mis à jour",
      description: `Le statut de la parcelle ${name} a été mis à jour vers ${getStatusText(newStatut)}`,
    });
  };

  const daysUntilHarvest = () => {
    const today = new Date();
    const harvestDate = new Date(dateRecolteEstimee);
    const diffTime = harvestDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateGrowthProgress = () => {
    const plantDate = new Date(datePlantation);
    const harvestDate = new Date(dateRecolteEstimee);
    const today = new Date();

    const totalDuration = harvestDate.getTime() - plantDate.getTime();
    const currentProgress = today.getTime() - plantDate.getTime();

    if (statut === 'harvested') return 100;
    if (currentProgress < 0) return 0;
    if (currentProgress > totalDuration) return 100;

    return Math.round((currentProgress / totalDuration) * 100);
  };

  const getGrowthStageText = () => {
    if (statut === 'harvested') return 'Cycle complet';

    if (growthProgress < 30) return 'Phase initiale';
    if (growthProgress < 60) return 'Croissance';
    if (growthProgress < 90) return 'Maturation';
    return 'Prêt à récolter';
  };

  const growthProgress = calculateGrowthProgress();

  return (
    <>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-transparent hover:border-plantera-green/20 group">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{culture}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(statut)}>{getStatusText(statut)}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleUpdateStatus('planted')}>Marquer comme semé</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus('growing')}>Marquer en croissance</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus('ready')}>Marquer prêt à récolter</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus('harvested')}>Marquer comme récolté</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleDelete}>Supprimer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-plantera-green" />
                <span className="text-sm">{surface} hectares</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-plantera-brown" />
                <span className="text-sm">{new Date(datePlantation).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ThermometerSun className={`h-4 w-4 ${getHealthColor(sante)}`} />
                <span className="text-sm">Santé: {sante}%</span>
                {sante < 70 && <AlertTriangle className="h-3 w-3 text-amber-500" />}
              </div>
              <div className="flex items-center gap-2">
                <Droplet className={`h-4 w-4 ${getIrrigationColor(irrigation)}`} />
                <span className="text-sm">Irrigation: {irrigation}%</span>
                {irrigation < 60 && <AlertTriangle className="h-3 w-3 text-amber-500" />}
              </div>
            </div>

            <div className="space-y-3">
              <CultureProgressBar
                value={growthProgress}
                label={getGrowthStageText()}
                colorScheme="growth"
                striped={statut === 'growing'}
                animated={statut === 'growing'}
              />

              <div className="grid grid-cols-2 gap-3">
                <CultureProgressBar
                  value={sante}
                  label="Santé"
                  size="sm"
                  colorScheme="health"
                />
                <CultureProgressBar
                  value={irrigation}
                  label="Irrigation"
                  size="sm"
                  colorScheme="irrigation"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between">
          <div className="flex items-center gap-1">
            <Timer className="h-4 w-4 text-plantera-green" />
            {statut !== 'harvested' ? (
              <span className="text-xs text-muted-foreground">
                {daysUntilHarvest()} jours avant récolte
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">Récolté le {new Date(dateRecolteEstimee).toLocaleDateString('fr-FR')}</span>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsDetailsDialogOpen(true)}>
            Détails
          </Button>
        </CardFooter>
      </Card>

      {isEditDialogOpen && (
        <CultureFieldDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          fieldData={{
            id,
            nom: name,
            varieté: culture,
            surface,
            datePlantation,
            dateRecolteEstimee,
            statut,
            sante,
            irrigation,
            rendement: 1000, // Valeur temporaire si pas dans ton modèle
            localisation: '',
            parcelleId: 1,
            typeSol: 'argileux',
          }}
          isEditing={true}
          onSubmit={(data) => {
            toast({
              title: "Parcelle modifiée",
              description: `La parcelle ${data.nom} a été modifiée avec succès`,
            });
            setIsEditDialogOpen(false);
          }}
        />
      )}

      {isDetailsDialogOpen && (
        <CultureFieldDetails
          field={{
            id,
            nom: name,
            varieté: culture,
            surface,
            datePlantation,
            dateRecolteEstimee,
            statut,
            sante,
            irrigation,
            rendement: 1000,
            localisation: '',
            parcelleId: 1,
            typeSol: 'argileux',
          }}
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
        />
      )}
    </>
  );
}
