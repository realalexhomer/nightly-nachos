angular.module('nightlynachosApp').controller
  ('NachoDetailCtrl', ['$scope', '$animate', '$routeParams', 'simpleLogin', 'fbutil', 'validations', '$timeout', 'FBURL', '$http',
    function ($scope, $animate, $routeParams, simpleLogin, fbutil, validations, $timeout, FBURL, $http) {

  $scope.nachoId = $routeParams.nachoId;

  var path = 'nachos/' + $scope.nachoId

  $scope.nacho = fbutil.syncObject(path);
  console.log($scope.nacho)

  $http.get(path).success(function(data) {
      $scope.nacho = data;
      $scope.mainImageUrl = data.photos[0];
  });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
}]);