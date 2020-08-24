var menuOpen = document.querySelector('.main-nav__toggle');
var menuList = document.querySelector('.main-nav__list-wrapper');
var menuClosed = document.querySelector('.nav-closed');
var nextButton = document.querySelector('.button-next');
var logo = document.querySelector('.main-nav__logo');
var whiteLogo = document.querySelector('.main-nav__logo-white');
var pageCounter = 3;
var listItems = document.querySelectorAll('.site-list__item');

menuOpen.addEventListener('click', function() {
    menuList.classList.toggle('visually-hidden');
    menuOpen.classList.add('visually-hidden');
});

menuClosed.addEventListener('click', function() {
    menuList.classList.toggle('visually-hidden');
    menuOpen.classList.remove('visually-hidden');
});

nextButton.addEventListener('click', function() {
    var newPage = 0;
    if(pageCounter < 11) { 
        nextButton.href = "#" + pageCounter;
        newPage = pageCounter + 1;
        pageCounter = newPage;
        console.log(pageCounter)
    } else {
        nextButton.href = "#10";
    }

    if(pageCounter === 8) {
        logo.classList.add('visually-hidden');
        whiteLogo.classList.remove('visually-hidden');
    } else {
        logo.classList.remove('visually-hidden');
        whiteLogo.classList.add('visually-hidden');
    }
});

listItems.forEach( function(item) {
    item.addEventListener('click', function() {
        menuList.classList.add('visually-hidden');
        menuOpen.classList.remove('visually-hidden');
    })
});

