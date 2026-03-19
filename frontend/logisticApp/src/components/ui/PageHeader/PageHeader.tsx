import styles from "./page-header.module.css";
import type { PageHeaderProps } from "./page-header.types";

export const PageHeader = ({
  title,
  description,
  children,
}: PageHeaderProps): React.ReactElement => {
  return (
    <header className={styles.container}>
      <div className={styles.textGroup}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <menu className={styles.menu}>{children}</menu>
    </header>
  );
};
