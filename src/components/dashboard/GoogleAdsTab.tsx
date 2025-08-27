import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, MousePointer, Target, DollarSign, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EnhancedKPICard } from './EnhancedKPICard';
import { LeadsByAudiencePieChart } from './LeadsByAudiencePieChart';

export const GoogleAdsTab = () => {
  const kpis = [
    {
      title: "Valor Investido",
      value: "R$ 3.210",
      change: "+12.1%",
      icon: DollarSign,
      description: "Total gasto nas campanhas"
    },
    {
      title: "Impressões",
      value: "89.450",
      change: "+16.2%",
      icon: Eye,
      description: "Total de visualizações",
      secondaryMetric: {
        label: "CPM",
        value: "R$ 68,50"
      }
    },
    {
      title: "Cliques",
      value: "1.890",
      change: "+14.8%",
      icon: MousePointer,
      description: "Cliques nos anúncios",
      secondaryMetric: {
        label: "CPC Médio",
        value: "R$ 3,25"
      }
    },
    {
      title: "Conversões",
      value: "32",
      change: "+18.5%",
      icon: Target,
      description: "Matrículas geradas",
      secondaryMetric: {
        label: "CPL",
        value: "R$ 215"
      }
    },
    {
      title: "CTR",
      value: "2.11%",
      change: "+8.1%",
      icon: TrendingUp,
      description: "Taxa de cliques"
    }
  ];

  const keywordPerformance = [
    {
      palavra_chave: "jiu jitsu aulas",
      impressoes: 18600,
      cliques: 420,
      cpc: 3.10,
      cpm: 69.80,
      ctr: 2.26,
      custo_conversao: 215
    },
    {
      palavra_chave: "academia jiu jitsu",
      impressoes: 15200,
      cliques: 380,
      cpc: 3.45,
      cpm: 86.25,
      ctr: 2.50,
      custo_conversao: 230
    },
    {
      palavra_chave: "bjj gracie barra",
      impressoes: 12800,
      cliques: 290,
      cpc: 2.85,
      cpm: 64.50,
      ctr: 2.27,
      custo_conversao: 195
    },
    {
      palavra_chave: "treino jiu jitsu",
      impressoes: 21400,
      cliques: 510,
      cpc: 3.20,
      cpm: 76.20,
      ctr: 2.38,
      custo_conversao: 240
    },
    {
      palavra_chave: "artes marciais",
      impressoes: 9800,
      cliques: 180,
      cpc: 2.95,
      cpm: 54.10,
      ctr: 1.84,
      custo_conversao: 280
    }
  ];

  const clicksByKeyword = keywordPerformance.map(item => ({
    palavra_chave: item.palavra_chave,
    cliques: item.cliques
  }));

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
        <LeadsByAudiencePieChart 
          title="Distribuição de Leads por Público-Alvo"
          description="Leads por conjunto de anúncios no Google Ads"
        />

        {/* Cliques por Palavra-Chave */}
        <Card>
          <CardHeader>
            <CardTitle>Cliques por Palavra-Chave</CardTitle>
            <CardDescription>Top palavras-chave por número de cliques</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clicksByKeyword}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="palavra_chave" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} cliques`, 'Cliques']} />
                <Bar dataKey="cliques" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Keywords Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho das Palavras-Chave</CardTitle>
          <CardDescription>Análise detalhada por termo de pesquisa</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Palavra-Chave</TableHead>
                <TableHead>Impressões</TableHead>
                <TableHead>Cliques</TableHead>
                <TableHead>CPC</TableHead>
                <TableHead>CPM</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Custo/Conversão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywordPerformance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.palavra_chave}</TableCell>
                  <TableCell>{item.impressoes.toLocaleString()}</TableCell>
                  <TableCell>{item.cliques}</TableCell>
                  <TableCell>R$ {item.cpc.toFixed(2)}</TableCell>
                  <TableCell>R$ {item.cpm.toFixed(2)}</TableCell>
                  <TableCell>{item.ctr}%</TableCell>
                  <TableCell>R$ {item.custo_conversao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};