import { useEffect, useState } from 'react';
import api from '@/lib/axiosInstance';
import { useToast } from '@/hooks/use-toast';
import { Harvest, HarvestStatus, HarvestPayload } from '@/types/harvest';

export const useHarvests = () => {
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const BASE_URL = '/recoltes';

  useEffect(() => {
    fetchHarvests();
  }, []);

  const fetchHarvests = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<Harvest[]>(BASE_URL);
      setHarvests(response.data);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Impossible de charger les récoltes",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addHarvest = async (payload: HarvestPayload) => {
    setIsLoading(true);
    try {
      const response = await api.post<Harvest>(BASE_URL, {
        ...payload,
        parcelle: { id: payload.parcelleId },
        culture: { id: payload.cultureId }
      });

      setHarvests(prev => [response.data, ...prev]);

      toast({
        title: 'Récolte ajoutée',
        description: 'La récolte a été ajoutée avec succès',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Impossible d'ajouter la récolte",
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateHarvest = async (id: number, payload: Partial<HarvestPayload>) => {
    setIsLoading(true);
    try {
      const response = await api.put<Harvest>(`${BASE_URL}/${id}`, {
        ...payload,
        parcelle: payload.parcelleId ? { id: payload.parcelleId } : undefined,
        culture: payload.cultureId ? { id: payload.cultureId } : undefined
      });

      setHarvests(prev => prev.map(h => h.id === id ? response.data : h));

      toast({
        title: 'Récolte mise à jour',
        description: 'Les informations ont été enregistrées',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Impossible de mettre à jour la récolte",
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mise à jour du statut sans bloquer isLoading
  const updateHarvestStatus = async (id: number, statut: HarvestStatus) => {
    try {
      const response = await api.put<Harvest>(`${BASE_URL}/${id}`, { statut });
      setHarvests(prev => prev.map(h => h.id === id ? response.data : h));
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Impossible de mettre à jour le statut de la récolte",
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteHarvest = async (id: number) => {
    setIsLoading(true);
    try {
      await api.delete(`${BASE_URL}/${id}`);
      setHarvests(prev => prev.filter(h => h.id !== id));

      toast({
        title: 'Récolte supprimée',
        description: 'Elle a bien été supprimée',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Impossible de supprimer la récolte",
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getHarvestsByCulture = (cultureId: number) => {
    return harvests.filter(h => h.culture.id === cultureId);
  };

  return {
    harvests,
    isLoading,
    addHarvest,
    updateHarvest,
    updateHarvestStatus,
    deleteHarvest,
    getHarvestsByCulture,
  };
};
