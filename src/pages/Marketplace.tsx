
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid, List, ShoppingCart, Star, Package, Truck, Tag, Plus } from 'lucide-react';
import MarketplaceProductCard from '@/components/marketplace/MarketplaceProductCard';
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters';
import MarketplaceCartDialog from '@/components/marketplace/MarketplaceCartDialog';
import SellProductDialog from '@/components/marketplace/SellProductDialog';
import ProductDetailsModal from '@/components/marketplace/ProductDetailsModal';
import OrderManagement from '@/components/marketplace/OrderManagement';
import { MarketplaceProduct } from '@/types/marketplace';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends MarketplaceProduct {
  quantity: number;
}

const MarketplacePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false);
  const [myProducts, setMyProducts] = useState<MarketplaceProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();
  
  // Initialize sample data
  React.useEffect(() => {
    const sampleProducts: MarketplaceProduct[] = [
    {
      id: '1',
      title: 'Semences de Blé Premium',
      description: 'Semences de blé de haute qualité pour une germination optimale et un rendement supérieur.',
      price: 89.99,
      image: '/placeholder.svg',
      category: 'semences',
      rating: 4.5,
      seller: 'Coopérative Agricole du Nord',
      inStock: true,
      tags: ['bio', 'certifié']
    },
    {
      id: '2',
      title: 'Tracteur John-350',
      description: 'Tracteur compact polyvalent pour petites et moyennes exploitations.',
      price: 24999.99,
      image: '/placeholder.svg',
      category: 'equipement',
      rating: 4.7,
      seller: 'AgriMachines',
      inStock: true,
      tags: ['efficace', 'économique']
    },
    {
      id: '3',
      title: 'Engrais Bio-Naturel',
      description: 'Engrais biologique pour cultures maraîchères, enrichi en nutriments essentiels.',
      price: 45.50,
      image: '/placeholder.svg',
      category: 'engrais',
      rating: 4.2,
      seller: 'NaturAgro',
      inStock: true,
      tags: ['bio', 'naturel']
    },
    {
      id: '4',
      title: 'Système d\'irrigation goutte-à-goutte',
      description: 'Système d\'irrigation efficace pour économiser l\'eau et optimiser la croissance des plantes.',
      price: 559.99,
      image: '/placeholder.svg',
      category: 'irrigation',
      rating: 4.8,
      seller: 'HydroTech',
      inStock: false,
      tags: ['économie d\'eau', 'précision']
    },
    {
      id: '5',
      title: 'Produit de protection des cultures',
      description: 'Solution naturelle contre les parasites et maladies communes des cultures.',
      price: 34.75,
      image: '/placeholder.svg',
      category: 'protection',
      rating: 3.9,
      seller: 'BioProtect',
      inStock: true,
      tags: ['naturel', 'efficace']
    },
    {
      id: '6',
      title: 'Analyseur de sol portable',
      description: 'Appareil d\'analyse rapide pour connaître la composition de votre sol en temps réel.',
      price: 249.90,
      image: '/placeholder.svg',
      category: 'equipement',
      rating: 4.6,
      seller: 'AgroTech Solutions',
      inStock: true,
      tags: ['analyse', 'précision']
    },
  ];
  setProducts(sampleProducts);
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'semences', name: 'Semences' },
    { id: 'engrais', name: 'Engrais' },
    { id: 'equipement', name: 'Équipement' },
    { id: 'irrigation', name: 'Irrigation' },
    { id: 'protection', name: 'Protection' },
  ];

  const addToCart = (product: MarketplaceProduct) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(prev => prev.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
    }
    toast({
      title: "Produit ajouté",
      description: `${product.title} a été ajouté au panier`,
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    toast({
      title: "Commande validée",
      description: `Commande de ${cartItems.length} article(s) validée avec succès!`,
    });
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleSellProduct = (productData: Omit<MarketplaceProduct, 'id' | 'rating' | 'seller' | 'inStock'>) => {
    const newProduct: MarketplaceProduct = {
      ...productData,
      id: Date.now().toString(),
      rating: 0,
      seller: 'Votre exploitation',
      inStock: true,
    };
    
    setProducts(prev => [newProduct, ...prev]);
    setMyProducts(prev => [newProduct, ...prev]);
    
    toast({
      title: "Produit ajouté",
      description: "Votre produit a été publié sur le marché",
    });
  };

  const handleViewDetails = (product: MarketplaceProduct) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Marché Digital</h1>
            <p className="text-slate-600">Achetez et vendez des produits agricoles en ligne</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-white relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Panier ({cartItemsCount})
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
            <Button onClick={() => setIsSellDialogOpen(true)}>
              <Tag className="h-4 w-4 mr-2" />
              Vendre un produit
            </Button>
          </div>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="buy">Acheter</TabsTrigger>
            <TabsTrigger value="sell">Mes Ventes</TabsTrigger>
            <TabsTrigger value="orders">Mes Commandes</TabsTrigger>
          </TabsList>
          <TabsContent value="buy" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-64 space-y-6">
                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold">Filtres</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <MarketplaceFilters 
                      activeCategory={activeCategory} 
                      setActiveCategory={setActiveCategory}
                      categories={categories}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                  <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Rechercher des produits..." 
                      className="pl-9 bg-white"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 self-end">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={`${viewMode === 'grid' ? 'bg-slate-100' : 'bg-white'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={`${viewMode === 'list' ? 'bg-slate-100' : 'bg-white'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className={viewMode === 'grid' ? 
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
                    "space-y-4"}>
                    {filteredProducts.map(product => (
                      <MarketplaceProductCard
                        key={product.id}
                        product={product}
                        viewMode={viewMode}
                        onAddToCart={addToCart}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="border-slate-200 text-center p-8">
                    <Package className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                    <p className="text-slate-600">
                      Essayez de modifier vos filtres ou votre recherche
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sell">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Mes produits en vente</CardTitle>
                <CardDescription>Gérez vos annonces et suivez vos ventes</CardDescription>
              </CardHeader>
              <CardContent>
                {myProducts.length === 0 ? (
                  <div className="text-center p-12">
                    <Package className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Aucune vente active</h3>
                    <p className="text-slate-600 mb-6">
                      Vous n'avez pas encore de produits en vente sur le marché
                    </p>
                    <Button onClick={() => setIsSellDialogOpen(true)}>
                      <Tag className="h-4 w-4 mr-2" />
                      Créer une annonce
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myProducts.map(product => (
                      <MarketplaceProductCard
                        key={product.id}
                        product={product}
                        viewMode="grid"
                        onAddToCart={addToCart}
                        onViewDetails={handleViewDetails}
                        isOwner={true}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>
        </Tabs>

        {/* Cart Dialog */}
        <MarketplaceCartDialog
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />

        {/* Sell Product Dialog */}
        <SellProductDialog
          isOpen={isSellDialogOpen}
          onClose={() => setIsSellDialogOpen(false)}
          onSubmit={handleSellProduct}
        />

        {/* Product Details Modal */}
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onAddToCart={addToCart}
        />
      </div>
    </DashboardLayout>
  );
};

export default MarketplacePage;
