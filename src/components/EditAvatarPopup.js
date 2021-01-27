import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState('');

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar
    });
  }
  React.useEffect(() => {
    setAvatar('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title='Обновить аватар'
      submit='Сохранить'
      form='form-avatar'
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input className="popup__form-input" type="url" id="avatar-link" aria-label="Ссылка на картинку" placeholder="Ссылка на картинку" name="link" required value={avatar || ''} onChange={handleChangeAvatar} />
      <span className="popup__span-error" id="avatar-link-error" />
      <span className="popup__span-error" id="input-profession-error" />
    </PopupWithForm >
  );
}




