
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { ModernButton } from "@/components/ui/modern-button";
import { FloatingElements } from "@/components/ui/floating-elements";
import { 
  Leaf, 
  BarChart3, 
  Users, 
  Zap, 
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  HeartHandshake,
  Sparkles,
  Sprout,
  Globe,
  Award,
  Monitor,
  Brain,
  Wifi,
  Rocket,
  Shield
} from "lucide-react";
import Footer from '@/components/layout/Footer';
import ContactCTA from './ContactCTA';
import HeroSection from './sections/HeroSection';
import SolutionsSection from './sections/SolutionsSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CTASection from './sections/CTASection';
import Navigation from './sections/Navigation';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden">
      <FloatingElements count={20} />
      
      <Navigation navigate={navigate} />
      <HeroSection navigate={navigate} />
      <SolutionsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection navigate={navigate} />
      <ContactCTA />
      <Footer />
    </div>
  );
}
