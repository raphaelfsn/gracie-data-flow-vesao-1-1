import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <BarChart3 className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Analytics <span className="text-primary">Dashboard</span>
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Visualize seus dados de forma inteligente com gráficos interativos, 
            métricas em tempo real e insights poderosos para tomar decisões estratégicas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8">
                Acessar Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Ver Demonstração
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Gráficos Interativos</CardTitle>
                <CardDescription>
                  Visualize dados com gráficos de barras, linhas, pizza e área
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Métricas em Tempo Real</CardTitle>
                <CardDescription>
                  Acompanhe usuários ativos, vendas e conversões instantaneamente
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Análise de Tendências</CardTitle>
                <CardDescription>
                  Identifique padrões e tendências para otimizar seu negócio
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
