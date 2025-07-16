import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Droplet, 
  Power, 
  CloudRain, 
  Timer, 
  Calendar,
  Wifi,
  AlertTriangle,
  Activity,
  Settings,
  Zap
} from 'lucide-react';
import { IrrigationZone } from '@/types/irrigation';

interface IrrigationZoneCardProps {
  zone: IrrigationZone;
  onToggleAutomation: (zoneId: string) => void;
  onStartIrrigation: (zoneId: string, duration?: number) => void;
  onEditZone: (zone: IrrigationZone) => void;
}

const IrrigationZoneCard: React.FC<IrrigationZoneCardProps> = ({
  zone,
  onToggleAutomation,
  onStartIrrigation,
  onEditZone
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Wifi className="w-4 h-4 text-green-500" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4 text-gray-500" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMoistureColor = (level: number) => {
    if (level > 60) return "text-blue-500";
    if (level > 40) return "text-amber-500";
    return "text-red-500";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'goutte-à-goutte': return '💧';
      case 'aspersion': return '🌧️';
      case 'gravitaire': return '🌊';
      default: return '💧';
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-lg border-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">{getTypeIcon(zone.type)}</span>
              {zone.name}
            </CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="secondary" className="text-xs">
                {zone.type}
              </Badge>
              <div className="flex items-center gap-1">
                {getStatusIcon(zone.status)}
                <span className="text-sm text-muted-foreground capitalize">
                  {zone.status}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditZone(zone)}
            className="h-8 w-8"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Niveau d'humidité */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplet className={`h-4 w-4 ${getMoistureColor(zone.moistureLevel)}`} />
              <span className="text-sm font-medium">Humidité du sol</span>
            </div>
            <span className={`text-sm font-bold ${getMoistureColor(zone.moistureLevel)}`}>
              {zone.moistureLevel}%
            </span>
          </div>
          <Progress 
            value={zone.moistureLevel} 
            className="h-2"
          />
        </div>

        {/* Consommation d'eau */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Power className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Consommation</span>
          </div>
          <span className="text-sm font-medium">{zone.waterConsumption}L</span>
        </div>

        {/* Dernière irrigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Dernière irrigation</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(zone.lastWatering).toLocaleDateString()}
          </span>
        </div>

        {/* Prochaine irrigation */}
        {zone.nextWatering && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-plantera-blue" />
              <span className="text-sm">Prochaine irrigation</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(zone.nextWatering).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Mode automatique */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <Label htmlFor={`auto-${zone.id}`} className="flex items-center gap-2 cursor-pointer">
            <Zap className="h-4 w-4 text-plantera-green" />
            Mode automatique
          </Label>
          <Switch 
            id={`auto-${zone.id}`}
            checked={zone.isAutomated}
            onCheckedChange={() => onToggleAutomation(zone.id)}
            disabled={zone.status !== 'active'}
          />
        </div>

        {/* Bouton d'irrigation manuelle */}
        <Button 
          className="w-full bg-plantera-blue hover:bg-blue-600 text-white"
          onClick={() => onStartIrrigation(zone.id, 30)}
          disabled={zone.status !== 'active'}
        >
          <CloudRain className="h-4 w-4 mr-2" />
          Démarrer l'irrigation
        </Button>

        {/* Indicateur de capteur */}
        {zone.sensorId && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="h-3 w-3" />
            Capteur {zone.sensorId} connecté
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IrrigationZoneCard;