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

// Degradê de azul/primário: do mais claro ao mais escuro
const colors = [
  'hsl(var(--primary) / 0.5)',
  'hsl(var(--primary) / 0.65)',
  'hsl(var(--primary) / 0.8)',
  'hsl(var(--primary) / 0.9)',
  'hsl(var(--primary))'
];

// Clip paths para trapézios progressivos (5 etapas)
const trapezoidPaths = [
  'polygon(3% 0%, 97% 0%, 92% 100%, 8% 100%)',
  'polygon(8% 0%, 92% 0%, 85% 100%, 15% 100%)',
  'polygon(15% 0%, 85% 0%, 75% 100%, 25% 100%)',
  'polygon(25% 0%, 75% 0%, 65% 100%, 35% 100%)',
  'polygon(35% 0%, 65% 0%, 55% 100%, 45% 100%)'
];

export const SalesFunnel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Vendas</CardTitle>
        <CardDescription>Jornada completa do lead até a conversão</CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="relative max-w-md mx-auto">
          {funnelData.map((step, index) => {
            return (
              <div key={index} className="relative mb-2">
                {/* Seção do Funil - Trapézio */}
                <div className="relative flex justify-center">
                  <div 
                    className="relative flex items-center justify-center min-h-[55px] transition-all duration-300 text-primary-foreground"
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
                {index < funnelData.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ChevronDown className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">R$ 187</div>
            <div className="text-xs text-muted-foreground">CAC Novo Membro</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">R$ 41,26</div>
            <div className="text-xs text-muted-foreground">CPL Total</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};