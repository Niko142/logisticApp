import { type ToastOptions } from "react-hot-toast";

import { TOAST_DELAY } from "@/constants/delay";

export const TOAST_CONFIG: ToastOptions = {
  duration: TOAST_DELAY,
  style: {
    backgroundColor: "var(--color-gray-500)",
    color: "var(--color-white)",
    fontWeight: "var(--text-medium)",
    gap: "20px",
    borderRadius: "8px",
    padding: "12px",
  },
};
