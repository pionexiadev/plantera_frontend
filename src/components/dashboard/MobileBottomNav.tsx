
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, 
  Leaf, 
  Cloud, 
  BarChart3, 
  ShoppingCart, 
  Bot,
  TreePine,
  CalendarDays,
  ShoppingBag,
  PackageOpen,
  Settings,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const location = useLocation();

  const allRoutes = [
    {
      name: 'Accueil',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Parcelles',
      path: '/dashboard/fields',
      icon: TreePine,
    },
    {
      name: 'Cultures',
      path: '/dashboard/cultures',
      icon: Leaf,
    },
    {
      name: 'Récoltes',
      path: '/dashboard/harvests',
      icon: CalendarDays,
    },
    {
      name: 'Ventes',
      path: '/dashboard/sales',
      icon: ShoppingBag,
    },
    {
      name: 'Élevage',
      path: '/dashboard/livestock',
      icon: PackageOpen,
    },
    {
      name: 'IoT',
      path: '/dashboard/irrigation',
      icon: Cloud,
    },
    {
      name: 'IA',
      path: '/dashboard/ai',
      icon: Bot,
    },
    {
      name: 'Analyses',
      path: '/dashboard/analytics',
      icon: BarChart3,
    },
    {
      name: 'Market',
      path: '/dashboard/marketplace',
      icon: ShoppingCart,
    },
    {
      name: 'Formation',
      path: '/dashboard/training',
      icon: BookOpen,
    },
    {
      name: 'Config',
      path: '/dashboard/settings',
      icon: Settings,
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50 md:hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-start py-2 px-2 min-w-max">
          {allRoutes.map((route) => {
            const isActive = location.pathname === route.path;
            return (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[64px]",
                  isActive
                    ? "text-primary-400 bg-primary-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                )}
              >
                <route.icon className={cn(
                  "h-4 w-4 mb-1",
                  isActive && "text-primary-400"
                )} />
                <span className="text-xs font-medium whitespace-nowrap">{route.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
