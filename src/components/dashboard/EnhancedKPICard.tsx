import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EnhancedKPICardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  description: string;
  secondaryMetric?: {
    label: string;
    value: string;
  };
}

export const EnhancedKPICard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  description, 
  secondaryMetric 
}: EnhancedKPICardProps) => {
  const isPositive = change.startsWith('+');
  const isNegative = change.startsWith('-');
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
          <div className="flex items-center space-x-2">
            <span className={
              isPositive ? "text-green-600 font-medium" : 
              isNegative ? "text-red-600 font-medium" : 
              "font-medium"
            }>
              {change}
            </span>
            <span>{description}</span>
          </div>
        </div>
        {secondaryMetric && (
          <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-border">
            <span className="text-muted-foreground">{secondaryMetric.label}:</span>
            <span className="font-medium">{secondaryMetric.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};