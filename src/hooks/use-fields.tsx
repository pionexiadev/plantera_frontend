import { useEffect, useState } from 'react';
import axios from 'axios';
import { Field } from '@/types/field';
import { ParcelleStats } from '@/types/ParcelleStats';
import { useAuth } from '@/contexts/AuthContext'; // Pour accéder au token

// ✅ URL du backend via .env
const API_URL = `${import.meta.env.VITE_API_URL}/parcelles`;

export function useFields() {
  const { token } = useAuth();
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<ParcelleStats>({
    totalParcelles: 0,
    surfaceTotale: 0,
    hectaresDisponibles: 0,
  });

  const getAuthHeader = () => {
    return token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
  };

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await axios.get<Field[]>(API_URL, getAuthHeader());
        setFields(res.data);
      } catch (err) {
        console.error('❌ Erreur chargement des parcelles', err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await axios.get<ParcelleStats>(`${API_URL}/stats`, getAuthHeader());
        setStats(res.data);
      } catch (err) {
        console.error('❌ Erreur chargement des stats', err);
      }
    };

    if (token) {
      fetchFields();
      fetchStats();
    }
  }, [token]);

  const addField = async (fieldData: Partial<Field>) => {
    try {
      const res = await axios.post<Field>(API_URL, fieldData, getAuthHeader());
      setFields(prev => [...prev, res.data]);
    } catch (err) {
      console.error('❌ Erreur ajout parcelle', err);
    }
  };

  const updateField = async (id: number, data: Partial<Field>) => {
    try {
      const res = await axios.put<Field>(`${API_URL}/${id}`, data, getAuthHeader());
      setFields(prev => prev.map(field => (field.id === id ? res.data : field)));
    } catch (err) {
      console.error('❌ Erreur modification parcelle', err);
    }
  };

  const deleteField = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      setFields(prev => prev.filter(field => field.id !== id));
    } catch (err) {
      console.error('❌ Erreur suppression parcelle', err);
    }
  };

  return {
    fields,
    isLoading,
    stats,
    addField,
    updateField,
    deleteField,
  };
}
