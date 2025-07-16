import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  WifiOff, 
  Activity, 
  Thermometer, 
  Droplet, 
  Battery, 
  Signal,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface SensorData {
  id: string;
  name: string;
  zoneId: string;
  isOnline: boolean;
  batteryLevel: number;
  signalStrength: number;
  temperature: number;
  soilMoisture: number;
  lastUpdate: string;
  status: 'normal' | 'warning' | 'error';
}

interface IrrigationSensorMonitorProps {
  zoneId?: string;
}

const mockSensors: SensorData[] = [
  {
    id: 'sensor-1',
    name: 'Capteur Nord',
    zoneId: '1',
    isOnline: true,
    batteryLevel: 85,
    signalStrength: 92,
    temperature: 22.5,
    soilMoisture: 65,
    lastUpdate: new Date().toISOString(),
    status: 'normal'
  },
  {
    id: 'sensor-2',
    name: 'Capteur Sud',
    zoneId: '2',
    isOnline: true,
    batteryLevel: 45,
    signalStrength: 78,
    temperature: 24.1,
    soilMoisture: 42,
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: 'warning'
  },
  {
    id: 'sensor-3',
    name: 'Capteur Est',
    zoneId: '3',
    isOnline: false,
    batteryLevel: 12,
    signalStrength: 0,
    temperature: 0,
    soilMoisture: 0,
    lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'error'
  }
];

const IrrigationSensorMonitor: React.FC<IrrigationSensorMonitorProps> = ({ zoneId }) => {
  const [sensors, setSensors] = useState<SensorData[]>(mockSensors);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredSensors = zoneId 
    ? sensors.filter(sensor => sensor.zoneId === zoneId)
    : sensors;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulation de mise à jour des données
    setSensors(prev => prev.map(sensor => ({
      ...sensor,
      temperature: sensor.isOnline ? Math.round((20 + Math.random() * 10) * 10) / 10 : 0,
      soilMoisture: sensor.isOnline ? Math.round((30 + Math.random() * 40)) : 0,
      lastUpdate: sensor.isOnline ? new Date().toISOString() : sensor.lastUpdate
    })));
    
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSignalIcon = (strength: number, isOnline: boolean) => {
    if (!isOnline) return <WifiOff className="h-4 w-4 text-red-500" />;
    if (strength > 80) return <Wifi className="h-4 w-4 text-green-500" />;
    if (strength > 50) return <Wifi className="h-4 w-4 text-yellow-500" />;
    return <Wifi className="h-4 w-4 text-red-500" />;
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMoistureColor = (level: number) => {
    if (level > 60) return 'text-blue-500';
    if (level > 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-plantera-blue" />
          Surveillance des capteurs IoT
        </h3>
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {filteredSensors.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-lg font-medium mb-2">Aucun capteur configuré</h4>
            <p className="text-muted-foreground">
              Ajoutez des capteurs IoT pour surveiller vos zones d'irrigation en temps réel.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSensors.map((sensor) => (
            <Card key={sensor.id} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {sensor.name}
                      {getSignalIcon(sensor.signalStrength, sensor.isOnline)}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={sensor.isOnline ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {sensor.isOnline ? "En ligne" : "Hors ligne"}
                      </Badge>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(sensor.status)}`} />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {sensor.isOnline ? (
                  <>
                    {/* Température */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Température</span>
                      </div>
                      <span className="text-sm font-medium">{sensor.temperature}°C</span>
                    </div>

                    {/* Humidité du sol */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplet className={`h-4 w-4 ${getMoistureColor(sensor.soilMoisture)}`} />
                          <span className="text-sm">Humidité sol</span>
                        </div>
                        <span className={`text-sm font-medium ${getMoistureColor(sensor.soilMoisture)}`}>
                          {sensor.soilMoisture}%
                        </span>
                      </div>
                      <Progress 
                        value={sensor.soilMoisture} 
                        className="h-2"
                      />
                    </div>

                    {/* Batterie */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Battery className={`h-4 w-4 ${getBatteryColor(sensor.batteryLevel)}`} />
                          <span className="text-sm">Batterie</span>
                        </div>
                        <span className={`text-sm font-medium ${getBatteryColor(sensor.batteryLevel)}`}>
                          {sensor.batteryLevel}%
                        </span>
                      </div>
                      <Progress 
                        value={sensor.batteryLevel} 
                        className="h-2"
                      />
                      {sensor.batteryLevel < 20 && (
                        <div className="flex items-center gap-1 text-xs text-red-600">
                          <AlertTriangle className="h-3 w-3" />
                          Batterie faible
                        </div>
                      )}
                    </div>

                    {/* Signal */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Signal className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Signal</span>
                      </div>
                      <span className="text-sm font-medium">{sensor.signalStrength}%</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <WifiOff className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <p className="text-sm text-muted-foreground">Capteur hors ligne</p>
                    <p className="text-xs text-muted-foreground">
                      Dernière mise à jour: {new Date(sensor.lastUpdate).toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Dernière mise à jour */}
                {sensor.isOnline && (
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Dernière mise à jour</span>
                      <span>{new Date(sensor.lastUpdate).toLocaleTimeString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Résumé global */}
      {!zoneId && filteredSensors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Résumé des capteurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-semibold text-green-600">
                    {sensors.filter(s => s.isOnline).length}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">En ligne</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <WifiOff className="h-4 w-4 text-red-500" />
                  <span className="text-lg font-semibold text-red-600">
                    {sensors.filter(s => !s.isOnline).length}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Hors ligne</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-lg font-semibold text-yellow-600">
                    {sensors.filter(s => s.batteryLevel < 20).length}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Batterie faible</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <span className="text-lg font-semibold text-blue-600">
                    {Math.round(sensors.filter(s => s.isOnline).reduce((sum, s) => sum + s.soilMoisture, 0) / sensors.filter(s => s.isOnline).length || 0)}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Humidité moy.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IrrigationSensorMonitor;