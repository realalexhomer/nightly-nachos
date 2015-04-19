'use strict';


angular.module('nightlynachosApp')
  .controller('MainCtrl', ['$scope', 'fbutil', '$mdSidenav',  
   function($scope, fbutil, $upload, $mdSidenav) {

    var self = this;

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: 'upload/url',
                    fields: {'username': $scope.username},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    };

    self.showNewNacho = function() {
      console.log('nacho nacho nacho')
    }

    $scope.awesomeThings = [
      'Anna',
      'Alex',
      'Nachos'
    ];

    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      return function() {
        return $mdSidenav(navID).toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }

    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };


  }]);
