'use strict';


angular.module('nightlynachosApp')
  .controller('MainCtrl', ['$scope', 'fbutil', 
   function($scope, fbutil) {

    var self = this;

    $scope.awesomeThings = [
      'Anna',
      'Alex',
      'Nachos'
    ];
  }]);
