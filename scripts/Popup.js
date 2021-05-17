export class Popup {
    constructor(popupSelector){
        this.popupElem = document.querySelector(popupSelector) 
    }

    openPopup () {
        document.addEventListener('click', this._clickByOverlay.bind(this))
        document.addEventListener('keyup', this._closeByEscape.bind(this))
        this.popupElem.classList.add('popup_opened');
    }

    closePopup () {
        console.log('close', this.popupElem);
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