import { useAnalyticsSummary } from "@/features/analytics/hooks/useAnalyticsQuery";

import { SummaryCard } from "./SummaryCard";
import { analyticsMetrics } from "../../constants/card.data";

export const AnalyticsMetrics = () => {
  const { data } = useAnalyticsSummary();

  if (!data) return null;

  return (
    <>
      {analyticsMetrics(data).map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </>
  );
};
