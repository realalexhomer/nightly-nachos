'use strict';

/**
 * @ngdoc directive
 * @name nightlynachosApp.directive:nnFileUpload
 * @description
 * # nnFileUpload
 */

// why does angular have to be so complicated?

angular.module('nightlynachosApp')
  .directive('nnFileUpload', function () {
    return {
      templateUrl: 'views/partials/nn-file-upload.html',
      restrict: 'A',
      link: function (scope, elm, attrs){

        var self = this,
            user = scope.user,
            preview = scope.preview,
            category = "uncategorized";


        scope.fileLoaded = function (e) {

          var tgt = e.target || window.event.srcElement,
              files = tgt.files,
              fileReader;

          if (FileReader && files && files.length) {
              fileReader = new FileReader();
              fileReader.onload = function () {

                  scope.loadedFile = {
                    name: files[0].name,
                    img:  fileReader.result,
                    user: user,
                    category: category,
                  }

                  scope.$apply();
              }
              fileReader.readAsDataURL(files[0]);
          } else {
              alert('something wrong, probably ur browser. If not email anna');
          }
        }
      }
    }
  });
