angular.module('nightlynachosApp').controller
  ('NachoDetailCtrl', ['$scope', '$animate', '$routeParams', 'simpleLogin', 'fbutil', 'validations', '$timeout', 'FBURL',
    function ($scope, $animate, $routeParams, simpleLogin, fbutil, validations, $timeout, FBURL) {
  $scope.nachoId = $routeParams.nachoId;

  var path = 'nachos/' + $scope.nachoId

  $scope.nacho = fbutil.syncObject(path)

}]);