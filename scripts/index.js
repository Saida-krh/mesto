const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const openPopupClassName = 'popup_opened';
const closeButton = document.querySelector('.popup__close-button');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__content');

const inputTitle = document.getElementById('title');
const inputSubTitle = document.getElementById('subtitle');

const saveButton = document.querySelector('.popup__button')

function popupToggler(){
    popup.classList.toggle(openPopupClassName) 
}

editButton.addEventListener('click', function(){
    openPopup()
});

closeButton.addEventListener('click', function(){
    popupToggler()
});

function openPopup(){
    popupToggler()
    inputTitle.value = title.textContent;
    inputSubTitle.value = subtitle.textContent;
}

    // saveButton.addEventListener('click', function(){
    //     savePopupData()
    // });

function savePopupData(){
    popupToggler()
    title.textContent = inputTitle.value;
    subtitle.textContent = inputSubTitle.value;
}

formElement.addEventListener('submit', function(evt) {
    savePopupData()
    evt.preventDefault();
});


console.log('Popup', popup)

