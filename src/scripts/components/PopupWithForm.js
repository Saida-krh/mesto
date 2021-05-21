import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this.popupElem.querySelector('.popup__form'); 
    }

    setEventListeners(){
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitCallback(evt, this._getInputValues())
        });     
    }
    
    closePopup () {
        super.closePopup()
        this._form.reset()
    }
    
    _getInputValues(){
      const inputsData = {}
      const inputList = Array.from(this.popupElem.querySelectorAll('input'))  
      inputList.forEach(input => {
        inputsData[input.name] = input.value;
      })
      return inputsData
    }
}