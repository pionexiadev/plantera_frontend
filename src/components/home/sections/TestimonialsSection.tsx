
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Users, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amadou Diallo",
    role: "Agriculteur - Thiès",
    content: "Plantera a transformé mon exploitation. Mes rendements ont augmenté de 40% et je gagne plus grâce à la vente directe !",
    rating: 5,
    avatar: "🧑🏾‍🌾",
    location: "Thiès, Sénégal"
  },
  {
    name: "Dr. Fatou Sall",
    role: "Vétérinaire",
    content: "Le suivi du bétail est révolutionnaire. Je peux maintenant accompagner 3x plus d'éleveurs efficacement.",
    rating: 5,
    avatar: "👩🏾‍⚕️",
    location: "Dakar, Sénégal"
  },
  {
    name: "Moussa Ba",
    role: "Coopérative GIE",
    content: "L'organisation collective et les achats groupés nous font économiser 25% sur nos coûts d'exploitation.",
    rating: 5,
    avatar: "👨🏾‍💼",
    location: "Saint-Louis, Sénégal"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 relative" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-up">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200 px-6 py-3 text-lg font-semibold">
            <Users className="h-4 w-4 mr-2" />
            💬 Témoignages
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 drop-shadow-sm">
            Ils transforment leur agriculture
          </h2>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            🌟 Découvrez comment Plantéra révolutionne le quotidien des acteurs agricoles au Sénégal avec des résultats concrets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <GlassCard 
              key={index} 
              className="p-10 bg-white/90 backdrop-blur-2xl group hover:scale-110 animate-fade-up transform transition-all duration-500 shadow-2xl" 
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="space-y-8">
                <div className="flex gap-2 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                
                <blockquote className="text-slate-700 leading-relaxed text-center italic text-lg font-medium">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="text-center border-t border-slate-200 pt-8">
                  <div className="text-5xl mb-4">{testimonial.avatar}</div>
                  <p className="font-bold text-slate-900 text-xl">{testimonial.name}</p>
                  <p className="text-green-600 font-semibold text-lg">{testimonial.role}</p>
                  <p className="text-sm text-slate-500 mt-2 font-medium">{testimonial.location}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
