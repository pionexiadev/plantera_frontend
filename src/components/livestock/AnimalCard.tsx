
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Timer, AlertTriangle, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Animal } from "@/types/livestock";

interface AnimalCardProps {
  animal: Animal;
  onUpdate: (id: string, data: Partial<Animal>) => void;
  onDelete: (id: string) => void;
  onStatusChange: (status: Animal['status']) => void;
}

export function AnimalCard({
  animal,
  onUpdate,
  onDelete,
  onStatusChange,
}: AnimalCardProps) {
  const { id, name, type, breed, birthDate, weight, health, status, lastCheckup } = animal;

  const getStatusBadge = (status: Animal['status']) => {
    switch(status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'quarantine': return <Badge className="bg-amber-100 text-amber-800">Quarantaine</Badge>;
      case 'sick': return <Badge className="bg-red-100 text-red-800">Malade</Badge>;
      case 'treatment': return <Badge className="bg-blue-100 text-blue-800">En traitement</Badge>;
    }
  };

  const getHealthColor = (health: Animal['health']) => {
    switch(health) {
      case 'good': return 'text-green-500';
      case 'average': return 'text-amber-500';
      case 'attention': return 'text-red-500';
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const ageMs = now.getTime() - birth.getTime();
    const ageMonths = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 30.44));
    
    if (ageMonths < 12) {
      return `${ageMonths} mois`;
    } else {
      const years = Math.floor(ageMonths / 12);
      const remainingMonths = ageMonths % 12;
      return `${years} an${years > 1 ? 's' : ''} ${remainingMonths > 0 ? `et ${remainingMonths} mois` : ''}`;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{breed} ({type})</p>
          </div>
          {getStatusBadge(status)}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-plantera-brown" />
            <span className="text-sm">Âge: {calculateAge(birthDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-plantera-blue" />
            <span className="text-sm">Poids: {weight} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className={`h-4 w-4 ${getHealthColor(health)}`} />
            <span className="text-sm">Santé: {
              health === 'good' ? 'Bonne' :
              health === 'average' ? 'Moyenne' : 'Attention'
            }</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-plantera-brown" />
            <span className="text-sm">Dernier contrôle: {new Date(lastCheckup).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">Changer statut</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onStatusChange('active')}>
              Actif
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange('treatment')}>
              En traitement
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange('sick')}>
              Malade
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange('quarantine')}>
              Quarantaine
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onUpdate(id, {})}
          >
            Modifier
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-600"
            onClick={() => onDelete(id)}
          >
            Supprimer
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
