import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup(name, url){
        const cardImage      = this.popupElem.querySelector('.popup__card-image');
        const popupParagraph = this.popupElem.querySelector('.popup__paragraph');
        popupParagraph.textContent = name
        cardImage.src = url
        document.addEventListener('click', this._clickByOverlay.bind(this))
        document.addEventListener('keyup', this._closeByEscape.bind(this))
        this.popupElem.classList.add('popup_opened');
    }
}