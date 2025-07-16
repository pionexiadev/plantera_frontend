
import { Card } from "@/components/ui/card";
import { Beef, Activity, AlertTriangle, Heart } from "lucide-react";

interface LivestockStatsProps {
  totalAnimals: number;
  needAttention: number;
  inTreatment: number;
  healthyAnimals: number;
}

const LivestockStats = ({ totalAnimals, needAttention, inTreatment, healthyAnimals }: LivestockStatsProps) => {
  const stats = [
    {
      icon: Beef,
      label: "Total Animaux",
      value: totalAnimals,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-100"
    },
    {
      icon: AlertTriangle,
      label: "Attention Requise",
      value: needAttention,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100"
    },
    {
      icon: Activity,
      label: "En Traitement",
      value: inTreatment,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: Heart,
      label: "En Bonne Santé",
      value: healthyAnimals,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`p-4 bg-gradient-to-br ${stat.bgGradient} border-white/20 hover:shadow-card transition-all duration-300 group`}>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className={`p-2 bg-gradient-to-r ${stat.gradient} rounded-xl shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-plantera-slate/60 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-plantera-darkGreen">{stat.value}</p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default LivestockStats;
