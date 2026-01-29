import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Icon } from "@/components/ui/Icon";
import { LOGIN_PATH } from "@/constants/domain";

import styles from "./SuccessContent.module.css";

export const SuccessContent = (): React.ReactElement => {
  return (
    <section className={styles.success}>
      <div className={styles.container}>
        <Icon icon={BadgeCheck} size={80} variant="success" />
        <div className={styles.info}>
          <h1 className={styles.title}>
            Поздравляем! Регистрация завершена успешно
          </h1>
          <p className={styles.description}>
            Аккаунт успешно создан. Перейдите к авторизации для входа в систему.
          </p>
        </div>
        <Link className={styles.link} to={LOGIN_PATH}>
          Войти в систему
        </Link>
      </div>
    </section>
  );
};
