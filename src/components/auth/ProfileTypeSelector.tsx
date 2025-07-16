
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { PROFILE_TYPES } from '@/constants/profile-types';
import { ProfileType } from '@/types/user';

interface ProfileTypeSelectorProps {
  selectedType: ProfileType | null;
  onSelect: (type: ProfileType) => void;
  onContinue: () => void;
}

const ProfileTypeSelector: React.FC<ProfileTypeSelectorProps> = ({
  selectedType,
  onSelect,
  onContinue
}) => {
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 animate-fade-up">
        <h2 className="text-2xl font-bold text-plantera-darkGreen">
          Choisissez votre profil
        </h2>
        <p className="text-plantera-slate/70">
          Sélectionnez le type de profil qui correspond le mieux à votre activité
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up">
        {PROFILE_TYPES.map((profile, index) => (
          <Card
            key={profile.id}
            className={`
              relative cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl
              border-2 overflow-hidden group
              ${selectedType === profile.id 
                ? `border-${profile.color} shadow-lg bg-gradient-to-br from-white to-${profile.color}/5` 
                : 'border-gray-200 hover:border-gray-300'
              }
              ${hoveredType === profile.id ? 'shadow-2xl' : ''}
            `}
            style={{
              animationDelay: `${index * 100}ms`,
              borderColor: selectedType === profile.id ? profile.color : undefined
            }}
            onClick={() => onSelect(profile.id)}
            onMouseEnter={() => setHoveredType(profile.id)}
            onMouseLeave={() => setHoveredType(null)}
          >
            {/* Gradient overlay */}
            <div 
              className={`
                absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
                bg-gradient-to-br ${profile.gradient}
              `} 
            />
            
            {/* Selection indicator */}
            {selectedType === profile.id && (
              <div 
                className="absolute top-3 right-3 p-1 rounded-full text-white animate-bounce-gentle"
                style={{ backgroundColor: profile.color }}
              >
                <Check className="h-4 w-4" />
              </div>
            )}

            <CardContent className="p-6 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div 
                    className={`
                      text-3xl p-3 rounded-2xl bg-gradient-to-br ${profile.gradient}
                      text-white shadow-lg group-hover:scale-110 transition-transform duration-300
                    `}
                  >
                    {profile.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-plantera-darkGreen">
                      {profile.title}
                    </h3>
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                      style={{ 
                        borderColor: profile.color,
                        color: profile.color 
                      }}
                    >
                      {profile.permissions.length} fonctionnalités
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-plantera-slate/70 leading-relaxed">
                  {profile.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-plantera-darkGreen uppercase tracking-wider">
                    Fonctionnalités incluses
                  </h4>
                  <ul className="space-y-1">
                    {profile.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-xs text-plantera-slate/60 flex items-center gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: profile.color }}
                        />
                        {feature}
                      </li>
                    ))}
                    {profile.features.length > 3 && (
                      <li className="text-xs text-plantera-slate/50 italic">
                        +{profile.features.length - 3} autres fonctionnalités
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedType && (
        <div className="flex justify-center animate-fade-up">
          <Button
            onClick={onContinue}
            size="lg"
            className={`
              px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105
              bg-gradient-to-r ${getProfileTypeInfo(selectedType)?.gradient || 'from-green-500 to-emerald-600'}
              hover:shadow-glow
            `}
          >
            Continuer avec {getProfileTypeInfo(selectedType)?.title}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

const getProfileTypeInfo = (type: string) => {
  return PROFILE_TYPES.find(p => p.id === type);
};

export default ProfileTypeSelector;
