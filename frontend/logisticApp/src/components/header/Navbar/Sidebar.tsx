import { motion } from "motion/react";

import styles from "../header.module.css";
import { sidebarVariants } from "../header.variants";
import type { SideBarProps } from "../types/header.types";

export const Sidebar = ({ ref, children }: SideBarProps) => {
  return (
    <motion.nav
      ref={ref}
      className={styles.sidebar}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.nav>
  );
};
