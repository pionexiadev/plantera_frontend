
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  Settings,
  Activity,
  Bell,
  Lock,
  UserCheck,
  UserX,
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from "lucide-react";

// Types pour l'administration
interface User {
  id: string;
  name: string;
  email: string;
  profileType: string;
  status: 'active' | 'suspended' | 'pending';
  lastActivity: string;
  registrationDate: string;
}

interface SystemConfig {
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  maxUsersPerType: {
    agriculteur: number;
    veterinaire: number;
    grossiste: number;
    gie: number;
    investisseur: number;
  };
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // État pour la gestion des utilisateurs
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Amadou Diallo',
      email: 'amadou@example.com',
      profileType: 'Agriculteur',
      status: 'active',
      lastActivity: '2025-01-06',
      registrationDate: '2024-12-15'
    },
    {
      id: '2',
      name: 'Dr. Fatou Sall',
      email: 'fatou@example.com',
      profileType: 'Vétérinaire',
      status: 'active',
      lastActivity: '2025-01-05',
      registrationDate: '2024-12-20'
    },
    {
      id: '3',
      name: 'Moussa Ba',
      email: 'moussa@example.com',
      profileType: 'GIE',
      status: 'pending',
      lastActivity: '2025-01-04',
      registrationDate: '2025-01-01'
    }
  ]);

  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    maxUsersPerType: {
      agriculteur: 1000,
      veterinaire: 50,
      grossiste: 100,
      gie: 200,
      investisseur: 20
    }
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Statistiques du système
  const stats = [
    {
      title: "Utilisateurs Total",
      value: "2,847",
      change: "+12%",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600"
    },
    {
      title: "Actifs Aujourd'hui",
      value: "1,432",
      change: "+8%",
      icon: <Activity className="h-5 w-5" />,
      color: "text-green-600"
    },
    {
      title: "En Attente",
      value: "23",
      change: "-5%",
      icon: <Clock className="h-5 w-5" />,
      color: "text-orange-600"
    },
    {
      title: "Suspendus",
      value: "7",
      change: "0%",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-red-600"
    }
  ];

  const handleUserAction = (userId: string, action: 'activate' | 'suspend' | 'delete') => {
    toast({
      title: "Action effectuée",
      description: `Utilisateur ${action === 'activate' ? 'activé' : action === 'suspend' ? 'suspendu' : 'supprimé'} avec succès.`,
    });
  };

  const handleSystemConfigUpdate = (key: keyof SystemConfig, value: any) => {
    setSystemConfig(prev => ({
      ...prev,
      [key]: value
    }));
    toast({
      title: "Configuration mise à jour",
      description: "Les paramètres système ont été modifiés.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Actif</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Suspendu</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const filteredUsers = users.filter(user => 
    filterStatus === 'all' || user.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour au Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Panneau d'Administration</h1>
                  <p className="text-slate-600">Gestion complète de la plateforme Plantéra</p>
                </div>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-800 px-4 py-2 text-lg font-semibold">
              🔐 Accès Restreint
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-slate-600'}`}>
                      {stat.change} ce mois
                    </p>
                  </div>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs principal */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Système
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Gestion des utilisateurs */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gestion des Utilisateurs
                    </CardTitle>
                    <CardDescription>
                      Gérez les accès et permissions des utilisateurs de la plateforme
                    </CardDescription>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les utilisateurs</SelectItem>
                      <SelectItem value="active">Actifs</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="suspended">Suspendus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-slate-900">{user.name}</h3>
                            {getStatusBadge(user.status)}
                          </div>
                          <p className="text-sm text-slate-600">{user.email}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                            <span>📝 {user.profileType}</span>
                            <span>🕒 Dernière activité: {user.lastActivity}</span>
                            <span>📅 Inscrit: {user.registrationDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUserAction(user.id, 'suspend')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUserAction(user.id, 'activate')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration système */}
          <TabsContent value="system" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuration Système
                </CardTitle>
                <CardDescription>
                  Paramètres globaux de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">Mode Maintenance</Label>
                    <p className="text-sm text-slate-600">Désactive temporairement l'accès à la plateforme</p>
                  </div>
                  <Switch
                    checked={systemConfig.maintenanceMode}
                    onCheckedChange={(checked) => handleSystemConfigUpdate('maintenanceMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">Inscriptions Ouvertes</Label>
                    <p className="text-sm text-slate-600">Permet aux nouveaux utilisateurs de s'inscrire</p>
                  </div>
                  <Switch
                    checked={systemConfig.registrationEnabled}
                    onCheckedChange={(checked) => handleSystemConfigUpdate('registrationEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <Label className="text-base font-medium">Notifications Email</Label>
                    <p className="text-sm text-slate-600">Envoi automatique d'emails système</p>
                  </div>
                  <Switch
                    checked={systemConfig.emailNotifications}
                    onCheckedChange={(checked) => handleSystemConfigUpdate('emailNotifications', checked)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Limites d'utilisateurs par type</Label>
                    {Object.entries(systemConfig.maxUsersPerType).map(([type, limit]) => (
                      <div key={type} className="flex items-center justify-between">
                        <Label className="capitalize">{type}</Label>
                        <Input
                          type="number"
                          value={limit}
                          onChange={(e) => handleSystemConfigUpdate('maxUsersPerType', {
                            ...systemConfig.maxUsersPerType,
                            [type]: parseInt(e.target.value)
                          })}
                          className="w-24"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sécurité */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Paramètres de Sécurité
                </CardTitle>
                <CardDescription>
                  Configuration de la sécurité et des accès
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Politique de mot de passe</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Minimum 8 caractères</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Au moins une majuscule</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Au moins un chiffre</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Sessions et connexions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Durée de session</span>
                        <span className="text-sm font-medium">24 heures</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tentatives de connexion</span>
                        <span className="text-sm font-medium">5 max</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Blocage temporaire</span>
                        <span className="text-sm font-medium">30 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Centre de Notifications
                </CardTitle>
                <CardDescription>
                  Envoi de messages et d'alertes aux utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notification-title">Titre de la notification</Label>
                    <Input id="notification-title" placeholder="Titre de votre message" />
                  </div>
                  <div>
                    <Label htmlFor="notification-message">Message</Label>
                    <Textarea id="notification-message" placeholder="Contenu de votre notification" rows={4} />
                  </div>
                  <div>
                    <Label>Destinataires</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner les destinataires" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les utilisateurs</SelectItem>
                        <SelectItem value="agriculteurs">Agriculteurs uniquement</SelectItem>
                        <SelectItem value="veterinaires">Vétérinaires uniquement</SelectItem>
                        <SelectItem value="gie">GIE uniquement</SelectItem>
                        <SelectItem value="active">Utilisateurs actifs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                    <Bell className="h-4 w-4 mr-2" />
                    Envoyer la notification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
