const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const openPopupClassName = 'popup_opened';
const closeButton = document.querySelector('.popup__close-button');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__content');

const inputTitle = document.querySelector('.js-title');
const inputSubTitle = document.querySelector('.js-subtitle');


function popupToggler(){
    popup.classList.toggle(openPopupClassName) 
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', popupToggler);

function openPopup(){
    popupToggler()
    inputTitle.value = title.textContent;
    inputSubTitle.value = subtitle.textContent;
}

function savePopupData(evt){
    popupToggler()
    title.textContent = inputTitle.value;
    subtitle.textContent = inputSubTitle.value;
    evt.preventDefault();
}

formElement.addEventListener('submit', savePopupData);

