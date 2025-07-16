
import { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CultureField } from '@/types/culture';
import { Download } from 'lucide-react';

interface CultureExportProps {
  cultures: CultureField[];
}

export function CultureExport({ cultures }: CultureExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToCSV = () => {
    try {
      setIsExporting(true);
      
      // Generate CSV header
      const headers = ['Nom', 'Culture', 'Surface (ha)', 'Statut', 'Date de plantation', 'Date de récolte', 'Santé', 'Irrigation'];
      
      // Generate CSV rows
      const rows = cultures.map(culture => [
        culture.name,
        culture.culture,
        culture.surface.toString(),
        getStatusText(culture.status),
        formatDate(culture.plantedDate),
        formatDate(culture.estimatedHarvestDate),
        `${culture.health}%`,
        `${culture.irrigation}%`
      ]);
      
      // Combine header and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      // Create a blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.setAttribute('href', url);
      link.setAttribute('download', `cultures-export-${formatDateForFilename(new Date())}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Export réussi',
        description: `${cultures.length} parcelles exportées au format CSV`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Erreur lors de l\'export',
        description: 'Une erreur est survenue lors de l\'export des données',
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = () => {
    try {
      setIsExporting(true);
      
      // Format culture data for export
      const exportData = cultures.map(culture => ({
        name: culture.name,
        culture: culture.culture,
        surface: culture.surface,
        status: culture.status,
        plantedDate: culture.plantedDate,
        estimatedHarvestDate: culture.estimatedHarvestDate,
        health: culture.health,
        irrigation: culture.irrigation
      }));
      
      // Create a blob and download link
      const jsonContent = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.setAttribute('href', url);
      link.setAttribute('download', `cultures-export-${formatDateForFilename(new Date())}.json`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Export réussi',
        description: `${cultures.length} parcelles exportées au format JSON`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Erreur lors de l\'export',
        description: 'Une erreur est survenue lors de l\'export des données',
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Helper functions
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'planted': return 'Semé';
      case 'growing': return 'En croissance';
      case 'ready': return 'Prêt à récolter';
      case 'harvested': return 'Récolté';
      default: return status;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatDateForFilename = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          disabled={cultures.length === 0 || isExporting}
          className="gap-2 border-plantera-green/30 text-plantera-green hover:text-plantera-green hover:bg-plantera-green/10 hover:border-plantera-green"
        >
          <Download className="h-4 w-4" />
          <span>Exporter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 border-green-100">
        <DropdownMenuItem onClick={exportToCSV} className="cursor-pointer">
          Exporter en CSV
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exportToJSON} className="cursor-pointer">
          Exporter en JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
