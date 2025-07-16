
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  ComposedChart, 
  Area, 
  Bar, 
  Line, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Pie
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { 
  LineChart as LineChartIcon, 
  BarChart2, 
  PieChart as PieChartIcon, 
  Calendar,
  ArrowUpRight,
  TrendingDown,
  Download,
  Filter
} from 'lucide-react';

// Données fictives pour les rendements par culture
const yieldData = [
  { name: 'Jan', maïs: 0, blé: 0, soja: 0 },
  { name: 'Fév', maïs: 0, blé: 0, soja: 0 },
  { name: 'Mar', maïs: 0, blé: 0, soja: 0 },
  { name: 'Avr', maïs: 10, blé: 15, soja: 5 },
  { name: 'Mai', maïs: 25, blé: 35, soja: 15 },
  { name: 'Juin', maïs: 45, blé: 60, soja: 30 },
  { name: 'Juil', maïs: 70, blé: 80, soja: 50 },
  { name: 'Août', maïs: 90, blé: 95, soja: 75 },
  { name: 'Sep', maïs: 80, blé: 70, soja: 90 },
  { name: 'Oct', maïs: 60, blé: 50, soja: 85 },
  { name: 'Nov', maïs: 30, blé: 20, soja: 45 },
  { name: 'Déc', maïs: 10, blé: 5, soja: 15 },
];

// Données fictives pour la consommation d'eau
const waterUsageData = [
  { name: 'Jan', valeur: 30, baseline: 35 },
  { name: 'Fév', valeur: 35, baseline: 35 },
  { name: 'Mar', valeur: 45, baseline: 40 },
  { name: 'Avr', valeur: 60, baseline: 50 },
  { name: 'Mai', valeur: 75, baseline: 65 },
  { name: 'Juin', valeur: 90, baseline: 80 },
  { name: 'Juil', valeur: 100, baseline: 90 },
  { name: 'Août', valeur: 95, baseline: 85 },
  { name: 'Sep', valeur: 80, baseline: 75 },
  { name: 'Oct', valeur: 65, baseline: 60 },
  { name: 'Nov', valeur: 45, baseline: 50 },
  { name: 'Déc', valeur: 35, baseline: 40 },
];

// Données fictives pour la répartition des cultures
const cropDistributionData = [
  { name: 'Maïs', value: 45, color: '#4CAF50' },
  { name: 'Blé', value: 32, color: '#FFC107' },
  { name: 'Soja', value: 18, color: '#2196F3' },
  { name: 'Riz', value: 5, color: '#9C27B0' },
];

// Données fictives pour les coûts vs revenus
const financialData = [
  { name: 'Jan', revenus: 12000, coûts: 8000, profit: 4000 },
  { name: 'Fév', revenus: 11000, coûts: 7500, profit: 3500 },
  { name: 'Mar', revenus: 15000, coûts: 9000, profit: 6000 },
  { name: 'Avr', revenus: 18000, coûts: 10000, profit: 8000 },
  { name: 'Mai', revenus: 22000, coûts: 12000, profit: 10000 },
  { name: 'Juin', revenus: 27000, coûts: 14000, profit: 13000 },
  { name: 'Juil', revenus: 30000, coûts: 15000, profit: 15000 },
  { name: 'Août', revenus: 32000, coûts: 16000, profit: 16000 },
  { name: 'Sep', revenus: 28000, coûts: 14500, profit: 13500 },
  { name: 'Oct', revenus: 24000, coûts: 13000, profit: 11000 },
  { name: 'Nov', revenus: 20000, coûts: 11000, profit: 9000 },
  { name: 'Déc', revenus: 17000, coûts: 9500, profit: 7500 },
];

// Calculs des statistiques générales
const calculateStats = () => {
  const totalRevenue = financialData.reduce((sum, item) => sum + item.revenus, 0);
  const totalCosts = financialData.reduce((sum, item) => sum + item.coûts, 0);
  const totalProfit = totalRevenue - totalCosts;
  const profitMargin = (totalProfit / totalRevenue) * 100;
  
  const currentMonthIndex = new Date().getMonth();
  const prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
  
  const currentMonthProfit = financialData[currentMonthIndex]?.profit || 0;
  const prevMonthProfit = financialData[prevMonthIndex]?.profit || 0;
  const profitChange = currentMonthProfit - prevMonthProfit;
  const profitChangePercent = prevMonthProfit !== 0 
    ? (profitChange / prevMonthProfit) * 100 
    : 0;
  
  return {
    totalRevenue,
    totalCosts,
    totalProfit,
    profitMargin,
    profitChange,
    profitChangePercent
  };
};

