import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const followerCampaignData = [
  {
    metric: 'Alcance',
    value: 28500,
    color: 'hsl(var(--primary))'
  },
  {
    metric: 'Novos Seguidores',
    value: 156,
    color: 'hsl(var(--secondary))'
  },
  {
    metric: 'Curtidas no Perfil',
    value: 89,
    color: 'hsl(var(--accent))'
  },
  {
    metric: 'Cliques no Perfil',
    value: 234,
    color: 'hsl(var(--muted))'
  }
];

export const FollowerCampaignIndicators = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores da Campanha de Seguidores</CardTitle>
        <CardDescription>Performance da campanha focada em engajamento</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={followerCampaignData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="metric" type="category" width={100} />
            <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
        
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