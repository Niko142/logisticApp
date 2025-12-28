import { HeaderLogo } from "./HeaderLogo";
import styles from "../header.module.css";
import { NavigationMenu } from "./NavigationMenu";

export const HeaderNavbar = (): React.ReactElement => {
  return (
    <nav className={styles.navbar}>
      <HeaderLogo />
      <NavigationMenu />
    </nav>
  );
};
