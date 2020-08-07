var button = document.querySelector(".search-modal-button");
var popup = document.querySelector(".search-form");
var checkIn = document.querySelector("[name=date-check-in]");

var showForm = function() {
    popup.classList.remove("search-form--hide");
    popup.classList.add("search-form--show");
    setTimeout(function() {
        checkIn.focus();
    }, 300);
};

var hideForm = function() {
    popup.classList.remove("search-form--show");
    popup.classList.add("search-form--hide");
};

button.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (popup.classList.contains("search-form--hide")) {
        showForm();
    } else {
        hideForm();
    }
});

//  ***************************  Плюсики и минусики ***********************

var fieldWrappers = document.querySelectorAll('.inner-wrapper');

for (var i = 0; i < fieldWrappers.length; i++) {
    fieldWrappers[i].addEventListener('click', function(evt) {
        if (evt.target.classList.contains('button-minus')) {
            evt.preventDefault();
            var button = evt.target;
            var field = button.parentNode.querySelector('input');
            if (field.value > 0) {
                field.value = Number(field.value) - 1;
            }
        } else if (evt.target.classList.contains('button-plus')) {
            evt.preventDefault();
            var button = evt.target;
            var field = button.parentNode.querySelector('input');
            field.value = Number(field.value) + 1;
        }
    });
};
