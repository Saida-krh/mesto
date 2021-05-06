export class Card {
    constructor (cardItem, handleCardClick, cardTemplate){
        this._cardElement = cardTemplate.cloneNode(true);
        this._img         = this._cardElement.querySelector('.card__image')
        this._text        = this._cardElement.querySelector('.card__text')
        this._trash       = this._cardElement.querySelector('.card__trash')
        this._like        = this._cardElement.querySelector('.card__like')


        this._name = cardItem.name;
        this._url  = cardItem.link;
        this._handleCardClick = handleCardClick
    };
    
    createCard() {
        this._img.src = this._url;
        this._img.alt = this._name;
        this._text.textContent = this._name;

        this._setEventListeners()

        return this._cardElement;
    };

    _setEventListeners() {
        this._img.addEventListener('click', () => this._handleCardClick(this._name, this._url))
        this._like .addEventListener('click', (evt) => this._handleLikeToggle(evt))
        this._trash.addEventListener('click', (evt) => this._handleDeleteCard(evt))
    }
    
    _handleLikeToggle (evt) {
        evt.target.classList.toggle('card__like_active')
    }

    _handleDeleteCard (evt) {
        evt.target.closest('.card').remove()
    }
 
};
