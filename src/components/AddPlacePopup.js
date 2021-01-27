import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title='Новое место'
      submit='Создать'
      form='place-form'
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input className="popup__form-input" type="text" id="input-place" required placeholder="Название" name="name" minLength="1" maxLength="30" onChange={handleChangeName} value={name || ''} />
      <span className="popup__span-error" id="input-place-error" />
      <input className="popup__form-input" type="url" id="input-link" required placeholder="Ссылка на картинку" name="link" onChange={handleChangeLink} value={link || ''} />
      <span className="popup__span-error popup__place-span-error" id="input-link-error" />
    </PopupWithForm>
  );
}




