export class FormValidator {
  constructor(obj, popupForm) {
    this._popupForm = document.querySelector(popupForm);
    this._formElement = this._popupForm.querySelector(obj.formElement);
    this._inputElement = obj.inputElement;
    this._submitButtonElement = this._formElement.querySelector(obj.submitButtonElement);
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
  }

  enableValidation () {
    
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  _showInputError (inputElement, errorMessage) {
  
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
 
  this._formElement.classList.add(this._inputErrorClass);
 
  errorElement.textContent = errorMessage;
 
  errorElement.classList.add(this._errorClass);
  }
 
  _hideInputError (inputElement) {

    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
 
    this._formElement.classList.remove(this._inputErrorClass);
 
    errorElement.textContent = '';
 
    errorElement.classList.remove(this._errorClass);
  }
 
  _checkInputValidity (inputElement) {
    if (!inputElement.checkValidity()) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput () {
  
  return this._inputList.some((inputElement) => {
    if (!inputElement.checkValidity() || inputElement.value.length === 0) {
      return true;
    }
    return false;
    });
  }
 
  toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.setAttribute('disabled', 'true');
    } else { 
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners () {

   this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        
        this.toggleButtonState(this._inputList, this._submitButtonElement);
      });
    });
  }
}