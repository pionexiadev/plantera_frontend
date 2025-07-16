
import { Check, Leaf, History, LineChart, Database, Activity, ScanLine, Cpu, Brain, GraduationCap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const agricultureServices = [
    "Suivi des cycles de culture",
    "Analyse des rendements et recommandations",
    "Gestion des stocks et coûts opérationnels",
    "Identification des animaux par RFID/QR",
    "Enregistrement des soins vétérinaires",
    "Contrôle des cycles de reproduction"
  ];

  const marketplaceServices = [
    "Place de marché pour produits agricoles",
    "Interface sécurisée pour contrats",
    "Contrats intelligents via blockchain",
    "Paiements sécurisés (crypto/mobile money)",
    "Mise en relation producteurs-acheteurs",
    "Système de notation et d'évaluation"
  ];

  const iotServices = [
    "Capteurs IoT (humidité, température, etc.)",
    "Alertes en temps réel",
    "Contrôle automatique d'irrigation",
    "Systèmes d'aération intelligents",
    "Surveillance des cultures et du bétail",
    "Interface mobile de contrôle à distance"
  ];

  return (
    <section className="py-20" id="services">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Nos Services</h2>
          <p className="text-lg text-gray-600">
            Découvrez notre écosystème complet de solutions conçues pour répondre aux besoins des agriculteurs et des éleveurs modernes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Agriculture Management */}
          <div className="card-highlight border-t-4 border-t-plantera-green">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-plantera-green/10">
                <Leaf className="h-8 w-8 text-plantera-green" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-6 text-plantera-darkText">Gestion Agricole et Élevage</h3>
            <ul className="space-y-3 mb-8">
              {agricultureServices.map((service, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-plantera-green mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{service}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <Button className="bg-plantera-green hover:bg-plantera-lightGreen text-white w-full">
                En savoir plus
              </Button>
            </div>
          </div>

          {/* Marketplace */}
          <div className="card-highlight border-t-4 border-t-plantera-blue relative">
            <div className="absolute top-0 right-0 bg-plantera-blue text-white text-xs font-semibold py-1 px-3 rounded-bl-lg">
              Populaire
            </div>
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-plantera-blue/10">
                <Database className="h-8 w-8 text-plantera-blue" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-6 text-plantera-darkText">Plateforme Collaborative</h3>
            <ul className="space-y-3 mb-8">
              {marketplaceServices.map((service, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-plantera-blue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{service}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <Button className="bg-plantera-blue hover:bg-plantera-lightBlue text-white w-full">
                En savoir plus
              </Button>
            </div>
          </div>

          {/* IoT */}
          <div className="card-highlight border-t-4 border-t-plantera-brown">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-plantera-brown/10">
                <Cpu className="h-8 w-8 text-plantera-brown" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-6 text-plantera-darkText">IoT & Automatisation</h3>
            <ul className="space-y-3 mb-8">
              {iotServices.map((service, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-plantera-brown mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{service}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <Button className="bg-plantera-brown hover:bg-plantera-tan hover:text-plantera-brown text-white w-full">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-plantera-green/5 p-8 rounded-lg border border-plantera-green/20">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-plantera-darkText">Autres services spécialisés</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <Brain className="h-6 w-6 text-plantera-green flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">IA & Analyse Prédictive</h4>
                  <p className="text-sm text-gray-600">Prédictions de rendements et détection de maladies</p>
                </div>
              </div>
              <div className="flex gap-3">
                <GraduationCap className="h-6 w-6 text-plantera-green flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Formation & Conseil</h4>
                  <p className="text-sm text-gray-600">Accompagnement pour la transition numérique</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Settings className="h-6 w-6 text-plantera-green flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Solutions Sur Mesure</h4>
                  <p className="text-sm text-gray-600">Développement d'applications personnalisées</p>
                </div>
              </div>
              <div className="flex gap-3">
                <ScanLine className="h-6 w-6 text-plantera-green flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Traçabilité</h4>
                  <p className="text-sm text-gray-600">Suivi complet de la chaîne de production</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-plantera-green hover:bg-plantera-lightGreen text-white px-8 py-6 text-lg">
              Demander un devis personnalisé
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
