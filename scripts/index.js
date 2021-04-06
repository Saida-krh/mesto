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
const cardLike = document.querySelector('.card__like');


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

initialCards.forEach(function (item) {
    addCard(item.name, item.link)
  })
  

  
function popupToggler(type){
    
    if(type === 'add'){
        popupAdd.classList.toggle(openPopupClassName);
        return;
    }

    if(type === 'image') {
        popupImage.classList.toggle(openPopupClassName);
        return;
    }

    popupEdit.classList.toggle(openPopupClassName);    
}


function closeModal(evt){
const modalId = evt.target.parentNode.parentNode.id;
const modalType = modalId.split('_')[1];
  popupToggler(modalType)
}

function openEditPopup(){
    popupToggler('edit')
    inputTitle.value = title.textContent;
    inputSubTitle.value = subtitle.textContent;
}

function openAddPopup(){
    popupToggler('add')
}

function openImagePopup(){
    popupToggler('image')    
}

function savePopupData(evt){
    popupToggler()
    title.textContent = inputTitle.value;
    subtitle.textContent = inputSubTitle.value;
    evt.preventDefault();
}



function saveImageData(evt){
    popupToggler('add')
    const nameValue = inputName.value;
    const linkValue = inputLink.value;
    addCard(nameValue, linkValue, true)
    evt.preventDefault();      
}

function addCard(name, link, modalAdd) {
    const cardsSection = document.querySelector('.cards');
    const cardElement  = `<article class="card">
        <img src="${link}" alt="${name}" class="card__image">
        <button class="card__trash" type="button"></button>
        <div class="card__content">
            <h2 class="card__text">${name}</h2>
            <button class="card__like" type="button"></button>
        </div>
        </article>`;

    let sortableType = 'beforeend';

    if(modalAdd) {
        sortableType = 'afterbegin'
    }

    cardsSection.insertAdjacentHTML(sortableType, cardElement);
};

formEditElement.addEventListener('submit', savePopupData);
formAddElement.addEventListener('submit', saveImageData);


document.addEventListener('click', function(evt) {

    if(evt.target.classList.contains('card__like')) {
        evt.target.classList.toggle('card__like_active');
    }

    if(evt.target.classList.contains('card__image')){
        popupToggler('image')
        cardImage.src = evt.target.src
        popupParagraph.textContent = evt.target.alt
    }

    if(evt.target.classList.contains('card__trash')) {
        evt.target.parentNode.remove()
    }

    if(evt.target.classList.contains('profile__add-button')){
        openEditPopup()
    }

    if(evt.target.classList.contains('profile__edit-button')){
        openAddPopup()
    }

    if(evt.target.classList.contains('popup__close-button')){
        closeModal(evt)
    }

});




