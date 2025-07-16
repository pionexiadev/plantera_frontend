import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  Activity, 
  Droplet, 
  ChevronRight, 
  AlertTriangle, 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Euro,
  Calendar,
  Clock,
  Users,
  Target,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
  Shield,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CultureProgressBar } from "../cultures/CultureProgressBar";
import { 
  LineChart, 
  Line, 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { useState } from "react";
import WeatherWidget from './WeatherWidget';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardOverview() {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Données complètes du tableau de bord
  const overallStats = {
    totalRevenue: 45680,
    monthlyGrowth: 12.5,
    totalFields: 8,
    activeProjects: 15,
    upcomingTasks: 6,
    alerts: 2
  };

  const cultureStats = {
    totalFields: 8,
    totalArea: 156,
    fieldsToHarvest: 3,
    averageHealth: 88,
    monthlyProgress: [
      { month: 'Jan', planted: 2, growing: 4, ready: 1, harvested: 1 },
      { month: 'Fév', planted: 3, growing: 3, ready: 1, harvested: 1 },
      { month: 'Mar', planted: 1, growing: 5, ready: 2, harvested: 0 },
      { month: 'Avr', planted: 2, growing: 4, ready: 2, harvested: 0 },
      { month: 'Mai', planted: 1, growing: 4, ready: 3, harvested: 0 }
    ],
    healthTrend: [
      { week: 'S1', health: 82 },
      { week: 'S2', health: 85 },
      { week: 'S3', health: 87 },
      { week: 'S4', health: 88 }
    ],
    cropTypes: [
      { name: 'Blé', area: 45, color: '#4CAF50' },
      { name: 'Maïs', area: 38, color: '#8BC34A' },
      { name: 'Colza', area: 28, color: '#CDDC39' },
      { name: 'Orge', area: 25, color: '#FFA726' },
      { name: 'Autres', area: 20, color: '#90A4AE' }
    ]
  };

  const livestockStats = {
    totalAnimals: 67,
    sickAnimals: 2,
    averageWeight: 468,
    birthsThisMonth: 4,
    vaccinated: 95,
    weeklyHealth: [
      { week: 'S1', healthy: 64, sick: 3 },
      { week: 'S2', healthy: 65, sick: 2 },
      { week: 'S3', healthy: 66, sick: 1 },
      { week: 'S4', healthy: 65, sick: 2 }
    ],
    animalTypes: [
      { type: 'Vaches', count: 32, health: 98 },
      { type: 'Veaux', count: 18, health: 94 },
      { type: 'Taureaux', count: 3, health: 100 },
      { type: 'Moutons', count: 10, health: 90 },
      { type: 'Chèvres', count: 4, health: 95 }
    ]
  };

  const irrigationStats = {
    systemStatus: "Optimal",
    waterUsed: 14250,
    efficiency: 94,
    nextMaintenance: "2025-05-12",
    zones: 6,
    activeSensors: 24,
    weeklyUsage: [
      { day: 'Lun', usage: 1850, efficiency: 92 },
      { day: 'Mar', usage: 2100, efficiency: 94 },
      { day: 'Mer', usage: 1750, efficiency: 96 },
      { day: 'Jeu', usage: 2450, efficiency: 91 },
      { day: 'Ven', usage: 2200, efficiency: 93 },
      { day: 'Sam', usage: 1950, efficiency: 95 },
      { day: 'Dim', usage: 1950, efficiency: 97 }
    ],
    sensorStatus: [
      { zone: 'Nord', temp: 22, humidity: 65, soil: 45 },
      { zone: 'Sud', temp: 24, humidity: 58, soil: 52 },
      { zone: 'Est', temp: 21, humidity: 72, soil: 38 },
      { zone: 'Ouest', temp: 23, humidity: 61, soil: 48 }
    ]
  };

  const weatherData = {
    current: { temp: 23, condition: "Ensoleillé", humidity: 62, wind: 8 },
    today: { min: 16, max: 25, precipitation: 0 },
    forecast: [
      { day: 'Aujourd\'hui', temp: 23, icon: <Sun className="h-6 w-6 text-amber-400" />, rain: 0 },
      { day: 'Demain', temp: 25, icon: <Cloud className="h-6 w-6 text-slate-400" />, rain: 10 },
      { day: 'Mercredi', temp: 21, icon: <CloudRain className="h-6 w-6 text-blue-400" />, rain: 75 },
      { day: 'Jeudi', temp: 19, icon: <CloudRain className="h-6 w-6 text-blue-400" />, rain: 60 },
      { day: 'Vendredi', temp: 22, icon: <Wind className="h-6 w-6 text-blue-300" />, rain: 20 }
    ],
    alerts: [
      { type: 'warning', message: 'Pluie attendue mercredi - Planifier l\'irrigation' },
      { type: 'info', message: 'Température optimale pour la croissance des cultures' }
    ]
  };

  const financialData = {
    revenue: 45680,
    expensesTotal: 28450,
    profit: 17230,
    margin: 37.7,
    monthlyTrend: [
      { month: 'Jan', revenue: 32500, expenses: 22800, profit: 9700 },
      { month: 'Fév', revenue: 35800, expenses: 24200, profit: 11600 },
      { month: 'Mar', revenue: 38200, expenses: 25900, profit: 12300 },
      { month: 'Avr', revenue: 42400, expenses: 27100, profit: 15300 },
      { month: 'Mai', revenue: 45680, expenses: 28450, profit: 17230 }
    ],
    expensesByCategory: [
      { category: 'Semences', amount: 6500, percent: 23 },
      { category: 'Engrais', amount: 5800, percent: 20 },
      { category: 'Carburant', amount: 4200, percent: 15 },
      { category: 'Irrigation', amount: 3600, percent: 13 },
      { category: 'Main d\'œuvre', amount: 4500, percent: 16 },
      { category: 'Équipement', amount: 3850, percent: 13 }
    ]
  };

  const recentActivities = [
    { 
      id: 1,
      icon: <Leaf className="h-4 w-4 text-green-600" />,
      bgColor: "bg-green-50",
      title: "Parcelle Nord - Plantation terminée",
      description: "Maïs planté sur 12 hectares",
      time: "Il y a 30 min",
      priority: "success"
    },
    {
      id: 2,
      icon: <Droplet className="h-4 w-4 text-blue-600" />,
      bgColor: "bg-blue-50",
      title: "Irrigation automatique activée",
      description: "Zone Sud - 850L programmés",
      time: "Il y a 2h",
      priority: "info"
    },
    {
      id: 3,
      icon: <Activity className="h-4 w-4 text-purple-600" />,
      bgColor: "bg-purple-50",
      title: "Vache #84 - Naissance",
      description: "Veau femelle, 28kg - Excellente santé",
      time: "Il y a 5h",
      priority: "success"
    },
    {
      id: 4,
      icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
      bgColor: "bg-amber-50",
      title: "Maintenance requise",
      description: "Tracteur #2 - Révision des 500h",
      time: "Hier",
      priority: "warning"
    },
    {
      id: 5,
      icon: <Euro className="h-4 w-4 text-emerald-600" />,
      bgColor: "bg-emerald-50",
      title: "Vente réalisée",
      description: "500kg de blé - 2,450€",
      time: "Il y a 2 jours",
      priority: "success"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Récolte parcelle Sud-Est",
      description: "Blé - 18 hectares",
      dueDate: "Dans 2 jours",
      priority: "high",
      progress: 85,
      assignee: "Équipe A"
    },
    {
      id: 2,
      title: "Maintenance système irrigation",
      description: "Vérification des capteurs Zone Nord",
      dueDate: "Dans 4 jours",
      priority: "medium",
      progress: 30,
      assignee: "Technicien"
    },
    {
      id: 3,
      title: "Vaccination troupeau",
      description: "Rappel annuel - 67 animaux",
      dueDate: "Dans 1 semaine",
      priority: "high",
      progress: 0,
      assignee: "Vétérinaire"
    },
    {
      id: 4,
      title: "Analyse sols parcelle Ouest",
      description: "Prélèvements et tests pH",
      dueDate: "Dans 10 jours",
      priority: "low",
      progress: 60,
      assignee: "Laboratoire"
    }
  ];

  const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFA726', '#90A4AE'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-plantera-green">Tableau de bord</h1>
          <p className="text-slate-600 mt-1">
            Bienvenue {user?.name} - Profil : {user?.profileType === 'agriculteur' ? 'Agriculteur' : 
                                              user?.profileType === 'veterinaire' ? 'Vétérinaire' :
                                              user?.profileType === 'grossiste' ? 'Grossiste' :
                                              user?.profileType === 'gie' ? 'GIE / Coopérative' :
                                              user?.profileType === 'vendeur' ? 'Vendeur' :
                                              user?.profileType === 'acheteur' ? 'Acheteur' : 'Investisseur'}
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="analytics">Analyses détaillées</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="overview" className="space-y-6">
          {/* Statistiques principales - seulement pour les agriculteurs */}
          {hasPermission('cultures') && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Cultures Card */}
              <Card className="bg-gradient-to-br from-plantera-soft-green to-white border-plantera-green/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-plantera-green" />
                      Cultures
                    </div>
                    <Badge variant="secondary" className="text-plantera-green">
                      +{cultureStats.fieldsToHarvest} prêtes
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Total parcelles</span>
                      <span className="font-bold text-xl">{cultureStats.totalFields}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Surface totale</span>
                      <span className="font-semibold">{cultureStats.totalArea} ha</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Santé moyenne</span>
                        <span className="font-semibold text-plantera-green">{cultureStats.averageHealth}%</span>
                      </div>
                      <Progress value={cultureStats.averageHealth} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/cultures')}>
                    Gérer les cultures <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Élevage Card */}
              {hasPermission('livestock') && (
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        Élevage
                      </div>
                      <Badge variant="outline" className="text-blue-600 border-blue-300">
                        {livestockStats.sickAnimals} malades
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total animaux</span>
                        <span className="font-bold text-xl">{livestockStats.totalAnimals}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Poids moyen</span>
                        <span className="font-semibold">{livestockStats.averageWeight} kg</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Vaccinés</span>
                          <span className="font-semibold text-blue-600">{livestockStats.vaccinated}%</span>
                        </div>
                        <Progress value={livestockStats.vaccinated} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/livestock')}>
                      Gérer l'élevage <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Irrigation Card */}
              {hasPermission('irrigation') && (
                <Card className="bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplet className="h-5 w-5 text-cyan-600" />
                        Irrigation
                      </div>
                      <Badge variant="secondary" className="text-cyan-600 bg-cyan-100">
                        <Zap className="h-3 w-3 mr-1" />
                        {irrigationStats.systemStatus}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Eau utilisée</span>
                        <span className="font-bold text-xl">{irrigationStats.waterUsed}L</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Capteurs actifs</span>
                        <span className="font-semibold">{irrigationStats.activeSensors}/{irrigationStats.zones * 4}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Efficacité</span>
                          <span className="font-semibold text-cyan-600">{irrigationStats.efficiency}%</span>
                        </div>
                        <Progress value={irrigationStats.efficiency} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/irrigation')}>
                      Gérer l'irrigation <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Finances Card */}
              <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Euro className="h-5 w-5 text-emerald-600" />
                      Finances
                    </div>
                    <Badge variant="secondary" className="text-emerald-600 bg-emerald-100">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{overallStats.monthlyGrowth}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Revenus</span>
                      <span className="font-bold text-xl text-emerald-600">{financialData.revenue}€</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Bénéfice</span>
                      <span className="font-semibold text-emerald-600">{financialData.profit}€</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Marge</span>
                        <span className="font-semibold text-emerald-600">{financialData.margin}%</span>
                      </div>
                      <Progress value={financialData.margin} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/analytics')}>
                    Voir les finances <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Météo Widget - pour tous les utilisateurs */}
          <WeatherWidget city="Paris" />

          {/* Message pour les profils non-agriculteurs */}
          {!hasPermission('cultures') && (
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="text-4xl mb-4">
                    {user?.profileType === 'veterinaire' ? '🩺' : 
                     user?.profileType === 'grossiste' ? '📦' :
                     user?.profileType === 'gie' ? '🤝' :
                     user?.profileType === 'vendeur' ? '🏪' :
                     user?.profileType === 'acheteur' ? '🛒' : '💰'}
                  </div>
                  <h2 className="text-2xl font-bold text-plantera-darkGreen">
                    Bienvenue sur Plantera !
                  </h2>
                  <p className="text-plantera-slate/70 max-w-md mx-auto">
                    {user?.profileType === 'veterinaire' 
                      ? 'Accédez aux informations sur le bétail des agriculteurs qui vous font confiance et explorez notre marketplace.'
                      : 'Découvrez notre marketplace pour acheter et vendre des produits agricoles de qualité.'
                    }
                  </p>
                  <div className="flex gap-4 justify-center mt-6">
                    <Button onClick={() => navigate('/dashboard/marketplace')} className="bg-gradient-primary">
                      Accéder au Marketplace
                    </Button>
                    {user?.profileType === 'veterinaire' && (
                      <Button variant="outline" onClick={() => navigate('/dashboard/livestock')}>
                        Suivi des animaux
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activité récente et tâches - seulement pour les agriculteurs */}
          {hasPermission('cultures') && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-slate-600" />
                    Activité récente
                  </CardTitle>
                  <CardDescription>Les dernières actions sur votre exploitation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.slice(0, 4).map((activity) => (
                      <div key={activity.id} className="flex gap-3 items-start p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className={`${activity.bgColor} p-2 rounded-full flex-shrink-0`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-slate-600 mt-1">{activity.description}</p>
                          <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                        <Badge variant={activity.priority === 'success' ? 'default' : 
                                       activity.priority === 'warning' ? 'destructive' : 'secondary'} 
                               className="text-xs">
                          {activity.priority === 'success' ? <CheckCircle2 className="h-3 w-3" /> :
                           activity.priority === 'warning' ? <XCircle className="h-3 w-3" /> :
                           <AlertCircle className="h-3 w-3" />}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    Voir toute l'activité <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-slate-600" />
                    Tâches prioritaires
                  </CardTitle>
                  <CardDescription>Planning et objectifs à court terme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.slice(0, 4).map((task) => (
                      <div key={task.id} className="space-y-2 p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{task.title}</p>
                            <p className="text-xs text-slate-600">{task.description}</p>
                          </div>
                          <Badge variant={task.priority === 'high' ? 'destructive' : 
                                        task.priority === 'medium' ? 'default' : 'secondary'} 
                                 className="text-xs">
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">{task.dueDate}</span>
                          <span className="text-slate-500">{task.assignee}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progression</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    Voir toutes les tâches <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Analytics tab - seulement pour les agriculteurs */}
        {hasPermission('analytics') && (
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Évolution des cultures */}
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des cultures</CardTitle>
                  <CardDescription>Progression mensuelle par statut</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={cultureStats.monthlyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="planted" stackId="1" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.6} name="Planté" />
                      <Area type="monotone" dataKey="growing" stackId="1" stroke="#8BC34A" fill="#8BC34A" fillOpacity={0.6} name="En croissance" />
                      <Area type="monotone" dataKey="ready" stackId="1" stroke="#FFA726" fill="#FFA726" fillOpacity={0.6} name="Prêt" />
                      <Area type="monotone" dataKey="harvested" stackId="1" stroke="#FF7043" fill="#FF7043" fillOpacity={0.6} name="Récolté" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Tendance financière */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance financière</CardTitle>
                  <CardDescription>Évolution des revenus et bénéfices</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={financialData.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value}€`} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={3} name="Revenus" />
                      <Line type="monotone" dataKey="expenses" stroke="#F44336" strokeWidth={2} name="Dépenses" />
                      <Line type="monotone" dataKey="profit" stroke="#2196F3" strokeWidth={3} name="Bénéfice" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Répartition des cultures */}
              <Card>
                <CardHeader>
                  <CardTitle>Répartition des cultures</CardTitle>
                  <CardDescription>Surface par type de culture (hectares)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={cultureStats.cropTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="area"
                        label={({ name, area }) => `${name}: ${area}ha`}
                      >
                        {cultureStats.cropTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} hectares`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Efficacité irrigation */}
              <Card>
                <CardHeader>
                  <CardTitle>Efficacité de l'irrigation</CardTitle>
                  <CardDescription>Consommation et efficacité par jour</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ReBarChart data={irrigationStats.weeklyUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="usage" fill="#03A9F4" name="Consommation (L)" />
                      <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#4CAF50" strokeWidth={3} name="Efficacité %" />
                    </ReBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
