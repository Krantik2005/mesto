//Массив cards
const initialCards = [
  {
      name: 'Гора Бештау',
      link: './images/cards/Beshtau.jpg'
  },
  {
      name: 'Парк Железноводска',
      link: './images/cards/Zheleznovodsk.jpg'
  },
  {
      name: 'Зима в горах',
      link: './images/cards/winter.jpg'
  },
  {
      name: 'Гора Змейка',
      link: './images/cards/Snake.jpg'
  },
  {
      name: 'Монастырь у подножья горы',
      link: './images/cards/Monastery.jpg'
  },
  {
      name: 'Гора Эльбрус',
      link: './images/cards/Elbrus.jpg'
  }
];

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
      subtitle = document.querySelector('.profile__subtitle');

//функция добавления карточек
const addCardToContainer = (card) => {
  //клонируем
  const cardElement = document.querySelector('#cardTemplate').content.cloneNode(true);

  //добавляем картинки, текст и alt карточкам
  const cardTemplateImage = cardElement.querySelector('.cards__image');
  cardTemplateImage.src = card.link;
  cardTemplateImage.alt = card.name;
  cardElement.querySelector('.cards__text').textContent = card.name;

  // открытие карточки при нажатии
  cardTemplateImage.addEventListener('click', () => handlePreviewPicture(card));

  //добавляем карточки на страницу
  cardContainer.prepend(cardElement);
};

initialCards.forEach(addCardToContainer);

// добавление картинки, альтов и текста
function handlePreviewPicture (card) {
    const popupTypeCard = document.querySelector('.popup_type_card-image');
    const popupImage = document.querySelector('.popup__img');
    popupImage.src = card.link;
    popupImage.alt = card.name;
    document.querySelector('.popup__text').textContent = card.name;
    //добавление слушателя, при нажатии на кнопку esc закрывает попап
    document.addEventListener('keydown', closePopupKeyPress);
    toggleModalWindow(popupTypeCard);
}

//универсальное открытие попапов
const toggleModalWindow = (modalWindow) => {
  modalWindow.classList.toggle('popup_is-opened');
  //проверка заполненности полей
  checkParametr();
};

//открытие первого попапа
editButton.addEventListener('click', (evt) => {
  popupMyFormAdd();
  toggleModalWindow(firstPopup);
  //добавление слушателя, при нажатии на кнопку esc закрывает попап
  document.addEventListener('keydown', closePopupKeyPress);
});

//открытие второго попапа
addButton.addEventListener('click', (evt) => {
  toggleModalWindow(secondPopup);
  //добавление слушателя, при нажатии на кнопку esc закрывает попап
  document.addEventListener('keydown', closePopupKeyPress);
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
function closePopupKeyPress (evt) {
  const popupOpen = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    popupOpen.classList.remove('popup_is-opened');
  }
  document.removeEventListener('keydown', closePopupKeyPress);
}

cardContainer.addEventListener('click', (evt) => {
  //ставим убираем лайк
  if (evt.target.classList.contains('cards__like')) {
    evt.target.classList.toggle('cards__like_active');
  }

  //удаление карточки 
  if (evt.target.classList.contains('cards__trash')) {
    evt.target.closest('.cards').remove();
  }
});

//Копирует данные (из h1 и p, в input)
function popupMyFormAdd() {
  nameInput.value = title.textContent;
  selfInput.value = subtitle.textContent;
}

//проверяет заполненны поля или нет
function checkParametr () {
  const btn = document.querySelector('.popup__button');

  if (nameInput.length !== 0 && selfInput.length !== 0) {
    btn.classList.remove('popup__button_disabled');
  } else {
    btn.classList.add('popup__button_disabled');
  }
}

//Обработчик отправки формы submit
function formSubmitHandler (evt) {
  evt.preventDefault();

  //Добавляем текст на страницу
  title.textContent = nameInput.value;
  subtitle.textContent = selfInput.value;

  //Закрываем попап
  toggleModalWindow(evt.target);
}

//Добавляем новую карточку
function formSubmitCard (evt) {
  evt.preventDefault();

  const addCard = {
    name: placeInput.value,
    link: imageInput.value
  };
  
  addCardToContainer(addCard);

  toggleModalWindow(evt.target);

  //сбрасывается значение полей после отправки
  popupCardForm.reset();
}

popupMyForm.addEventListener('submit', formSubmitHandler);
popupCardForm.addEventListener('submit', formSubmitCard);


