
import { ProfileTypeInfo } from '@/types/user';

export const PROFILE_TYPES: ProfileTypeInfo[] = [
  {
    id: 'agriculteur',
    title: 'Agriculteur',
    description: 'Gérez vos cultures, élevages et exploitations agricoles',
    icon: '🚜',
    color: '#22c55e',
    gradient: 'from-green-500 to-emerald-600',
    permissions: ['cultures', 'livestock', 'irrigation', 'analytics', 'marketplace', 'sales'],
    features: [
      'Gestion complète des cultures',
      'Suivi du bétail',
      'Système d\'irrigation IoT',
      'Analyses et rapports',
      'Marketplace intégrée'
    ]
  },
  {
    id: 'veterinaire',
    title: 'Vétérinaire',
    description: 'Suivez la santé des animaux et accompagnez les éleveurs',
    icon: '🩺',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    permissions: ['livestock-view', 'marketplace'],
    features: [
      'Suivi santé des animaux',
      'Historique médical',
      'Alertes sanitaires',
      'Communication avec éleveurs'
    ]
  },
  {
    id: 'grossiste',
    title: 'Grossiste',
    description: 'Achetez en gros et distribuez aux détaillants',
    icon: '📦',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    permissions: ['marketplace'],
    features: [
      'Achats en gros',
      'Gestion des stocks',
      'Logistique avancée',
      'Réseau de distribution'
    ]
  },
  {
    id: 'gie',
    title: 'GIE / Coopérative',
    description: 'Groupement d\'intérêt économique agricole',
    icon: '🤝',
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-violet-600',
    permissions: ['marketplace'],
    features: [
      'Mutualisation des ressources',
      'Achats groupés',
      'Services partagés',
      'Représentation collective'
    ]
  },
  {
    id: 'vendeur',
    title: 'Vendeur',
    description: 'Vendez vos produits sur la marketplace',
    icon: '🏪',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    permissions: ['marketplace'],
    features: [
      'Boutique en ligne',
      'Gestion des commandes',
      'Outils marketing',
      'Statistiques de vente'
    ]
  },
  {
    id: 'acheteur',
    title: 'Acheteur',
    description: 'Trouvez et achetez des produits agricoles',
    icon: '🛒',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    permissions: ['marketplace'],
    features: [
      'Catalogue complet',
      'Commandes simplifiées',
      'Suivi des livraisons',
      'Programme fidélité'
    ]
  },
  {
    id: 'investisseur',
    title: 'Investisseur',
    description: 'Investissez dans l\'agriculture moderne',
    icon: '💰',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
    permissions: ['marketplace'],
    features: [
      'Opportunités d\'investissement',
      'Analyses de rentabilité',
      'Suivi des performances',
      'Portfolio diversifié'
    ]
  }
];

export const getProfileTypeInfo = (type: string) => {
  return PROFILE_TYPES.find(p => p.id === type) || PROFILE_TYPES[0];
};

export const hasPermission = (userType: string, permission: string) => {
  const profileInfo = getProfileTypeInfo(userType);
  return profileInfo.permissions.includes(permission);
};
