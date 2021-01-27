import React from 'react';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__author">
          <div className="profile__avatar">
            <img className="profile__image" src={currentUser.avatar} alt={currentUser.name} name="avatar" />
            <button className="button button_type_avatar" onClick={props.onEditAvatar} />
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="button button_type_edit" type="button" id="close-edit" aria-label="Редактировать" onClick={props.onEditProfile} />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="button button_type_add" type="button" aria-label="Добавить фото" onClick={props.onAddPlace} />
      </section>

      <div className="cards">
        <ul className="card-list main__card-list">
          {props.cards && props.cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.clickImages} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </div>
    </main>
  )
}

