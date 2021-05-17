import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
    }

    setEventListeners(){
        const closeIconElement = document.querySelector('.popup__close-button')
        closeIconElement.addEventListener('click', this.closePopup)     
        this.popupElem.addEventListener('submit', this._submitCallback);
    }

    
    closePopup () {
        const form = this.popupElem.querySelector('.popup__form')
        this.popupElem.classList.remove('popup_opened');
        form.reset()
        document.removeEventListener('click',  this._clickByOverlay)
        document.removeEventListener('keydown',  this._closeByEscape)
    }

    _getInputValues(){
      return this.popupElem.querySelectorAll('input')
    }
}