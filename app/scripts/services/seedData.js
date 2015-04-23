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
      , 'simplelogin:2' : "anna-wink.png"
      , 'simplelogin:9' : "kenn-crazy.png"
      , 'simplelogin:8' : "dan-enthusiastic.png"
      , 'simplelogin:7' : "chris-sad.png"
      }

      , nachoPhotos : {
        'insert an id here': 'bar-nachos.png'
      }

      , userPhotoPath : 'images/'
      
    }
  });
