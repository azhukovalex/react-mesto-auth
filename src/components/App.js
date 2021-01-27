import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import ConfPopup from './ConfPopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import InfoTooltip from './InfoTooltip';
import { Login } from './Login';
import { Register } from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from "../utils/auth.js";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginState, setLoginState] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [successToolTip, setSuccessToolTip] = React.useState(false);
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isConfPopupOpen, setIsConfPopupOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState({});
  const [isCardSelected, setIsCardSelected] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [dataImage, setDataImage] = React.useState({});
  const setImage = (card) => {
    setDataImage(card);
    handleCardClick();
  }

  React.useEffect(() => {
    Promise.all([api.getUserInform(), api.getCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick() {
    setIsCardSelected(true);
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfDeleteClick() {
    setIsConfPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardSelected(false);
    setDataImage({});
    setIsConfPopupOpen(false);
    setIsTooltipOpen(false);
    setSuccessToolTip(false);
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    handleConfDeleteClick();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCard(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });;
  }

  function handleConfirmDelete(card) {
    api.deleteCard(cardDelete._id).then(() => {
      const newCards = cards.filter((c) => c._id !== cardDelete._id);
      setCards(newCards);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser(user) {
    api.updateProfileInfo(user.name, user.about).then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(card) {
    api.createNewCard(card.name, card.link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(user) {
    api.updateAvatar(user.avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handlerOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('mousedown', handlerOverlayClick);
    return () => {
      window.removeEventListener('mousedown', handlerOverlayClick);
      window.removeEventListener('keydown', handleEscClose);
    };
  })

  function handleSuccessToolTip() {
    setSuccessToolTip(true);
  }

  function handleTooltipOpen() {
    setIsTooltipOpen(true);
  }


  function handleRegister({ email, password }) {
    return auth.register(email, password)
      .then((res) => {
        if (res) {
          handleSuccessToolTip()
          setTimeout(handleTooltipOpen, 500);
          history.push("/sign-in");
        } else {
          throw new Error('Не удалось завершить регистрацию')
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации пользователя: ${err}`);
        handleTooltipOpen();
      })
  }

  function handleLogin({ email, password }) {
    return auth
      .authorize(email, password)
      .then((res) => {
        if (res && email) {
          setLoggedIn(true);
          history.push("/");
        } else {
          throw new Error('Не удалось войти в аккаунт')
        }
      })
      .catch((err) => {
        console.log(err);
        handleTooltipOpen();
      })
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setUserData({
            id: res.data._id,
            email: res.data.email,
          });
          setLoggedIn(true);
          history.push("/");
        } else {
          localStorage.removeItem("jwt");
        }
      })
        .catch((err) => {
          console.log(err);
          history.push('/sign-in');
        })
    }
  }

  function handleLoginState(state) {
    setLoginState(state);
  }

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          loggedIn={loggedIn}
          loginState={loginState}
          onSignOut={signOut}
          userData={userData}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            clickImages={setImage}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
              onLoginState={handleLoginState}
              openToolTip={handleTooltipOpen}
              successToolTip={handleSuccessToolTip} />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
              onLoginState={handleLoginState}
              successToolTip={handleSuccessToolTip}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfPopup isOpen={isConfPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleConfirmDelete}
        />
        <ImagePopup onClose={closeAllPopups}
          isOpen={isCardSelected}
          card={dataImage}
        />
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          successStyle={successToolTip}
        />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;


