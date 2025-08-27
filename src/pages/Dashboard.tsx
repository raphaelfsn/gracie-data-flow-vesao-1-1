import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Settings } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { PeriodProvider } from "@/contexts/PeriodContext";
import { PeriodFilter } from "@/components/dashboard/PeriodFilter";
import { PDFExportButton } from "@/components/dashboard/PDFExportButton";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { MetaAdsTab } from "@/components/dashboard/MetaAdsTab";
import { GoogleAdsTab } from "@/components/dashboard/GoogleAdsTab";
import { InstagramTab } from "@/components/dashboard/InstagramTab";

const Dashboard = () => {
  return (
    <PeriodProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center space-x-4">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Dashboard - Gracie Barra Twickenham</h1>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <PDFExportButton />
              <Badge variant="outline">Última atualização: há 5 min</Badge>
              <Settings className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Period Filter */}
          <PeriodFilter />
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="meta-ads">Meta Ads</TabsTrigger>
              <TabsTrigger value="google-ads">Google Ads</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>
            
            <TabsContent value="meta-ads">
              <MetaAdsTab />
            </TabsContent>
            
            <TabsContent value="google-ads">
              <GoogleAdsTab />
            </TabsContent>
            
            <TabsContent value="instagram">
              <InstagramTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PeriodProvider>
  );
};

export default Dashboard;