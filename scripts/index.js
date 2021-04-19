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

const popupParagraph = document.querySelector('.popup__paragraph');

const cardImage = document.querySelector('.popup__card-image');

const closePopupEdit = popupEdit.querySelector('.popup__close-button');
const closePopupAdd = popupAdd.querySelector('.popup__close-button');
const closePopupImage = popupImage.querySelector('.popup__close-button');

const cardTemplate = document.querySelector('#card-template').content;
const cardsSection = document.querySelector('.cards'); 

const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button')

let openedPoupElem = {}

initialCards.forEach((item) => {
    appendCard(item, cardsSection)
  })
  
const openPopup = (popupElem) => {
    popupElem.classList.add(openPopupClassName);
    document.addEventListener('click', clickClosePopup)
    document.addEventListener('keydown', keyClosePopup)
    openedPoupElem = popupElem
}

const closePopup = (popupElem) => {
    popupElem.classList.remove(openPopupClassName);
    document.removeEventListener('click',  clickClosePopup)
    document.removeEventListener('keydown',  keyClosePopup)
    clearPopupInputs(popupElem)
}

function openEditPopup(){
    inputTitle.value = title.textContent;
    inputSubTitle.value = subtitle.textContent;
    validateOnOpenPopup(popupEdit, popupSelectors)
    openPopup(popupEdit)
}

function openAddCardPopup(){
    openPopup(popupAdd)
}

function submitEditProfileForm(evt){
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

    prependCard(cardItemData, cardsSection )

    inputName.value = ''
    inputLink.value = ''
    validateOnClosePopup(popupAdd, popupSelectors)
    closePopup(popupAdd)
}

function openPopupImage (evt){
    cardImage.src = evt.target.src
    cardImage.alt = evt.target.alt
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

function appendCard (item, wrap) {
    wrap.append(addCard(item));
}


function prependCard (item, wrap) {
    wrap.prepend(addCard(item));
}

function handleLikeToggle (evt) {
    evt.target.classList.toggle('card__like_active')
}

function handleDeleteCard (evt) {
    evt.target.closest('.card').remove()

}

const initOpenAndSaveListners = () => {
    formEditElement.addEventListener('submit', submitEditProfileForm);
    formAddElement.addEventListener('submit', saveImageData);
    editButton.addEventListener('click', openEditPopup)
    addButton.addEventListener('click', openAddCardPopup)

    closePopupEdit.addEventListener('click', () =>closePopup(popupEdit));
    closePopupAdd.addEventListener('click', () =>closePopup(popupAdd));
    closePopupImage.addEventListener('click', () =>closePopup(popupImage));
}

function clickClosePopup(evt) {
    if(evt.target.classList.contains('popup_opened')){
        closePopup(openedPoupElem)
    }   
}

function keyClosePopup(evt) {
    if (evt.key === 'Escape') {
        closePopup(openedPoupElem)
    }   
}

const validateOnOpenPopup = (popupFormElement, selectorSettingsList) =>{
    const popupInputList = Array.from(popupFormElement.querySelectorAll(selectorSettingsList.inputSelector));
    popupInputList.forEach((popupInput) => {
        checkInputValidity(popupFormElement, popupInput,  selectorSettingsList);
    })
    
}

const validateOnClosePopup = (popupFormElement, selectorSettingsList) =>{
    const popupInputList = Array.from(popupFormElement.querySelectorAll(selectorSettingsList.inputSelector));
    const submitButtonSelector = popupFormElement.querySelector(selectorSettingsList.submitButtonSelector);
        toggleButtonState(popupInputList, submitButtonSelector);
}

const clearPopupInputs = (popupFormElement) => {
    const popupInputs = Array.from(popupFormElement.querySelectorAll('.popup__input'));
    popupInputs.forEach((popupInput) => {
        popupInput.value = ''
        hideInputError(popupFormElement, popupInput, popupSelectors)
    })
};


initOpenAndSaveListners()