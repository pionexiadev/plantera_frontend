import { Culture } from '@/types/culture';

export function useCultureProgress(field: Culture) {
  const daysUntilHarvest = () => {
    const today = new Date();
    const harvestDate = new Date(field.estimatedHarvestDate);
    const diffTime = harvestDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateGrowthProgress = () => {
    const plantDate = new Date(field.plantedDate);
    const harvestDate = new Date(field.estimatedHarvestDate);
    const today = new Date();
    
    const totalDuration = harvestDate.getTime() - plantDate.getTime();
    const currentProgress = today.getTime() - plantDate.getTime();
    
    if (field.status === 'harvested') return 100;
    if (currentProgress < 0) return 0;
    if (currentProgress > totalDuration) return 100;
    
    return Math.round((currentProgress / totalDuration) * 100);
  };

  const getGrowthStageText = (progress: number) => {
    if (field.status === 'harvested') return 'Cycle complet';
    
    if (progress < 30) return 'Phase initiale';
    if (progress < 60) return 'Croissance';
    if (progress < 90) return 'Maturation';
    return 'Prêt à récolter';
  };

  const growthProgress = calculateGrowthProgress();

  return {
    daysUntilHarvest: daysUntilHarvest(),
    growthProgress,
    growthStageText: getGrowthStageText(growthProgress)
  };
}