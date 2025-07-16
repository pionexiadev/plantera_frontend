import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Square, 
  CloudRain, 
  Timer, 
  Droplet, 
  Gauge,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { IrrigationZone } from '@/types/irrigation';

interface IrrigationManualControlProps {
  zones: IrrigationZone[];
  onStartIrrigation: (zoneId: string, duration: number, flowRate?: number) => void;
  onStopIrrigation?: (zoneId: string) => void;
}

interface ActiveIrrigation {
  zoneId: string;
  startTime: Date;
  duration: number;
  flowRate: number;
  remainingTime: number;
}

const IrrigationManualControl: React.FC<IrrigationManualControlProps> = ({
  zones,
  onStartIrrigation,
  onStopIrrigation
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [flowRate, setFlowRate] = useState<number>(75);
  const [activeIrrigations, setActiveIrrigations] = useState<ActiveIrrigation[]>([]);

  const handleStartIrrigation = () => {
    if (!selectedZone) return;

    const zone = zones.find(z => z.id === selectedZone);
    if (!zone || zone.status !== 'active') return;

    const newIrrigation: ActiveIrrigation = {
      zoneId: selectedZone,
      startTime: new Date(),
      duration,
      flowRate,
      remainingTime: duration
    };

    setActiveIrrigations(prev => [...prev, newIrrigation]);
    onStartIrrigation(selectedZone, duration, flowRate);

    // Simulation du timer
    const interval = setInterval(() => {
      setActiveIrrigations(prev => 
        prev.map(irrigation => {
          if (irrigation.zoneId === selectedZone) {
            const elapsed = Math.floor((Date.now() - irrigation.startTime.getTime()) / 60000);
            const remaining = Math.max(0, irrigation.duration - elapsed);
            
            if (remaining === 0) {
              clearInterval(interval);
              return { ...irrigation, remainingTime: 0 };
            }
            
            return { ...irrigation, remainingTime: remaining };
          }
          return irrigation;
        })
      );
    }, 60000);

    // Arrêt automatique après la durée
    setTimeout(() => {
      setActiveIrrigations(prev => prev.filter(i => i.zoneId !== selectedZone));
    }, duration * 60 * 1000);
  };

  const handleStopIrrigation = (zoneId: string) => {
    setActiveIrrigations(prev => prev.filter(i => i.zoneId !== zoneId));
    onStopIrrigation?.(zoneId);
  };

  const getZoneName = (zoneId: string) => {
    const zone = zones.find(z => z.id === zoneId);
    return zone?.name || 'Zone inconnue';
  };

  const isZoneActive = (zoneId: string) => {
    return activeIrrigations.some(i => i.zoneId === zoneId);
  };

  const activeZones = zones.filter(zone => zone.status === 'active');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <CloudRain className="h-5 w-5 text-plantera-blue" />
        Contrôle manuel d'irrigation
      </h3>

      {/* Panel de contrôle */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Démarrer une irrigation manuelle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeZones.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <p>Aucune zone active disponible</p>
            </div>
          ) : (
            <>
              {/* Sélection de zone */}
              <div className="space-y-3">
                <Label>Zone d'irrigation</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeZones.map((zone) => (
                    <Button
                      key={zone.id}
                      variant={selectedZone === zone.id ? "default" : "outline"}
                      className={`justify-start h-auto p-4 ${
                        isZoneActive(zone.id) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={() => setSelectedZone(zone.id)}
                      disabled={isZoneActive(zone.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{zone.name}</div>
                        <div className="text-xs opacity-70 flex items-center gap-1 mt-1">
                          <Droplet className="h-3 w-3" />
                          Humidité: {zone.moistureLevel}%
                        </div>
                        {isZoneActive(zone.id) && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            En cours
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Configuration de l'irrigation */}
              {selectedZone && !isZoneActive(selectedZone) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Durée */}
                  <div className="space-y-3">
                    <Label htmlFor="duration">
                      Durée: {duration} minutes
                    </Label>
                    <Slider
                      id="duration"
                      min={5}
                      max={120}
                      step={5}
                      value={[duration]}
                      onValueChange={(value) => setDuration(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5 min</span>
                      <span>120 min</span>
                    </div>
                  </div>

                  {/* Débit */}
                  <div className="space-y-3">
                    <Label htmlFor="flowRate">
                      Intensité: {flowRate}%
                    </Label>
                    <Slider
                      id="flowRate"
                      min={25}
                      max={100}
                      step={5}
                      value={[flowRate]}
                      onValueChange={(value) => setFlowRate(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>25%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Estimation */}
              {selectedZone && !isZoneActive(selectedZone) && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Estimation</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800">
                        Eau consommée: ~{Math.round(duration * flowRate / 20)}L
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800">
                        Fin prévue: {new Date(Date.now() + duration * 60 * 1000).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bouton de démarrage */}
              {selectedZone && !isZoneActive(selectedZone) && (
                <Button 
                  onClick={handleStartIrrigation}
                  className="w-full bg-plantera-blue hover:bg-blue-600 text-white"
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Démarrer l'irrigation
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Irrigations actives */}
      {activeIrrigations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Irrigations en cours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeIrrigations.map((irrigation) => (
              <div 
                key={irrigation.zoneId}
                className="border rounded-lg p-4 bg-green-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-green-900">
                      {getZoneName(irrigation.zoneId)}
                    </h4>
                    <p className="text-sm text-green-700">
                      Démarré à {irrigation.startTime.toLocaleTimeString()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStopIrrigation(irrigation.zoneId)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Arrêter
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Temps restant: {irrigation.remainingTime} min</span>
                    <span>Intensité: {irrigation.flowRate}%</span>
                  </div>
                  
                  <Progress 
                    value={((irrigation.duration - irrigation.remainingTime) / irrigation.duration) * 100}
                    className="h-2"
                  />
                  
                  <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      {irrigation.duration - irrigation.remainingTime}/{irrigation.duration} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="h-3 w-3" />
                      {irrigation.flowRate}% intensité
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplet className="h-3 w-3" />
                      ~{Math.round((irrigation.duration - irrigation.remainingTime) * irrigation.flowRate / 20)}L
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IrrigationManualControl;