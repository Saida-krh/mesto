export class Card {
    constructor (cardItem, openPopup){
        this._cardImage      = document.querySelector('.popup__card-image');
        this._cardTemplate   = document.querySelector('#card-template').content;
        this._popupParagraph = document.querySelector('.popup__paragraph');
        this._name = cardItem.name;
        this._url  = cardItem.link;
        this._openPopup = openPopup
    };
    
    createCard() {
        const cardElement = this._cardTemplate.cloneNode(true);
        const img = cardElement.querySelector('.card__image')
        const text = cardElement.querySelector('.card__text')
        const trash = cardElement.querySelector('.card__trash')
        const like = cardElement.querySelector('.card__like')
    
    
        img.src = this._url;
        img.alt = this._name;
        text.textContent = this._name;
    
        img.addEventListener('click', (evt) => this._openPopupImage(evt))
        like.addEventListener('click', (evt) => this._handleLikeToggle(evt))
        trash.addEventListener('click', (evt) => this._handleDeleteCard(evt))

        return cardElement;
    };


    _saveImageData(evt) {
        evt.preventDefault();  
    
        const cardItemData = {
            name : inputName.value,
            link : inputLink.value
        }
    
        prependCard(cardItemData, cardsSection )
    
        inputName.value = ''
        inputLink.value = ''
        validateOnClosePopup(popupAdd, popupSelectors)
        closePopup(popupAdd)
    };
    
    _openPopupImage (evt) {
        const popupImage = document.querySelector('#popup_image');

        this._cardImage.src = evt.target.src
        this._cardImage.alt = evt.target.alt
        this._popupParagraph.textContent = evt.target.alt
        this._openPopup(popupImage)
    }
    
    _handleLikeToggle (evt) {
        evt.target.classList.toggle('card__like_active')
    }
    _handleDeleteCard (evt) {
        evt.target.closest('.card').remove()
    }
 
};
