angular.module('nightlynachosApp').controller
  ('NachoDetailCtrl', ['$scope', '$animate', '$routeParams', 'simpleLogin', 'fbutil', 'validations', '$timeout', 'FBURL', '$http',
    function ($scope, $animate, $routeParams, simpleLogin, fbutil, validations, $timeout, FBURL, $http) {

  $scope.nachoId = $routeParams.nachoId;

  var path = 'nachos/' + $scope.nachoId;

  $scope.nacho = fbutil.syncObject(path);
  // $scope.mainImageUrl = $scope.nacho.photos[0];
  console.log($scope.mainImageUrl)
  $scope.nacho.$loaded(function(){$scope.mainImageUrl=$scope.nacho.photos[0];
})



    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
      console.log(imageUrl);
      console.log($scope.mainImageUrl);
    };
}]);