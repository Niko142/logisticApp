import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

import styles from "./overlay.module.css";

type RouteOverlayProps = {
  isFetching: boolean;
  isError: boolean;
};

export const RouteOverlay = ({ isFetching, isError }: RouteOverlayProps) => {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (isError && !hasShownToast.current) {
      toast.error("Ошибка формирования маршрута", {
        position: "bottom-left",
      });
      hasShownToast.current = true;
    }

    if (!isError) {
      hasShownToast.current = false;
    }
  }, [isError]);

  if (!isFetching && !isError) return null;

  return (
    <div className={styles.routeOverlay}>
      {isFetching && <ClipLoader size={22} color="var(--color-gray-100" />}
    </div>
  );
};
