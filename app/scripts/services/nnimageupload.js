'use strict';

/**
 * @ngdoc service
 * @name nightlynachosApp.nnImageUpload
 * @description
 * # nnImageUpload
 * Service in the nightlynachosApp.
 */
angular.module('nightlynachosApp')
  .service('nnImageUpload', function () {

    var self = this;

    this.upload = function (e, user, category) {

      var tgt = e.target || window.event.srcElement,
          files = tgt.files,
          fileReader;

      if (FileReader && files && files.length) {
          fileReader = new FileReader();
          fileReader.onload = function () {

              self.loadedFile = {
                name: files[0].name,
                img:  fileReader.result,
                user: user,
                category: category,
              }
          }
          fileReader.readAsDataURL(files[0]);
      } else {
          alert('Real nacho lovers use modern browsers. You will not be able to upload images unless you upgrade your browser.');
      }
    };


  });
