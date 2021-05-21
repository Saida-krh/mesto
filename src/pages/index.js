import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js'
import {popupSelectors} from '../scripts/data.js'
import {Section} from '../scripts/components/Section.js'
import {initialCards} from '../scripts/initial-cards.js'
import {PopupWithForm} from '../scripts/components/PopupWithForm.js'
import {PopupWithImage} from '../scripts/components/PopupWithImage.js'
import {UserInfo} from '../scripts/components/UserInfo.js'
import '../pages/index.css'; 

const formEditElement = document.querySelector('form[name="form-edit"]');
const formAddElement = document.querySelector('form[name="form-add"]');

const inputTitle = document.querySelector('#title');
const inputSubTitle = document.querySelector('#subtitle');
const inputName = document.querySelector('#name');
const inputLink = document.querySelector('#link');

const addButton    = document.querySelector('.profile__add-button')
const editButton   = document.querySelector('.profile__edit-button')
const cardTemplate = document.querySelector('#card-template').content;

const addPopupValidator = new FormValidator(popupSelectors, formAddElement)
addPopupValidator.enableValidation()

const editPopupValidator = new FormValidator(popupSelectors, formEditElement)
editPopupValidator.enableValidation()

const renderer = (item) => {
    return new Card(item, handleCardClick, cardTemplate).createCard()
}

const initCards =  new Section({ items: initialCards, renderer}, '.cards')

const user = new UserInfo('.profile__title', '.profile__subtitle')
 
const submitEditProfileForm = (evt, inputData) =>{
    evt.preventDefault();
    user.setUserInfo(inputData)
    popupEdit.closePopup()
}

const submitImageForm = (evt, inputData) =>{
    evt.preventDefault();  
   
    initCards.addItem(inputData, 'prepend')
    popupAdd.closePopup()
}

const popupEdit = new PopupWithForm('#popup_edit', submitEditProfileForm);
const popupAdd = new PopupWithForm('#popup_add', submitImageForm);
const popupImage = new PopupWithImage('#popup_image');

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

const handleCardClick = (name, url) => {
    popupImage.openPopup(name, url) 
}

const openEditPopup = () =>{
  const {title, subtitle} =  user.getUserInfo()

    inputTitle.value = title;
    inputSubTitle.value = subtitle;

    popupEdit.openPopup()
    editPopupValidator.resetValidation()
}

const openAddCardPopup = () =>{
    popupAdd.openPopup()
    addPopupValidator.resetValidation()
}


const initListners = () => {
    editButton.addEventListener('click', openEditPopup)
    addButton.addEventListener('click', openAddCardPopup)
}


initCards.rendereItems()

initListners()
