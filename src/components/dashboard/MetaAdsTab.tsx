import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Eye, MousePointer, Target, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const MetaAdsTab = () => {
  const kpis = [
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
      description: "Total de visualizações"
    },
    {
      title: "Cliques no Link",
      value: "2.340",
      change: "+12.8%",
      icon: MousePointer,
      description: "Cliques nos anúncios"
    },
    {
      title: "Conversões",
      value: "45",
      change: "+15.2%",
      icon: Target,
      description: "Formulários enviados"
    }
  ];

  const cpcEvolution = [
    { data: '01/05', cpc: 2.80 },
    { data: '02/05', cpc: 2.95 },
    { data: '03/05', cpc: 2.65 },
    { data: '04/05', cpc: 2.90 },
    { data: '05/05', cpc: 2.75 },
    { data: '06/05', cpc: 2.85 },
    { data: '07/05', cpc: 2.70 },
  ];

  const creativePerformance = [
    {
      criativo: "Vídeo Aula Grátis",
      impressoes: 25600,
      cliques: 850,
      cpc: 2.65,
      ctr: 3.32,
      cpm: 87.50,
      custo_aquisicao: 180
    },
    {
      criativo: "Carousel Benefícios",
      impressoes: 18900,
      cliques: 620,
      cpc: 2.90,
      ctr: 3.28,
      cpm: 95.20,
      custo_aquisicao: 195
    },
    {
      criativo: "Imagem Professor",
      impressoes: 22100,
      cliques: 580,
      cpc: 3.10,
      ctr: 2.62,
      cpm: 81.30,
      custo_aquisicao: 210
    },
    {
      criativo: "Vídeo Depoimento",
      impressoes: 19800,
      cliques: 720,
      cpc: 2.45,
      ctr: 3.64,
      cpm: 89.10,
      custo_aquisicao: 165
    }
  ];

  const cacByCreative = creativePerformance.map(item => ({
    criativo: item.criativo,
    cac: item.custo_aquisicao
  }));

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{kpi.change}</span>
                <span>{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* CPC Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Custo por Clique (CPC)</CardTitle>
            <CardDescription>Variação diária do CPC médio</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cpcEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'CPC']} />
                <Line type="monotone" dataKey="cpc" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CAC por Criativo */}
        <Card>
          <CardHeader>
            <CardTitle>Custo por Aquisição por Criativo</CardTitle>
            <CardDescription>Eficiência de conversão por tipo de anúncio</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cacByCreative}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="criativo" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'CAC']} />
                <Bar dataKey="cac" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
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
                <TableHead>Cliques</TableHead>
                <TableHead>CPC</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>CPM</TableHead>
                <TableHead>CAC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creativePerformance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.criativo}</TableCell>
                  <TableCell>{item.impressoes.toLocaleString()}</TableCell>
                  <TableCell>{item.cliques}</TableCell>
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