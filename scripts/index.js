import { initialCards, validationObj } from './Array.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const cardContainer = document.querySelector('.container'),
      closeButton = document.querySelectorAll('.popup__close'),
      editButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      firstPopup = document.querySelector('.popup_type_my-form'),
      secondPopup = document.querySelector('.popup_type_card-form'),
      popup = document.querySelectorAll('.popup'),
      popupMyForm = document.querySelector('.popup_type_my-form'),
      popupCardForm = document.querySelector('.popup_type_card-form'),
      nameInput = document.querySelector('.popup__input_type_name'),
      selfInput = document.querySelector('.popup__input_type_self'),
      placeInput = document.querySelector('.popup__input_type_card-name'),
      imageInput = document.querySelector('.popup__input_type_card-img'),
      title = document.querySelector('.profile__title'),
      subtitle = document.querySelector('.profile__subtitle'),
      popupTypeCard = document.querySelector('.popup_type_card-image'),
      popupImage = document.querySelector('.popup__img'),
      popupText = document.querySelector('.popup__text');


const editProfileForm = new FormValidator(validationObj, '.popup_type_my-form');
editProfileForm.enableValidation();
const addCardForm = new FormValidator(validationObj, '.popup_type_card-form');
addCardForm.enableValidation();

//функция добавления карточек
const addCardToContainer = (item) => {

  const card = new Card(item, '#cardTemplate', () => handlePreviewPicture(item));
  card.generateCard(cardContainer);

};

initialCards.forEach(addCardToContainer);

// добавление картинки, альтов и текста
const handlePreviewPicture = (data) => {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupText.textContent = data.name;
  toggleModalWindow(popupTypeCard);
};

//универсальное открытие попапов
const toggleModalWindow = (modalWindow) => {
  modalWindow.classList.toggle('popup_is-opened');

  //проверка условием добавления и удаления слушателя при нажатии на esc
  if (modalWindow.classList.contains('popup_is-opened')) {
    document.addEventListener('keydown', closePopupKeyPress);
  } else {
    document.removeEventListener('keydown', closePopupKeyPress);
  }
  //проверка заполненности полей
  toggleFormButtonState();
};

//открытие первого попапа
editButton.addEventListener('click', (evt) => {
  popupMyFormAdd();
  toggleModalWindow(firstPopup);
});

//открытие второго попапа
addButton.addEventListener('click', (evt) => {
  toggleModalWindow(secondPopup);
});

//закрытие попапов на крестик
closeButton.forEach((closePopup) => {
  closePopup.addEventListener('click', (evt) => {
    toggleModalWindow(evt.target.closest('.popup'));
  });
});

// закрытие попапов на черную область
popup.forEach(mousePress => {
  mousePress.addEventListener('click', (evt) => {
    if (evt.target !== evt.currentTarget) {
      return;
   }
   toggleModalWindow(evt.target);
  });
});

// закрытие попапа на клавишу Escape
const closePopupKeyPress = (evt) => {
  const popupOpen = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    toggleModalWindow(popupOpen);
  }
};

//Копирует данные (из h1 и p, в input)
const popupMyFormAdd = () => {
  nameInput.value = title.textContent;
  selfInput.value = subtitle.textContent;
};

//проверяет заполненны поля или нет
const toggleFormButtonState = () => {
  const btn = document.querySelector('.popup__button');

  if (nameInput.length !== 0 && selfInput.length !== 0) {
    btn.classList.remove('popup__button_disabled');
  } else {
    btn.classList.add('popup__button_disabled');
  }
};

//Обработчик отправки формы submit
const formSubmitHandler = (evt) => {
  evt.preventDefault();

  //Добавляем текст на страницу
  title.textContent = nameInput.value;
  subtitle.textContent = selfInput.value;

  //Закрываем попап
  toggleModalWindow(evt.target);
};

//Добавляем новую карточку
const formSubmitCard = (evt) => {
  evt.preventDefault();

  const addCard = {
    name: placeInput.value,
    link: imageInput.value
  };
  
  addCardToContainer(addCard);

  toggleModalWindow(evt.target);

  //сбрасывается значение полей после отправки
  popupCardForm.reset();
};

popupMyForm.addEventListener('submit', formSubmitHandler);
popupCardForm.addEventListener('submit', formSubmitCard);


