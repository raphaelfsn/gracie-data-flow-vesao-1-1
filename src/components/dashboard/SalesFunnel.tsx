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
    return (value / maxValue) * 100;
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
      <CardContent className="space-y-4">
        {funnelData.map((step, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{step.label}</span>
                <span className="text-xs text-muted-foreground">({step.description})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{step.value.toLocaleString()}</span>
                {getConversionRate(index) && (
                  <span className="text-xs text-muted-foreground">
                    {getConversionRate(index)}%
                  </span>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-8 bg-muted rounded-md flex items-center overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center transition-all duration-300"
                  style={{ width: `${getWidthPercentage(step.value)}%` }}
                >
                  <span className="text-xs text-primary-foreground font-medium px-2">
                    {step.value.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            {index < funnelData.length - 1 && (
              <div className="flex justify-center">
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};