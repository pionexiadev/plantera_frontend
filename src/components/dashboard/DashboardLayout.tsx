
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import DashboardSidebar from './DashboardSidebar';
import MobileBottomNav from './MobileBottomNav';
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden pb-20">
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-blue-50/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-200/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-primary-100/10 to-blue-100/10 rounded-full blur-3xl pointer-events-none" />
        
        <main className="px-3 md:px-4 py-4 md:py-6 relative z-10">
          <div className="max-w-full mx-auto w-full">
            <div className="animate-fade-up space-y-4 md:space-y-6">
              {children}
            </div>
          </div>
        </main>
        
        <MobileBottomNav />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-blue-50/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/15 to-transparent rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl pointer-events-none animate-bounce-gentle" />
      
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex-1 py-6 md:py-8 px-6 md:px-10 overflow-auto relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="animate-fade-up space-y-6 md:space-y-8">
              {children}
            </div>
          </div>
        </main>
      </SidebarProvider>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
