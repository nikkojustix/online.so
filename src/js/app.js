import * as flsFunctions from './modules/functions.js';
import { Splide } from '@splidejs/splide';

import IMask from 'imask';
import fslightbox from 'fslightbox';

flsFunctions.isWebp();

const burgerBtn = document.querySelector('.menu-trigger');
const menu = document.querySelector('.menu');
burgerBtn.addEventListener('click', (e) => {
  burgerBtn.classList.toggle('menu-trigger--is-open');
  menu.classList.toggle('menu--is-open');
  document.body.classList.toggle('locked');

  menu.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target == menu || e.target.classList.contains('menu__link')) {
      burgerBtn.classList.remove('menu-trigger--is-open');
      menu.classList.remove('menu--is-open');
      document.body.classList.remove('locked');
    }
  });
});

const elements = document.querySelectorAll('.form__input--tel');
const maskOptions = {
  mask: '+{7} (000) 000-00-00',
};
elements.forEach((element) => {
  const mask = IMask(element, maskOptions);
});

// document.querySelector('.current-year').innerHTML = new Date().getFullYear();

if (document.querySelector('.special-offers__slider')) {
  const specialSlider = new Splide('.special-offers__slider', {
    type: 'loop',
    perPage: 1,
    // height: '300px',
    arrows: false,
  });
  specialSlider.mount();
}

if (document.querySelector('.teachers__slider')) {
  const specialSlider = new Splide('.teachers__slider', {
    type: 'loop',
    perPage: 4,
    // fixedWidth: '323px',
    gap: '30px',
    arrows: false,
    breakpoints: {
      1299: {
        perPage: 3,
      },
      999: {
        perPage: 2,
      },
      767: {
        perPage: 1,
      },
    },
  });
  specialSlider.mount();
}

const filterTrigger = document.querySelector('.filter__trigger-btn');
const filterItems = document.querySelector('.filter__items');
const filterClose = document.querySelector('.filter__items-close');
if (filterTrigger) {
  filterTrigger.addEventListener('click', () => {
    filterItems.classList.add('filter__items--active');
    document.body.classList.add('locked');
  });
  filterClose.addEventListener('click', () => {
    filterItems.classList.remove('filter__items--active');
    document.body.classList.remove('locked');
  });
}

// scroll to top
const scrollBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    scrollBtn.style.visibility = 'visible';
    scrollBtn.style.opacity = '1';
  } else {
    scrollBtn.style.visibility = 'hidden';
    scrollBtn.style.opacity = '0';
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

if (document.querySelector('.tabs') != null) {
  flsFunctions.tabs('tabs__btn', 'tabs__item', 'active');
}

flsFunctions.accordion();

flsFunctions.bindModal('.why-us__btn', '.modal--why-us', '.modal__close', true);

// flsFunctions.bindModal('.open-modal-order', '.modal--order', '.modal__close');
