import { Field } from "./field";


// Ce type correspond aux données reçues du backend

export type StatutCulture = 'planted' | 'growing' | 'ready' | 'harvested';

export interface Culture {
  id: number;
  nom: string;
  varieté: string;
  surface: number;
  datePlantation: string;
  dateRecolteEstimee: string;
  rendement: number;
  notes?: string;
  parcelleId: number;
  irrigation: number;
  sante: number;
  typeSol: 'argileux' | 'sableux' | 'limoneux' | 'calcaire';
  localisation: string;
  statut: 'planted' | 'growing' | 'ready' | 'harvested';
}


// Ce type est utilisé pour envoyer les données au backend (POST / PUT)
export interface CulturePayload extends Omit<Culture, 'id' | 'parcelle'> {
  parcelle: { id: number };
}

export interface CulturePayload {
  nom: string;
  surface: number;
  datePlantation: string;
  dateRecolteEstimee: string;
  rendementAttendu: number;
  notes?: string;
  parcelle: {
    id: number;
  };
}