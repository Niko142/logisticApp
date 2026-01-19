import type { LayoutProps } from "@/types/common.types";

import styles from "./layout.module.css";

import Logo from "@images/auth-logo.svg";

export interface FormLayoutProps extends LayoutProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormLayout = ({ title, onSubmit, children }: FormLayoutProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <img src={Logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>{title}</h1>
      {children}
    </form>
  );
};
