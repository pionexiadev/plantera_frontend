
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AIAssistantChat from '@/components/cultures/AIAssistantChat';
import { Brain, Info } from 'lucide-react';

const AIAssistant = () => {
  return (
    <DashboardLayout>
      <div className="space-y-3 md:space-y-6">
        <div className="flex flex-col gap-2 md:gap-4">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-slate-900">Assistant IA</h1>
            <p className="text-xs md:text-base text-slate-600">Obtenez des recommandations personnalisées pour votre exploitation</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-6">
          {/* Chat Section - Full width on mobile, 3/4 on desktop */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Card className="h-[calc(100vh-180px)] md:h-[600px] lg:h-[700px] flex flex-col shadow-md border-slate-200">
              <CardHeader className="border-b border-slate-100 bg-white/50 pb-2 pt-3 px-3 md:pb-3 md:pt-4 md:px-6">
                <CardTitle className="text-sm md:text-lg flex items-center gap-2 text-slate-800">
                  <Brain className="h-4 w-4 md:h-5 md:w-5 text-plantera-green" />
                  Assistant agricole
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-2 md:p-5 overflow-hidden">
                <AIAssistantChat />
              </CardContent>
            </Card>
          </div>
          
          {/* Info Section - Full width on mobile, 1/4 on desktop */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="shadow-md border-slate-200">
              <CardHeader className="border-b border-slate-100 bg-white/50 pb-2 pt-3 px-3 md:pb-3 md:pt-4 md:px-6">
                <CardTitle className="text-sm md:text-lg text-slate-800 flex items-center gap-2">
                  <Info className="h-3 w-3 md:h-4 md:w-4 text-primary-600" />
                  Informations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-5">
                <div className="space-y-2 md:space-y-4 text-xs md:text-sm text-slate-600">
                  <p>Notre assistant IA utilise les dernières technologies d'intelligence artificielle pour vous fournir des recommandations personnalisées.</p>
                  <p>Vous pouvez poser des questions sur :</p>
                  <ul className="list-disc pl-3 md:pl-5 space-y-1">
                    <li>Vos cultures et rotations</li>
                    <li>L'irrigation et la gestion de l'eau</li>
                    <li>Les maladies et traitements</li>
                    <li>Les prévisions de rendement</li>
                    <li>L'analyse des sols</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;
