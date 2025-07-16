import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Mail, Lock, User, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProfileTypeSelector from '@/components/auth/ProfileTypeSelector';
import { ProfileType } from '@/types/user';

type RegistrationStep = 'profile' | 'details' | 'success';

const Register = () => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('profile');
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Si utilisateur déjà connecté, rediriger vers dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleProfileSelection = (type: ProfileType) => {
    setSelectedProfile(type);
  };

  const handleContinueToDetails = () => {
    if (!selectedProfile) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner un type de profil',
        variant: 'destructive',
      });
      return;
    }
    setCurrentStep('details');
  };

  const handleBackToProfile = () => {
    setCurrentStep('profile');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProfile) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner un type de profil',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 6 caractères',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const success = await register(email, password, name, selectedProfile, nomEntreprise);

    setIsLoading(false);

    if (success) {
      setCurrentStep('success');
      setTimeout(() => {
        toast({
          title: 'Inscription réussie',
          description: 'Bienvenue sur Plantera !',
        });
        navigate('/dashboard');
      }, 2000);
    } else {
      toast({
        title: "Erreur d'inscription",
        description: 'Une erreur est survenue',
        variant: 'destructive',
      });
    }
  };

  const renderProfileStep = () => (
    <div className="w-full max-w-4xl mx-auto">
      <ProfileTypeSelector
        selectedType={selectedProfile}
        onSelect={handleProfileSelection}
        onContinue={handleContinueToDetails}
      />
    </div>
  );

  const renderDetailsStep = () => (
    <div className="w-full max-w-sm mx-auto">
      <Card className="animate-fade-up shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToProfile}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="text-2xl">
              {selectedProfile === 'agriculteur' ? '🚜' :
               selectedProfile === 'veterinaire' ? '🩺' :
               selectedProfile === 'grossiste' ? '📦' :
               selectedProfile === 'gie' ? '🤝' :
               selectedProfile === 'vendeur' ? '🏪' :
               selectedProfile === 'acheteur' ? '🛒' : '💰'}
            </div>
          </div>
          <CardTitle className="text-xl">Finaliser l'inscription</CardTitle>
          <CardDescription className="text-sm">
            Profil : {selectedProfile === 'agriculteur' ? 'Agriculteur' :
                      selectedProfile === 'veterinaire' ? 'Vétérinaire' :
                      selectedProfile === 'grossiste' ? 'Grossiste' :
                      selectedProfile === 'gie' ? 'GIE / Coopérative' :
                      selectedProfile === 'vendeur' ? 'Vendeur' :
                      selectedProfile === 'acheteur' ? 'Acheteur' : 'Investisseur'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-plantera-darkGreen font-medium text-sm">
                Nom complet
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-plantera-green/60" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-10 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-plantera-darkGreen font-medium text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-plantera-green/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-plantera-darkGreen font-medium text-sm">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-plantera-green/60" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-10 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-plantera-green/60 hover:text-plantera-green transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-plantera-darkGreen font-medium text-sm">
                Confirmer le mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-plantera-green/60" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 h-10 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-plantera-green/60 hover:text-plantera-green transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomEntreprise" className="text-plantera-darkGreen font-medium text-sm">
                Nom de l’entreprise (facultatif)
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-plantera-green/60" />
                <Input
                  id="nomEntreprise"
                  type="text"
                  placeholder="Entreprise Agricole XYZ"
                  value={nomEntreprise}
                  onChange={(e) => setNomEntreprise(e.target.value)}
                  className="pl-10 h-10 text-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 text-sm font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Création du compte...' : 'Créer mon compte'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-plantera-slate/70">
              Déjà un compte ?{' '}
              <Link
                to="/login"
                className="text-plantera-green hover:text-plantera-darkGreen font-medium underline-offset-4 hover:underline transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="w-full max-w-sm mx-auto">
      <Card className="animate-fade-up shadow-2xl text-center">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="animate-bounce-gentle">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-plantera-darkGreen mb-2">
                Compte créé avec succès !
              </h2>
              <p className="text-plantera-slate/70">Redirection vers votre dashboard...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/10 via-transparent to-accent-100/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-96 lg:h-96 bg-gradient-to-br from-primary-200/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-96 lg:h-96 bg-gradient-to-br from-accent-200/20 to-transparent rounded-full blur-3xl pointer-events-none animate-float" />

      <div className="relative z-10 w-full">
        {currentStep === 'profile' && (
          <>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-2xl shadow-glow animate-bounce-gentle">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-plantera-darkGreen mb-2">Rejoignez Plantera</h1>
              <p className="text-plantera-slate/70">La plateforme agricole moderne qui s'adapte à votre métier</p>
            </div>
            {renderProfileStep()}
          </>
        )}
        {currentStep === 'details' && renderDetailsStep()}
        {currentStep === 'success' && renderSuccessStep()}
      </div>
    </div>
  );
};

export default Register;
