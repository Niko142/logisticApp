import { easeIn } from "motion";

// Конфиг анимаций для burger
export const burgerButtonVariants = {
  open: { rotate: 180, transition: { duration: 0.3, easeIn } },
  closed: { rotate: 0, transition: { duration: 0.3, easeIn } },
};

// Конфиг анимаций для sidebar
export const sidebarVariants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};
