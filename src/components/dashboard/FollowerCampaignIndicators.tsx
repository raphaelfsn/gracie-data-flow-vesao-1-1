import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface FunnelStep {
  label: string;
  value: number;
}

const followerFunnelData: FunnelStep[] = [
  {
    label: "Visualizações",
    value: 45000,
  },
  {
    label: "Contas Alcançadas", 
    value: 28500,
  },
  {
    label: "Cliques Todos",
    value: 1200,
  },
  {
    label: "Visitas no Perfil",
    value: 234,
  },
  {
    label: "Novos Seguidores",
    value: 156,
  }
];

export const FollowerCampaignIndicators = () => {
  const maxValue = followerFunnelData[0].value;

  const getWidthPercentage = (value: number) => {
    return Math.max((value / maxValue) * 100, 15); // Mínimo de 15% para visibilidade
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Aquisição de Seguidores</CardTitle>
        <CardDescription>Jornada do usuário até se tornar seguidor</CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="relative max-w-sm mx-auto">
          {followerFunnelData.map((step, index) => {
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
                {index < followerFunnelData.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ChevronDown className="h-3 w-3 text-muted-foreground/60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Métricas Adicionais */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">R$ 2,45</div>
            <div className="text-xs text-muted-foreground">Custo por Seguidor</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">4.2%</div>
            <div className="text-xs text-muted-foreground">Taxa de Conversão</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};