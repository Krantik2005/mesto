// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  //находим элемент ошибки внутри функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //добавляем класс с ошибкой
  inputElement.classList.add('popup__input_type_error');
  //заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_error_visible');
};

// Функция, которая проверяет валидность поля
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //удаляем класс с ошибкой
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input_error_visible');
};

//Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//функция принимает массив полей
const hasInvalidInput = (inputList) => {
  //используем метод some
  return inputList.some((inputElement) => {
    //если поле не валидно, вернет true, обход массива прекратится и вся функция вернет true
    return !inputElement.validity.valid;
  });
};

//принимает массив полей ввода и элемент кнопки
const toggleButtonState = (inputList, buttonElement) => {
  //если есть хотябы один не валидный инпут
  if (hasInvalidInput(inputList)) {
    //кнопка не активна
    buttonElement.classList.add('popup__button_disabled');
  } else {
    //кнопка активна
    buttonElement.classList.remove('popup__button_disabled');
  }
};

const setEventListeners = (formElement) => {
  //находим все поля формы и делаем из них массив 
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  //найдем кнопку в текущей форме отправки
  const buttonElement = formElement.querySelector('.popup__button');

  //проверяем состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  //обойдем все элементы с помощью foreach
  inputList.forEach((inputElement) => {
    //добавим полям обработчик событий input
    inputElement.addEventListener('input', () => {
      //вызовем isValid, передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);

      //проверяем при изменении любого поля
      toggleButtonState(inputList, buttonElement);
    });
  });


};

const enableValidation = () => {
  //найдем все формы с указанным классом, сделаем из них массив
  const formList = Array.from(document.querySelectorAll('.form'));

  //обойдем элементы
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    //для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

enableValidation({
  formElement: '.form',
  inputElement: '.popup__input',
  submitButtonElement: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
});