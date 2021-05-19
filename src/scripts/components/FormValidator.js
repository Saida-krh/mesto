export class FormValidator {
    constructor(data, popupFormElement){
        this._selectorSettingsList  = data;
        this._popupFormElement      = popupFormElement;
        this._popupInputList        = Array.from(popupFormElement.querySelectorAll(this._selectorSettingsList.inputSelector));
        this._submitButtonElement   = popupFormElement.querySelector(this._selectorSettingsList.submitButtonSelector);
    };

    _showInputError (popupInput, errorMessage) { // функция добавляет класс с ошибкой
        const errorElement = this._popupFormElement.querySelector(`.${popupInput.id}-error`)
    
        popupInput.classList.add(this._selectorSettingsList.errorClass);
        errorElement.textContent = errorMessage;
    
    };

    _hideInputError (popupInput) {// функция удаляет класс с ошибкой
        const errorElement = this._popupFormElement.querySelector(`.${popupInput.id}-error`)
        popupInput.classList.remove(this._selectorSettingsList.errorClass);
        errorElement.textContent = '';
    };
    
    _checkInputValidity (popupInput) { // функция проверяет валидность форм
        if (!popupInput.validity.valid) {
            this._showInputError(popupInput, popupInput.validationMessage)
        } else {
            this._hideInputError(popupInput) 
        }
    };
    
    _setEventListeners () {
            this._popupInputList.forEach((popupInput) => {
        popupInput.addEventListener('input', () => {
                this._checkInputValidity(popupInput);
                this._toggleButtonState();
            });
        });
    };

    resetValidation() {
        this._popupInputList.forEach((popupInput) => {
          this._hideInputError(popupInput)
        });
  
        this._toggleButtonState();
    }
    
    enableValidation () {
        this._setEventListeners();
    };

    _hasInvalidInput() {
        return this._popupInputList.some((popupInput) => {
            return !popupInput.validity.valid;
        });
    }
    
    _toggleButtonState () {
        if(this._hasInvalidInput()){
            this._submitButtonElement.setAttribute('disabled', true);
            
            return;
        }
            this._submitButtonElement.removeAttribute('disabled');
        
    }
}
