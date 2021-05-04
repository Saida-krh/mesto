export class FormValidator {
    constructor(data, popupFormElement){
        this._selectorSettingsList = data,
        this._popupFormElement = popupFormElement
    };

    _showInputError (popupFormElement, popupInput, errorMessage, selectorSettingsList) { // функция добавляет класс с ошибкой
        const errorElement = popupFormElement.querySelector(`.${popupInput.id}-error`)
    
        popupInput.classList.add(selectorSettingsList.errorClass);
        errorElement.textContent = errorMessage;
    
    };
    _hideInputError (popupFormElement, popupInput, selectorSettingsList) {// функция удаляет класс с ошибкой
        const errorElement = popupFormElement.querySelector(`.${popupInput.id}-error`)
        popupInput.classList.remove(selectorSettingsList.errorClass);
        errorElement.textContent = ' ';
    };
    
    _checkInputValidity (popupFormElement, popupInput, selectorSettingsList) { // функция проверяет валидность форм
        if (!popupInput.validity.valid) {
            this._showInputError(popupFormElement, popupInput, popupInput.validationMessage, selectorSettingsList)
        } else {
            this._hideInputError(popupFormElement, popupInput, selectorSettingsList) 
        }
    };
    
    _setEventListeners (popupFormElement, selectorSettingsList) {
        const popupInputList = Array.from(popupFormElement.querySelectorAll(selectorSettingsList.inputSelector));
        const submitButtonSelector = popupFormElement.querySelector(selectorSettingsList.submitButtonSelector);
            popupInputList.forEach((popupInput) => {
                this._hideInputError(popupFormElement, popupInput, selectorSettingsList)
                this._toggleButtonState(popupInputList, submitButtonSelector);
        popupInput.addEventListener('input', () => {
                this._checkInputValidity(popupFormElement, popupInput,  selectorSettingsList);
                this._toggleButtonState(popupInputList, submitButtonSelector);
            });
        });
    };
    
    enableValidation () {
        this._setEventListeners(this._popupFormElement, this._selectorSettingsList);
    };

    _hasInvalidInput(popupInputList) {
        return popupInputList.some((popupInput) => {
            return !popupInput.validity.valid;
        });
    }
    
    _toggleButtonState (popupInputList, submitButtonSelector) {
        if(this._hasInvalidInput(popupInputList)){
            submitButtonSelector.setAttribute('disabled', true);
            
            return;
        }
            submitButtonSelector.removeAttribute('disabled');
        
    }
}
