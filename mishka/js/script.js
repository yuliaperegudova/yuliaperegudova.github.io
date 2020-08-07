window.addEventListener("DOMContentLoaded", function () {
  let arrButtonsOrder = document.getElementsByClassName("js-btn-order");
  let elAddItemForm = document.getElementById("add-item");
  let elFirstItem;
  if (elAddItemForm)
    elFirstItem = elAddItemForm.querySelector(".modal__radio--selected");
  let elOverlay = document.querySelector(".overlay");
  let btnSubmit = document.querySelector(".js-submit");

  if (arrButtonsOrder && elAddItemForm && elFirstItem && elOverlay && btnSubmit)
    openModalWindow(arrButtonsOrder, elAddItemForm, elOverlay, elFirstItem, btnSubmit);

  let arrRadioButtons = document.querySelectorAll(".form-type__radio");
  if (arrRadioButtons)
    makeRadioButtonsAccessible(arrRadioButtons, "form-type__radio-indicator--selected", ".form-type__radio-indicator", false);

  let elMap = document.querySelector(".contacts__map-image-wrap");
  let elInteractiveMap = document.querySelector(".contacts__map");
  if (elMap && elInteractiveMap)
    initializeInteractiveMap(elMap, elInteractiveMap);

  let arrCheckboxes = document.querySelectorAll(".form-color__checkbox");
  if (arrCheckboxes)
    addListenersForCheckboxes(arrCheckboxes);

  let btnToggle = document.querySelector(".js-toggle-btn");
  let elNavigation = document.querySelector(".js-nav");
  hideNavigation(btnToggle, elNavigation);
  addListenerForMenuButton(btnToggle, elNavigation);
});

function addListenerForMenuButton(btnToggle, elNavigation) {
  btnToggle.addEventListener("click", function () {
    btnToggle.classList.toggle("header__toggle--close");
    elNavigation.classList.toggle("main-nav--hidden");
  });
}

function hideNavigation(btnToggle, elNavigation) {
  btnToggle.classList.add("header__toggle--show");
  elNavigation.classList.add("main-nav--hidden");
}

function addListenersForCheckboxes(arrCheckboxes) {
  for (let i = 0; i < arrCheckboxes.length; i++) {
    arrCheckboxes[i].addEventListener("keydown", function (evt) {
      if (evt.key === " ") {
        evt.preventDefault();
        changeCheckbox(arrCheckboxes[i], arrCheckboxes[i].querySelector("input"), arrCheckboxes[i].querySelector(".form-color__checkbox-indicator"));
      }
    });
    arrCheckboxes[i].addEventListener("click", function () {
      changeCheckbox(arrCheckboxes[i], arrCheckboxes[i].querySelector("input"), arrCheckboxes[i].querySelector(".form-color__checkbox-indicator"));
    });
  }
}

function changeCheckbox(checkbox, input, indicator) {
  switch (checkbox.getAttribute("aria-checked")) {
    case "true":
      checkbox.setAttribute("aria-checked", "false");
      input.removeAttribute("checked");
      indicator.classList.remove("form-color__checkbox-indicator--selected");
      break;
    case "false":
      checkbox.setAttribute("aria-checked", "true");
      input.setAttribute("checked", "checked");
      indicator.classList.add("form-color__checkbox-indicator--selected");
      break;
  }
}

function openModalWindow(arrButton, elModalWindow, elOverlay, elFirstItem, btnSubmit) {
  for (let i = 0; i < arrButton.length; i++) {
    arrButton[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      elModalWindow.classList.add("modal--show");
      elOverlay.classList.add("overlay--show");
      elFirstItem.focus();
    });
  }

  elOverlay.addEventListener("click", function () {
    elModalWindow.classList.remove("modal--show");
    elOverlay.classList.remove("overlay--show");
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      if (elModalWindow.classList.contains("modal--show")) {
        elModalWindow.classList.remove("modal--show");
        elOverlay.classList.remove("overlay--show");
      }
    }
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Enter") {
      btnSubmit.click();
    }
  });

  let arrSizes = elModalWindow.querySelectorAll(".modal__radio");
  makeRadioButtonsAccessible(arrSizes, "modal__radio--selected", ".modal__radio-indicator",  true)
}

