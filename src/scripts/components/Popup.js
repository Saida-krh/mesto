export class Popup {
    constructor(popupSelector){
        this.popupElem = document.querySelector(popupSelector)
        this._closeByEscape = this._closeByEscape.bind(this)
        this._clickByOverlay = this._clickByOverlay.bind(this)
    }

    openPopup () {
        document.addEventListener('click', this._clickByOverlay)
        document.addEventListener('keydown', this._closeByEscape)
        this.popupElem.classList.add('popup_opened');
    }

    closePopup () {
        this.popupElem.classList.remove('popup_opened');
        document.removeEventListener('click',  this._clickByOverlay)
        document.removeEventListener('keydown',  this._closeByEscape)
    }

    setEventListeners(){
        const closeIconElement = this.popupElem.querySelector('.popup__close-button')
        closeIconElement.addEventListener('click', this.closePopup.bind(this))     
    }

    _closeByEscape(evt) {
        if (evt.key === 'Escape') {
    
             this.closePopup()
        }   
    }

    _clickByOverlay(evt) {
        if(evt.target.classList.contains('popup_opened')){

            this.closePopup();
        }  
    }
}