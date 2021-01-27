import React from "react";
import union from "../images/Union.svg";
import icon from "../images/Union-1.svg";

function InfoTooltip(props) {
  const { isOpen, onClose, successStyle } = props;
  const errorImg = {
    backgroundImage: "url(" + union + ")",
  };
  const successImg = {
    backgroundImage: "url(" + icon + ")",
  };

  return (
    <section
      className={isOpen ? "popup popup_opened" : "popup"}
      id="InfoTooltip"
    >
      <form className="popup__container popup__tip">
        <button
          onClick={onClose}
          className="button button_type_close"
          id="formError-close"
          type="button"
        />
        <div
          className="popup__image popup__image_login"
          style={successStyle ? successImg : errorImg}
        />
        <h2 className="popup__title infotooltip-title">
          {successStyle
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </form>
    </section>
  );
}

export default InfoTooltip;