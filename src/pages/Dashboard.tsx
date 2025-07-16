import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModernButton } from "@/components/ui/modern-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  Activity, 
  Droplet, 
  BarChart, 
  ChevronRight, 
  AlertTriangle, 
  Sun, 
  CloudRain, 
  Cloud, 
  CloudLightning, 
  Wind, 
  Thermometer, 
  ArrowUp, 
  ArrowDown,
  Calendar, 
  Check, 
  X,
  FileCheck,
  FileText // Renamed from FileChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CultureProgressBar } from "../components/cultures/CultureProgressBar";
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
  Cell
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Données du tableau de bord
  const cultureStats = {
    totalFields: 8,
    totalArea: 145,
    fieldsToHarvest: 3,
    averageHealth: 86,
    fieldsByType: [
      { name: 'Blé', value: 45 },
      { name: 'Maïs', value: 35 },
      { name: 'Colza', value: 25 },
      { name: 'Orge', value: 20 },
      { name: 'Autres', value: 20 },
    ],
    fieldStatus: [
      { name: 'Planté', value: 3 },
      { name: 'En croissance', value: 2 },
      { name: 'Prêt à récolter', value: 2 },
      { name: 'Récolté', value: 1 },
    ]
  };

  const livestockStats = {
    totalAnimals: 56,
    sickAnimals: 4,
    averageWeight: 452,
    birthsThisMonth: 3,
    animalsByType: [
      { name: 'Vaches', count: 28 },
      { name: 'Veaux', count: 12 },
      { name: 'Taureaux', count: 2 },
      { name: 'Moutons', count: 8 },
      { name: 'Chèvres', count: 6 }
    ],
    healthStatusData: [
      { name: 'Bonne santé', value: 42 },
      { name: 'Santé moyenne', value: 10 },
      { name: 'Attention requise', value: 4 },
    ]
  };

  const irrigationStats = {
    systemStatus: "Opérationnel",
    waterUsed: 12450,
    efficiency: 92,
    nextMaintenance: "2025-05-12",
    weeklyUsage: [
      { day: 'Lun', water: 1200 },
      { day: 'Mar', water: 1850 },
      { day: 'Mer', water: 1450 },
      { day: 'Jeu', water: 2100 },
      { day: 'Ven', water: 1980 },
      { day: 'Sam', water: 1650 },
      { day: 'Dim', water: 1220 },
    ],
    fieldEfficiency: [
      { field: 'Nord', efficiency: 95 },
      { field: 'Sud', efficiency: 87 },
      { field: 'Est', efficiency: 91 },
      { field: 'Ouest', efficiency: 94 },
    ]
  };

  const weatherForecast = {
    today: { temp: 22, condition: "Ensoleillé", icon: <Sun className="h-8 w-8 text-amber-400" /> },
    tomorrow: { temp: 24, condition: "Partiellement nuageux", icon: <Cloud className="h-8 w-8 text-slate-400" /> },
    forecast: [
      { day: "Aujourd'hui", temp: 22, minTemp: 15, maxTemp: 24, condition: "Ensoleillé", icon: <Sun className="h-6 w-6 text-amber-400" /> },
      { day: "Demain", temp: 24, minTemp: 17, maxTemp: 26, condition: "Partiellement nuageux", icon: <Cloud className="h-6 w-6 text-slate-400" /> },
      { day: "Mercredi", temp: 21, minTemp: 16, maxTemp: 22, condition: "Pluie légère", icon: <CloudRain className="h-6 w-6 text-blue-400" /> },
      { day: "Jeudi", temp: 19, minTemp: 14, maxTemp: 20, condition: "Averses", icon: <CloudRain className="h-6 w-6 text-blue-400" /> },
      { day: "Vendredi", temp: 18, minTemp: 13, maxTemp: 20, condition: "Orage", icon: <CloudLightning className="h-6 w-6 text-amber-500" /> },
      { day: "Samedi", temp: 20, minTemp: 15, maxTemp: 22, condition: "Venteux", icon: <Wind className="h-6 w-6 text-blue-300" /> },
      { day: "Dimanche", temp: 23, minTemp: 17, maxTemp: 25, condition: "Ensoleillé", icon: <Sun className="h-6 w-6 text-amber-400" /> },
    ],
    alert: "Risque de chaleur excessive dans 3 jours"
  };

  const financialData = {
    monthlySummary: {
      revenue: 28450,
      expenses: 15680,
      profit: 12770
    },
    monthlyRevenue: [
      { month: 'Jan', revenue: 12500 },
      { month: 'Fév', revenue: 15800 },
      { month: 'Mar', revenue: 18200 },
      { month: 'Avr', revenue: 22400 },
      { month: 'Mai', revenue: 28450 }
    ],
    expensesByCategory: [
      { name: 'Semences', value: 3250 },
      { name: 'Engrais', value: 4500 },
      { name: 'Carburant', value: 2800 },
      { name: 'Irrigation', value: 1850 },
      { name: 'Équipement', value: 2200 },
      { name: 'Main d\'oeuvre', value: 1080 }
    ]
  };

  const recentActivities = [
    { 
      icon: <Leaf className="h-4 w-4 text-green-600" />,
      bgColor: "bg-green-100",
      title: "Parcelle Nord mise à jour",
      description: "Statut changé à \"En croissance\"",
      time: "Il y a 2 heures"
    },
    {
      icon: <Droplet className="h-4 w-4 text-blue-600" />,
      bgColor: "bg-blue-100",
      title: "Irrigation automatique déclenchée",
      description: "Zone Est, 450L utilisés",
      time: "Il y a 5 heures"
    },
    {
      icon: <Activity className="h-4 w-4 text-amber-600" />,
      bgColor: "bg-amber-100",
      title: "Vache #42 - Naissance",
      description: "Veau mâle, 32kg",
      time: "Hier"
    },
    {
      icon: <FileCheck className="h-4 w-4 text-purple-600" />,
      bgColor: "bg-purple-100",
      title: "Analyses de sol reçues",
      description: "Parcelle Sud - Résultats positifs",
      time: "Il y a 2 jours"
    },
    {
      icon: <FileText className="h-4 w-4 text-indigo-600" />,
      bgColor: "bg-indigo-100",
      title: "Rapport financier mensuel",
      description: "Avril 2025 - Bénéfice de 12 770€",
      time: "Il y a 3 jours"
    }
  ];

  const upcomingTasks = [
    {
      title: "Récolter la parcelle Sud",
      date: "Avant le 10 Mai",
      priority: "high",
      completed: false
    },
    {
      title: "Maintenance du système d'irrigation",
      date: "12 Mai",
      priority: "medium",
      completed: false
    },
    {
      title: "Vaccination du troupeau",
      date: "15 Mai",
      priority: "high",
      completed: false
    },
    {
      title: "Commander semences de maïs",
      date: "20 Mai",
      priority: "medium",
      completed: true
    },
    {
      title: "Entretien du tracteur",
      date: "25 Mai",
      priority: "low",
      completed: false
    },
    {
      title: "Visite vétérinaire",
      date: "1er Juin",
      priority: "medium",
      completed: false
    }
  ];

  const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B'];
  const HEALTH_COLORS = ['#4CAF50', '#FFA726', '#F44336'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue sur votre tableau de bord, voici un aperçu de votre exploitation</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="analytics">Analyses détaillées</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <GlassCard className="hover:shadow-glow hover:scale-[1.02] transition-all duration-300 group animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="p-2 bg-gradient-primary rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gradient-primary">Cultures</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">État de vos parcelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-xl bg-primary-50/50 border border-primary-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Parcelles</span>
                      <span className="font-bold text-primary-600">{cultureStats.totalFields}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-primary-50/50 border border-primary-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Surface totale</span>
                      <span className="font-bold text-primary-600">{cultureStats.totalArea} ha</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-accent-50/50 border border-accent-100/50">
                      <span className="text-sm font-medium text-muted-foreground">À récolter</span>
                      <span className="font-bold text-accent-600">{cultureStats.fieldsToHarvest}</span>
                    </div>
                    <div className="space-y-2 p-3 rounded-xl bg-gradient-glass border border-white/20">
                      <span className="text-sm font-medium text-muted-foreground">Santé moyenne</span>
                      <CultureProgressBar value={cultureStats.averageHealth} colorScheme="health" size="sm" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-white/20">
                  <ModernButton variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/cultures')}>
                    Gérer les cultures <ChevronRight className="h-4 w-4 ml-1" />
                  </ModernButton>
                </CardFooter>
              </GlassCard>
              
              <GlassCard className="hover:shadow-glow hover:scale-[1.02] transition-all duration-300 group animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="p-2 bg-gradient-sunset rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gradient-primary">Bétail</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">État de votre cheptel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-xl bg-primary-50/50 border border-primary-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Animaux</span>
                      <span className="font-bold text-primary-600">{livestockStats.totalAnimals}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-amber-50/50 border border-amber-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Animaux malades</span>
                      <span className="font-bold text-amber-600">{livestockStats.sickAnimals}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-primary-50/50 border border-primary-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Poids moyen</span>
                      <span className="font-bold text-primary-600">{livestockStats.averageWeight} kg</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-green-50/50 border border-green-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Naissances (mois)</span>
                      <span className="font-bold text-green-600">{livestockStats.birthsThisMonth}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-white/20">
                  <ModernButton variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/livestock')}>
                    Gérer le bétail <ChevronRight className="h-4 w-4 ml-1" />
                  </ModernButton>
                </CardFooter>
              </GlassCard>
              
              <GlassCard className="hover:shadow-glow hover:scale-[1.02] transition-all duration-300 group animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="p-2 bg-gradient-ocean rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <Droplet className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gradient-primary">Irrigation</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">Système d'arrosage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-xl bg-green-50/50 border border-green-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Statut</span>
                      <span className="font-bold text-green-600">{irrigationStats.systemStatus}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-blue-50/50 border border-blue-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Eau utilisée</span>
                      <span className="font-bold text-blue-600">{irrigationStats.waterUsed} L</span>
                    </div>
                    <div className="space-y-2 p-3 rounded-xl bg-gradient-glass border border-white/20">
                      <span className="text-sm font-medium text-muted-foreground">Efficacité</span>
                      <CultureProgressBar value={irrigationStats.efficiency} colorScheme="irrigation" size="sm" />
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-primary-50/50 border border-primary-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Maintenance</span>
                      <span className="font-bold text-primary-600">{new Date(irrigationStats.nextMaintenance).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-white/20">
                  <ModernButton variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/irrigation')}>
                    Gérer l'irrigation <ChevronRight className="h-4 w-4 ml-1" />
                  </ModernButton>
                </CardFooter>
              </GlassCard>
              
              <GlassCard className="hover:shadow-glow hover:scale-[1.02] transition-all duration-300 group animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <BarChart className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gradient-primary">Finances</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">Aperçu financier</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-xl bg-green-50/50 border border-green-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Revenus (mois)</span>
                      <span className="font-bold text-green-600">{financialData.monthlySummary.revenue}€</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-red-50/50 border border-red-100/50">
                      <span className="text-sm font-medium text-muted-foreground">Dépenses (mois)</span>
                      <span className="font-bold text-red-600">{financialData.monthlySummary.expenses}€</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-primary border-t-2 border-primary-200">
                      <span className="text-sm font-medium text-white">Bénéfice</span>
                      <span className="font-bold text-white">{financialData.monthlySummary.profit}€</span>
                    </div>
                    <div className="p-2 rounded-xl bg-gradient-glass border border-white/20">
                      <ResponsiveContainer width="100%" height={80}>
                        <LineChart data={financialData.monthlyRevenue}>
                          <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-white/20">
                  <ModernButton variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/analytics')}>
                    Voir les finances <ChevronRight className="h-4 w-4 ml-1" />
                  </ModernButton>
                </CardFooter>
              </GlassCard>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <GlassCard className="md:col-span-2 hover:shadow-glow transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.5s' }}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="p-2 bg-gradient-sky rounded-2xl shadow-glow">
                      <Sun className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gradient-primary">Météo et prévisions</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">Prévisions météorologiques pour les prochains jours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                      {weatherForecast.today.icon}
                      <div>
                        <p className="font-medium text-lg">{weatherForecast.today.condition}</p>
                        <p className="text-3xl font-bold text-slate-900">{weatherForecast.today.temp}°C</p>
                        <p className="text-xs text-slate-500">Aujourd'hui</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      {weatherForecast.tomorrow.icon}
                      <div>
                        <p className="font-medium text-lg">{weatherForecast.tomorrow.condition}</p>
                        <p className="text-3xl font-bold text-slate-900">{weatherForecast.tomorrow.temp}°C</p>
                        <p className="text-xs text-slate-500">Demain</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex overflow-x-auto py-2 scrollbar-hide">
                    <div className="flex gap-3 pb-2">
                      {weatherForecast.forecast.map((day, idx) => (
                        <div key={idx} className="flex-shrink-0 p-3 rounded-lg border border-slate-100 w-[110px] text-center">
                          <p className="text-xs text-slate-500">{day.day}</p>
                          <div className="flex justify-center my-1">
                            {day.icon}
                          </div>
                          <p className="font-medium">{day.temp}°C</p>
                          <div className="flex justify-center items-center gap-1 text-xs text-slate-500">
                            <span className="flex items-center"><ArrowDown className="h-3 w-3 text-blue-400" />{day.minTemp}°</span>
                            <span className="flex items-center"><ArrowUp className="h-3 w-3 text-red-400" />{day.maxTemp}°</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <span className="text-sm text-amber-800">{weatherForecast.alert}</span>
                  </div>
                </CardContent>
              </GlassCard>

              <GlassCard className="hover:shadow-glow transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.6s' }}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl shadow-glow">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gradient-primary">Répartition des cultures</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">Surface par type de culture</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={cultureStats.fieldsByType}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {cultureStats.fieldsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </GlassCard>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Activité récente</CardTitle>
                  <CardDescription>Les dernières actions sur votre exploitation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {recentActivities.map((activity, idx) => (
                      <li key={idx} className="flex gap-4 items-start border-b pb-4 last:border-0">
                        <div className={`${activity.bgColor} p-2 rounded-full`}>
                          {activity.icon}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground/70">{activity.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Voir toute l'activité <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tâches à venir</CardTitle>
                  <CardDescription>Planifiez votre semaine</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {upcomingTasks.map((task, idx) => (
                      <li key={idx} className={`flex gap-3 items-center p-2 rounded-lg ${task.completed ? 'bg-slate-50' : task.priority === 'high' ? 'bg-red-50' : task.priority === 'medium' ? 'bg-amber-50' : 'bg-blue-50'} border ${task.completed ? 'border-slate-100' : task.priority === 'high' ? 'border-red-100' : task.priority === 'medium' ? 'border-amber-100' : 'border-blue-100'}`}>
                        <div className={`rounded-full p-1 ${task.completed ? 'bg-green-100' : 'bg-white/80'}`}>
                          {task.completed ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Calendar className={`h-4 w-4 ${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-amber-500' : 'text-blue-500'}`} />
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className={`font-medium ${task.completed ? 'line-through text-slate-500' : ''}`}>{task.title}</p>
                          <p className="text-xs text-slate-500">{task.date}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {task.completed ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Voir toutes les tâches <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Utilisation de l'eau</CardTitle>
                  <CardDescription>Consommation hebdomadaire d'eau (en litres)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <ReBarChart data={irrigationStats.weeklyUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="water" fill="#2196F3" name="Eau utilisée (L)" />
                    </ReBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Santé du bétail</CardTitle>
                  <CardDescription>Répartition par état de santé</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={livestockStats.healthStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {livestockStats.healthStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={HEALTH_COLORS[index % HEALTH_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Revenus mensuels</CardTitle>
                  <CardDescription>Évolution des revenus sur les 5 derniers mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={financialData.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} €`, 'Revenu']} />
                      <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Répartition des dépenses</CardTitle>
                  <CardDescription>Dépenses par catégorie en Mai 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <ReBarChart data={financialData.expensesByCategory} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip formatter={(value) => [`${value} €`, 'Dépense']} />
                      <Bar dataKey="value" fill="#FF7043" name="Montant (€)" />
                    </ReBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">État des cultures par parcelle</CardTitle>
                  <CardDescription>Santé et besoins en irrigation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Parcelle Nord</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Santé</span>
                            <span className="font-medium">93%</span>
                          </div>
                          <CultureProgressBar value={93} colorScheme="health" size="sm" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Irrigation</span>
                            <span className="font-medium">87%</span>
                          </div>
                          <CultureProgressBar value={87} colorScheme="irrigation" size="sm" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Parcelle Sud</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Santé</span>
                            <span className="font-medium">76%</span>
                          </div>
                          <CultureProgressBar value={76} colorScheme="health" size="sm" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Irrigation</span>
                            <span className="font-medium">62%</span>
                          </div>
                          <CultureProgressBar value={62} colorScheme="irrigation" size="sm" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Parcelle Est</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Santé</span>
                            <span className="font-medium">89%</span>
                          </div>
                          <CultureProgressBar value={89} colorScheme="health" size="sm" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Irrigation</span>
                            <span className="font-medium">78%</span>
                          </div>
                          <CultureProgressBar value={78} colorScheme="irrigation" size="sm" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Parcelle Ouest</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Santé</span>
                            <span className="font-medium">84%</span>
                          </div>
                          <CultureProgressBar value={84} colorScheme="health" size="sm" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Irrigation</span>
                            <span className="font-medium">91%</span>
                          </div>
                          <CultureProgressBar value={91} colorScheme="irrigation" size="sm" />
                        </div>
                      </CardContent>
                    </Card>
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

export default Dashboard;
