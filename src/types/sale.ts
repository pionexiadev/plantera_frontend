
export type SaleStatus = 'pending' | 'confirmed' | 'delivered' | 'paid' | 'canceled';

export interface Sale {
  id: string;
  harvestId: string;
  clientName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  saleDate: string;
  deliveryDate?: string;
  paymentDate?: string;
  status: SaleStatus;
  notes?: string;
  createdAt: string;
}

export interface SaleWithDetails extends Sale {
  harvest: {
    id: string;
    cultureId: string;
    harvestDate: string;
    quantity: number;
    quality: string;
  };
  culture: {
    id: string;
    name: string;
    variety: string;
  };
  field: {
    id: string;
    name: string;
    location: string;
    surface: number;
    culture: string;
  };
}

// Legacy type for backward compatibility
export interface SaleWithHarvest extends SaleWithDetails {}
