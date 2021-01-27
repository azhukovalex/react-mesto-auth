import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfPopup(props) {
  function handleSubmit(e) {    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.onDelete()
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      submit='Да'
      form='delete-place'
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
}



