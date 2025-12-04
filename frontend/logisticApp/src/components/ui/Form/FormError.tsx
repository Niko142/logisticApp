import clsx from "clsx";
import { Activity } from "react";

import styles from "./form.module.css";
import type { FormErrorProps } from "./form.types";

export const FormError = ({ error, global }: FormErrorProps) => {
  if (!error?.message) return null;

  return (
    <Activity mode={error ? "visible" : "hidden"}>
      <span className={clsx(styles.message, global && styles.globalMessage)}>
        {error.message}
      </span>
    </Activity>
  );
};
