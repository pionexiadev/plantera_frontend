
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ModulePlaceholder = ({ title, description, icon }: ModulePlaceholderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <Card className="p-8 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <div className="p-4 bg-plantera-green/10 rounded-full mb-4">
          {icon}
        </div>
        <h2 className="text-xl font-semibold mb-2">Module en cours de développement</h2>
        <p className="text-muted-foreground mb-6">
          Cette fonctionnalité sera bientôt disponible. Nous travaillons activement à son implémentation.
        </p>
        <Button>
          Retour au tableau de bord <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
};

export default ModulePlaceholder;
