import { Link } from "react-router-dom";

import Button from "../../ui/Button/Button";

import s from "./Header.module.scss";

const Header = () => {
  return (
    <div className={s.container}>
      <nav className={s.navbar}>
        <Link to="/">
          <img src="/svg/logo.svg" alt="travor logo" />
        </Link>

        <Button width={113} height={40} variant="link" text="Login" />
      </nav>
    </div>
  );
};

export default Header;
