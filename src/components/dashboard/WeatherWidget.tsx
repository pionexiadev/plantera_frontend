
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplet, 
  Eye, 
  Gauge,
  RefreshCw,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useWeather } from '@/hooks/use-weather';

interface WeatherWidgetProps {
  city?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city = 'Paris' }) => {
  const { weatherData, isLoading, error, refreshWeather } = useWeather(city);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-8 w-8 text-amber-500" />;
      case 'partly cloudy':
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-slate-500" />;
      case 'rain':
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Sun className="h-8 w-8 text-amber-500" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'extreme': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="w-20 h-8 bg-gray-200 rounded"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weatherData) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600 mb-4">{error || 'Erreur de chargement'}</p>
          <Button onClick={refreshWeather} size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getWeatherIcon(weatherData.current.condition)}
            <span className="text-lg">Météo - {weatherData.location.name}</span>
          </div>
          <Button
            onClick={refreshWeather}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Conditions actuelles */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {getWeatherIcon(weatherData.current.condition)}
            <div>
              <p className="text-3xl font-bold text-plantera-darkGreen">
                {weatherData.current.temperature}°C
              </p>
              <p className="text-sm text-plantera-slate/70">
                {weatherData.current.description}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-plantera-slate/60">Humidité</p>
                <p className="font-semibold">{weatherData.current.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-xs text-plantera-slate/60">Vent</p>
                <p className="font-semibold">{weatherData.current.windSpeed} km/h</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-plantera-slate/60">Pression</p>
                <p className="font-semibold">{weatherData.current.pressure} hPa</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-plantera-slate/60">Visibilité</p>
                <p className="font-semibold">{weatherData.current.visibility} km</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prévisions 5 jours */}
        <div className="space-y-3">
          <h4 className="font-semibold text-plantera-darkGreen">Prévisions 5 jours</h4>
          <div className="grid grid-cols-5 gap-2">
            {weatherData.forecast.map((day, index) => (
              <div
                key={index}
                className="text-center p-3 rounded-lg bg-gradient-to-b from-slate-50 to-white border border-slate-100 hover:shadow-md transition-shadow"
              >
                <p className="text-xs font-medium text-plantera-slate/70 mb-2">
                  {day.day}
                </p>
                <div className="flex justify-center mb-2">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-sm">
                    {day.temperature.max}°
                  </p>
                  <p className="text-xs text-plantera-slate/60">
                    {day.temperature.min}°
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <Droplet className="h-3 w-3 text-blue-400" />
                    <span className="text-xs text-blue-600">
                      {day.precipitation}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes météo */}
        {weatherData.alerts && weatherData.alerts.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-plantera-darkGreen flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Alertes météo
            </h4>
            {weatherData.alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' 
                    ? 'bg-amber-50 border-amber-400' 
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start gap-2">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  ) : (
                    <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h5 className="font-medium text-sm mb-1">{alert.title}</h5>
                    <p className="text-xs text-slate-600 mb-2">{alert.description}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getAlertColor(alert.severity)} text-white border-0`}
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
