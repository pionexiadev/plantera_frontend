import { Culture } from './culture';
import { Field } from './field';

// Enum des statuts selon ton backend (en texte libre depuis le backend : attention à la cohérence côté frontend)
export type HarvestStatus = 'Planifiée' | 'En cours' | 'Réalisée' | 'Annulée';

// Valeurs possibles pour la qualité (tu peux les adapter selon les valeurs exactes du backend)
export type HarvestQuality = 'excellent' | 'good' | 'average' | 'poor';

// Représentation d’une récolte envoyée ou reçue depuis le backend
export interface Harvest {
  id: number;
  culture: Culture;           // @ManyToOne côté backend
  parcelle: Field;            // @ManyToOne côté backend
  dateRecolte: string;        // Format ISO (ex: "2025-07-06")
  quantite: number;           // double (en kg)
  qualite: HarvestQuality;    // String côté backend
  statut: HarvestStatus;      // String libre (Planifiée, Réalisée…)
  couts: number;
  heuresTravail: number;
  conditionsMeteo: string;
  notes?: string;
}
export interface HarvestDetailsData {
  id: number;
  culture: {
    id: number;
    nom: string;
    varieté: string;
  };
  parcelle: {
    id: number;
    nom: string;
    surface: number;
    localisation: string;
  };
  dateRecolte: string;
  quantite: number;
  qualite: 'excellent' | 'good' | 'average' | 'poor';
  statut: 'Planifiée' | 'En cours' | 'Réalisée' | 'Annulée';
  couts?: number;
  heuresTravail?: number;
  conditionsMeteo?: string;
  notes?: string;
}

// Payload pour créer ou mettre à jour une récolte
export interface HarvestPayload {
  cultureId: number;
  parcelleId: number;
  dateRecolte: string;
  quantite: number;
  qualite: HarvestQuality;
  statut: HarvestStatus;
  couts: number;
  heuresTravail: number;
  conditionsMeteo: string;
  notes?: string;
}
