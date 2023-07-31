import '../css/style.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const notifyWarning = {
  width: '500px',
  fontSize: '25px',
  position: 'center-top',
  opacity: 0.7,
  timeout: 1500,
};

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectors = {
  select: document.querySelector('.breed-select'),
  animalCard: document.querySelector('.cat-info'),
  loaderWait: document.querySelector('.loader'),
  alertError: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

selectors.loaderWait.classList.add('is-hidden');
selectors.alertError.classList.add('is-hidden');

fetchBreeds()
  .then(breeds => {
    toggleShowLoadListSelection();
    markupSelect(breeds);
  })
  .catch(() => onShowError())
  .finally(() => toggleShowLoadListSelection());
return selectors.select.addEventListener('change', onChoiceAnimal);

function markupSelect(items) {
  const markup = items
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
  selectors.select.insertAdjacentHTML(
    'afterbegin',
    `<option data-placeholder="true"></option>`
  );
  selectors.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '.breed-select',
    settings: {
      placeholderText: 'Choose breed of cat',
    },
  });
  return;
}

function onChoiceAnimal(e) {
  const breed_ids = event.target.value;
  // console.log('breed_ids: ', breed_ids);
  selectors.animalCard.innerHTML = '';
  toggleShowLoadCatInfo();
  return fetchCatByBreed(breed_ids)
    .then(res => {
      markupCatsCard(...res);
    })
    .catch(() => onShowError())
    .finally(() => toggleShowLoadCatInfo());
}

function markupCatsCard(cat) {
  const markup = `<img src="${cat.url}" alt='cat' width=500><div class="cat-description">
    <p class='cat-titles'> ${cat.breeds[0].name}</p>
    <p> ${cat.breeds[0].description} </p>
    <p><span class='cat-temperament'>Temperament:</span> ${cat.breeds[0].temperament}</p></div>`;
  selectors.animalCard.innerHTML = markup;
}

function toggleShowLoadListSelection() {
  selectors.loaderWait.classList.toggle('is-hidden');
  selectors.select.classList.toggle('is-hidden');
}

function toggleShowLoadCatInfo() {
  selectors.loaderWait.classList.toggle('is-hidden');
  selectors.catInfo.classList.toggle('is-hidden');
}

function onShowError() {
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    notifyWarning
  );
}
