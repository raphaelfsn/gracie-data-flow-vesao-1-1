import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface LeadsByAudienceProps {
  title?: string;
  description?: string;
}

const audienceData = [
  { name: 'Homens', value: 18, color: '#7C3AED' },
  { name: 'Mulheres', value: 15, color: '#8B5CF6' },
  { name: 'Kids', value: 12, color: '#F97316' },
];

export const LeadsByAudiencePieChart = ({ 
  title = "Aquisição de Leads por Público-Alvo",
  description = "Distribuição de conversões por conjunto de anúncios"
}: LeadsByAudienceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={audienceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {audienceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} leads`, 'Conversões']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};