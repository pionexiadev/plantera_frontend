import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    title: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  seller: string;
  trackingNumber?: string;
}

const OrderManagement = () => {
  const [orders] = useState<Order[]>([
    {
      id: 'CMD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 189.99,
      seller: 'Coopérative Agricole du Nord',
      trackingNumber: 'FR1234567890',
      items: [
        {
          title: 'Semences de Blé Premium',
          quantity: 2,
          price: 89.99,
          image: '/placeholder.svg'
        },
        {
          title: 'Engrais Bio-Naturel',
          quantity: 1,
          price: 45.50,
          image: '/placeholder.svg'
        }
      ]
    },
    {
      id: 'CMD-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 559.99,
      seller: 'HydroTech',
      trackingNumber: 'FR0987654321',
      items: [
        {
          title: 'Système d\'irrigation goutte-à-goutte',
          quantity: 1,
          price: 559.99,
          image: '/placeholder.svg'
        }
      ]
    },
    {
      id: 'CMD-003',
      date: '2024-01-22',
      status: 'pending',
      total: 249.90,
      seller: 'AgroTech Solutions',
      items: [
        {
          title: 'Analyseur de sol portable',
          quantity: 1,
          price: 249.90,
          image: '/placeholder.svg'
        }
      ]
    }
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(price);
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <Package className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const filterOrdersByStatus = (status?: Order['status']) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Commande {order.id}</CardTitle>
            <p className="text-sm text-slate-500">
              {new Date(order.date).toLocaleDateString('fr-FR')} • {order.seller}
            </p>
          </div>
          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
            {getStatusIcon(order.status)}
            {getStatusLabel(order.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="h-12 w-12 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-slate-500">
                  Quantité: {item.quantity} • {formatPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <div>
            <p className="font-semibold text-lg">{formatPrice(order.total)}</p>
            {order.trackingNumber && (
              <p className="text-xs text-slate-500">
                Suivi: {order.trackingNumber}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Détails
            </Button>
            {order.status === 'shipped' && (
              <Button size="sm">
                <Truck className="h-4 w-4 mr-1" />
                Suivre
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Mes Commandes</h3>
        <p className="text-slate-600">Suivez l'état de vos commandes et livraisons</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En cours</TabsTrigger>
          <TabsTrigger value="shipped">Expédiées</TabsTrigger>
          <TabsTrigger value="delivered">Livrées</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterOrdersByStatus('pending').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="shipped" className="space-y-4">
          {filterOrdersByStatus('shipped').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          {filterOrdersByStatus('delivered').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderManagement;