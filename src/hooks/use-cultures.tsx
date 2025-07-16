import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Culture, CulturePayload } from '@/types/culture';
import axios from '@/lib/axiosInstance';

export const useCultures = () => {
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCultures();
  }, []);

  const fetchCultures = async () => {
    setIsLoading(true);
    try {
      // ✅ on attend un tableau direct, pas un objet { cultures: [...] }
      const response = await axios.get<Culture[]>('/cultures');

      if (!Array.isArray(response.data)) {
        throw new Error('Format de données invalide depuis /cultures');
      }

      setCultures(response.data);
      console.log('📦 Cultures reçues depuis API :', response.data);
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des cultures :', error);
      toast({
        title: 'Erreur',
        description: "Impossible de charger les cultures depuis l'API",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addCulture = async (newCulture: CulturePayload) => {
    setIsLoading(true);
    try {
      const response = await axios.post<Culture>('/cultures', newCulture);

      // ✅ sécurise prev au cas où il est undefined
      setCultures(prev => Array.isArray(prev) ? [...prev, response.data] : [response.data]);

      toast({
        title: 'Succès',
        description: 'Culture ajoutée avec succès',
      });
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de la culture :", error);
      toast({
        title: 'Erreur',
        description: "Impossible d'ajouter la culture",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCulture = async (id: number, updatedFields: Partial<Culture>) => {
    setIsLoading(true);
    try {
      const response = await axios.put<Culture>(`/cultures/${id}`, updatedFields);
      setCultures(prev => prev.map(c => (c.id === id ? response.data : c)));

      toast({
        title: 'Succès',
        description: 'Culture mise à jour',
      });
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour de la culture :", error);
      toast({
        title: 'Erreur',
        description: "Impossible de modifier la culture",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCultureStatus = async (id: number, statut: Culture['statut']) => {
    setIsLoading(true);
    try {
      const response = await axios.put<Culture>(`/cultures/${id}`, { statut });

      setCultures(prev =>
        prev.map(c => (c.id === id ? { ...c, statut } : c))
      );


      toast({
        title: 'Succès',
        description: 'Statut de la culture mis à jour',
      });
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du statut :", error);
      toast({
        title: 'Erreur',
        description: "Impossible de mettre à jour le statut",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };



  const deleteCulture = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`/cultures/${id}`);
      setCultures(prev => prev.filter(c => c.id !== id));

      toast({
        title: 'Succès',
        description: 'Culture supprimée',
      });
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de la culture :", error);
      toast({
        title: 'Erreur',
        description: "Impossible de supprimer la culture",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cultures,
    isLoading,
    addCulture,
    updateCulture,
    updateCultureStatus,
    deleteCulture,
    refreshCultures: fetchCultures,
  };
};
