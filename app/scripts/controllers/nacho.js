'use strict'


angular.module('nightlynachosApp')
  .controller('NachoListCtrl', ['$scope', 'fbutil', '$timeout', 
    function ($scope, fbutil, $timeout) {

    self = this;

    var nachosRef = fbutil.ref().child("nachos");
    self.nachos = fbutil.syncObject('nachos', {limitToLast: 500});
    self.nachos.$loaded().catch(alert);

    self.submit = function() {
      if (self.nacho) {
        postNacho(self.nacho);
      }
    };

    function postNacho(newNacho) {
      if (typeof newNacho.title === 'string') {
        var key = nachosRef.push(newNacho).key();
        console.log(key)
      }
    }

    self.editNacho = function(nacho){
      putNacho(nacho);
    }

    function putNacho(nacho) {
      if (typeof nacho.title === 'string') {
        console.log();
        // var indNachoRef = nachosRef.child(nacho.)
      }
    }

}]);
