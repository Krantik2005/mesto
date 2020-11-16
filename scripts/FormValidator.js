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
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput (inputList) {

    return inputList.some((inputElement) => {
      if (!inputElement.validity.valid || inputElement.value.length === 0) {
        return true;
      }
      return false;
    });
  }

  _toggleButtonState (inputList) {
    if (this._hasInvalidInput(inputList)) {
      
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.disabled = true;

    } else {
      
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.disabled = false;
      
    }
  }

  _setEventListeners () {
    
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    
   this._toggleButtonState(inputList, this._submitButtonElement);

    
    inputList.forEach((inputElement) => {
      
      inputElement.addEventListener('input', () => {
        
        this._checkInputValidity(inputElement);

        
        this._toggleButtonState(inputList, this._submitButtonElement);
      });
    });
  }


}