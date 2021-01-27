import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";

function Header(props) {
  const { loggedIn, onSignOut, userData, loginState } = props;
  const email = userData ? userData.email : "";
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="logo" />
      {loggedIn ? (
        <>
          <nav className="header__nav">
            <ul className="header__list header__list_main">
              <li className="header__list-item header__list-item_main" >{email}</li>
              <li onClick={onSignOut} className="header__list-link">Выйти</li>
            </ul>
          </nav>
        </>
      ) : (
          <Link
            to={loginState ? "/sign-in" : "/sign-up"}
            className="header__list-link"
          >
            {loginState ? "Войти" : "Регистрация"}
          </Link>
        )}
    </header>
  );
}

export default Header;



