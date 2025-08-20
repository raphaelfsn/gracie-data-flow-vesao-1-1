import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  Users, DollarSign, ShoppingCart, TrendingUp,
  Activity, Calendar, BarChart3, Settings
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Dashboard = () => {
  // Mock data for charts
  const salesData = [
    { name: 'Jan', value: 4000, growth: 2400 },
    { name: 'Fev', value: 3000, growth: 1398 },
    { name: 'Mar', value: 2000, growth: 9800 },
    { name: 'Abr', value: 2780, growth: 3908 },
    { name: 'Mai', value: 1890, growth: 4800 },
    { name: 'Jun', value: 2390, growth: 3800 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: 'hsl(var(--primary))' },
    { name: 'Mobile', value: 300, color: 'hsl(var(--secondary))' },
    { name: 'Tablet', value: 200, color: 'hsl(var(--accent))' },
    { name: 'Outros', value: 100, color: 'hsl(var(--muted))' },
  ];

  const recentTransactions = [
    { id: '1', customer: 'João Silva', amount: 'R$ 250,00', status: 'Concluído', date: '2024-12-20' },
    { id: '2', customer: 'Maria Santos', amount: 'R$ 180,00', status: 'Pendente', date: '2024-12-20' },
    { id: '3', customer: 'Pedro Lima', amount: 'R$ 350,00', status: 'Concluído', date: '2024-12-19' },
    { id: '4', customer: 'Ana Costa', amount: 'R$ 420,00', status: 'Cancelado', date: '2024-12-19' },
    { id: '5', customer: 'Carlos Oliveira', amount: 'R$ 150,00', status: 'Concluído', date: '2024-12-18' },
  ];

  const stats = [
    {
      title: "Receita Total",
      value: "R$ 45.231,89",
      change: "+20.1%",
      icon: DollarSign,
      description: "Em relação ao mês passado"
    },
    {
      title: "Usuários Ativos",
      value: "2.350",
      change: "+12.5%",
      icon: Users,
      description: "Usuários únicos"
    },
    {
      title: "Pedidos",
      value: "156",
      change: "+8.2%",
      icon: ShoppingCart,
      description: "Novos pedidos hoje"
    },
    {
      title: "Taxa de Crescimento",
      value: "24.7%",
      change: "+4.1%",
      icon: TrendingUp,
      description: "Crescimento mensal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-green-100 text-green-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Última atualização: há 5 min</Badge>
            <Settings className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="text-green-600 font-medium">{stat.change}</span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Vendas Mensais</CardTitle>
              <CardDescription>Comparativo de vendas e crescimento</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                  <Bar dataKey="growth" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Dispositivos de Acesso</CardTitle>
              <CardDescription>Distribuição por tipo de dispositivo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Crescimento</CardTitle>
            <CardDescription>Evolução das métricas ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="growth" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>Últimas transações realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.customer}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>Histórico de ações no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Novo usuário cadastrado', time: 'há 2 minutos', icon: Users },
                  { action: 'Pedido #1234 processado', time: 'há 15 minutos', icon: ShoppingCart },
                  { action: 'Relatório mensal gerado', time: 'há 1 hora', icon: BarChart3 },
                  { action: 'Backup realizado com sucesso', time: 'há 2 horas', icon: Activity },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo do Dia</CardTitle>
              <CardDescription>Métricas importantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Visitantes</span>
                <span className="font-medium">1.234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Conversões</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Taxa</span>
                <span className="font-medium text-green-600">7.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ticket Médio</span>
                <span className="font-medium">R$ 285,50</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;