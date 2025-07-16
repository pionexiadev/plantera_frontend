
import React from "react";
import { Button } from "@/components/ui/button";

const suggestionsCategories = {
  irrigation: [
    "💧 Optimiser l'irrigation de mes cultures",
    "🌡️ Gestion intelligente de l'humidité du sol",
    "⏰ Programmation d'arrosage automatique avancée",
    "💚 Stratégies d'économies d'eau durables",
    "🔍 Diagnostic de problèmes d'irrigation"
  ],
  cultures: [
    "🌾 Prévisions de récolte personnalisées",
    "🌱 Plan de rotation des cultures optimal",
    "🌿 Calendrier de plantation selon ma région",
    "🍃 Variétés résistantes recommandées",
    "📊 Analyse de rendement par parcelle"
  ],
  sol: [
    "🧪 Analyse approfondie du sol de mes parcelles",
    "🌍 Plan d'amélioration de la fertilité",
    "🔬 Test de pH et corrections nécessaires",
    "🌱 Programme d'engrais organiques personnalisé",
    "⚖️ Équilibre nutritionnel du sol"
  ],
  sante: [
    "🛡️ Conseils phytosanitaires préventifs",
    "🦗 Prévention ciblée des ravageurs",
    "🍄 Diagnostic et traitement des maladies",
    "🌿 Solutions biologiques écologiques",
    "🔬 Surveillance sanitaire intelligente"
  ],
  meteo: [
    "🌤️ Impact météo sur mes cultures actuelles",
    "🌧️ Gestion des périodes de sécheresse",
    "❄️ Protection contre le gel et gelées",
    "🌪️ Prévention des dégâts climatiques",
    "📱 Alertes météo personnalisées"
  ],
  rendement: [
    "📈 Maximiser le rendement de mes parcelles",
    "💰 Optimisation économique des cultures",
    "⚡ Techniques d'amélioration des performances",
    "🎯 Objectifs de production réalistes",
    "📊 Analyse comparative de productivité"
  ]
};

interface ChatSuggestionsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onSuggestionClick: (suggestion: string) => void;
  loading: boolean;
}

export function ChatSuggestions({ 
  selectedCategory, 
  onCategoryChange, 
  onSuggestionClick, 
  loading 
}: ChatSuggestionsProps) {
  const allSuggestions = Object.values(suggestionsCategories).flat();
  const currentSuggestions = selectedCategory 
    ? suggestionsCategories[selectedCategory as keyof typeof suggestionsCategories] 
    : allSuggestions.slice(0, 6);

  return (
    <div className="mb-2 md:mb-4">
      <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(null)}
          className="text-xs h-7 px-2 md:h-8 md:px-3"
        >
          Toutes
        </Button>
        {Object.keys(suggestionsCategories).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="text-xs capitalize h-7 px-2 md:h-8 md:px-3"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-1 md:gap-2">
        {currentSuggestions.map((suggestion, i) => (
          <Button
            key={i}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-normal transition-colors text-xs h-auto py-1 px-2 md:py-2 md:px-3 leading-tight"
            onClick={() => onSuggestionClick(suggestion)}
            disabled={loading}
          >
            <span className="break-words text-left">{suggestion}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
