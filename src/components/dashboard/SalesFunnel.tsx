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
      <CardContent className="py-8">
        <div className="relative max-w-md mx-auto">
          {funnelData.map((step, index) => {
            const width = getWidthPercentage(step.value);
            const conversionRate = getConversionRate(index);
            
            return (
              <div key={index} className="relative mb-3">
                {/* Seção do Funil */}
                <div className="relative flex justify-center">
                  <div 
                    className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground flex items-center justify-center min-h-[60px] transition-all duration-500"
                    style={{
                      width: `${width}%`,
                      clipPath: index === 0 
                        ? 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'  // Primeiro item - topo mais largo
                        : index === funnelData.length - 1 
                        ? 'polygon(15% 0, 85% 0, 75% 100%, 25% 100%)' // Último item - mais estreito
                        : `polygon(${5 + index * 2}% 0, ${95 - index * 2}% 0, ${90 - (index + 1) * 2}% 100%, ${10 + (index + 1) * 2}% 100%)`, // Gradual
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                  >
                    <div className="text-center px-4 py-2">
                      <div className="font-semibold text-sm mb-1">{step.label}</div>
                      <div className="text-lg font-bold">{step.value.toLocaleString()}</div>
                      <div className="text-xs opacity-90">{step.description}</div>
                    </div>
                  </div>
                </div>

                {/* Taxa de Conversão */}
                {conversionRate && (
                  <div className="flex justify-center mt-2 mb-1">
                    <div className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Taxa: {conversionRate}%
                    </div>
                  </div>
                )}

                {/* Seta para próxima etapa */}
                {index < funnelData.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-muted-foreground/40"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resumo */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Taxa de Conversão Geral</div>
            <div className="text-2xl font-bold text-primary">
              {((funnelData[funnelData.length - 1].value / funnelData[0].value) * 100).toFixed(2)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {funnelData[0].value.toLocaleString()} → {funnelData[funnelData.length - 1].value.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};