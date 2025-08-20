import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Eye, MousePointer, Target, DollarSign, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const GoogleAdsTab = () => {
  const kpis = [
    {
      title: "Impressões",
      value: "89.450",
      change: "+16.2%",
      icon: Eye,
      description: "Total de visualizações"
    },
    {
      title: "Cliques",
      value: "1.890",
      change: "+14.8%",
      icon: MousePointer,
      description: "Cliques nos anúncios"
    },
    {
      title: "Conversões",
      value: "32",
      change: "+18.5%",
      icon: Target,
      description: "Matrículas geradas"
    },
    {
      title: "CPC Médio",
      value: "R$ 3.25",
      change: "-5.2%",
      icon: DollarSign,
      description: "Custo por clique"
    },
    {
      title: "CTR",
      value: "2.11%",
      change: "+8.1%",
      icon: TrendingUp,
      description: "Taxa de cliques"
    },
    {
      title: "CPM",
      value: "R$ 68.50",
      change: "-3.8%",
      icon: DollarSign,
      description: "Custo por mil impressões"
    }
  ];

  const conversionsEvolution = [
    { data: '01/05', conversoes: 6 },
    { data: '02/05', conversoes: 8 },
    { data: '03/05', conversoes: 5 },
    { data: '04/05', conversoes: 9 },
    { data: '05/05', conversoes: 7 },
    { data: '06/05', conversoes: 11 },
    { data: '07/05', conversoes: 8 },
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

  const costPerConversionData = keywordPerformance.map(item => ({
    palavra_chave: item.palavra_chave,
    custo: item.custo_conversao
  }));

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={kpi.change.startsWith('+') ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{kpi.change}</span>
                <span>{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Conversions Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução das Conversões</CardTitle>
            <CardDescription>Tendência diária de conversões do Google Ads</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionsEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conversoes" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost per Conversion by Keyword */}
        <Card>
          <CardHeader>
            <CardTitle>Custo por Conversão por Palavra-Chave</CardTitle>
            <CardDescription>Eficiência de conversão por termo de pesquisa</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costPerConversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="palavra_chave" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'Custo por Conversão']} />
                <Bar dataKey="custo" fill="hsl(var(--secondary))" />
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