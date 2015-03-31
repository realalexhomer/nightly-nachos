'use strict';

/**
 * @ngdoc overview
 * @name nightlynachosApp
 * @description
 * # nightlynachosApp
 *
 * Main module of the application.
 */
angular.module('nightlynachosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.utils',
    'simpleLogin',
    'angularFileUpload',
    'ngAria',
    'ngMaterial',
    'simpleLogin'
  ]).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('blue-grey')
    .backgroundPalette('blue-grey')
});
>>>>>>> asdf
