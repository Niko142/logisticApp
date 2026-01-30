import styles from "./legend.module.css";
import type { ToggleItemProps } from "./legend.types";

export const ToggleItem = ({
  id,
  label,
  checked,
  onChange,
}: ToggleItemProps) => (
  <li className={styles.item}>
    <label htmlFor={id}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      {label}
    </label>
  </li>
);
