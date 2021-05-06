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

const addButton    = document.querySelector('.profile__add-button')
const editButton   = document.querySelector('.profile__edit-button')
const cardTemplate = document.querySelector('#card-template').content;

const cardImage      = document.querySelector('.popup__card-image');
const popupParagraph = document.querySelector('.popup__paragraph');

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'
import {popupSelectors} from './data.js'


const addPopupValidator = new FormValidator(popupSelectors, formAddElement)
addPopupValidator.enableValidation()

const editPopupValidator = new FormValidator(popupSelectors, formEditElement)
editPopupValidator.enableValidation()
 
const appendCard  = (wrap, cardElem) =>  {
    wrap.append(cardElem);
}


const prependCard =  (wrap, cardElem) =>  {
    wrap.prepend(cardElem);
};

const openPopup = (popupElem) => {
    document.addEventListener('click', clickClosePopup)
    document.addEventListener('keyup', keyClosePopup)
    popupElem.classList.add(openPopupClassName);
}

const localCreateCard = (item) => {
    return new Card(item, handleCardClick, cardTemplate).createCard()
}

const initFirstPoolCards = () => {
    initialCards.forEach((item) => {
        appendCard(cardsSection, localCreateCard(item))
    })
}

  
const closePopup = (popupElem) => {
    popupElem.classList.remove(openPopupClassName);
    document.removeEventListener('click',  clickClosePopup)
    document.removeEventListener('keydown',  keyClosePopup)
 
}

function openEditPopup(){
    inputTitle.value = title.textContent;
    inputSubTitle.value = subtitle.textContent;
    openPopup(popupEdit)
    editPopupValidator.resetValidation()
}

function openAddCardPopup(){
    openPopup(popupAdd)
    formAddElement.reset()
    addPopupValidator.resetValidation()
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

    prependCard(cardsSection, localCreateCard(cardItemData))

    formAddElement.reset()
    closePopup(popupAdd)
}
const handleCardClick = (name, url) => {
    cardImage.src = url
    popupParagraph.textContent = name
    openPopup(popupImage)
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
            closePopup(evt.target)
        }  
}

function keyClosePopup(evt) {
    if (evt.key === 'Escape') {

    const openedPoupElem = document.querySelector('.popup_opened')

    closePopup(openedPoupElem)
    }   
}


initFirstPoolCards()
initOpenAndSaveListners()