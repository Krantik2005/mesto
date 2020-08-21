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
const popupMyForm = document.querySelector('.popup_my-form');
const popupCloseMyForm = document.querySelector('.close_popup_myForm-close');
const nameInput = popupMyForm.querySelector('.text_name');
const selfInput = popupMyForm.querySelector('.text_self');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupCardForm = document.querySelector('.popup_card-form');
const addButton = document.querySelector('.profile__add-button');
const popupCloseCardForm = popupCardForm.querySelector('.close_popup_cardForm-close');
const placeInput = popupCardForm.querySelector('.text_card-name');
const imageInput = popupCardForm.querySelector('.text_card-img');
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

  //ставим убираем лайк
  cardElement.querySelector('.cards__icon').addEventListener('click', function(evt) {
    evt.target.classList.toggle('cards__icon_active');
  });

  //открытие карточек при нажатии
  const popupImageOpened = function() {
    document.querySelector('.popup_card-image').classList.add('popup_cardImageOpened');
    const popupImage = document.querySelector('.popup__img');
    popupImage.src = card.link;
    popupImage.alt = card.name;
    document.querySelector('.popup__text').textContent = card.name;

    //закрытие карточки при нажатии
    document.querySelector('.close_popup_image-close').addEventListener('click', function() {
        document.querySelector('.popup_card-image').classList.remove('popup_cardImageOpened');
    });
  }

  cardElement.querySelector('.cards__image').addEventListener('click', popupImageOpened);

  //удаление карточки при нажатии на мусорку
  cardElement.querySelector('.cards__trash').addEventListener('click', function() {
    deleteCard(event);
  });

  //отображаем на странице
  cardContainer.prepend(cardElement);
}

//ищем в массиве
initialCards.forEach(addCardToContainer);

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
  popupMyFormRemove();
}

  //Добавляем новую карточку
  function formSubmitCard(evt) {
    evt.preventDefault();

    if (placeInput.value === '' || imageInput.value === '') {
      alert('Заполните все поля');
      return false;
    }

    const addCard = {
      name: placeInput.value,
      link: imageInput.value
  }
  
    addCardToContainer(addCard);

    popupCardFormRemove();
  } 

//Добавляет класс popup_opened и копирует данные (из h1 и p, в input)
function popupMyFormAdd() {
  nameInput.value = title.textContent;
  selfInput.value = subtitle.textContent;
  popupMyForm.classList.add('popup_myFormOpened');
}

//Удаляет класс popup_opened
function popupMyFormRemove() {
  popupMyForm.classList.remove('popup_myFormOpened');
}


//Открытие закрытие popup карточек
function popupCardFormAdd() {
  popupCardForm.classList.add('popup_cardFormOpened');
}

function popupCardFormRemove() {
  popupCardForm.classList.remove('popup_cardFormOpened');
}


//Вызываем обработчики событий
popupMyForm.addEventListener('submit', formSubmitHandler);
popupCardForm.addEventListener('submit', formSubmitCard);

editButton.addEventListener('click', popupMyFormAdd);
popupCloseMyForm.addEventListener('click', popupMyFormRemove);
addButton.addEventListener('click', popupCardFormAdd);
popupCloseCardForm.addEventListener('click', popupCardFormRemove);








