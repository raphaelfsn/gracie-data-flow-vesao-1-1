import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { usePeriod } from "@/contexts/PeriodContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const PDFExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { currentPeriod } = usePeriod();

  const exportToPDF = async () => {
    setIsExporting(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const tabs = ['overview', 'meta-ads', 'google-ads', 'instagram'];
      const tabNames = ['Visão Geral', 'Meta Ads', 'Google Ads', 'Instagram'];
      
      for (let i = 0; i < tabs.length; i++) {
        // Click on tab to ensure it's active
        const tabTrigger = document.querySelector(`[value="${tabs[i]}"]`) as HTMLElement;
        if (tabTrigger) {
          tabTrigger.click();
          // Wait for content to render
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Find the tab content
        const tabContent = document.querySelector(`[data-state="active"]`);
        
        if (tabContent) {
          const canvas = await html2canvas(tabContent as HTMLElement, {
            scale: 1,
            useCORS: true,
            allowTaint: true,
            height: tabContent.scrollHeight,
            width: tabContent.scrollWidth
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 190; // A4 width minus margins
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          if (i > 0) {
            pdf.addPage();
          }
          
          // Add header
          pdf.setFontSize(16);
          pdf.text(`Dashboard - ${tabNames[i]}`, 20, 20);
          
          // Add period info
          pdf.setFontSize(10);
          const periodText = `Período: ${format(currentPeriod.startDate, 'dd/MM/yyyy', { locale: ptBR })} - ${format(currentPeriod.endDate, 'dd/MM/yyyy', { locale: ptBR })}`;
          pdf.text(periodText, 20, 30);
          
          // Add image
          pdf.addImage(imgData, 'PNG', 10, 35, imgWidth, imgHeight);
        }
      }
      
      const fileName = `dashboard-${format(currentPeriod.startDate, 'yyyy-MM-dd')}-${format(currentPeriod.endDate, 'yyyy-MM-dd')}.pdf`;
      pdf.save(fileName);
      
      toast.success("PDF exportado com sucesso!");
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error("Erro ao exportar PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={exportToPDF}
      disabled={isExporting}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isExporting ? "Exportando..." : "Exportar PDF"}
    </Button>
  );
};