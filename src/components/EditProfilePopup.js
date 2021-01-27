import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title='Редактировать профиль'
      submit='Сохранить'
      form='name-form'
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input className="popup__form-input" type="text" id="input-name" required placeholder="Имя" name="name" minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} />
      <span className="popup__span-error" id="input-name-error" />
      <input className="popup__form-input" type="text" id="input-profession" required placeholder="Профессия" name="about" minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} />
      <span className="popup__span-error" id="input-profession-error" />
    </PopupWithForm >
  );
}




