'use strict';


angular.module('nightlynachosApp')
  .controller('NachoListCtrl', ['$scope', 'simpleLogin', 'fbutil', 'validations', '$timeout', 
    function ($scope, simpleLogin, fbutil, validations, $timeout) {
      var user = simpleLogin.user
      if (!simpleLogin.user) console.log('you imposter')
      console.log(simpleLogin.user)
      validations.test();

      console.log(simpleLogin.auth.$requireAuth());
      console.log(simpleLogin.auth.$requireAuth().$$state )
    self = this;

    var nachosRef = fbutil.ref().child('nachos');
    self.nachos = fbutil.syncArray('nachos', {limitToLast: 500});
    self.nachos.$loaded().catch(alert);

    self.submit = function() {
      if (self.nacho) {
        self.nacho.userId = user.uid;
        postNacho(self.nacho);
      }
    };

    function postNacho(newNacho) {

      if (typeof newNacho.title === 'string') {
        nachosRef.push(newNacho);
      }
    }

    self.showEditor = function(nacho){
      self.nachoToEdit = nacho;
      self.editing = !self.editing;
    };

    self.editNacho = function(nacho){
      putNacho(nacho);
    };

    function putNacho(nacho) {
      if (typeof nacho.title === 'string') {
        self.nachos.$save(nacho);
      }
    }

    self.deleteNacho = function(nacho) {
      removeNacho(nacho);
    };

    function removeNacho(nacho) {
      self.nachos.$remove(nacho);
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

}]);
