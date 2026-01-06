import type { LucideIcon } from "lucide-react";
import type { useNavigate } from "react-router-dom";

import type { ActionType } from "@/types/common.types";

import type { ButtonVariant } from "../ui/Button";

export type ErrorDisplayProps = Record<
  "status" | "description",
  string | number
>;

export interface ErrorAction {
  type: ActionType;
  label: string;
  variant?: ButtonVariant;
  icon: LucideIcon;
  handler: (to: ReturnType<typeof useNavigate>) => void | Promise<void>;
}
