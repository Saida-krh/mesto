const popupSelectors = {  
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    errorClass: 'popup__input-error'
}


const showInputError = (popupFormElement, popupInput, errorMessage, selectorSettingsList) => { // функция добавляет класс с ошибкой
    const errorElement = popupFormElement.querySelector(`.${popupInput.id}-error`)

    popupInput.classList.add(selectorSettingsList.errorClass);
    errorElement.textContent = errorMessage;

}
const hideInputError = (popupFormElement, popupInput, selectorSettingsList) => {// функция удаляет класс с ошибкой
    const errorElement = popupFormElement.querySelector(`.${popupInput.id}-error`)
    popupInput.classList.remove(selectorSettingsList.errorClass);
    errorElement.textContent = ' ';
}

const checkInputValidity = (popupFormElement, popupInput, selectorSettingsList) => { // функция проверяет валидность форм
    if (!popupInput.validity.valid) {
        showInputError(popupFormElement, popupInput, popupInput.validationMessage, selectorSettingsList)
    } else {
        hideInputError(popupFormElement, popupInput, selectorSettingsList) 
    }
};

const setEventListeners = (popupFormElement, selectorSettingsList) => {
    const popupInputList = Array.from(popupFormElement.querySelectorAll(selectorSettingsList.inputSelector));
    const submitButtonSelector = popupFormElement.querySelector(selectorSettingsList.submitButtonSelector);
        popupInputList.forEach((popupInput) => {
        popupInput.addEventListener('input', function() {
            checkInputValidity(popupFormElement, popupInput,  selectorSettingsList);
            toggleButtonState(popupInputList, submitButtonSelector);
        });
    });
};

const enableValidation = (selectorSettingsList) => {
    const formList = Array.from(document.querySelectorAll(selectorSettingsList.formSelector));
    formList.forEach((popupFormElement) => {
        setEventListeners(popupFormElement, selectorSettingsList);
    });
};


function hasInvalidInput(popupInputList) {
    return popupInputList.some((popupInput) => {
        return !popupInput.validity.valid;
    });
}

function toggleButtonState (popupInputList, submitButtonSelector) {
    if(hasInvalidInput(popupInputList)){
        submitButtonSelector.setAttribute('disabled', true);
        
        return;
    }
        submitButtonSelector.removeAttribute('disabled');
    
}

enableValidation(popupSelectors)