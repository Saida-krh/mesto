import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._cardImage      = this.popupElem.querySelector('.popup__card-image');
        this._popupParagraph = this.popupElem.querySelector('.popup__paragraph');

    }

    openPopup(name, url){
        super.openPopup()
        this._popupParagraph.textContent = name
        this._cardImage.src = url
        this.popupElem.classList.add('popup_opened');
    }
}