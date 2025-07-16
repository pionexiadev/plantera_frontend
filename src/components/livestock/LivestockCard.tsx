import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Calendar, Heart, Stethoscope, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Animal } from '@/types/livestock';
import { LivestockDialog } from './LivestockDialog';

interface LivestockCardProps {
  animal: Animal;
  onUpdate: (id: string, data: Partial<Animal>) => void;
  onDelete: (id: string) => void;
}

export function LivestockCard({ animal, onUpdate, onDelete }: LivestockCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const getHealthColor = (health: string) => {
    switch(health) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'average': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHealthText = (health: string) => {
    switch(health) {
      case 'excellent': return 'Excellente';
      case 'good': return 'Bonne';
      case 'average': return 'Moyenne';
      case 'poor': return 'Faible';
      default: return health;
    }
  };

  const getAnimalIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'bovin': return '🐄';
      case 'porc': return '🐷';
      case 'mouton': return '🐑';
      case 'chèvre': return '🐐';
      case 'volaille': return '🐔';
      default: return '🐾';
    }
  };

  const getCardStyle = (type: string) => {
    switch(type.toLowerCase()) {
      case 'bovin': return 'from-amber-50 to-orange-100 border-amber-200';
      case 'porc': return 'from-pink-50 to-rose-100 border-pink-200';
      case 'mouton': return 'from-slate-50 to-gray-100 border-slate-200';
      case 'chèvre': return 'from-green-50 to-emerald-100 border-green-200';
      case 'volaille': return 'from-yellow-50 to-amber-100 border-yellow-200';
      default: return 'from-blue-50 to-indigo-100 border-blue-200';
    }
  };

  const age = animal.birthDate ? 
    Math.floor((new Date().getTime() - new Date(animal.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365)) 
    : 0;

  return (
    <>
      <Card className={`glass-card hover:shadow-card-hover hover:scale-[1.02] group animate-fade-up bg-gradient-to-br ${getCardStyle(animal.type)}`}>
        <CardHeader className="pb-2 relative">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl text-gradient-primary flex items-center gap-3">
                  <div className="p-2 bg-gradient-glass rounded-2xl border border-white/30 backdrop-blur-sm">
                    <span className="text-2xl">{getAnimalIcon(animal.type)}</span>
                  </div>
                  {animal.name}
                </CardTitle>
                <p className="text-sm text-plantera-slate/70 mt-2 font-medium">{animal.type} • {animal.breed}</p>
              </div>
            <div className="flex items-center gap-2">
              <Badge variant={animal.health === 'excellent' ? 'success' : animal.health === 'good' ? 'default' : animal.health === 'average' ? 'warning' : 'destructive'} className="shadow-card">
                {getHealthText(animal.health)}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary-100/50">
                    <MoreVertical className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-card">
                  <DropdownMenuItem 
                    onClick={() => setIsEditDialogOpen(true)}
                    className="cursor-pointer hover:bg-green-50 focus:bg-green-50"
                  >
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onUpdate(animal.id, { health: 'excellent' })}
                    className="cursor-pointer hover:bg-green-50 focus:bg-green-50"
                  >
                    Marquer en excellente santé
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onUpdate(animal.id, { health: 'poor' })}
                    className="cursor-pointer hover:bg-red-50 focus:bg-red-50"
                  >
                    Signaler un problème de santé
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onDelete(animal.id)}
                    className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50"
                  >
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-gradient-glass rounded-2xl p-3 border border-white/20 backdrop-blur-sm">
                <div className="p-2 bg-gradient-ocean rounded-xl">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-plantera-darkGreen">{age} ans</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-glass rounded-2xl p-3 border border-white/20 backdrop-blur-sm">
                <div className="p-2 bg-gradient-sunset rounded-xl">
                  <Package className="h-4 w-4 text-plantera-darkGreen" />
                </div>
                <span className="text-sm font-semibold text-plantera-darkGreen">{animal.weight} kg</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-glass rounded-2xl p-3 border border-white/20 backdrop-blur-sm">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-plantera-darkGreen">{animal.gender === 'male' ? 'Mâle' : 'Femelle'}</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-glass rounded-2xl p-3 border border-white/20 backdrop-blur-sm">
                <div className="p-2 bg-gradient-growth rounded-xl">
                  <Stethoscope className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-plantera-darkGreen">
                  {animal.lastVetVisit ? 
                    new Date(animal.lastVetVisit).toLocaleDateString('fr-FR') : 
                    'Aucune'
                  }
                </span>
              </div>
            </div>
            {animal.notes && (
              <div className="bg-gradient-glass rounded-2xl p-4 border border-white/20 backdrop-blur-sm">
                <p className="text-sm text-plantera-slate/80 font-medium leading-relaxed">{animal.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-4 flex justify-between bg-gradient-glass/50 border-t border-white/20">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-primary rounded-lg">
              <Calendar className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs text-plantera-slate/70 font-medium">
              Né le {animal.birthDate ? new Date(animal.birthDate).toLocaleDateString('fr-FR') : 'N/A'}
            </span>
          </div>
          <Button 
            variant="glass" 
            size="sm" 
            onClick={() => setIsEditDialogOpen(true)}
            className="hover:scale-105 transition-transform"
          >
            Modifier
          </Button>
        </CardFooter>
      </Card>
      
      {isEditDialogOpen && (
        <LivestockDialog 
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={(data) => {
            onUpdate(animal.id, data);
            setIsEditDialogOpen(false);
          }}
          animalData={animal}
          isEditing={true}
        />
      )}
    </>
  );
}