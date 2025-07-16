
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50/20 flex items-center justify-center p-4">
        <div className="text-center animate-fade-up">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-glow animate-bounce-gentle">
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-plantera-darkGreen mb-2">
            Chargement...
          </h2>
          <p className="text-sm sm:text-base text-plantera-slate/70">
            Vérification de votre session
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
