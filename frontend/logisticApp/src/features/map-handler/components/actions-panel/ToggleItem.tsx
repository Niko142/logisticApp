import styles from "./panel.module.css";
import type { ToggleItemProps } from "./panel.types";

export const ToggleItem = ({
  id,
  label,
  checked,
  onChange,
}: ToggleItemProps) => (
  <li className={styles.item}>
    <label htmlFor={id} style={{ cursor: "pointer" }}>
      <input
        type="checkbox"
        style={{ cursor: "pointer" }}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  </li>
);
