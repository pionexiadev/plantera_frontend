import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Building,
  Camera,
  Key,
  Download,
  Trash2,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/theme-provider';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Route de la Ferme',
    city: 'Montpellier',
    postalCode: '34000',
    country: 'France',
    farmName: 'Ferme du Soleil',
    farmType: 'Polyculture élevage',
    farmSize: '150'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weatherAlerts: true,
    taskReminders: true,
    harvestAlerts: true,
    marketingEmails: false
  });

  const [preferences, setPreferences] = useState({
    language: 'fr',
    currency: 'EUR',
    timezone: 'Europe/Paris',
    dateFormat: 'DD/MM/YYYY',
    units: 'metric'
  });

  const handleSave = (section) => {
    toast({
      title: "Paramètres sauvegardés",
      description: `Vos paramètres de ${section} ont été mis à jour avec succès.`,
    });
  };

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationUpdate = (field, value) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceUpdate = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    toast({
      title: "Thème mis à jour",
      description: `Le thème ${newTheme === 'light' ? 'clair' : newTheme === 'dark' ? 'sombre' : 'automatique'} a été appliqué.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
            <p className="text-slate-600">Gérez votre compte et vos préférences</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter données
            </Button>
            <Button onClick={() => handleSave('général')} className="bg-plantera-green hover:bg-plantera-green/90 gap-2">
              <Save className="h-4 w-4" />
              Sauvegarder
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Palette className="h-4 w-4" />
              Préférences
            </TabsTrigger>
            <TabsTrigger value="farm" className="gap-2">
              <Building className="h-4 w-4" />
              Exploitation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations Personnelles
                </CardTitle>
                <CardDescription>
                  Gérez vos informations de profil et vos coordonnées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/api/placeholder/96/96" />
                    <AvatarFallback className="text-lg">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Changer la photo
                    </Button>
                    <p className="text-sm text-slate-600">
                      JPG, PNG ou GIF. Maximum 2MB.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex gap-2">
                      <Mail className="h-5 w-5 text-slate-400 mt-3" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="flex gap-2">
                      <Phone className="h-5 w-5 text-slate-400 mt-3" />
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Adresse
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Rue</Label>
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => handleProfileUpdate('address', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        value={profile.city}
                        onChange={(e) => handleProfileUpdate('city', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        value={profile.postalCode}
                        onChange={(e) => handleProfileUpdate('postalCode', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Annuler</Button>
                  <Button onClick={() => handleSave('profil')} className="bg-plantera-green hover:bg-plantera-green/90">
                    Sauvegarder les modifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Préférences de Notification
                </CardTitle>
                <CardDescription>
                  Choisissez comment vous souhaitez être informé
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Canaux de communication</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Notifications par email</Label>
                        <p className="text-sm text-slate-600">Recevez des notifications par email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationUpdate('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Notifications SMS</Label>
                        <p className="text-sm text-slate-600">Recevez des alertes urgentes par SMS</p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => handleNotificationUpdate('smsNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Notifications push</Label>
                        <p className="text-sm text-slate-600">Recevez des notifications dans votre navigateur</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationUpdate('pushNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Types de notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Alertes météo</Label>
                        <p className="text-sm text-slate-600">Conditions météorologiques importantes</p>
                      </div>
                      <Switch
                        checked={notifications.weatherAlerts}
                        onCheckedChange={(checked) => handleNotificationUpdate('weatherAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Rappels de tâches</Label>
                        <p className="text-sm text-slate-600">Rappels pour vos tâches planifiées</p>
                      </div>
                      <Switch
                        checked={notifications.taskReminders}
                        onCheckedChange={(checked) => handleNotificationUpdate('taskReminders', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Alertes de récolte</Label>
                        <p className="text-sm text-slate-600">Moments optimaux pour la récolte</p>
                      </div>
                      <Switch
                        checked={notifications.harvestAlerts}
                        onCheckedChange={(checked) => handleNotificationUpdate('harvestAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Emails marketing</Label>
                        <p className="text-sm text-slate-600">Nouvelles fonctionnalités et promotions</p>
                      </div>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => handleNotificationUpdate('marketingEmails', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Réinitialiser</Button>
                  <Button onClick={() => handleSave('notifications')} className="bg-plantera-green hover:bg-plantera-green/90">
                    Sauvegarder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Sécurité du Compte
                </CardTitle>
                <CardDescription>
                  Gérez la sécurité et l'accès à votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Mot de passe</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Key className="h-4 w-4" />
                      Changer le mot de passe
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Authentification à deux facteurs</h4>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <Label>Authentification à deux facteurs</Label>
                      <p className="text-sm text-slate-600 mt-1">
                        Ajoutez une couche de sécurité supplémentaire à votre compte
                      </p>
                    </div>
                    <Badge variant="outline" className="text-red-600 border-red-200">
                      Désactivée
                    </Badge>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Smartphone className="h-4 w-4" />
                    Configurer 2FA
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Sessions actives</h4>
                  <div className="space-y-3">
                    {[
                      { device: 'MacBook Pro', location: 'Montpellier, France', current: true },
                      { device: 'iPhone 14', location: 'Montpellier, France', current: false },
                      { device: 'iPad Air', location: 'Lyon, France', current: false }
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                        <div>
                          <p className="font-medium">{session.device}</p>
                          <p className="text-sm text-slate-600">{session.location}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.current && (
                            <Badge className="bg-green-100 text-green-800">Actuelle</Badge>
                          )}
                          {!session.current && (
                            <Button size="sm" variant="outline">Déconnecter</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Préférences d'Affichage
                </CardTitle>
                <CardDescription>
                  Personnalisez l'apparence et le comportement de l'application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Langue</Label>
                    <Select value={preferences.language} onValueChange={(value) => handlePreferenceUpdate('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                   <div className="space-y-2">
                     <Label>Thème</Label>
                     <Select value={theme} onValueChange={handleThemeChange}>
                       <SelectTrigger>
                         <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="light">Clair</SelectItem>
                         <SelectItem value="dark">Sombre</SelectItem>
                         <SelectItem value="system">Automatique</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                  
                  <div className="space-y-2">
                    <Label>Devise</Label>
                    <Select value={preferences.currency} onValueChange={(value) => handlePreferenceUpdate('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="USD">Dollar US ($)</SelectItem>
                        <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                        <SelectItem value="CHF">Franc Suisse (CHF)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fuseau horaire</Label>
                    <Select value={preferences.timezone} onValueChange={(value) => handlePreferenceUpdate('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Format de date</Label>
                    <Select value={preferences.dateFormat} onValueChange={(value) => handlePreferenceUpdate('dateFormat', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Unités de mesure</Label>
                    <Select value={preferences.units} onValueChange={(value) => handlePreferenceUpdate('units', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Métrique</SelectItem>
                        <SelectItem value="imperial">Impérial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Réinitialiser</Button>
                  <Button onClick={() => handleSave('préférences')} className="bg-plantera-green hover:bg-plantera-green/90">
                    Sauvegarder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="farm" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informations de l'Exploitation
                </CardTitle>
                <CardDescription>
                  Gérez les informations de votre exploitation agricole
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Nom de l'exploitation</Label>
                    <Input
                      id="farmName"
                      value={profile.farmName}
                      onChange={(e) => handleProfileUpdate('farmName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmType">Type d'exploitation</Label>
                    <Select 
                      value={profile.farmType} 
                      onValueChange={(value) => handleProfileUpdate('farmType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Polyculture élevage">Polyculture élevage</SelectItem>
                        <SelectItem value="Grandes cultures">Grandes cultures</SelectItem>
                        <SelectItem value="Élevage">Élevage</SelectItem>
                        <SelectItem value="Maraîchage">Maraîchage</SelectItem>
                        <SelectItem value="Viticulture">Viticulture</SelectItem>
                        <SelectItem value="Arboriculture">Arboriculture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Superficie (hectares)</Label>
                    <Input
                      id="farmSize"
                      type="number"
                      value={profile.farmSize}
                      onChange={(e) => handleProfileUpdate('farmSize', e.target.value)}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium text-red-600">Zone de danger</h4>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-red-900">Supprimer le compte</p>
                        <p className="text-sm text-red-700">
                          Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                        </p>
                      </div>
                      <Button variant="destructive" className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        Supprimer le compte
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Annuler</Button>
                  <Button onClick={() => handleSave('exploitation')} className="bg-plantera-green hover:bg-plantera-green/90">
                    Sauvegarder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;