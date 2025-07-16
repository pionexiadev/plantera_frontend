export interface UserProfile {
  id: number; // Long côté Java = number en TypeScript
  email: string;
  name: string; // correspond à `nom` côté backend
  profileType: ProfileType; // correspond à `profil` côté backend
  nomEntreprise?: string; // optionnel côté frontend si pas toujours requis
}


export type ProfileType = 
  | 'agriculteur'
  | 'veterinaire'
  | 'grossiste'
  | 'gie'
  | 'vendeur'
  | 'acheteur'
  | 'investisseur';

export interface ProfileTypeInfo {
  id: ProfileType;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  permissions: string[];
  features: string[];
}
