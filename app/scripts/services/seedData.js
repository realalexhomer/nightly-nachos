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

      , nachosPhotos: { // ids should line up with arrays of photos

      }

      , userPhotoPath   : 'images/seed/users/'
      , nachoPhotosPath : 'images/seed/nachos/'
      
    }
  });
