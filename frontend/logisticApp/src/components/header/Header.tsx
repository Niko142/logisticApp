import { HeaderNavbar } from "./Navbar/HeaderNavbar";
import { HeaderUserProfile } from "./User/HeaderUserProfile";

export const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="container">
        {/* Navbar */}
        <HeaderNavbar />
        {/* Профиль пользователя */}
        <HeaderUserProfile />
      </div>
    </header>
  );
};
