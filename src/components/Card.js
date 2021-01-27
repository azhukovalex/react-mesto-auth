import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `button button_type_delete ${isOwn ? '' : 'button_type_delete_invisible'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `button button_type_like ${isLiked ? 'button_type_like-liked' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className="card" key={props.card._id}>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Удалить" />
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Лайкнуть" />
          <div className="card__like-counter">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

