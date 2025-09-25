import type { AuthLayoutProps } from "../../types/auth.type";

import Logo from "@/assets/icons/Logo.svg";

const AuthLayout = ({ onSubmit, title, role, children }: AuthLayoutProps) => {
  return (
    <form className={`${role}__form`} onSubmit={onSubmit}>
      {/* Логотип */}
      <img className={`${role}__form--logo`} src={Logo} alt="Logo" />

      <h1 className={`${role}__form--title`}>{title}</h1>
      {children}
    </form>
  );
};

export default AuthLayout;
