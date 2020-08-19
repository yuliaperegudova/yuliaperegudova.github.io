const toggle = document.querySelector('.main-nav__toggle');
const menuList = document.querySelector('.main-nav__list-wrapper');

toggle.addEventListener('click', function() {
    menuList.classList.toggle('visually-hidden');
});
