const menuOpen = document.querySelector('.main-nav__toggle');
const menuList = document.querySelector('.main-nav__list-wrapper');
const menuClosed = document.querySelector('.nav-closed');
const nextButton = document.querySelector('.button-next');

menuOpen.addEventListener('click', function() {
    menuList.classList.toggle('visually-hidden');
    menuOpen.classList.add('visually-hidden');
});

menuClosed.addEventListener('click', function() {
    menuList.classList.toggle('visually-hidden');
    menuOpen.classList.remove('visually-hidden');
});