const stats = calculateStats();

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('annual');

  // Function to format currency values
  const formatCurrency = (value) => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR' 
      }).format(value);
    }
    return value;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Analyse & Prédictions</h1>
            <p className="text-muted-foreground">Visualisez et analysez les données de votre exploitation</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensuel</SelectItem>
                <SelectItem value="quarterly">Trimestriel</SelectItem>
                <SelectItem value="annual">Annuel</SelectItem>
                <SelectItem value="all">Toutes les données</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenus Totaux</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalRevenue.toLocaleString()} €</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+8.1%</span>
                </div>
                <span className="text-muted-foreground ml-2">par rapport à l'année précédente</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Coûts Totaux</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalCosts.toLocaleString()} €</h3>
                </div>
                <div className="p-2 bg-red-100 rounded-full">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <div className="flex items-center text-red-600">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  <span>+5.4%</span>
                </div>
                <span className="text-muted-foreground ml-2">par rapport à l'année précédente</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profit Total</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalProfit.toLocaleString()} €</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+12.3%</span>
                </div>
                <span className="text-muted-foreground ml-2">par rapport à l'année précédente</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Marge Bénéficiaire</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.profitMargin.toFixed(1)}%</h3>
                </div>
                <div className="p-2 bg-amber-100 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+2.5%</span>
                </div>
                <span className="text-muted-foreground ml-2">par rapport à l'année précédente</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="yields" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Rendements
            </TabsTrigger>
            <TabsTrigger value="water" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              Utilisation de l'eau
            </TabsTrigger>
            <TabsTrigger value="finances" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Finances
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Coûts vs Revenus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={financialData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="coûts" stackId="a" fill="#f44336" />
                        <Bar dataKey="revenus" stackId="a" fill="#4caf50" />
                        <Line type="monotone" dataKey="profit" stroke="#2196f3" strokeWidth={3} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Répartition des Cultures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cropDistributionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {cropDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} hectares`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Rendements par Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={yieldData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit=" t/ha" />
                      <Tooltip formatter={(value) => `${value} t/ha`} />
                      <Legend />
                      <Line type="monotone" dataKey="maïs" stroke="#4CAF50" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="blé" stroke="#FFC107" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="soja" stroke="#2196F3" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="yields" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rendements Comparatifs par Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={yieldData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit=" t/ha" />
                      <Tooltip formatter={(value) => `${value} t/ha`} />
                      <Legend />
                      <Bar dataKey="maïs" name="Maïs" fill="#4CAF50" />
                      <Bar dataKey="blé" name="Blé" fill="#FFC107" />
                      <Bar dataKey="soja" name="Soja" fill="#2196F3" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Rendement Moyen du Maïs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-green-600">35.0</div>
                    <div className="text-sm text-muted-foreground mt-1">tonnes/hectare</div>
                    <div className="mt-4 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1 text-green-600" />
                      <span className="text-green-600">+4.2%</span>
                      <span className="text-muted-foreground ml-2">vs année précédente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Rendement Moyen du Blé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-amber-600">42.5</div>
                    <div className="text-sm text-muted-foreground mt-1">tonnes/hectare</div>
                    <div className="mt-4 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1 text-green-600" />
                      <span className="text-green-600">+6.8%</span>
                      <span className="text-muted-foreground ml-2">vs année précédente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Rendement Moyen du Soja</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-blue-600">34.2</div>
                    <div className="text-sm text-muted-foreground mt-1">tonnes/hectare</div>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingDown className="h-4 w-4 mr-1 text-red-600" />
                      <span className="text-red-600">-1.5%</span>
                      <span className="text-muted-foreground ml-2">vs année précédente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="water" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Consommation d'Eau vs Référence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={waterUsageData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit=" m³" />
                      <Tooltip formatter={(value) => `${value} m³`} />
                      <Legend />
                      <Line type="monotone" dataKey="valeur" name="Consommation réelle" stroke="#2196F3" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="baseline" name="Référence sectorielle" stroke="#9E9E9E" strokeDasharray="5 5" strokeWidth={2} />
                      <Area type="monotone" dataKey="valeur" fill="#2196F3" fillOpacity={0.1} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Efficacité Hydrique Globale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-blue-600">83%</div>
                    <div className="text-sm text-muted-foreground mt-1">Indice d'efficacité</div>
                    <div className="mt-4 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1 text-green-600" />
                      <span className="text-green-600">+7.5%</span>
                      <span className="text-muted-foreground ml-2">vs année précédente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Économie d'Eau Estimée</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-green-600">14,500</div>
                    <div className="text-sm text-muted-foreground mt-1">m³ d'eau économisés</div>
                    <div className="mt-4 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1 text-green-600" />
                      <span className="text-green-600">+12.3%</span>
                      <span className="text-muted-foreground ml-2">vs année précédente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Empreinte Hydrique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-amber-600">1.2</div>
                    <div className="text-sm text-muted-foreground mt-1">m³/kg de produit</div>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingDown className="h-4 w-4 mr-1 text-green-600" />
                      <span className="text-green-600">-5.2%</span>
                      <span className="text-muted-foreground ml-2">vs année précédente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="finances" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyse Financière Mensuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={financialData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit=" €" />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="coûts" name="Coûts" fill="#f44336" />
                      <Bar dataKey="revenus" name="Revenus" fill="#4caf50" />
                      <Line type="monotone" dataKey="profit" name="Profit" stroke="#2196f3" strokeWidth={3} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rentabilité par Culture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Maïs', revenus: 156000, coûts: 82000, profit: 74000 },
                          { name: 'Blé', revenus: 124000, coûts: 68000, profit: 56000 },
                          { name: 'Soja', revenus: 95000, coûts: 52000, profit: 43000 },
                          { name: 'Riz', revenus: 45000, coûts: 28000, profit: 17000 }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis unit=" €" />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="revenus" name="Revenus" fill="#4caf50" />
                        <Bar dataKey="coûts" name="Coûts" fill="#f44336" />
                        <Bar dataKey="profit" name="Profit" fill="#2196f3" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Répartition des Coûts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Main d\'œuvre', value: 35, color: '#E91E63' },
                            { name: 'Intrants', value: 25, color: '#FF9800' },
                            { name: 'Matériel', value: 20, color: '#9C27B0' },
                            { name: 'Irrigation', value: 10, color: '#2196F3' },
                            { name: 'Autres', value: 10, color: '#607D8B' }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {cropDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
