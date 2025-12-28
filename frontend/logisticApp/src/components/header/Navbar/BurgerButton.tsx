import { Menu, X } from "lucide-react";
import { motion } from "motion/react";

import { Icon } from "@/components/ui/Icon";

import styles from "../header.module.css";
import { burgerButtonVariants } from "../header.variants";
import type { BurgerButtonProps } from "../types/header.types";

const BurgerButton = ({
  toggleEvent,
  onClick,
}: BurgerButtonProps): React.ReactElement => {
  return (
    <motion.button
      animate={toggleEvent ? "open" : "closed"}
      variants={burgerButtonVariants}
      className={styles.burgerBtn}
      aria-label="Burger-кнопка для мобильных устройств"
      onClick={onClick}
    >
      <Icon icon={toggleEvent ? X : Menu} size={32} color="white" />
    </motion.button>
  );
};

export default BurgerButton;
