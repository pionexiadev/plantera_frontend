
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CloudRain, Snowflake, Thermometer, Wind, ArrowRight, CloudOff, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export interface WeatherAlertProps {
  type: 'rain' | 'frost' | 'heat' | 'wind' | 'drought';
  startDate: string;
  endDate: string;
  intensity: 'low' | 'moderate' | 'high' | 'extreme';
  affectedCultures: string[];
  details?: string;
}

export function WeatherAlert({
  type,
  startDate,
  endDate,
  intensity,
  affectedCultures,
  details
}: WeatherAlertProps) {
  const [expanded, setExpanded] = useState(false);
  
  const getAlertIcon = () => {
    switch (type) {
      case 'rain':
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'frost':
        return <Snowflake className="h-5 w-5 text-blue-300" />;
      case 'heat':
        return <Thermometer className="h-5 w-5 text-red-500" />;
      case 'wind':
        return <Wind className="h-5 w-5 text-teal-500" />;
      case 'drought':
        return <CloudOff className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    }
  };
  
  const getAlertTitle = () => {
    switch (type) {
      case 'rain': return 'Précipitations';
      case 'frost': return 'Risque de gel';
      case 'heat': return 'Vague de chaleur';
      case 'wind': return 'Vents forts';
      case 'drought': return 'Sécheresse';
      default: return 'Alerte météo';
    }
  };
  
  const getIntensityColor = () => {
    switch (intensity) {
      case 'low': return 'bg-blue-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'extreme': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getIntensityPercentage = () => {
    switch (intensity) {
      case 'low': return 25;
      case 'moderate': return 50;
      case 'high': return 75;
      case 'extreme': return 100;
      default: return 0;
    }
  };
  
  const getIntensityText = () => {
    switch (intensity) {
      case 'low': return 'Faible';
      case 'moderate': return 'Modérée';
      case 'high': return 'Élevée';
      case 'extreme': return 'Extrême';
      default: return 'Inconnue';
    }
  };
  
  const getRecommendations = () => {
    switch (type) {
      case 'rain':
        return "Vérifiez vos systèmes de drainage et pensez à protéger les cultures sensibles à l'excès d'eau.";
      case 'frost':
        return "Protégez les cultures sensibles avec des couvertures. Évitez l'irrigation juste avant le gel.";
      case 'heat':
        return "Augmentez l'irrigation et prévoyez des ombrages pour les cultures sensibles.";
      case 'wind':
        return "Assurez-vous que les supports des plantes sont solides. Protégez les jeunes plants.";
      case 'drought':
        return "Optimisez votre irrigation. Priorisez les zones les plus sensibles.";
      default:
        return "Surveillez régulièrement vos cultures et adaptez vos pratiques agricoles.";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  const getDuration = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "1 jour" : `${diffDays} jours`;
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${expanded ? 'shadow-md' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            {getAlertIcon()}
            <div>
              <h3 className="font-medium text-sm">{getAlertTitle()}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(startDate)} <ArrowRight className="inline h-3 w-3 mx-1" /> {formatDate(endDate)} ({getDuration()})
              </p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setExpanded(!expanded)}
                >
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Plus d'infos</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cliquez pour plus de détails</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between items-center text-xs mb-1">
            <span>Intensité: <span className="font-medium">{getIntensityText()}</span></span>
          </div>
          <Progress value={getIntensityPercentage()} className="h-1.5" indicatorColor={getIntensityColor()} />
        </div>
        
        {expanded && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <div>
              <p className="text-xs font-medium">Cultures affectées:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {affectedCultures.map((culture, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {culture}
                  </span>
                ))}
              </div>
            </div>
            
            {details && (
              <div>
                <p className="text-xs font-medium">Détails:</p>
                <p className="text-xs text-muted-foreground mt-1">{details}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs font-medium">Recommandations:</p>
              <p className="text-xs text-muted-foreground mt-1">{getRecommendations()}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
