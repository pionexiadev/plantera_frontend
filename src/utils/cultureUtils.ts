import { Culture } from '@/types/culture';

export const getStatusColor = (status: Culture['status']) => {
  switch(status) {
    case 'planted': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'growing': return 'bg-green-100 text-green-800 border-green-200';
    case 'ready': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'harvested': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusText = (status: Culture['status']) => {
  switch(status) {
    case 'planted': return 'Semé';
    case 'growing': return 'En croissance';
    case 'ready': return 'Prêt à récolter';
    case 'harvested': return 'Récolté';
    default: return status;
  }
};

export const getHealthColor = (health: number) => {
  if (health > 80) return 'text-green-600';
  if (health > 50) return 'text-amber-600';
  return 'text-red-600';
};

export const getIrrigationColor = (irrigation: number) => {
  if (irrigation > 70) return 'text-blue-600';
  if (irrigation > 40) return 'text-amber-600';
  return 'text-red-600';
};

export const getCardStyle = (cultureName: string) => {
  const cultureStyles: Record<string, string> = {
    'Maïs': 'from-amber-50 to-amber-100 border-amber-200',
    'Blé': 'from-amber-50 to-yellow-100 border-amber-200',
    'Riz': 'from-blue-50 to-teal-100 border-blue-200',
    'Soja': 'from-green-50 to-emerald-100 border-green-200',
    'Orge': 'from-amber-50 to-orange-100 border-amber-200',
    'Avoine': 'from-stone-50 to-yellow-100 border-stone-200',
    'Sorgho': 'from-red-50 to-red-100 border-red-200',
    'Millet': 'from-amber-50 to-stone-100 border-amber-200',
    'Tournesol': 'from-yellow-50 to-orange-100 border-yellow-200',
    'Colza': 'from-yellow-50 to-lime-100 border-yellow-200'
  };
  
  return cultureStyles[cultureName] || 'from-white to-[#F2FCE2] border-green-200';
};