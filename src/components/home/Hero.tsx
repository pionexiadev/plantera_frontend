
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20 md:py-28 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              🚀 Nouvelle version disponible
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
              L'agriculture 
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent block">
                intelligente
              </span>
              pour tous
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Transformez votre exploitation avec notre plateforme tout-en-un : 
              IA, IoT, marketplace et analytics pour maximiser vos rendements 
              tout en préservant l'environnement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link 
                to="/#services" 
                className="flex items-center justify-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors py-3 px-6 border border-green-200 rounded-xl hover:bg-green-50"
              >
                Découvrir nos solutions
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{animationDelay: '0.3s'}}>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
                alt="Agriculture moderne au Sénégal"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-green-100">
              <div className="text-2xl font-bold text-green-600">+35%</div>
              <div className="text-sm text-slate-600">Rendement</div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-green-100">
              <div className="text-2xl font-bold text-green-600">2000+</div>
              <div className="text-sm text-slate-600">Agriculteurs</div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 py-8 px-8 bg-white rounded-2xl shadow-xl border border-green-100 animate-fade-up" style={{animationDelay: '0.6s'}}>
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-green-600">2000+</h3>
            <p className="text-slate-600">Agriculteurs</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-green-600">15k+</h3>
            <p className="text-slate-600">Hectares gérés</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-green-600">98%</h3>
            <p className="text-slate-600">Satisfaction</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-green-600">35%</h3>
            <p className="text-slate-600">↑ Productivité</p>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-200/30 to-transparent rounded-full blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
    </section>
  );
};

export default Hero;
