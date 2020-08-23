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

//Объявляем переменные
const editButton = document.querySelector('.profile__edit-button');
const popupMyForm = document.querySelector('.popup_type_my-form');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const selfInput = document.querySelector('.popup__input_type_self');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupCardForm = document.querySelector('.popup_type_card-form');
const addButton = document.querySelector('.profile__add-button');
const placeInput = document.querySelector('.popup__input_type_card-name');
const imageInput = document.querySelector('.popup__input_type_card-img');
const cardContainer = document.querySelector('.container');

//функция добавления карточек
const addCardToContainer = (card) => {
  //клонируем
  const cardElement = document.querySelector('#cardTemplate').content.cloneNode(true);

  //добавляем картинки, текст и alt карточкам
  const cardTemplateImage = cardElement.querySelector('.cards__image');
  cardTemplateImage.src = card.link;
  cardTemplateImage.alt = card.name;
  
  cardElement.querySelector('.cards__text').textContent = card.name;

  //нажатие на кнопку лайка
  cardElement.querySelector('.cards__like').addEventListener('click', function() {
    handleLikeIcon(event);
  });

  //открытие карточек при нажатии
  cardTemplateImage.addEventListener('click', (evt) => {
    const popupTypeCard = document.querySelector('.popup_type_card-image');
    const popupImage = document.querySelector('.popup__img');
    popupImage.src = card.link;
    popupImage.alt = card.name;
    document.querySelector('.popup__text').textContent = card.name;
    toggleModalWindow(popupTypeCard);
  });

  //удаление карточки при нажатии на мусорку
  cardElement.querySelector('.cards__trash').addEventListener('click', function() {
    deleteCard(event);
  });

  //отображаем на странице
  cardContainer.prepend(cardElement);
}

//ищем в массиве
initialCards.forEach(addCardToContainer);

//ставим убираем лайк
function handleLikeIcon(evt) {
  evt.target.classList.toggle('cards__like_active');
}

// функция для удаления карточек
function deleteCard(evt) {
  evt.target.closest('.cards').remove();
}

//Обработчик отправки формы submit
function formSubmitHandler(evt) {
  evt.preventDefault();

  //Добавляем текст на страницу
  title.textContent = nameInput.value;
  subtitle.textContent = selfInput.value;

  //Закрываем попап
  toggleModalWindow(evt.target);
}

  //Добавляем новую карточку
  function formSubmitCard(evt) {
    evt.preventDefault();

    const addCard = {
      name: placeInput.value,
      link: imageInput.value
  }
  
    addCardToContainer(addCard);

    toggleModalWindow(evt.target);
}

//Копирует данные (из h1 и p, в input)
function popupMyFormAdd() {
  nameInput.value = title.textContent;
  selfInput.value = subtitle.textContent;
}

//Открытие модальных окон универсальное
const toggleModalWindow = (modalWindow) => {
  modalWindow.classList.toggle('popup_is-opened');
}

//Закрытие всех окон на крестик
popupCloseButtons.forEach(function (popupCloseButton) {
  popupCloseButton.addEventListener('click', (evt) => {
    toggleModalWindow(evt.target.closest('.popup'));
  });
});

//открытие первого попапа
editButton.addEventListener('click', (evt) => {
  const popupTypeMyForm = document.querySelector('.popup_type_my-form');
  popupMyFormAdd();
  toggleModalWindow(popupTypeMyForm);
});

//открытие второго попапа
addButton.addEventListener('click', (evt) => {
  const popupTypeCardForm = document.querySelector('.popup_type_card-form');
  toggleModalWindow(popupTypeCardForm);
});

//Вызываем обработчики событий
popupMyForm.addEventListener('submit', formSubmitHandler);
popupCardForm.addEventListener('submit', formSubmitCard);








