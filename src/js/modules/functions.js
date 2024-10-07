export function isWebp() {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(function (support) {
    let className = support == true ? 'webp' : 'no-webp';
    document.querySelector('html').classList.add(className);
  });
}

export function toggleMobileMenu(e) {
  e.preventDefault();
  const menu = document.querySelector('.menu__wrapper');
  const btnInner = document.querySelector('.menu__trigger-icon');
  const body = document.querySelector('body');
  menu.classList.toggle('menu__wrapper--active');
  btnInner.classList.toggle('menu__trigger-icon--active');
  body.classList.toggle('locked');
}

export function tabs(btnClass, itemClass, activeModifire) {
  const btns = document.querySelectorAll(`.${btnClass}`);
  const items = document.querySelectorAll(`.${itemClass}`);

  function showContent(i = 0) {
    btns[i].classList.add(`${btnClass}--${activeModifire}`);
    items[i].classList.add(`${itemClass}--${activeModifire}`);
  }
  function hideContent() {
    items.forEach((item) => {
      item.classList.remove(`${itemClass}--${activeModifire}`);
    });
    btns.forEach((btn) => {
      btn.classList.remove(`${btnClass}--${activeModifire}`);
    });
  }

  hideContent();
  showContent();

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      hideContent();
      showContent(i);
    });
  });
}

export function accordion() {
  const items = document.querySelectorAll('.accordion__item');
  for (const item of items) {
    const trigger = item.querySelector('.accordion__trigger');
    const content = item.querySelector('.accordion__content');
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.classList.contains('accordion__item--active')) {
        item.classList.remove('accordion__item--active');
        trigger.ariaExpanded = false;
        content.style.maxHeight = 0;
      } else {
        for (const item of items) {
          item.classList.remove('accordion__item--active');
          item.querySelector('.accordion__trigger').ariaExpanded = false;
          item.querySelector('.accordion__content').style.maxHeight = 0;
        }
        item.classList.add('accordion__item--active');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (item.parentNode.parentNode.classList.contains('accordion__content')) {
          item.parentNode.parentNode.style.maxHeight = item.parentNode.parentNode.scrollHeight + content.scrollHeight + 'px';
        }
        trigger.ariaExpanded = true;
      }
    });
  }
}

export function bindModal(trigger, modal, close, content = false) {
  trigger = document.querySelectorAll(trigger);
  modal = document.querySelector(modal);
  close = document.querySelectorAll(close);

  // var openModalFunc = openModal(modal);
  const body = document.body;
  if (trigger != null) {
    trigger.forEach((trig) => {
      var openModalFunc = openModal(modal, content, trig);
      trig.addEventListener('click', openModalFunc, false);
    });
  }
  close.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      body.classList.remove('locked');
    });
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      body.classList.remove('locked');
    }
  });
}

const openModal = function (modal, content, trig) {
  return function () {
    if (content) {
      modal.querySelector('.modal__title').innerHTML = trig.innerHTML;
      modal.querySelector('.modal__body').innerHTML = trig.parentNode.querySelector('.why-us__info').innerHTML;
    }
    event.preventDefault();
    modal.style.display = 'flex';
    document.body.classList.add('locked');
  };
};

export function unbindModal(trigger, form) {
  trigger = document.querySelector(trigger);
  form = document.querySelector(form);

  const body = document.body;
  if (trigger != null) {
    const newBtn = trigger.cloneNode(true);
    form.removeChild(trigger);
    form.appendChild(newBtn);
  }
}
