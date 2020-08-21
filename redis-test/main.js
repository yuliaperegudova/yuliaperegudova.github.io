var menuOpen = document.querySelector('.main-nav__toggle');
var menuList = document.querySelector('.main-nav__list-wrapper');
var menuClosed = document.querySelector('.nav-closed');
var nextButton = document.querySelector('.button-next');
var pageCounter = 3;

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
});

