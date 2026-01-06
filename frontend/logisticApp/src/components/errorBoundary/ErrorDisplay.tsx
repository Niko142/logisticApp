import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

import { ERROR_ACTIONS } from "./error.config";
import styles from "./error.module.css";
import type { ErrorDisplayProps } from "./errorBoundary.types";

const ErrorDisplay = ({
  status,
  description,
}: ErrorDisplayProps): React.ReactElement => {
  const navigate = useNavigate();

  const actions = ERROR_ACTIONS[status] || ERROR_ACTIONS.default;

  // TODO: добавить конфиг actions

  return (
    <main className={styles.container}>
      <Icon icon={AlertCircle} size={100} color="red" />

      <div className={styles.content}>
        <h1 className={styles.title}>{status}</h1>
        <p className={styles.description}>{description}</p>

        <menu className={styles.menu}>
          {actions.map((action) => (
            <li>
              <Button
                variant={action.variant}
                onClick={() => action.handler(navigate)}
              >
                {action.label}
                <Icon icon={action.icon} size={22} color="white" />
              </Button>
            </li>
          ))}
        </menu>
      </div>
    </main>
  );
};

export default ErrorDisplay;
