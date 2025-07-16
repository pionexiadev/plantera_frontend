
import React from 'react';
import { ModernButton } from "@/components/ui/modern-button";
import { FloatingElements } from "@/components/ui/floating-elements";
import { Target, ArrowRight, HeartHandshake } from "lucide-react";

interface CTASectionProps {
  navigate: (path: string) => void;
}

export default function CTASection({ navigate }: CTASectionProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 relative overflow-hidden">
      <FloatingElements count={15} className="opacity-20" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="animate-fade-up">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 drop-shadow-2xl">
            🚀 Rejoignez la révolution agricole
          </h2>
          <p className="text-2xl text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            ⭐ Plus de 2000 agriculteurs ont déjà choisi Plantéra pour optimiser leurs rendements 
            et construire une agriculture durable au Sénégal. Rejoignez cette success story !
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center animate-fade-up" style={{animationDelay: '0.3s'}}>
          <ModernButton 
            onClick={() => navigate('/register')}
            size="xl"
            className="bg-white text-green-600 hover:bg-green-50 shadow-2xl group transform transition-all duration-500 hover:scale-110"
          >
            <Target className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" />
            Commencer maintenant 🎯
            <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </ModernButton>
          <ModernButton 
            variant="glass"
            size="xl"
            className="border-white/40 text-white hover:bg-white/20 backdrop-blur-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            <HeartHandshake className="h-6 w-6 mr-3" />
            Parler à un expert 👨‍💼
          </ModernButton>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-up" style={{animationDelay: '0.6s'}}>
          <div className="text-center transform transition-all duration-300 hover:scale-110">
            <div className="text-4xl font-black text-white drop-shadow-lg">30 jours</div>
            <div className="text-green-100 font-semibold">🆓 Essai gratuit</div>
          </div>
          <div className="text-center transform transition-all duration-300 hover:scale-110">
            <div className="text-4xl font-black text-white drop-shadow-lg">0 CFA</div>
            <div className="text-green-100 font-semibold">💸 Frais de setup</div>
          </div>
          <div className="text-center transform transition-all duration-300 hover:scale-110">
            <div className="text-4xl font-black text-white drop-shadow-lg">24/7</div>
            <div className="text-green-100 font-semibold">🛠️ Support expert</div>
          </div>
        </div>
      </div>
    </section>
  );
}
