import { easeIn } from "motion";

export const legendAsideVariants = {
  open: {
    width: "auto",
    minWidth: "220px",
    transition: {
      duration: 0.2,
      easeIn,
    },
  },
  close: {
    width: "64px",
    minWidth: "64px",
    transition: {
      duration: 0.2,
      easeIn,
    },
  },
};

export const legendContentVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.2,
      easeIn,
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      easeIn,
    },
  },
};
