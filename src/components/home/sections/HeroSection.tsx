
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { ModernButton } from "@/components/ui/modern-button";
import { 
  Award,
  ArrowRight,
  Zap,
  Monitor,
  Shield,
  Users,
  Leaf,
  TrendingUp,
  Clock
} from "lucide-react";

interface HeroSectionProps {
  navigate: (path: string) => void;
}

const stats = [
  { value: "2000+", label: "Agriculteurs actifs", icon: <Users className="h-6 w-6" />, color: "text-green-600" },
  { value: "15k+", label: "Hectares connectés", icon: <Leaf className="h-6 w-6" />, color: "text-blue-600" },
  { value: "35%", label: "Augmentation rendement", icon: <TrendingUp className="h-6 w-6" />, color: "text-purple-600" },
  { value: "24/7", label: "Support technique", icon: <Clock className="h-6 w-6" />, color: "text-orange-600" }
];

export default function HeroSection({ navigate }: HeroSectionProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="animate-fade-up">
              <Badge className="mb-8 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-6 py-3 text-lg font-semibold shadow-lg">
                <Award className="h-5 w-5 mr-3" />
                🏆 #1 au Sénégal - Agriculture Digitale
              </Badge>
              
              <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
                <span className="text-slate-900 drop-shadow-sm">L'avenir de</span>
                <br />
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
                  l'agriculture
                </span>
                <br />
                <span className="text-slate-900 drop-shadow-sm">commence ici</span>
              </h1>
              
              <p className="text-2xl text-slate-600 leading-relaxed max-w-2xl font-light">
                🚀 Révolutionnez votre exploitation avec notre plateforme tout-en-un : 
                IA, IoT, marketplace et analytics pour maximiser vos rendements 
                tout en préservant l'environnement.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 animate-fade-up" style={{animationDelay: '0.3s'}}>
              <ModernButton 
                onClick={() => navigate('/register')}
                size="xl"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 group shadow-2xl transform transition-all duration-500 hover:scale-110"
              >
                <Zap className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" />
                Démarrer gratuitement
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </ModernButton>
              <ModernButton 
                variant="glass"
                size="xl"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 backdrop-blur-xl shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                <Monitor className="h-6 w-6 mr-3" />
                Voir la démo 🎥
              </ModernButton>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-fade-up" style={{animationDelay: '0.6s'}}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center group transform transition-all duration-500 hover:scale-110">
                  <div className={`flex justify-center mb-3 ${stat.color} group-hover:scale-125 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-slate-900 drop-shadow-sm">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up" style={{animationDelay: '0.4s'}}>
            <div className="relative z-10 transform transition-all duration-700 hover:scale-105">
              <GlassCard className="p-10 bg-white/80 backdrop-blur-2xl border-white/40 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900">Dashboard Agricole 📊</h3>
                    <Badge className="bg-green-100 text-green-800 animate-pulse">🔴 En direct</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-lg">
                      <div className="text-sm text-green-700 mb-2 font-semibold">📈 Rendement</div>
                      <div className="text-3xl font-black text-green-900">+35%</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-lg">
                      <div className="text-sm text-blue-700 mb-2 font-semibold">💰 Économies</div>
                      <div className="text-3xl font-black text-blue-900">-25%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 font-medium">💧 Irrigation automatique</span>
                      <span className="text-green-600 font-bold">✅ Actif</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full w-3/4 shadow-lg animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700 font-medium">🛡️ Sécurisé par blockchain</span>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-400/40 to-emerald-400/40 rounded-full blur-2xl animate-bounce-slow"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-2xl animate-float"></div>
            <div className="absolute top-16 left-16 w-16 h-16 bg-gradient-to-br from-purple-400/30 to-violet-400/30 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-32 left-16 w-96 h-96 bg-gradient-to-br from-green-300/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-32 right-16 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/30 to-transparent rounded-full blur-3xl animate-float-slow"></div>
    </section>
  );
}
