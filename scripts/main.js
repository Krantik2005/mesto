const editButton = document.querySelector('.inner__edit-button');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.container__button');
let nameInput = popup.querySelector('.text_name');
let selfInput = popup.querySelector('.text_self');
let title = document.querySelector('.inner__title');
let subtitle = document.querySelector('.profile-info__subtitle');

//Функция по добавлению и удалению класса
let popupToggle = function() {
  popup.classList.toggle('popup_opened');
}

//Событие нажатия на кнопки закрытия и открытия
editButton.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);

//Обработчик отправки формы
function formSubmitHandler(evt) {
  //Отмена стандартной отправки формы
  evt.preventDefault();

  title.textContent = nameInput.value;
  subtitle.textContent = selfInput.value;
}

popup.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('click', popupToggle);
