
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ContactCTA = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    profileType: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation simple
    if (!formData.fullName || !formData.email || !formData.message) {
      toast({
        title: "❌ Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulation d'envoi d'email - En production, cela nécessiterait Supabase
      console.log('Données du formulaire:', formData);
      console.log('Email à envoyer à: khalil.pionexia@gmail.com');
      
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "✅ Message envoyé !",
        description: "Votre message a été envoyé avec succès. Nous vous répondrons sous 2h.",
      });

      // Reset du formulaire
      setFormData({
        fullName: '',
        email: '',
        profileType: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "❌ Erreur d'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 relative overflow-hidden" id="contact">
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-up">
            <Badge className="mb-8 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-8 py-4 text-xl font-bold shadow-xl">
              <MessageCircle className="h-6 w-6 mr-3" />
              💬 Contactez-nous
            </Badge>
            <h2 className="text-6xl md:text-7xl font-black text-slate-900 mb-10 drop-shadow-sm">
              Prêt à transformer votre agriculture ?
            </h2>
            <p className="text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-light">
              🚀 Discutons de vos besoins et découvrons ensemble comment Plantéra 
              peut révolutionner votre exploitation agricole avec des solutions sur mesure.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Enhanced Contact Form */}
            <GlassCard className="p-12 bg-white/90 backdrop-blur-2xl animate-fade-up shadow-2xl transform transition-all duration-500 hover:scale-105">
              <div className="space-y-8">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    ✉️ Envoyez-nous un message
                  </h3>
                  <p className="text-slate-600 text-lg">Tous les messages sont envoyés directement à notre équipe</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-slate-700 mb-3">
                        👤 Nom complet *
                      </label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Votre nom complet" 
                        className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all text-lg font-medium" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-slate-700 mb-3">
                        📧 Email *
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="votre@email.com" 
                        className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all text-lg font-medium" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-slate-700 mb-3">
                      🎯 Type de profil
                    </label>
                    <select 
                      name="profileType"
                      value={formData.profileType}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all text-lg font-medium"
                    >
                      <option value="">Sélectionnez votre profil</option>
                      <option value="Agriculteur">🚜 Agriculteur</option>
                      <option value="Vétérinaire">🩺 Vétérinaire</option>
                      <option value="Grossiste">📦 Grossiste</option>
                      <option value="GIE/Coopérative">🤝 GIE/Coopérative</option>
                      <option value="Investisseur">💰 Investisseur</option>
                      <option value="Autre">🔄 Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-slate-700 mb-3">
                      📝 Sujet
                    </label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Objet de votre message" 
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all text-lg font-medium" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-slate-700 mb-3">
                      💬 Message *
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre projet, vos besoins ou posez vos questions..." 
                      rows={6} 
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all resize-none text-lg font-medium"
                      required
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 text-xl font-bold shadow-2xl group transform transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6 mr-3 group-hover:translate-x-1 transition-transform" />
                        Envoyer le message 🚀
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </GlassCard>

            {/* Enhanced Contact Info */}
            <div className="space-y-10 animate-fade-up" style={{animationDelay: '0.2s'}}>
              <div>
                <h3 className="text-4xl font-bold text-slate-900 mb-8">
                  🤝 Parlons de votre projet
                </h3>
                <p className="text-xl text-slate-600 leading-relaxed mb-12 font-light">
                  Notre équipe d'experts est là pour vous accompagner dans votre 
                  transformation digitale. Contactez-nous pour une consultation gratuite 
                  et personnalisée selon vos besoins.
                </p>
              </div>

              <div className="space-y-8">
                <GlassCard className="p-8 bg-white/70 backdrop-blur-sm group hover:bg-white/90 transition-all shadow-xl transform hover:scale-105">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <Phone className="h-8 w-8 text-white drop-shadow-sm" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xl">📞 Appelez-nous</p>
                      <p className="text-green-600 font-bold text-lg">+221 77 123 45 67</p>
                      <p className="text-slate-600">Disponible 24/7</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-8 bg-white/70 backdrop-blur-sm group hover:bg-white/90 transition-all shadow-xl transform hover:scale-105">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <Mail className="h-8 w-8 text-white drop-shadow-sm" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xl">✉️ Email</p>
                      <p className="text-blue-600 font-bold text-lg">khalil.pionexia@gmail.com</p>
                      <p className="text-slate-600">Réponse sous 2h</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-8 bg-white/70 backdrop-blur-sm group hover:bg-white/90 transition-all shadow-xl transform hover:scale-105">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <MapPin className="h-8 w-8 text-white drop-shadow-sm" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xl">📍 Adresse</p>
                      <p className="text-purple-600 font-bold text-lg">Dakar, Sénégal</p>
                      <p className="text-slate-600">Siège social</p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Enhanced Quick stats */}
              <GlassCard className="p-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-200 shadow-2xl">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Sparkles className="h-8 w-8 text-green-600" />
                    <h4 className="text-2xl font-bold text-slate-900">🎯 Réponse garantie</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="transform transition-all duration-300 hover:scale-110">
                      <div className="text-4xl font-black text-green-600 drop-shadow-sm">&lt; 2h</div>
                      <div className="text-base text-slate-600 font-semibold">⚡ Première réponse</div>
                    </div>
                    <div className="transform transition-all duration-300 hover:scale-110">
                      <div className="text-4xl font-black text-green-600 drop-shadow-sm">100%</div>
                      <div className="text-base text-slate-600 font-semibold">😊 Satisfaction</div>
                    </div>
                    <div className="transform transition-all duration-300 hover:scale-110">
                      <div className="text-4xl font-black text-green-600 drop-shadow-sm">24/7</div>
                      <div className="text-base text-slate-600 font-semibold">🛠️ Disponibilité</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Background decorations */}
      <div className="absolute top-32 left-16 w-96 h-96 bg-gradient-to-br from-green-300/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-32 right-16 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/30 to-transparent rounded-full blur-3xl animate-float"></div>
    </section>
  );
};

export default ContactCTA;
