import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Clock, 
  Calendar,
  Trash2,
  Edit
} from 'lucide-react';
import { IrrigationSchedule, IrrigationZone } from '@/types/irrigation';

interface IrrigationSchedulerProps {
  zones: IrrigationZone[];
  schedules: IrrigationSchedule[];
  onAddSchedule: (schedule: Omit<IrrigationSchedule, 'id'>) => void;
  onDeleteSchedule: (scheduleId: string) => void;
  onToggleSchedule: (scheduleId: string, isActive: boolean) => void;
}

const daysOfWeek = [
  { value: 0, label: 'Dimanche' },
  { value: 1, label: 'Lundi' },
  { value: 2, label: 'Mardi' },
  { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' },
  { value: 5, label: 'Vendredi' },
  { value: 6, label: 'Samedi' }
];

const IrrigationScheduler: React.FC<IrrigationSchedulerProps> = ({
  zones,
  schedules,
  onAddSchedule,
  onDeleteSchedule,
  onToggleSchedule
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    zoneId: '',
    dayOfWeek: 1,
    startTime: '06:00',
    duration: 30,
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSchedule.zoneId) {
      onAddSchedule(newSchedule);
      setNewSchedule({
        zoneId: '',
        dayOfWeek: 1,
        startTime: '06:00',
        duration: 30,
        isActive: true
      });
      setShowAddForm(false);
    }
  };

  const getZoneName = (zoneId: string) => {
    const zone = zones.find(z => z.id === zoneId);
    return zone?.name || 'Zone inconnue';
  };

  const getDayName = (dayOfWeek: number) => {
    return daysOfWeek.find(d => d.value === dayOfWeek)?.label || 'Jour inconnu';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-plantera-blue" />
              Programmation d'irrigation
            </CardTitle>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-plantera-green hover:bg-plantera-green/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle programmation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {schedules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucune programmation configurée</p>
              <p className="text-sm">Ajoutez une programmation pour automatiser l'irrigation</p>
            </div>
          ) : (
            <div className="space-y-3">
              {schedules.map((schedule) => (
                <div 
                  key={schedule.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={schedule.isActive}
                      onCheckedChange={(checked) => onToggleSchedule(schedule.id, checked)}
                    />
                    <div>
                      <div className="font-medium">{getZoneName(schedule.zoneId)}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {getDayName(schedule.dayOfWeek)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {schedule.startTime}
                        </span>
                        <span>{schedule.duration} min</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={schedule.isActive ? "default" : "secondary"}>
                      {schedule.isActive ? "Actif" : "Inactif"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteSchedule(schedule.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle programmation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zone">Zone d'irrigation</Label>
                  <Select 
                    value={newSchedule.zoneId} 
                    onValueChange={(value) => setNewSchedule(prev => ({ ...prev, zoneId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {zones.filter(z => z.status === 'active').map((zone) => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {zone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="day">Jour de la semaine</Label>
                  <Select 
                    value={newSchedule.dayOfWeek.toString()} 
                    onValueChange={(value) => setNewSchedule(prev => ({ ...prev, dayOfWeek: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value.toString()}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Heure de début</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newSchedule.startTime}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Durée (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="120"
                    value={newSchedule.duration}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    id="active"
                    checked={newSchedule.isActive}
                    onCheckedChange={(checked) => setNewSchedule(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="active">Programmation active</Label>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-plantera-green hover:bg-plantera-green/90"
                    disabled={!newSchedule.zoneId}
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IrrigationScheduler;