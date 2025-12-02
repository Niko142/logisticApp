import { type ToastOptions } from "react-hot-toast";

import { TOAST_DELAY } from "@/constants/delay";

export const TOAST_CONFIG: ToastOptions = {
  duration: TOAST_DELAY,
  style: {
    backgroundColor: "var(--grey-hover)",
    color: "var(--white)",
    fontWeight: "500",
    gap: "20px",
    borderRadius: "8px",
    padding: "12px",
  },
};
