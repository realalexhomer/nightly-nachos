'use strict';

/**
 * @ngdoc function
 * @name nightlynachosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nightlynachosApp
 */

angular.module('nightlynachosApp')
  .controller('MainCtrl', ['$scope', 'fbutil', '$timeout',
   function($scope, fbutil, $timeout) {

    var self = this;
    self.nachos = fbutil.syncArray('nachos', {limitToLast: 500});

    self.nachos.$loaded().catch(alert);



    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
