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

const cardsSection = document.querySelector('.cards'); 

const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button')

import {Card} from './card.js';
import {FormValidator} from './FormValidator.js'
import {popupSelectors} from './data.js'

 
const appendCard  = (wrap, cardElem) =>  {
    wrap.append(cardElem);
}


const prependCard =  (wrap, cardElem) =>  {
    wrap.prepend(cardElem);
};

const openPopup = (popupElem) => {
    popupElem.classList.add(openPopupClassName);
    document.addEventListener('click', clickClosePopup)
    document.addEventListener('keydown', keyClosePopup)
    const validator = new FormValidator(popupSelectors, popupElem)
    validator.enableValidation()
 
}

initialCards.forEach((item) => {
    const card = new Card(item, openPopup)
    appendCard(cardsSection, card.createCard())
  })
  
const closePopup = (popupElem) => {
    popupElem.classList.remove(openPopupClassName);
    document.removeEventListener('click',  clickClosePopup)
    document.removeEventListener('keydown',  keyClosePopup)
 
}

function openEditPopup(){
    inputTitle.value = title.textContent;
    inputSubTitle.value = subtitle.textContent;
    openPopup(popupEdit)
}

function openAddCardPopup(){
    openPopup(popupAdd)
    clearPopupInputs(popupAdd) 
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

    const card = new Card(cardItemData, openPopup)

    prependCard(cardsSection, card.createCard())

    inputName.value = ''
    inputLink.value = ''
    closePopup(popupAdd)
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
    const openedPoupElem =  document.querySelector('.popup_opened')

    if(evt.target.classList.contains('popup_opened')){
        closePopup(openedPoupElem)
    }   
}

function keyClosePopup(evt) {
    const openedPoupElem = document.querySelector('.popup_opened')

    if (evt.key === 'Escape') {
        closePopup(openedPoupElem)
    }   
}

const clearPopupInputs = (popupFormElement) => {
    const popupInputs = Array.from(popupFormElement.querySelectorAll('.popup__input'));
    popupInputs.forEach((popupInput) => {
        popupInput.value = ''
    })
};


initOpenAndSaveListners()