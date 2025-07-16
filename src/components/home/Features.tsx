
import { Cpu, Users, Leaf, Brain, GraduationCap, Settings, Zap, TrendingUp, Shield, Globe } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';

const Features = () => {
  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-white" />,
      title: "Gestion Agricole Intelligente",
      description: "Suivez vos cultures en temps réel avec l'IA et optimisez chaque aspect de votre exploitation pour des rendements exceptionnels.",
      color: "from-green-500 to-emerald-600",
      benefits: ["Suivi temps réel", "Prédictions IA", "Optimisation auto"]
    },
    {
      icon: <Users className="h-10 w-10 text-white" />,
      title: "Marketplace Collaborative",
      description: "Connectez-vous directement avec acheteurs et vendeurs sur notre plateforme sécurisée par blockchain.",
      color: "from-blue-500 to-cyan-600",
      benefits: ["Vente directe", "Prix transparents", "Paiements sécurisés"]
    },
    {
      icon: <Cpu className="h-10 w-10 text-white" />,
      title: "IoT & Automatisation",
      description: "Capteurs intelligents et automatisation complète pour une irrigation de précision et gestion optimale.",
      color: "from-purple-500 to-violet-600",
      benefits: ["Capteurs IoT", "Irrigation auto", "Alertes mobiles"]
    },
    {
      icon: <Brain className="h-10 w-10 text-white" />,
      title: "Intelligence Artificielle",
      description: "Prédictions météo, détection de maladies et recommandations personnalisées grâce à nos modèles IA avancés.",
      color: "from-orange-500 to-red-600",
      benefits: ["Prédictions météo", "Détection maladies", "Conseils IA"]
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-white" />,
      title: "Analytics Avancées",
      description: "Tableaux de bord interactifs et rapports détaillés pour prendre des décisions basées sur les données.",
      color: "from-indigo-500 to-purple-600",
      benefits: ["Dashboards visuels", "Rapports détaillés", "KPIs personnalisés"]
    },
    {
      icon: <Globe className="h-10 w-10 text-white" />,
      title: "Support Communautaire",
      description: "Rejoignez une communauté d'agriculteurs, partagez vos expériences et bénéficiez de l'entraide collective.",
      color: "from-teal-500 to-green-600",
      benefits: ["Communauté active", "Partage d'expérience", "Support 24/7"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden" id="features">
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-up">
          <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Technologies Innovantes
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Des solutions complètes pour 
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent block">
              l'agriculture moderne
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Nos technologies de pointe transforment la gestion agricole pour améliorer 
            la productivité et la rentabilité de votre exploitation tout en préservant l'environnement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard 
              key={index} 
              className="p-8 group hover:scale-105 transition-all duration-500 animate-fade-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="space-y-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                  {feature.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{feature.description}</p>
                </div>
                
                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
                      <span className="text-slate-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Additional info section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-up">
          <div className="space-y-6">
            <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border-purple-200">
              <Settings className="h-3 w-3 mr-1" />
              Services Personnalisés
            </Badge>
            <h3 className="text-3xl font-bold text-slate-900">
              Accompagnement sur mesure
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Notre équipe d'experts vous accompagne dans votre transformation digitale 
              avec des formations personnalisées et un support technique dédié.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-green-500" />
                <span className="text-slate-700 font-medium">Formation complète</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-500" />
                <span className="text-slate-700 font-medium">Support 24/7</span>
              </div>
            </div>
          </div>
          
          <GlassCard className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-slate-900">Résultats garantis</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Augmentation rendement</span>
                  <span className="text-2xl font-bold text-green-600">+35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Réduction coûts</span>
                  <span className="text-2xl font-bold text-green-600">-25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Économie d'eau</span>
                  <span className="text-2xl font-bold text-green-600">-40%</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-green-300/20 to-transparent rounded-full blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-emerald-300/20 to-transparent rounded-full blur-3xl animate-float"></div>
    </section>
  );
};

export default Features;
