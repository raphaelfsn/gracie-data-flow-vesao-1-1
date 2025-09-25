import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Heart, Eye, ExternalLink, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const InstagramTab = () => {
  const kpis = [
    {
      title: "Novos Seguidores",
      value: "156",
      change: "+24.8%",
      icon: Users,
      description: "Este mês"
    },
    {
      title: "Engajamento Total",
      value: "2.340",
      change: "+18.2%",
      icon: Heart,
      description: "Curtidas + comentários"
    },
    {
      title: "Alcance das Publicações",
      value: "18.450",
      change: "+22.5%",
      icon: Eye,
      description: "Contas alcançadas"
    },
    {
      title: "Cliques no Link da Bio",
      value: "89",
      change: "+15.6%",
      icon: ExternalLink,
      description: "Cliques no link"
    }
  ];

  const followersEvolution = [
    { data: '01/05', seguidores: 3580 },
    { data: '02/05', seguidores: 3602 },
    { data: '03/05', seguidores: 3618 },
    { data: '04/05', seguidores: 3645 },
    { data: '05/05', seguidores: 3668 },
    { data: '06/05', seguidores: 3691 },
    { data: '07/05', seguidores: 3736 },
  ];

  const postsPerformance = [
    {
      post: "Aula de Guard Pass",
      engajamento: 425,
      alcance: 2850,
      comentarios: 38,
      curtidas: 387,
      salvamentos: 45
    },
    {
      post: "Competição Regional",
      engajamento: 380,
      alcance: 2650,
      comentarios: 42,
      curtidas: 338,
      salvamentos: 28
    },
    {
      post: "Treino Feminino",
      engajamento: 510,
      alcance: 3200,
      comentarios: 55,
      curtidas: 455,
      salvamentos: 62
    },
    {
      post: "Professor Visitante",
      engajamento: 295,
      alcance: 2100,
      comentarios: 25,
      curtidas: 270,
      salvamentos: 18
    },
    {
      post: "Graduação Faixas",
      engajamento: 680,
      alcance: 4200,
      comentarios: 78,
      curtidas: 602,
      salvamentos: 85
    }
  ];

  const followersOrigin = [
    { name: 'Explorar', value: 45, color: '#7C3AED' },
    { name: 'Hashtags', value: 30, color: '#8B5CF6' },
    { name: 'Perfil', value: 15, color: '#F97316' },
    { name: 'Outros', value: 10, color: '#FB923C' },
  ];

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
        {/* Followers Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Seguidores</CardTitle>
            <CardDescription>Crescimento da base de seguidores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={followersEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} seguidores`, 'Total']} />
                <Line type="monotone" dataKey="seguidores" stroke="#7C3AED" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Followers Origin */}
        <Card>
          <CardHeader>
            <CardTitle>Origem dos Seguidores</CardTitle>
            <CardDescription>De onde vieram os novos seguidores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={followersOrigin}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {followersOrigin.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Posts Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho dos Posts</CardTitle>
          <CardDescription>Análise detalhada das publicações recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>Engajamento</TableHead>
                <TableHead>Alcance</TableHead>
                <TableHead>Comentários</TableHead>
                <TableHead>Curtidas</TableHead>
                <TableHead>Salvamentos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {postsPerformance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.post}</TableCell>
                  <TableCell>{item.engajamento}</TableCell>
                  <TableCell>{item.alcance.toLocaleString()}</TableCell>
                  <TableCell>{item.comentarios}</TableCell>
                  <TableCell>{item.curtidas}</TableCell>
                  <TableCell>{item.salvamentos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};