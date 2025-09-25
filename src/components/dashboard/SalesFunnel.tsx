import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface FunnelStep {
  label: string;
  value: number;
  description: string;
}

const funnelData: FunnelStep[] = [
  {
    label: "Total de Alcance",
    value: 134680,
    description: "Meta + Google Ads"
  },
  {
    label: "Cliques no Link",
    value: 4230,
    description: "Meta + Google Ads"
  },
  {
    label: "Visitas no Site", 
    value: 3450,
    description: "Tráfego total"
  },
  {
    label: "Formulários Enviados",
    value: 127,
    description: "WIX Forms"
  },
  {
    label: "Novos Membros",
    value: 28,
    description: "Conversões finais"
  }
];

export const SalesFunnel = () => {
  const maxValue = funnelData[0].value;

  const getWidthPercentage = (value: number) => {
    return Math.max((value / maxValue) * 100, 15); // Mínimo de 15% para visibilidade
  };

  const getConversionRate = (currentIndex: number) => {
    if (currentIndex === 0) return null;
    const current = funnelData[currentIndex].value;
    const previous = funnelData[currentIndex - 1].value;
    return ((current / previous) * 100).toFixed(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Vendas</CardTitle>
        <CardDescription>Jornada completa do lead até a conversão</CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="relative max-w-sm mx-auto">
          {funnelData.map((step, index) => {
            const width = getWidthPercentage(step.value);
            
            return (
              <div key={index} className="relative mb-2">
                {/* Seção do Funil */}
                <div className="relative flex justify-center">
                  <div 
                    className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground flex items-center justify-center min-h-[40px] transition-all duration-300"
                    style={{
                      width: `${width}%`,
                    }}
                  >
                    <div className="text-center px-3 py-1">
                      <div className="font-semibold text-xs mb-1">{step.label}</div>
                      <div className="text-sm font-bold">{step.value.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Seta para próxima etapa */}
                {index < funnelData.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ChevronDown className="h-3 w-3 text-muted-foreground/60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resumo */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Taxa de Conversão Geral</div>
            <div className="text-lg font-bold text-primary">
              {((funnelData[funnelData.length - 1].value / funnelData[0].value) * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};