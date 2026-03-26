import { FileText, Grid2X2Plus } from "lucide-react";

import { Header } from "@/components/header";
import { AnalyticsLayout } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

import { LineChart } from "./components/LineChart";
import { PieChart } from "./components/PieChart";

export const AnalyticsPage = () => {
  return (
    <>
      <Header />
      <AnalyticsLayout>
        <PageHeader
          title="Аналитика и отчетность"
          description="Статистика загруженности и эффективности маршрутов"
        >
          <Button variant="exportPdf">
            <FileText />
            Экспорт PDF
          </Button>
          <Button variant="exportCsv">
            <Grid2X2Plus />
            Экспорт CSV
          </Button>
        </PageHeader>

        <LineChart />
        <PieChart />
      </AnalyticsLayout>
    </>
  );
};
