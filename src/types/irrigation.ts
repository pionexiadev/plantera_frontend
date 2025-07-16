export interface IrrigationZone {
  id: string;
  name: string;
  fieldId: string;
  sensorId?: string;
  type: 'aspersion' | 'goutte-à-goutte' | 'gravitaire';
  status: 'active' | 'inactive' | 'maintenance';
  lastWatering: string;
  nextWatering?: string;
  waterConsumption: number; // litres
  moistureLevel: number; // pourcentage
  isAutomated: boolean;
}

export interface IrrigationSchedule {
  id: string;
  zoneId: string;
  dayOfWeek: number; // 0-6 (dimanche = 0)
  startTime: string; // format HH:mm
  duration: number; // minutes
  isActive: boolean;
}

export interface IrrigationEvent {
  id: string;
  zoneId: string;
  startTime: string;
  endTime?: string;
  waterAmount: number; // litres
  trigger: 'manual' | 'scheduled' | 'sensor';
  notes?: string;
}