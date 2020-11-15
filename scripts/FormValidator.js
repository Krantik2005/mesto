export class FormValidator {
  constructor(obj, popupForm) {
    this._popupForm = document.querySelector(popupForm);
    this._formElement = this._popupForm.querySelector(obj.formElement);
    this._inputElement = obj.inputElement;
    this._submitButtonElement = this._formElement.querySelector(obj.submitButtonElement);
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
  }

  enableValidation () {
    this._setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
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
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput (inputList) {
    
    return inputList.some((inputElement) => {
      
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners () {
    
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    const self = this;
    
   this._toggleButtonState(inputList, this._submitButtonElement);

    
    inputList.forEach((inputElement) => {
      
      inputElement.addEventListener('input', () => {
        
        self._checkInputValidity(inputElement);

        
        self._toggleButtonState(inputList, self._submitButtonElement);
      });
    });
  }


}