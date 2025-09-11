import type { FieldValues } from "react-hook-form";
import type { FormFieldProps } from "../types/auth.type";

const FormField = <TFieldValues extends FieldValues>({
  id,
  role,
  type = "text",
  autoComplete = "off",
  register,
  name,
  options,
  error,
  label,
  renderError,
}: FormFieldProps<TFieldValues>) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className={`${role}__form--label`}>
          {label}
        </label>
      )}
      <input
        type={type}
        {...register(name, options)}
        id={id}
        autoComplete={autoComplete}
        className={`${role}__form--input`}
      />
      {renderError
        ? renderError(error)
        : error && (
            <span className={`${role}__form--error`}>{error.message}</span>
          )}
      {/* {error && <span className={`${role}__form--error`}>{error.message}</span>} */}
    </>
  );
};

export default FormField;
