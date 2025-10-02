import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface FunnelStep {
  label: string;
  value: number;
  description: string;
}

const conversionFunnelData: FunnelStep[] = [
  {
    label: "Alcance",
    value: 45230,
    description: "Conversão + Remarketing"
  },
  {
    label: "Cliques no Link",
    value: 2340,
    description: "Tráfego gerado"
  },
  {
    label: "Visualização de Página",
    value: 1850,
    description: "Páginas visitadas"
  },
  {
    label: "Leads",
    value: 45,
    description: "Formulários enviados"
  }
];

// Degradê roxo: do mais claro ao mais escuro
const colors = ['#E9D5FF', '#C084FC', '#A855F7', '#7C3AED'];

// Clip paths para trapézios progressivos
const trapezoidPaths = [
  'polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)',
  'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)',
  'polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)',
  'polygon(30% 0%, 70% 0%, 60% 100%, 40% 100%)'
];

export const ConversionFunnel = () => {
  const maxValue = conversionFunnelData[0].value;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Conversão</CardTitle>
        <CardDescription>Campanhas de Conversão + Remarketing</CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="relative max-w-md mx-auto">
          {conversionFunnelData.map((step, index) => {
            return (
              <div key={index} className="relative mb-2">
                {/* Seção do Funil - Trapézio */}
                <div className="relative flex justify-center">
                  <div 
                    className="relative flex items-center justify-center min-h-[55px] transition-all duration-300 text-white"
                    style={{
                      backgroundColor: colors[index],
                      clipPath: trapezoidPaths[index],
                      width: '100%'
                    }}
                  >
                    <div className="text-center px-4 py-2">
                      <div className="font-semibold text-sm mb-1">{step.label}</div>
                      <div className="text-lg font-bold">{step.value.toLocaleString()}</div>
                      <div className="text-xs opacity-90">{step.description}</div>
                    </div>
                  </div>
                </div>

                {/* Seta para próxima etapa */}
                {index < conversionFunnelData.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ChevronDown className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Métricas Adicionais */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {((conversionFunnelData[conversionFunnelData.length - 1].value / conversionFunnelData[0].value) * 100).toFixed(2)}%
            </div>
            <div className="text-xs text-muted-foreground">Taxa de Conversão Geral</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">R$ 185</div>
            <div className="text-xs text-muted-foreground">Custo por Lead</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
