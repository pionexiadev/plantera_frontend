import { Card, CardContent } from "@/components/ui/card";
import { CultureFieldProps } from "./CultureField";
import { Leaf, Droplet, Sun, Calendar } from "lucide-react";
import { CultureProgressBar } from "./CultureProgressBar";

interface CultureStatsProps {
  fields: CultureFieldProps[];
}

export function CultureStats({ fields }: CultureStatsProps) {
  const totalSurface = fields.reduce((sum, field) => sum + field.surface, 0);
  const totalFields = fields.length;

  const avgHealth = fields.length > 0
    ? Math.round(fields.reduce((sum, field) => sum + (field.sante || 0), 0) / fields.length)
    : 0;

  const avgIrrigation = fields.length > 0
    ? Math.round(fields.reduce((sum, field) => sum + (field.irrigation || 0), 0) / fields.length)
    : 0;

  const cultureCount = fields.reduce((acc, field) => {
    acc[field.culture] = (acc[field.culture] || 0) + field.surface;
    return acc;
  }, {} as Record<string, number>);

  const topCultures = Object.entries(cultureCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const statusCount = {
    planted: fields.filter(f => f.statut === 'planted').length,
    growing: fields.filter(f => f.statut === 'growing').length,
    ready: fields.filter(f => f.statut === 'ready').length,
    harvested: fields.filter(f => f.statut === 'harvested').length,
  };

  const stats = [
    {
      icon: Leaf,
      label: "Surface Totale",
      value: `${totalSurface} ha`,
      subtitle: `${totalFields} parcelle${totalFields > 1 ? 's' : ''}`,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100"
    },
    {
      icon: Sun,
      label: "Santé Cultures",
      value: `${avgHealth}%`,
      subtitle: "moyenne",
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-100",
      showProgress: true,
      progressValue: avgHealth,
      progressScheme: "health"
    },
    {
      icon: Droplet,
      label: "Irrigation",
      value: `${avgIrrigation}%`,
      subtitle: "moyenne",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      showProgress: true,
      progressValue: avgIrrigation,
      progressScheme: "irrigation"
    },
    {
      icon: Calendar,
      label: "Statut",
      value: "",
      subtitle: "",
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-100",
      isStatus: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`glass-card bg-gradient-to-br ${stat.bgGradient} border-white/20 hover:shadow-card transition-all duration-300 group`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-gradient-to-r ${stat.gradient} rounded-xl shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-plantera-slate/60 uppercase tracking-wide">{stat.label}</p>
                    {stat.isStatus ? (
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2">
                        <p className="text-xs text-plantera-darkGreen">Semées: <span className="font-semibold">{statusCount.planted}</span></p>
                        <p className="text-xs text-plantera-darkGreen">En croissance: <span className="font-semibold">{statusCount.growing}</span></p>
                        <p className="text-xs text-plantera-darkGreen">Prêtes: <span className="font-semibold">{statusCount.ready}</span></p>
                        <p className="text-xs text-plantera-darkGreen">Récoltées: <span className="font-semibold">{statusCount.harvested}</span></p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold text-plantera-darkGreen">{stat.value}</p>
                          {stat.subtitle && <p className="text-xs text-plantera-slate/60">{stat.subtitle}</p>}
                        </div>
                        {stat.showProgress && (
                          <div className="mt-2 w-full">
                            <CultureProgressBar 
                              value={stat.progressValue!} 
                              size="sm" 
                              colorScheme={stat.progressScheme as any} 
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {topCultures.length > 0 && (
        <Card className="glass-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-gradient-primary mb-4 flex items-center gap-2">
              <div className="p-1.5 bg-gradient-primary rounded-lg">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              Principales cultures
            </h3>
            <div className="space-y-4">
              {topCultures.map(([culture, surface]) => (
                <div key={culture} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-plantera-darkGreen">{culture}</span>
                    <span className="text-sm font-bold text-plantera-slate">{surface} ha</span>
                  </div>
                  <CultureProgressBar 
                    value={Math.round((surface / totalSurface) * 100)}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
