import React from "react";
import { Link } from 'react-router-dom';

export function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { onRegister, onLoginState } = props;


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password })
  };

  React.useEffect(() => {
    onLoginState(true);
  }, [onLoginState]);

  return (
    <>
      <div className="popup popup__login">
        <div className="popup__container popup__container_login">
          <h1 className="popup__title popup__title_login">Регистрация</h1>
          <form className="popup__form popup__form_login"
            onSubmit={handleSubmit}
            noValidate>
            <input className="popup__form-input popup__form-input_login"
              autoComplete="off" type="text" id="input-name"
              required placeholder="Email"
              name="email" minLength="2"
              maxLength="40"
              value={email || ""}
              onChange={handleEmailChange} />
            <span className="popup__span-error"
              id="input-name-error" />
            <input className="popup__form-input popup__form-input_login"
              autoComplete="off"
              type="text"
              id="input-profession"
              required
              placeholder="Пароль"
              name="password"
              minLength="2"
              maxLength="200"
              value={password || ""}
              onChange={handlePasswordChange} />
            <span className="popup__span-error"
              id="input-profession-error" />
            <button className="button button_type_login">Зарегистрироваться</button>
          </form>
          <p className="login__text">
            Уже зарегистрированы?
              <Link to="sign-in" className="login__link">
              {" "}
                Войти
              </Link>
          </p>
        </div>
      </div>
    </>
  );

}