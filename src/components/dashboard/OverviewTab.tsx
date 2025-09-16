import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, DollarSign, UserPlus, UserMinus, Target } from 'lucide-react';
import { SalesFunnel } from './SalesFunnel';

export const OverviewTab = () => {
  const kpis = [
    {
      title: "Receita Total",
      value: "R$ 125.430",
      change: "+18.2%",
      icon: DollarSign,
      description: "Mensalidades + produtos"
    },
    {
      title: "Total de Alunos",
      value: "342",
      change: "+12.5%",
      icon: Users,
      description: "Alunos ativos"
    },
    {
      title: "Novos Alunos",
      value: "28",
      change: "+15.8%",
      icon: UserPlus,
      description: "Este mês"
    },
    {
      title: "Cancelamentos",
      value: "8",
      change: "-22.1%",
      icon: UserMinus,
      description: "Este mês"
    },
    {
      title: "Investimento em Anúncios",
      value: "R$ 8.450",
      change: "+5.2%",
      icon: Target,
      description: "Meta + Google Ads"
    }
  ];

  const membersEvolution = [
    { mes: 'Jan', novos: 25, cancelamentos: 12 },
    { mes: 'Fev', novos: 32, cancelamentos: 8 },
    { mes: 'Mar', novos: 28, cancelamentos: 15 },
    { mes: 'Abr', novos: 35, cancelamentos: 6 },
    { mes: 'Mai', novos: 28, cancelamentos: 8 },
  ];

  const leadCacData = [
    { plataforma: 'Meta Ads', cac: 95 },
    { plataforma: 'Google Ads', cac: 120 },
  ];

  const leadOriginData = [
    { name: 'Meta Ads', value: 52, color: '#7C3AED' },
    { name: 'Google Ads', value: 35, color: '#8B5CF6' },
    { name: 'Indicação', value: 8, color: '#F97316' },
    { name: 'Orgânico', value: 5, color: '#FB923C' },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
        {/* Evolução de Membros */}
        <Card>
          <CardHeader>
            <CardTitle>Novos Alunos vs. Cancelamentos</CardTitle>
            <CardDescription>Evolução mensal de entrada e saída de alunos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={membersEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="novos" stroke="hsl(var(--primary))" strokeWidth={2} name="Novos Alunos" />
                <Line type="monotone" dataKey="cancelamentos" stroke="hsl(var(--destructive))" strokeWidth={2} name="Cancelamentos" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Funil de Vendas */}
        <SalesFunnel />

        {/* CAC de Leads por Plataforma */}
        <Card>
          <CardHeader>
            <CardTitle>Custo por Aquisição de Leads por Plataforma</CardTitle>
            <CardDescription>Custo para gerar um lead via Meta Ads e Google Ads</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadCacData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plataforma" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'CAC de Lead']} />
                <Bar dataKey="cac" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Origem dos Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Origem dos Leads</CardTitle>
            <CardDescription>Distribuição por canal de aquisição de leads</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadOriginData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadOriginData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};