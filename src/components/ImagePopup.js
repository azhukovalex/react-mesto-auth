import React from 'react';
export default function ImagePopup(props) {
  return (
    <section className={`popup popup-image ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup-image__container">
        <button onClick={props.onClose} className="button button_type_close" id="close-image" type="button" aria-label="Закрыть" />
        <figure className="figure-place">
          <img className="figure-place__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="figure-place__image-caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

