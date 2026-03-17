import { easeIn } from "motion";

export const actionsAsideVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      easeIn,
    },
  },
  close: {
    x: -20,
    opacity: 0,
    transition: {
      duration: 0.2,
      easeIn,
    },
  },
};
