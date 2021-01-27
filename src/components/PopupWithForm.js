import React from 'react';

export default function PopupWithForm(props) {
  return (
    <div className={(props.isOpen ? 'popup popup_opened' : 'popup')} id={props.name}>
      <div className='popup__container'>
        <button className='button button_type_close' type='button' id='close-button' aria-label='Закрыть' onClick={props.onClose} />
        <form className='popup__form' id={props.form} onSubmit={props.onSubmit} name='form-info' method='post'>
          <h3 className='popup__title'>{props.title}</h3>
          {props.children}
          <button className={(!props.disabled ? `button button_type_save` : 'button button_type_save_inactive')} type='submit' disabled={props.disabled}>{props.submit}</button>
        </form>
      </div>
    </div>
  )
}






