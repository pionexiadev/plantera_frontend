import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Culture } from '@/types/culture';
import { useToast } from '@/hooks/use-toast';
import { useCultures } from '@/hooks/use-cultures';

interface HarvestPlanningProps {
  fields?: Culture[];
}

const HarvestPlanning = ({ fields: propFields }: HarvestPlanningProps) => {
  const [localFields, setLocalFields] = useState<Culture[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { cultures } = useCultures();

  useEffect(() => {
    if (propFields) {
      setLocalFields(propFields);
    } else {
      setLocalFields(cultures);
    }
  }, [propFields, cultures]);

  // Conversion des champs en événements de récolte
  const harvestEvents = localFields.map(field => ({
    id: field.id,
    fieldName: field.name,
    culture: `${field.name} - ${field.variety}`,
    date: field.estimatedHarvestDate,
    status: field.status === 'ready' ? 'ready' : 
            field.status === 'harvested' ? 'completed' : 'pending'
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'ready': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'ready': return 'Prêt';
      case 'completed': return 'Complété';
      default: return status;
    }
  };

  const sortedEvents = [...harvestEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-plantera-green" />
          Planification des récoltes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-plantera-green" />
          </div>
        ) : sortedEvents.length > 0 ? (
          <div className="space-y-3">
            {sortedEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="font-medium">{event.fieldName}</div>
                  <div className="text-sm text-muted-foreground">{event.culture} - {formatDate(event.date)}</div>
                </div>
                <Badge className={`${getStatusColor(event.status)} hover:${getStatusColor(event.status)}`}>
                  {getStatusLabel(event.status)}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            Aucune récolte planifiée
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HarvestPlanning;
