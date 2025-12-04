import { AlertCircle, HomeIcon, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { ErrorPageProps } from "@/types/error.types";

import styles from "./error.module.css";

const ErrorDisplay = ({
  status,
  description,
}: ErrorPageProps): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <Icon icon={AlertCircle} size={100} color="red" />

      <div className={styles.content}>
        <h1 className={styles.title}>{status}</h1>
        <p className={styles.description}>{description}</p>

        <menu className={styles.menu}>
          <li>
            <Button variant="back" onClick={() => navigate(-1)}>
              Назад
              <Icon icon={HomeIcon} size={22} color="white" />
            </Button>
          </li>
          <li>
            <Button variant="reload" onClick={() => window.location.reload()}>
              Повторить попытку
              <Icon icon={RefreshCcw} size={26} color="white" />
            </Button>
          </li>
        </menu>
      </div>
    </main>
  );
};

export default ErrorDisplay;
