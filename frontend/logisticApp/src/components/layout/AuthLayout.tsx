import type { LayoutProps } from "@/types/common.types";

import styles from "./layout.module.css";

export interface AuthLayoutProps extends LayoutProps {
  purpose: string;
}

export const AuthLayout = ({
  children,
  purpose,
}: AuthLayoutProps): React.ReactElement => {
  return (
    <section className={styles.container} aria-label={purpose}>
      {children}
    </section>
  );
};
