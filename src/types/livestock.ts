
export type AnimalHealth = 'excellent' | 'good' | 'average' | 'poor' | 'attention';
export type AnimalStatus = 'active' | 'quarantine' | 'sick' | 'treatment';
export type AnimalGender = 'male' | 'female';

export interface Animal {
  id: string;
  name: string;
  type: string;
  breed: string;
  birthDate: string;
  weight: number;
  health: AnimalHealth;
  status: AnimalStatus;
  lastCheckup: string;
  gender?: AnimalGender;
  notes?: string;
  lastVetVisit?: string;
}
