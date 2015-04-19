'use strict';

/**
 * @ngdoc service
 * @name nightlynachosApp.seedPhotos
 * @description
 * # seedPhotos
 * Service in the nightlynachosApp.
 */
angular.module('nightlynachosApp')
  .factory('seedData', function () {
    return {
      userPhotos : {
        'simplelogin:6' : "alex-nacho-bw.png"
      }

      , userPhotoPath : 'images/seed/users/'
      
    }
  });
