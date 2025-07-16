
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, 
  Leaf, 
  Cloud, 
  BarChart3, 
  ShoppingCart, 
  Bot, 
  Settings,
  BookOpen,
  PackageOpen, 
  LogOut,
  CalendarDays,
  ShoppingBag,
  TreePine,
  Zap
} from 'lucide-react';
import { ModernButton } from "@/components/ui/modern-button";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const mainRoutes = useMemo(() => [
    {
      name: 'Tableau de bord',
      path: '/dashboard',
      icon: LayoutDashboard,
      description: 'Vue d\'ensemble',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Parcelles',
      path: '/dashboard/fields',
      icon: TreePine,
      description: 'Gestion des terrains',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Cultures',
      path: '/dashboard/cultures',
      icon: Leaf,
      description: 'Gestion des plantations',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      name: 'Récoltes',
      path: '/dashboard/harvests',
      icon: CalendarDays,
      description: 'Planification récoltes',
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Ventes',
      path: '/dashboard/sales',
      icon: ShoppingBag,
      description: 'Suivi commercial',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Élevage',
      path: '/dashboard/livestock',
      icon: PackageOpen,
      description: 'Animaux & bétail',
      color: 'from-amber-500 to-amber-600'
    }
  ], []);

  const toolRoutes = useMemo(() => [
    {
      name: 'Irrigation & IoT',
      path: '/dashboard/irrigation',
      icon: Cloud,
      description: 'Capteurs & automatisation',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      name: 'Assistant IA',
      path: '/dashboard/ai',
      icon: Bot,
      description: 'Conseils personnalisés',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      name: 'Analyses',
      path: '/dashboard/analytics',
      icon: BarChart3,
      description: 'Rapports & métriques',
      color: 'from-teal-500 to-teal-600'
    },
    {
      name: 'Marketplace',
      path: '/dashboard/marketplace',
      icon: ShoppingCart,
      description: 'Achats & ventes',
      color: 'from-rose-500 to-rose-600'
    }
  ], []);

  const systemRoutes = useMemo(() => [
    {
      name: 'Formation',
      path: '/dashboard/training',
      icon: BookOpen,
      description: 'Ressources & guides',
      color: 'from-violet-500 to-violet-600'
    },
    {
      name: 'Paramètres',
      path: '/dashboard/settings',
      icon: Settings,
      description: 'Configuration',
      color: 'from-slate-500 to-slate-600'
    }
  ], []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const renderNavigationGroup = (routes: any[], title: string, accentColor: string) => (
    <div className="px-4 mb-8">
      <div className="flex items-center gap-3 mb-5 px-2">
        <div className={cn(
          "w-1.5 h-5 rounded-full animate-pulse-soft",
          `bg-gradient-to-b ${accentColor}`
        )}></div>
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          {title}
        </p>
      </div>
      <div className="space-y-2">
        {routes.map((route) => {
          const isActive = location.pathname === route.path;
          return (
            <Link key={route.path} to={route.path} className="block">
              <div className={cn(
                "group relative overflow-hidden rounded-xl transition-all duration-300 ease-out",
                "hover:transform hover:scale-[1.02] hover:shadow-lg",
                isActive 
                  ? "bg-gradient-to-r from-white/20 to-white/10 shadow-lg border border-white/20" 
                  : "hover:bg-white/10 hover:shadow-md border border-transparent hover:border-white/10"
              )}>
                <div className="flex items-center p-4 relative z-10">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg mr-4 transition-all duration-300",
                    isActive 
                      ? `bg-gradient-to-br ${route.color} shadow-lg` 
                      : "bg-white/10 group-hover:bg-white/20"
                  )}>
                    <route.icon className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      "text-sm font-semibold transition-colors duration-300",
                      isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                    )}>
                      {route.name}
                    </div>
                    <div className={cn(
                      "text-xs transition-colors duration-300",
                      isActive ? "text-white/80" : "text-slate-400 group-hover:text-slate-300"
                    )}>
                      {route.description}
                    </div>
                  </div>
                </div>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-400/10 rounded-xl"></div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="hidden md:flex flex-col h-full w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden border-r border-slate-700/50">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-400/15 to-transparent rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-full blur-3xl"></div>
      
      {/* Enhanced Header */}
      <div className="px-6 py-8 border-b border-slate-700/30 relative z-10">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-700/70 backdrop-blur-xl border border-slate-600/40 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl blur-lg opacity-60 animate-pulse-soft"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-3xl shadow-xl">
                <Leaf className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Plantera
              </h2>
              <p className="text-sm text-slate-300 font-medium">Agriculture intelligente</p>
            </div>
          </div>
          {user && (
            <div className="mt-5 pt-5 border-t border-slate-600/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full flex items-center justify-center border border-primary-500/30">
                  <span className="text-sm font-bold text-primary-300">{user.name?.[0]?.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="flex-1 py-8 relative z-10 overflow-y-auto custom-scrollbar">
        {renderNavigationGroup(mainRoutes, "Gestion", "from-emerald-500 to-emerald-400")}
        {renderNavigationGroup(toolRoutes, "Outils", "from-blue-500 to-blue-400")}
        {renderNavigationGroup(systemRoutes, "Système", "from-purple-500 to-purple-400")}
      </div>

      {/* Enhanced Footer */}
      <div className="px-6 py-6 border-t border-slate-700/30 mt-auto relative z-10">
        {/* Status Card */}
        <div className="p-5 mb-5 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-700/60 backdrop-blur-xl border border-slate-600/40 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-30"></div>
            </div>
            <span className="text-sm font-semibold text-slate-200">Exploitation active</span>
            <Zap className="h-4 w-4 text-yellow-400 ml-auto" />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">8 parcelles</span>
            <span className="text-slate-300 font-medium">2.5ha total</span>
          </div>
          <div className="mt-3 w-full bg-slate-700/50 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full w-3/4 shadow-sm"></div>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 border border-red-500/20 hover:border-red-500/30 text-red-400 hover:text-red-300 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
        >
          <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-semibold">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}
