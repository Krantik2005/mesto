const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__button');
let nameInput = popup.querySelector('.text_name');
let selfInput = popup.querySelector('.text_self');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

//Добавляет класс popup_opened и копирует данные (из h1 и p, в input)
function popupAdd() {
  popup.classList.add('popup_opened');
  nameInput.value = title.textContent;
  selfInput.value = subtitle.textContent;
}

//Удаляет класс popup_opened
function popupRemove() {
  popup.classList.remove('popup_opened');
}

//Обработчик отправки формы
function formSubmitHandler(evt) {
  //Отмена стандартной отправки формы
  evt.preventDefault();

  //Добавляем текст на страницу
  title.textContent = nameInput.value;
  subtitle.textContent = selfInput.value;

  //Закрываем попап
  popupRemove();
}

//Вызываем обработчики событий
popup.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popupAdd);
popupClose.addEventListener('click', popupRemove);