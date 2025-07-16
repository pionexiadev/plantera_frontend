import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  AlertTriangle, 
  Droplet, 
  Battery, 
  Wifi, 
  Settings, 
  CheckCircle,
  X,
  Clock
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'moisture' | 'battery' | 'offline' | 'system';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  zoneId?: string;
  zoneName?: string;
  timestamp: string;
  isRead: boolean;
  isActive: boolean;
}

interface AlertSettings {
  moistureEnabled: boolean;
  batteryEnabled: boolean;
  offlineEnabled: boolean;
  systemEnabled: boolean;
  moistureThreshold: number;
  batteryThreshold: number;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'moisture',
    severity: 'high',
    title: 'Niveau d\'humidité critique',
    description: 'Le niveau d\'humidité est en dessous du seuil critique (25%)',
    zoneId: '2',
    zoneName: 'Zone Sud - Carottes',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    isRead: false,
    isActive: true
  },
  {
    id: '2',
    type: 'battery',
    severity: 'medium',
    title: 'Batterie faible',
    description: 'La batterie du capteur est à 15%',
    zoneId: '3',
    zoneName: 'Zone Est - Blé',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    isActive: true
  },
  {
    id: '3',
    type: 'offline',
    severity: 'high',
    title: 'Capteur hors ligne',
    description: 'Le capteur ne répond plus depuis 2 heures',
    zoneId: '3',
    zoneName: 'Zone Est - Blé',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    isActive: true
  },
  {
    id: '4',
    type: 'system',
    severity: 'low',
    title: 'Irrigation programmée',
    description: 'L\'irrigation automatique s\'est déclenchée avec succès',
    zoneId: '1',
    zoneName: 'Zone Nord - Tomates',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    isActive: false
  }
];

const IrrigationAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<AlertSettings>({
    moistureEnabled: true,
    batteryEnabled: true,
    offlineEnabled: true,
    systemEnabled: false,
    moistureThreshold: 30,
    batteryThreshold: 20
  });

  const activeAlerts = alerts.filter(alert => alert.isActive);
  const unreadCount = activeAlerts.filter(alert => !alert.isRead).length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'moisture': return <Droplet className="h-4 w-4" />;
      case 'battery': return <Battery className="h-4 w-4" />;
      case 'offline': return <Wifi className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isActive: false } : alert
    ));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) {
      return `Il y a ${diffMins} min`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-plantera-blue" />
            Alertes et notifications
          </h3>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-4 w-4 mr-2" />
          Paramètres
        </Button>
      </div>

      {/* Paramètres d'alertes */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Paramètres des alertes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="moisture-alerts">Alertes d'humidité</Label>
                <Switch 
                  id="moisture-alerts"
                  checked={settings.moistureEnabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, moistureEnabled: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="battery-alerts">Alertes de batterie</Label>
                <Switch 
                  id="battery-alerts"
                  checked={settings.batteryEnabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, batteryEnabled: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="offline-alerts">Alertes hors ligne</Label>
                <Switch 
                  id="offline-alerts"
                  checked={settings.offlineEnabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, offlineEnabled: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="system-alerts">Alertes système</Label>
                <Switch 
                  id="system-alerts"
                  checked={settings.systemEnabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, systemEnabled: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des alertes */}
      {activeAlerts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h4 className="text-lg font-medium mb-2">Aucune alerte active</h4>
            <p className="text-muted-foreground">
              Tout fonctionne correctement. Vous serez notifié en cas de problème.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`transition-all duration-200 ${
                !alert.isRead ? 'border-l-4 border-l-plantera-blue bg-blue-50/50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}/10`}>
                      <div className={getSeverityTextColor(alert.severity)}>
                        {getAlertIcon(alert.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium ${!alert.isRead ? 'text-plantera-blue' : ''}`}>
                          {alert.title}
                        </h4>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getSeverityTextColor(alert.severity)}`}
                        >
                          {alert.severity === 'high' ? 'Critique' : 
                           alert.severity === 'medium' ? 'Moyen' : 'Info'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {alert.zoneName && (
                          <span className="flex items-center gap-1">
                            <Droplet className="h-3 w-3" />
                            {alert.zoneName}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(alert.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!alert.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(alert.id)}
                        className="h-8 px-3 text-xs"
                      >
                        Marquer lu
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => dismissAlert(alert.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default IrrigationAlerts;