import Button from "../../ui/Button/Button";

import s from "./Header.module.scss";

const Header = () => {
  return (
    <div className={s.container}>
      <nav className={s.navbar}>
        <img src="svg/logo.svg" alt="travor logo" />

        <Button width={113} height={40} variant="link" text="Login" />
      </nav>
    </div>
  );
};

export default Header;
