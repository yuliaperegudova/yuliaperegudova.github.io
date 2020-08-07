'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var createPhoto = function () {
    var photoPreviewImg = document.createElement('img');
    photoPreviewImg.width = 40;
    photoPreviewImg.height = 44;
    photoPreviewImg.alt = 'Фото жилья';
    photoPreview.appendChild(photoPreviewImg);

    return photoPreviewImg;
  };

  var uploadPhoto = function (fileChooser, element) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        element.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarChange = function () {
    uploadPhoto(avatarChooser, avatarPreview);
  };
  var onPhotoChange = function () {
    uploadPhoto(photoChooser, createPhoto());
  };

  avatarChooser.addEventListener('change', onAvatarChange);
  photoChooser.addEventListener('change', onPhotoChange);
})();
