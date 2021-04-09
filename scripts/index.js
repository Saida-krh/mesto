const openPopupClassName = 'popup_opened';

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const formEditElement = document.querySelector('form[name="form-edit"]');
const formAddElement = document.querySelector('form[name="form-add"]');


const inputTitle = document.querySelector('#title');
const inputSubTitle = document.querySelector('#subtitle');
const inputName = document.querySelector('#name');
const inputLink = document.querySelector('#link');


const popupEdit = document.querySelector('#popup_edit');
const popupAdd = document.querySelector('#popup_add');
const popupImage = document.querySelector('#popup_image');

const closePopupEdit = popupEdit.querySelector('.popup__close-button');
const closePopupAdd = popupAdd.querySelector('.popup__close-button');
const closePopupImage = popupImage.querySelector('.popup__close-button');

const popupParagraph = document.querySelector('.popup__paragraph');

const cardImage = document.querySelector('.popup__card-image');


const cardTemplate = document.querySelector('#card-template').content;
const cardsSection = document.querySelector('.cards'); 

const addButoon = document.querySelector('.profile__add-button')
const editButoon = document.querySelector('.profile__edit-button')

initialCards.forEach((item) => {
    renderCardEnd(item, cardsSection)
  })
  
const openPopup = (popupElem) => {
    popupElem.classList.add(openPopupClassName);
}

const closePopup = (popupElem) => {
    popupElem.classList.remove(openPopupClassName);
}

function openEditPopup(){
    inputTitle.value = title.textContent;
    inputSubTitle.value = subtitle.textContent;
    openPopup(popupEdit)
}

function saveEditableData(evt){
    evt.preventDefault();

    title.textContent = inputTitle.value;
    subtitle.textContent = inputSubTitle.value;
    closePopup(popupEdit)
}

function saveImageData(evt){
    evt.preventDefault();  

    const cardItemData = {
        name : inputName.value,
        link : inputLink.value
    }

    renderCardStart(cardItemData, cardsSection )

    inputName.value = ''
    inputLink.value = ''
    closePopup(popupAdd)
}

function openPopupImage (evt){
    cardImage.src = evt.target.src
    popupParagraph.textContent = evt.target.alt
    openPopup(popupImage)
}

function addCard(item) {
    const cardElement = cardTemplate.cloneNode(true);
    const img = cardElement.querySelector('.card__image')
    const text = cardElement.querySelector('.card__text')
    const trash = cardElement.querySelector('.card__trash')
    const like = cardElement.querySelector('.card__like')


    img.src = item.link;
    img.alt = item.name;
    text.textContent = item.name;

    img.addEventListener('click', openPopupImage)
    like.addEventListener('click', handleLikeToggle)
    trash.addEventListener('click', handleDeleteCard)
      
    return cardElement;

};

function renderCardEnd (item, wrap) {
    wrap.append(addCard(item));
}


function renderCardStart (item, wrap) {
    wrap.prepend(addCard(item));
}

function handleLikeToggle (evt) {
    evt.target.classList.toggle('card__like_active')
}

function handleDeleteCard (evt) {
    evt.target.closest('.card').remove()

}


formEditElement.addEventListener('submit', saveEditableData);
formAddElement.addEventListener('submit', saveImageData);


addButoon.addEventListener('click', ()=>  openPopup(popupAdd))
editButoon.addEventListener('click', openEditPopup)

closePopupEdit.addEventListener('click', () =>closePopup(popupEdit));

closePopupAdd.addEventListener('click', () =>closePopup(popupAdd));

closePopupImage.addEventListener('click', () =>closePopup(popupImage));
