import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { IrrigationZone, IrrigationSchedule, IrrigationEvent } from '@/types/irrigation';

const mockZones: IrrigationZone[] = [
  {
    id: '1',
    name: 'Zone Nord - Tomates',
    fieldId: 'field-1',
    sensorId: 'sensor-1',
    type: 'goutte-à-goutte',
    status: 'active',
    lastWatering: '2024-06-03T06:00:00Z',
    nextWatering: '2024-06-04T06:00:00Z',
    waterConsumption: 150,
    moistureLevel: 65,
    isAutomated: true
  },
  {
    id: '2',
    name: 'Zone Sud - Carottes',
    fieldId: 'field-2',
    type: 'aspersion',
    status: 'active',
    lastWatering: '2024-06-02T18:00:00Z',
    nextWatering: '2024-06-04T18:00:00Z',
    waterConsumption: 200,
    moistureLevel: 45,
    isAutomated: false
  },
  {
    id: '3',
    name: 'Zone Est - Blé',
    fieldId: 'field-3',
    type: 'gravitaire',
    status: 'inactive',
    lastWatering: '2024-05-28T12:00:00Z',
    waterConsumption: 80,
    moistureLevel: 30,
    isAutomated: false
  }
];

const mockSchedules: IrrigationSchedule[] = [
  {
    id: '1',
    zoneId: '1',
    dayOfWeek: 1, // Lundi
    startTime: '06:00',
    duration: 30,
    isActive: true
  },
  {
    id: '2',
    zoneId: '1',
    dayOfWeek: 3, // Mercredi
    startTime: '06:00',
    duration: 30,
    isActive: true
  },
  {
    id: '3',
    zoneId: '2',
    dayOfWeek: 2, // Mardi
    startTime: '18:00',
    duration: 45,
    isActive: true
  }
];

const mockEvents: IrrigationEvent[] = [
  {
    id: '1',
    zoneId: '1',
    startTime: '2024-06-03T06:00:00Z',
    endTime: '2024-06-03T06:30:00Z',
    waterAmount: 150,
    trigger: 'scheduled',
    notes: 'Arrosage automatique programmé'
  },
  {
    id: '2',
    zoneId: '2',
    startTime: '2024-06-02T18:00:00Z',
    endTime: '2024-06-02T18:45:00Z',
    waterAmount: 200,
    trigger: 'manual',
    notes: 'Arrosage manuel après observation du sol'
  }
];

export const useIrrigation = () => {
  const [zones, setZones] = useState<IrrigationZone[]>(mockZones);
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>(mockSchedules);
  const [events, setEvents] = useState<IrrigationEvent[]>(mockEvents);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addZone = async (zoneData: Omit<IrrigationZone, 'id'>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newZone: IrrigationZone = {
        ...zoneData,
        id: Date.now().toString(),
      };
      
      setZones(prev => [...prev, newZone]);
      
      toast({
        title: "Zone ajoutée",
        description: "La zone d'irrigation a été ajoutée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la zone",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateZone = async (id: string, data: Partial<IrrigationZone>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setZones(prev => prev.map(zone => 
        zone.id === id ? { ...zone, ...data } : zone
      ));
      
      toast({
        title: "Succès",
        description: "Zone mise à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la zone",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startIrrigation = async (zoneId: string, duration: number = 30) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mettre à jour la zone
      const now = new Date().toISOString();
      const nextWatering = new Date(Date.now() + duration * 60 * 1000).toISOString();
      
      setZones(prev => prev.map(zone => 
        zone.id === zoneId ? { 
          ...zone, 
          lastWatering: now,
          nextWatering,
          waterConsumption: zone.waterConsumption + (duration * 5) // estimation
        } : zone
      ));
      
      // Ajouter un événement
      const newEvent: IrrigationEvent = {
        id: Date.now().toString(),
        zoneId,
        startTime: now,
        waterAmount: duration * 5, // estimation
        trigger: 'manual',
        notes: 'Arrosage manuel déclenché'
      };
      
      setEvents(prev => [newEvent, ...prev]);
      
      toast({
        title: "Irrigation démarrée",
        description: `L'arrosage a été démarré pour ${duration} minutes`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de démarrer l'irrigation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSchedule = async (scheduleData: Omit<IrrigationSchedule, 'id'>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newSchedule: IrrigationSchedule = {
        ...scheduleData,
        id: Date.now().toString(),
      };
      
      setSchedules(prev => [...prev, newSchedule]);
      
      toast({
        title: "Programmation ajoutée",
        description: "La programmation d'irrigation a été ajoutée",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la programmation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSchedule = async (scheduleId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
      
      toast({
        title: "Programmation supprimée",
        description: "La programmation a été supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la programmation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSchedule = async (scheduleId: string, isActive: boolean) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSchedules(prev => prev.map(schedule => 
        schedule.id === scheduleId ? { ...schedule, isActive } : schedule
      ));
      
      toast({
        title: isActive ? "Programmation activée" : "Programmation désactivée",
        description: `La programmation a été ${isActive ? 'activée' : 'désactivée'}`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la programmation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getZonesByField = (fieldId: string) => {
    return zones.filter(zone => zone.fieldId === fieldId);
  };

  const getSchedulesByZone = (zoneId: string) => {
    return schedules.filter(schedule => schedule.zoneId === zoneId);
  };

  const getEventsByZone = (zoneId: string) => {
    return events.filter(event => event.zoneId === zoneId);
  };

  return {
    zones,
    schedules,
    events,
    isLoading,
    addZone,
    updateZone,
    startIrrigation,
    addSchedule,
    deleteSchedule,
    toggleSchedule,
    getZonesByField,
    getSchedulesByZone,
    getEventsByZone
  };
};