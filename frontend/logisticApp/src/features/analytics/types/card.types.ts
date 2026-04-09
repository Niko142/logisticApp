import type { LucideIcon } from "lucide-react";

import type { IconVariant } from "@/components/ui/Icon/icon.types";
import type { AnalyticsSummary } from "@/types/models/analytics.types";

export type DeltaTrend = "positive" | "negative" | "neutral";

type CardUnit = "мин" | "%";

export interface SummaryCardProps {
  cardIcon?: {
    icon: LucideIcon;
    variant?: Extract<IconVariant, "card_1" | "card_2">;
  } | null;
  title: string;
  value: string;
  delta: number;
  trend: DeltaTrend;
  unit: CardUnit;
}

export type SummaryData = AnalyticsSummary;
