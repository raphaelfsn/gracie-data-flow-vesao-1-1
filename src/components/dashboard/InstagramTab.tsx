import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Heart, Eye, ExternalLink, DollarSign, UserPlus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FollowerFunnel } from './FollowerFunnel';

export const InstagramTab = () => {
  const kpis = [
    {
      title: "Valor Investido",
      value: "R$ 382",
      change: "+8.2%",
      icon: DollarSign,
      description: "Campanha de seguidores"
    },
    {
      title: "Alcance",
      value: "28.500",
      change: "+22.1%",
      icon: Users,
      description: "Campanha de seguidores",
      secondaryMetric: {
        label: "CPM",
        value: "R$ 13,40"
      }
    },
    {
      title: "Engajamento",
      value: "2.340",
      change: "+18.2%",
      icon: Heart,
      description: "Interações totais"
    },
    {
      title: "Visitas no Perfil",
      value: "890",
      change: "+28.5%",
      icon: Eye,
      description: "Visualizações do perfil"
    },
    {
      title: "Cliques na Bio",
      value: "580",
      change: "+15.6%",
      icon: ExternalLink,
      description: "Cliques no link"
    },
    {
      title: "Novos Seguidores",
      value: "156",
      change: "+24.8%",
      icon: UserPlus,
      description: "Seguidores adquiridos"
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
      alcance: 2850,
      engajamento: 425,
      cliques: 68,
      visualizacao_pagina: 52,
      preview: "/placeholder.svg"
    },
    {
      post: "Competição Regional",
      alcance: 2650,
      engajamento: 380,
      cliques: 58,
      visualizacao_pagina: 45,
      preview: "/placeholder.svg"
    },
    {
      post: "Treino Feminino",
      alcance: 3200,
      engajamento: 510,
      cliques: 82,
      visualizacao_pagina: 67,
      preview: "/placeholder.svg"
    },
    {
      post: "Professor Visitante",
      alcance: 2100,
      engajamento: 295,
      cliques: 45,
      visualizacao_pagina: 35,
      preview: "/placeholder.svg"
    },
    {
      post: "Graduação Faixas",
      alcance: 4200,
      engajamento: 680,
      cliques: 105,
      visualizacao_pagina: 88,
      preview: "/placeholder.svg"
    }
  ];


  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
              {kpi.secondaryMetric && (
                <div className="mt-2 pt-2 border-t">
                  <div className="text-xs text-muted-foreground">{kpi.secondaryMetric.label}</div>
                  <div className="text-sm font-semibold">{kpi.secondaryMetric.value}</div>
                </div>
              )}
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

        {/* Funil de Aquisição de Seguidores */}
        <FollowerFunnel />
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
                <TableHead>Alcance</TableHead>
                <TableHead>Engajamento</TableHead>
                <TableHead>Cliques</TableHead>
                <TableHead>Visualização da Página</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {postsPerformance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.post}</TableCell>
                  <TableCell>{item.alcance.toLocaleString()}</TableCell>
                  <TableCell>{item.engajamento}</TableCell>
                  <TableCell>{item.cliques}</TableCell>
                  <TableCell>{item.visualizacao_pagina}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};