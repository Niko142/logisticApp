import { AlertCircle, HomeIcon, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/Button";
import type { ErrorPageProps } from "@/types/error";

import { getStatusDescription } from "../utils/errorUtils";

const ErrorDisplay = ({ status, description }: ErrorPageProps) => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <AlertCircle size={100} color="var(--red)" />
      <h1 className="error-page__title">{status}</h1>
      <p className="error-page__description">
        {getStatusDescription(description)}
      </p>
      <div className="btn-menu">
        <Button variant="back" onClick={() => navigate(-1)}>
          Назад
          <HomeIcon size={22} />
        </Button>
        <Button variant="reload" onClick={() => window.location.reload()}>
          Повторить попытку
          <RefreshCcw size={26} />
        </Button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
