export interface Field {
  id: number;
  nom: string;
  surface: number;
  localisation: string;
  typeSol: 'argileux' | 'sableux' | 'limoneux' | 'calcaire'; // conforme au backend
  systemeIrrigation: 'aspersion' | 'goutte_à_goutte' | 'gravitaire' | 'none';
  disponible: boolean;
  notes?: string;
  createdAt?: string;
  
}
