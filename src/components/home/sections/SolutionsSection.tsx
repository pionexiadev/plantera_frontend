
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Brain, CheckCircle } from "lucide-react";

const solutions = [
  {
    title: "Pour Agriculteurs",
    description: "Suite complète de gestion agricole",
    features: ["Gestion des cultures", "IoT & Irrigation", "Analytics", "Marketplace"],
    icon: "🚜",
    color: "from-green-400 to-green-600"
  },
  {
    title: "Pour Vétérinaires",
    description: "Suivi santé du bétail",
    features: ["Suivi animaux", "Historique médical", "Alertes sanitaires", "Communication"],
    icon: "🩺",
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "Pour Investisseurs",
    description: "Opportunités d'investissement",
    features: ["Analyses ROI", "Portfolio", "Performance", "Marchés"],
    icon: "💰",
    color: "from-purple-400 to-purple-600"
  }
];

export default function SolutionsSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-white via-slate-50 to-green-50 relative" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-up">
          <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border-purple-200 px-6 py-3 text-lg font-semibold">
            <Brain className="h-4 w-4 mr-2" />
            🧠 Solutions Personnalisées
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 drop-shadow-sm">
            Une solution pour chaque profil
          </h2>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            🎯 Que vous soyez agriculteur, vétérinaire ou investisseur, Plantéra s'adapte à vos besoins spécifiques avec une précision chirurgicale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {solutions.map((solution, index) => (
            <GlassCard 
              key={index} 
              className="p-10 group hover:scale-110 animate-fade-up transform transition-all duration-500 shadow-2xl" 
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="text-center space-y-8">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-r ${solution.color} flex items-center justify-center text-4xl mx-auto group-hover:scale-125 transition-all duration-500 shadow-2xl`}>
                  {solution.icon}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{solution.title}</h3>
                  <p className="text-slate-600 mb-8 text-lg">{solution.description}</p>
                </div>
                
                <div className="space-y-4">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-base">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
