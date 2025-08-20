import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, DollarSign, UserPlus, UserMinus, Target } from 'lucide-react';

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

  const roiData = [
    { plataforma: 'Meta Ads', roi: 4.2 },
    { plataforma: 'Google Ads', roi: 3.8 },
  ];

  const cacData = [
    { plataforma: 'Meta Ads', cac: 185 },
    { plataforma: 'Google Ads', cac: 220 },
  ];

  const originData = [
    { name: 'Meta Ads', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Google Ads', value: 35, color: 'hsl(var(--secondary))' },
    { name: 'Indicação', value: 15, color: 'hsl(var(--accent))' },
    { name: 'Orgânico', value: 5, color: 'hsl(var(--muted))' },
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
                <span className="text-green-600 font-medium">{kpi.change}</span>
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

        {/* ROI por Plataforma */}
        <Card>
          <CardHeader>
            <CardTitle>ROI por Plataforma</CardTitle>
            <CardDescription>Retorno sobre investimento em anúncios</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plataforma" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}x`, 'ROI']} />
                <Bar dataKey="roi" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CAC por Plataforma */}
        <Card>
          <CardHeader>
            <CardTitle>Custo por Aquisição (CAC)</CardTitle>
            <CardDescription>Custo para adquirir um novo aluno por plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cacData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plataforma" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'CAC']} />
                <Bar dataKey="cac" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Origem dos Membros */}
        <Card>
          <CardHeader>
            <CardTitle>Origem dos Novos Membros</CardTitle>
            <CardDescription>Distribuição por canal de aquisição</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={originData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {originData.map((entry, index) => (
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