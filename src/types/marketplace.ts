
export interface MarketplaceProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  seller: string;
  inStock: boolean;
  tags: string[];
}
