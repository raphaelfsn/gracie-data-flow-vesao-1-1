import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface FunnelStep {
  label: string;
  value: number;
  description: string;
}

const followerFunnelData: FunnelStep[] = [
  {
    label: "Alcance",
    value: 28500,
    description: "Campanha Meta Ads"
  },
  {
    label: "Engajamento com Post",
    value: 2340,
    description: "Interações totais"
  },
  {
    label: "Visitas no Perfil",
    value: 890,
    description: "Visualizações do perfil"
  },
  {
    label: "Cliques no Link",
    value: 580,
    description: "Cliques na bio"
  },
  {
    label: "Novos Seguidores",
    value: 156,
    description: "Seguidores adquiridos"
  }
];

// Degradê laranja: do mais claro ao mais escuro
const colors = ['#FDBA74', '#FB923C', '#F97316', '#EA580C', '#C2410C'];

// Clip paths para trapézios progressivos
const trapezoidPaths = [
  'polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)',
  'polygon(10% 0%, 90% 0%, 85% 100%, 15% 100%)',
  'polygon(15% 0%, 85% 0%, 75% 100%, 25% 100%)',
  'polygon(25% 0%, 75% 0%, 65% 100%, 35% 100%)',
  'polygon(35% 0%, 65% 0%, 55% 100%, 45% 100%)'
];

export const FollowerFunnel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Aquisição de Seguidores</CardTitle>
        <CardDescription>Campanha Meta Ads para seguidores</CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="relative max-w-md mx-auto">
          {followerFunnelData.map((step, index) => {
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
                {index < followerFunnelData.length - 1 && (
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
            <div className="text-2xl font-bold text-primary">R$ 2,45</div>
            <div className="text-xs text-muted-foreground">Custo por Seguidor</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {((followerFunnelData[followerFunnelData.length - 1].value / followerFunnelData[0].value) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">Taxa de Conversão Geral</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
