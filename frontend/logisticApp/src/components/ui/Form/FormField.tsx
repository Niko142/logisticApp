import { useId } from "react";
import type { FieldValues } from "react-hook-form";

import styles from "./form.module.css";
import type { FormFieldProps } from "./form.types";
import { FormError } from "./FormError";

export const FormField = <T extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  rules,
  error,
  autoComplete = "off",
}: FormFieldProps<T>) => {
  const formId = useId(); // Для связи label и input

  return (
    <>
      {label && (
        <label htmlFor={formId} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={formId}
        type={type}
        autoComplete={autoComplete}
        className={styles.input}
        {...register(name, rules)}
      />

      <FormError error={error} />
    </>
  );
};