function makeRadioButtonsAccessible(arrRadioButtons, classSelected, classIndicator, isModal) {
  for (let i = 0; i < arrRadioButtons.length; i++) {
    arrRadioButtons[i].addEventListener("keydown", function (evt) {
      let firstArrow, secondArrow;

      if (isModal) {
        firstArrow = "ArrowRight";
        secondArrow = "ArrowLeft";
      } else {
        firstArrow = "ArrowDown";
        secondArrow = "ArrowUp";
      }
      if (evt.key === firstArrow) {
        evt.preventDefault();
        if (i !== arrRadioButtons.length - 1) {
          changeCurrentRadioButton(arrRadioButtons[i], arrRadioButtons[i].querySelector("input"), classSelected, classIndicator, isModal);
          setFocusOnNextOrPreviousItem(arrRadioButtons[i + 1], arrRadioButtons[i + 1].querySelector("input"), classSelected, classIndicator, isModal);
        }
      }
      if (evt.key === secondArrow) {
        evt.preventDefault();
        if (i !== 0) {
          changeCurrentRadioButton(arrRadioButtons[i], arrRadioButtons[i].querySelector("input"), classSelected, classIndicator, isModal);
          setFocusOnNextOrPreviousItem(arrRadioButtons[i - 1], arrRadioButtons[i - 1].querySelector("input"), classSelected, classIndicator, isModal);
        }
      }
    });

    arrRadioButtons[i].addEventListener("click", function () {
      for (let j = 0; j < arrRadioButtons.length; j++) {
        arrRadioButtons[j].setAttribute("tabindex", "-1");
        arrRadioButtons[j].setAttribute("aria-checked", "false");
        if(isModal)
          arrRadioButtons[j].classList.remove(classSelected);
        else
          arrRadioButtons[j].querySelector(classIndicator).classList.remove(classSelected);
        arrRadioButtons[j].querySelector("input").removeAttribute("checked");
      }
      arrRadioButtons[i].setAttribute("tabindex", "0");
      arrRadioButtons[i].setAttribute("aria-checked", "true");
      if(isModal)
        arrRadioButtons[i].classList.add(classSelected);
      else
        arrRadioButtons[i].querySelector(classIndicator).classList.add(classSelected);
      arrRadioButtons[i].querySelector("input").setAttribute("checked", "checked");
    });
  }
}

function changeCurrentRadioButton(elRadioButton, elRadioInput, classSelected, classIndicator, isModal) {
  elRadioButton.setAttribute("tabindex", "-1");
  elRadioButton.setAttribute("aria-checked", "false");
  if(isModal)
    elRadioButton.classList.remove(classSelected);
  else
    elRadioButton.querySelector(classIndicator).classList.remove(classSelected);
  elRadioInput.removeAttribute("checked");
}

function setFocusOnNextOrPreviousItem(elNext, elRadioInput, classSelected, classIndicator, isModal) {
  elNext.setAttribute("tabindex", "0");
  elNext.setAttribute("aria-checked", "true");
  elNext.focus();
  if(isModal)
    elNext.classList.add(classSelected);
  else
    elNext.querySelector(classIndicator).classList.add(classSelected);
  elRadioInput.setAttribute("checked", "checked");
}

function initializeInteractiveMap(elMap, elInteractiveMap) {
  ymaps.ready(init);

  function init() {
    elMap.classList.toggle("contacts__map-image-wrap--hide");
    elInteractiveMap.classList.toggle("contacts__map--show");

    let myMap = new ymaps.Map("map", {
        center: [59.938900, 30.323100],
        zoom: 17,
        controls: []
      }, {
        searchControlProvider: "yandex#search"
      }),

      MyIconContentLayout = new ymaps.templateLayoutFactory.createClass(
        "<div style='color: #FFFFFF; font-weight: bold;'>$[properties.iconContent]</div>"
      ),

      myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
        hintContent: "",
        balloonContent: ""
      }, {
        iconLayout: "default#image",
        iconImageHref: "img/map-pin.svg",
        iconImageSize: [66, 100],
        iconImageOffset: [-20, -140]
      });

    myMap.geoObjects.add(myPlacemark);
  }
}
