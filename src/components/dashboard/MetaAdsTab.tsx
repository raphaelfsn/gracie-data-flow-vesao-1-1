import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MousePointer, Target, DollarSign, TrendingUp, Users } from 'lucide-react';
import { EnhancedKPICard } from './EnhancedKPICard';
import { LeadsByAudiencePieChart } from './LeadsByAudiencePieChart';
import { FollowerCampaignIndicators } from './FollowerCampaignIndicators';
import { HoverableCreativeCell } from './HoverableCreativeCell';

export const MetaAdsTab = () => {
  const kpis = [
    {
      title: "Valor Investido",
      value: "R$ 5.240",
      change: "+8.2%",
      icon: DollarSign,
      description: "Total gasto nas campanhas"
    },
    {
      title: "Alcance",
      value: "45.230",
      change: "+22.1%",
      icon: Users,
      description: "Pessoas alcançadas"
    },
    {
      title: "Impressões",
      value: "128.450",
      change: "+18.5%",
      icon: Eye,
      description: "Total de visualizações",
      secondaryMetric: {
        label: "CPM",
        value: "R$ 87,50"
      }
    },
    {
      title: "Cliques no Link",
      value: "2.340",
      change: "+12.8%",
      icon: MousePointer,
      description: "Cliques nos anúncios",
      secondaryMetric: {
        label: "CPC",
        value: "R$ 2,75"
      }
    },
    {
      title: "Conversões",
      value: "45",
      change: "+15.2%",
      icon: Target,
      description: "Formulários enviados",
      secondaryMetric: {
        label: "Custo por Conversão",
        value: "R$ 185"
      }
    },
    {
      title: "CTR Total",
      value: "3.8%",
      change: "+0.5%",
      icon: TrendingUp,
      description: "Taxa de cliques geral"
    }
  ];

  const creativePerformance = [
    {
      criativo: "Vídeo Aula Grátis",
      impressoes: 25600,
      cliques_link: 850,
      cpc: 2.65,
      ctr: 3.32,
      cpm: 87.50,
      custo_aquisicao: 180,
      url: "https://example.com/creative1",
      preview: "/placeholder.svg"
    },
    {
      criativo: "Carousel Benefícios",
      impressoes: 18900,
      cliques_link: 620,
      cpc: 2.90,
      ctr: 3.28,
      cpm: 95.20,
      custo_aquisicao: 195,
      url: "https://example.com/creative2",
      preview: "/placeholder.svg"
    },
    {
      criativo: "Imagem Professor",
      impressoes: 22100,
      cliques_link: 580,
      cpc: 3.10,
      ctr: 2.62,
      cpm: 81.30,
      custo_aquisicao: 210,
      url: "https://example.com/creative3",
      preview: "/placeholder.svg"
    },
    {
      criativo: "Vídeo Depoimento",
      impressoes: 19800,
      cliques_link: 720,
      cpc: 2.45,
      ctr: 3.64,
      cpm: 89.10,
      custo_aquisicao: 165,
      url: "https://example.com/creative4",
      preview: "/placeholder.svg"
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi, index) => (
          <EnhancedKPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
            description={kpi.description}
            secondaryMetric={kpi.secondaryMetric}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Leads por Público-Alvo */}
        <LeadsByAudiencePieChart />

        {/* Indicadores da Campanha de Seguidores */}
        <FollowerCampaignIndicators />
      </div>

      {/* Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho dos Criativos</CardTitle>
          <CardDescription>Análise detalhada por tipo de anúncio</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Criativo</TableHead>
                <TableHead>Impressões</TableHead>
                <TableHead>Cliques no Link</TableHead>
                <TableHead>CPC</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>CPM</TableHead>
                <TableHead>CAC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creativePerformance.map((item, index) => (
                <TableRow key={index}>
                  <HoverableCreativeCell
                    creativeName={item.criativo}
                    creativeUrl={item.url}
                    previewImage={item.preview}
                  />
                  <TableCell>{item.impressoes.toLocaleString()}</TableCell>
                  <TableCell>{item.cliques_link}</TableCell>
                  <TableCell>R$ {item.cpc.toFixed(2)}</TableCell>
                  <TableCell>{item.ctr}%</TableCell>
                  <TableCell>R$ {item.cpm.toFixed(2)}</TableCell>
                  <TableCell>R$ {item.custo_aquisicao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};