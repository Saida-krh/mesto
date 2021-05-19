import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js'
import {popupSelectors} from './data.js'
import {Section} from './components/Section.js'
import {initialCards} from './initial-cards.js'
import {PopupWithForm} from './components/PopupWithForm.js'
import {PopupWithImage} from './components/PopupWithImage.js'
import {UserInfo} from './components/UserInfo.js'
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

const User = new UserInfo('.profile__title', '.profile__subtitle')
 
const submitEditProfileForm = (evt) =>{
    evt.preventDefault();
    User.setUserInfo(inputTitle.value, inputSubTitle.value)
    popupEdit.closePopup()
}

const submitImageForm = (evt) =>{
    evt.preventDefault();  

    const cardItemData = {
        name : inputName.value,
        link : inputLink.value
    }

    initCards.addItem(cardItemData, 'prepend')
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
  const {title, subtitle} =  User.getUserInfo()

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
