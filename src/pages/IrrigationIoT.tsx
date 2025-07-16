import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  CloudRain, 
  Droplet, 
  Timer, 
  Calendar, 
  Power, 
  Activity, 
  AlertTriangle, 
  Wifi, 
  PlusCircle,
  RefreshCw,
  BarChart3,
  Settings,
  Bell,
  Gauge,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIrrigation } from '@/hooks/use-irrigation';
import { useFields } from '@/hooks/use-fields';
import IrrigationZoneCard from '@/components/irrigation/IrrigationZoneCard';
import IrrigationScheduler from '@/components/irrigation/IrrigationScheduler';
import IrrigationAnalytics from '@/components/irrigation/IrrigationAnalytics';
import IrrigationSensorMonitor from '@/components/irrigation/IrrigationSensorMonitor';
import IrrigationAlerts from '@/components/irrigation/IrrigationAlerts';
import IrrigationManualControl from '@/components/irrigation/IrrigationManualControl';
import { IrrigationZone } from '@/types/irrigation';

const IrrigationIoT = () => {
  const [activeTab, setActiveTab] = useState("zones");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<IrrigationZone | null>(null);
  const { toast } = useToast();
  
  const {
    zones,
    schedules,
    events,
    isLoading,
    addZone,
    updateZone,
    startIrrigation,
    addSchedule,
    deleteSchedule,
    toggleSchedule
  } = useIrrigation();
  
  const { fields } = useFields();

  const [newZone, setNewZone] = useState({
    name: '',
    fieldId: '',
    type: 'goutte-à-goutte' as const,
    status: 'active' as const,
    isAutomated: false,
    moistureLevel: 50,
    waterConsumption: 0
  });

  const handleToggleAutomation = async (zoneId: string) => {
    const zone = zones.find(z => z.id === zoneId);
    if (zone) {
      await updateZone(zoneId, { isAutomated: !zone.isAutomated });
    }
  };

  const handleStartIrrigation = async (zoneId: string, duration = 30) => {
    await startIrrigation(zoneId, duration);
  };

  const handleEditZone = (zone: IrrigationZone) => {
    setSelectedZone(zone);
    setIsAddDialogOpen(true);
  };

  const handleAddZone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newZone.name && newZone.fieldId) {
      await addZone({
        ...newZone,
        lastWatering: new Date().toISOString(),
        waterConsumption: 0
      });
      setNewZone({
        name: '',
        fieldId: '',
        type: 'goutte-à-goutte',
        status: 'active',
        isAutomated: false,
        moistureLevel: 50,
        waterConsumption: 0
      });
      setIsAddDialogOpen(false);
      toast({
        title: "Zone ajoutée",
        description: "La nouvelle zone d'irrigation a été créée avec succès."
      });
    }
  };

  // Stats
  const totalZones = zones.length;
  const activeZones = zones.filter(z => z.status === 'active').length;
  const automatedZones = zones.filter(z => z.isAutomated).length;
  const totalWaterConsumption = zones.reduce((sum, z) => sum + z.waterConsumption, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête moderne */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gradient-primary flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-glow">
                <Droplet className="h-8 w-8 text-white" />
              </div>
              Irrigation & IoT
            </h1>
            <p className="text-lg text-plantera-slate/70 font-medium max-w-2xl">
              Système intelligent d'irrigation automatisée pour optimiser l'arrosage
            </p>
          </div>
          <div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-br from-cyan-500 to-blue-600 hover:shadow-glow transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <PlusCircle className="h-5 w-5 mr-3" />
                  Ajouter une Zone
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Nouvelle Zone d'Irrigation</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddZone} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de la zone</Label>
                    <Input
                      id="name"
                      value={newZone.name}
                      onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                      placeholder="Zone Nord..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="field">Champ associé</Label>
                    <Select value={newZone.fieldId} onValueChange={(value) => setNewZone({...newZone, fieldId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un champ" />
                      </SelectTrigger>
                      <SelectContent>
                        {fields.map(field => (
                          <SelectItem key={field.id} value={field.id}>
                            {field.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type d'irrigation</Label>
                    <Select value={newZone.type} onValueChange={(value: any) => setNewZone({...newZone, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="goutte-à-goutte">Goutte-à-goutte</SelectItem>
                        <SelectItem value="aspersion">Aspersion</SelectItem>
                        <SelectItem value="micro-irrigation">Micro-irrigation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="automated"
                      checked={newZone.isAutomated}
                      onCheckedChange={(checked) => setNewZone({...newZone, isAutomated: checked})}
                    />
                    <Label htmlFor="automated">Automatisation activée</Label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">Créer la zone</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Section Statistiques */}
        <GlassCard className="overflow-hidden hover:shadow-glow transition-all duration-300 animate-fade-up">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Gauge className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-plantera-slate/60 font-semibold">Zones totales</p>
                  <p className="text-4xl font-bold text-gradient-primary animate-fade-up">{totalZones}</p>
                  <p className="text-xs text-plantera-slate/50">configurées</p>
                </div>
              </div>
              
              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-primary rounded-3xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Power className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-plantera-slate/60 font-semibold">Zones actives</p>
                  <p className="text-4xl font-bold text-gradient-primary animate-fade-up">{activeZones}</p>
                  <p className="text-xs text-plantera-slate/50">en fonctionnement</p>
                </div>
              </div>
              
              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-sunset rounded-3xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-plantera-slate/60 font-semibold">Automatisées</p>
                  <p className="text-4xl font-bold text-gradient-primary animate-fade-up">{automatedZones}</p>
                  <p className="text-xs text-plantera-slate/50">intelligentes</p>
                </div>
              </div>
              
              <div className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Droplet className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-plantera-slate/60 font-semibold">Consommation</p>
                  <p className="text-4xl font-bold text-gradient-primary animate-fade-up">{totalWaterConsumption.toLocaleString()}</p>
                  <p className="text-xs text-plantera-slate/50">litres aujourd'hui</p>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {/* Tabs pour la gestion */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 bg-gradient-glass border border-white/30 p-2 rounded-2xl">
            <TabsTrigger 
              value="zones" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-4 py-3 font-semibold"
            >
              <Gauge className="h-4 w-4 mr-2" />
              Zones
            </TabsTrigger>
            <TabsTrigger 
              value="scheduler" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-4 py-3 font-semibold"
            >
              <Timer className="h-4 w-4 mr-2" />
              Planning
            </TabsTrigger>
            <TabsTrigger 
              value="sensors" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-4 py-3 font-semibold"
            >
              <Activity className="h-4 w-4 mr-2" />
              Capteurs
            </TabsTrigger>
            <TabsTrigger 
              value="control" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-4 py-3 font-semibold"
            >
              <Power className="h-4 w-4 mr-2" />
              Contrôle
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white rounded-xl px-4 py-3 font-semibold"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analyses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="zones" className="space-y-6 mt-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <GlassCard key={i} className="h-64 animate-pulse">
                    <div className="h-full bg-gradient-glass rounded-3xl"></div>
                  </GlassCard>
                ))}
              </div>
            ) : zones.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-glass rounded-3xl inline-block">
                    <Droplet className="h-12 w-12 text-plantera-slate/50" />
                  </div>
                  <h3 className="text-2xl font-bold text-plantera-darkGreen">Aucune zone configurée</h3>
                  <p className="text-plantera-slate/70 font-medium max-w-md mx-auto">
                    Créez votre première zone d'irrigation pour commencer l'automatisation.
                  </p>
                  <Button 
                    onClick={() => setIsAddDialogOpen(true)}
                    className="mt-6"
                    size="lg"
                  >
                    Créer une zone
                  </Button>
                </div>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {zones.map(zone => (
                  <IrrigationZoneCard
                    key={zone.id}
                    zone={zone}
                    onEditZone={handleEditZone}
                    onToggleAutomation={handleToggleAutomation}
                    onStartIrrigation={handleStartIrrigation}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="scheduler" className="space-y-6 mt-8">
            <IrrigationScheduler
              zones={zones}
              schedules={schedules}
              onAddSchedule={addSchedule}
              onDeleteSchedule={deleteSchedule}
              onToggleSchedule={toggleSchedule}
            />
          </TabsContent>

          <TabsContent value="sensors" className="space-y-6 mt-8">
            <IrrigationSensorMonitor />
          </TabsContent>

          <TabsContent value="control" className="space-y-6 mt-8">
            <IrrigationManualControl
              zones={zones}
              onStartIrrigation={handleStartIrrigation}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-8">
            <IrrigationAnalytics zones={zones} events={events} />
          </TabsContent>
        </Tabs>

        {/* Alertes actives */}
        <IrrigationAlerts />
      </div>
    </DashboardLayout>
  );
};

export default IrrigationIoT;