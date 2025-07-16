
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingElements } from "@/components/ui/floating-elements";
import { 
  Sprout,
  BarChart3,
  Wifi,
  Globe,
  Zap,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: <Sprout className="h-8 w-8 text-white" />,
    title: "Gestion Intelligente",
    description: "Optimisez vos cultures avec l'IA et l'IoT pour des rendements exceptionnels.",
    benefits: ["Suivi temps réel", "Prédictions IA", "Automation IoT"],
    color: "from-green-500 to-emerald-600",
    delay: "0s"
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-white" />,
    title: "Analytics Avancées",
    description: "Tableaux de bord intelligents pour des décisions basées sur les données.",
    benefits: ["Rapports visuels", "KPIs personnalisés", "Prévisions météo"],
    color: "from-blue-500 to-cyan-600",
    delay: "0.2s"
  },
  {
    icon: <Wifi className="h-8 w-8 text-white" />,
    title: "IoT & Capteurs",
    description: "Capteurs connectés pour une agriculture de précision automatisée.",
    benefits: ["Capteurs sol", "Irrigation auto", "Alertes mobiles"],
    color: "from-purple-500 to-violet-600",
    delay: "0.4s"
  },
  {
    icon: <Globe className="h-8 w-8 text-white" />,
    title: "Marketplace",
    description: "Plateforme collaborative pour vendre et acheter en direct.",
    benefits: ["Vente directe", "Prix transparents", "Logistique intégrée"],
    color: "from-orange-500 to-red-600",
    delay: "0.6s"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" id="features">
      <FloatingElements count={12} className="opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-up">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-6 py-3 text-lg font-semibold backdrop-blur-xl">
            <Zap className="h-4 w-4 mr-2" />
            ⚡ Technologies Avancées
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 drop-shadow-2xl">
            Innovation au service de l'agriculture
          </h2>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            🔬 Découvrez comment nos technologies révolutionnent l'agriculture sénégalaise avec une approche scientifique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <GlassCard 
              key={index} 
              className="p-10 bg-white/10 backdrop-blur-2xl border-white/20 group hover:scale-110 animate-fade-up transform transition-all duration-500 shadow-2xl" 
              style={{animationDelay: feature.delay}}
            >
              <div className="flex items-start gap-8">
                <div className={`bg-gradient-to-r ${feature.color} p-6 rounded-3xl shadow-2xl group-hover:scale-125 transition-all duration-500`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                    {feature.description}
                  </p>
                  <div className="space-y-4">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-base">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
