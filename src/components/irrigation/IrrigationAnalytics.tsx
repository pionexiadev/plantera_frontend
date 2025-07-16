import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Droplet, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Clock,
  Zap
} from 'lucide-react';
import { IrrigationZone, IrrigationEvent } from '@/types/irrigation';

interface IrrigationAnalyticsProps {
  zones: IrrigationZone[];
  events: IrrigationEvent[];
}

const IrrigationAnalytics: React.FC<IrrigationAnalyticsProps> = ({
  zones,
  events
}) => {
  // Données pour le graphique de consommation par zone
  const consumptionData = zones.map(zone => ({
    name: zone.name.split(' - ')[1] || zone.name,
    consumption: zone.waterConsumption,
    moisture: zone.moistureLevel
  }));

  // Données pour le graphique temporel (simulation)
  const timeData = [
    { day: 'Lun', water: 120, efficiency: 85 },
    { day: 'Mar', water: 150, efficiency: 78 },
    { day: 'Mer', water: 110, efficiency: 92 },
    { day: 'Jeu', water: 180, efficiency: 75 },
    { day: 'Ven', water: 140, efficiency: 88 },
    { day: 'Sam', water: 160, efficiency: 82 },
    { day: 'Dim', water: 100, efficiency: 95 }
  ];

  // Données pour le graphique en secteurs
  const typeData = [
    { name: 'Goutte-à-goutte', value: zones.filter(z => z.type === 'goutte-à-goutte').length, color: '#3B82F6' },
    { name: 'Aspersion', value: zones.filter(z => z.type === 'aspersion').length, color: '#10B981' },
    { name: 'Gravitaire', value: zones.filter(z => z.type === 'gravitaire').length, color: '#F59E0B' }
  ].filter(item => item.value > 0);

  // Calculs pour les métriques
  const totalConsumption = zones.reduce((sum, zone) => sum + zone.waterConsumption, 0);
  const avgMoisture = zones.reduce((sum, zone) => sum + zone.moistureLevel, 0) / zones.length;
  const activeZones = zones.filter(zone => zone.status === 'active').length;
  const automatedZones = zones.filter(zone => zone.isAutomated).length;

  // Estimation des économies (simulation)
  const estimatedSavings = (totalConsumption * 0.25 * 0.002).toFixed(0); // 25% d'économie, 0.002€/L
  const efficiencyScore = ((avgMoisture + automatedZones * 10) / zones.length).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Consommation totale
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalConsumption}L
                </p>
              </div>
              <Droplet className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Humidité moyenne
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {avgMoisture.toFixed(0)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Sur toutes les zones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Économies estimées
                </p>
                <p className="text-2xl font-bold text-plantera-green">
                  {estimatedSavings}€
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-plantera-green" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Score d'efficacité
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {efficiencyScore}%
                </p>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Optimisation système
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consommation par zone */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Consommation par zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}${name === 'consumption' ? 'L' : '%'}`,
                    name === 'consumption' ? 'Consommation' : 'Humidité'
                  ]}
                />
                <Bar dataKey="consumption" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Évolution temporelle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Évolution hebdomadaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="water" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Consommation (L)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Efficacité (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition par type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Répartition des systèmes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Résumé des événements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 5).map((event) => {
                const zone = zones.find(z => z.id === event.zoneId);
                return (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        event.trigger === 'manual' ? 'bg-blue-500' :
                        event.trigger === 'scheduled' ? 'bg-green-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{zone?.name || 'Zone inconnue'}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.waterAmount}L • {event.trigger}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.startTime).toLocaleTimeString()}
                    </span>
                  </div>
                );
              })}
              {events.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Aucune activité récente</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IrrigationAnalytics;