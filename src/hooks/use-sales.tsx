import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Sale, SaleWithDetails, SaleStatus } from '@/types/sale';

const mockSales: Sale[] = [
  {
    id: '1',
    harvestId: '1',
    clientName: 'Boulangerie Martin',
    quantity: 50,
    price: 25,
    totalAmount: 1250,
    saleDate: '2024-07-20',
    deliveryDate: '2024-07-22',
    paymentDate: '2024-07-25',
    status: 'paid',
    notes: 'Client fidèle, paiement rapide',
    createdAt: '2024-07-20T09:00:00Z'
  },
  {
    id: '2',
    harvestId: '1',
    clientName: 'Coopérative Agricole',
    quantity: 70,
    price: 22,
    totalAmount: 1540,
    saleDate: '2024-07-18',
    deliveryDate: '2024-07-20',
    status: 'delivered',
    notes: 'Vente en gros, conditions négociées',
    createdAt: '2024-07-18T14:30:00Z'
  },
  {
    id: '3',
    harvestId: '2',
    clientName: 'Restaurant Le Jardin',
    quantity: 25,
    price: 30,
    totalAmount: 750,
    saleDate: '2024-07-16',
    status: 'confirmed',
    notes: 'Tomates bio pour restaurant gastronomique',
    createdAt: '2024-07-16T11:00:00Z'
  }
];

export const useSales = () => {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addSale = async (saleData: Omit<Sale, 'id' | 'createdAt' | 'totalAmount'>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const totalAmount = saleData.quantity * saleData.price;
      
      const newSale: Sale = {
        ...saleData,
        id: Date.now().toString(),
        totalAmount,
        createdAt: new Date().toISOString(),
      };
      
      setSales(prev => [newSale, ...prev]);
      
      toast({
        title: "Vente ajoutée",
        description: "La vente a été ajoutée avec succès",
      });
      
      return newSale;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la vente",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSale = async (id: string, data: Partial<Sale>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSales(prev => prev.map(sale => {
        if (sale.id === id) {
          const updatedSale = { ...sale, ...data };
          // Recalculer le montant total si quantité ou prix changent
          if (data.quantity !== undefined || data.price !== undefined) {
            updatedSale.totalAmount = updatedSale.quantity * updatedSale.price;
          }
          return updatedSale;
        }
        return sale;
      }));
      
      toast({
        title: "Succès",
        description: "Vente mise à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la vente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSaleStatus = async (id: string, status: SaleStatus) => {
    const updateData: Partial<Sale> = { status };
    
    // Ajouter la date de paiement si le statut devient "paid"
    if (status === 'paid') {
      updateData.paymentDate = new Date().toISOString().split('T')[0];
    }
    
    // Ajouter la date de livraison si le statut devient "delivered"
    if (status === 'delivered') {
      updateData.deliveryDate = new Date().toISOString().split('T')[0];
    }
    
    await updateSale(id, updateData);
  };

  const deleteSale = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSales(prev => prev.filter(sale => sale.id !== id));
      
      toast({
        title: "Succès",
        description: "Vente supprimée",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la vente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSalesByHarvest = (harvestId: string) => {
    return sales.filter(sale => sale.harvestId === harvestId);
  };

  return {
    sales,
    isLoading,
    addSale,
    updateSale,
    updateSaleStatus,
    deleteSale,
    getSalesByHarvest
  };
};