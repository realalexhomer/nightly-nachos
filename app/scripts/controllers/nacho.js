'use strict';


angular.module('nightlynachosApp')
  .controller('NachoListCtrl', ['$scope', '$animate', 'simpleLogin', 'fbutil', 'validations', '$timeout', 
    function ($scope, $animate, simpleLogin, fbutil, validations, $timeout) {

    var user = simpleLogin.user
    if (!simpleLogin.user) console.log('you imposter')
      
    var self = this;

    var comment = "";
    self.commenting = false;

    var ref = fbutil.ref();

    var nachosRef = fbutil.ref().child('nachos');
    self.nachos = fbutil.syncArray('nachos', {limitToLast: 100});
    self.nachos.$loaded().catch(alert);

    var commentRef = fbutil.ref().child('comments');
    self.comments = fbutil.syncArray('comments', {limitToLast: 1000});
    self.comments.$loaded().catch(alert);

    self.submit = function() {
      if (self.nacho) {
        self.nacho.userId = user.uid;
        console.log('nacho submitted:', self.nacho)
        postNacho(self.nacho);
      }
    };


    function strToArray(str){
      var array = str.split(', ');
      return array;
    }

    function postNacho(newNacho) {
      newNacho.photos = strToArray(newNacho.photos);

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
      getComment(nacho);
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

    self.newComment = function(){
      self.commenting = !self.commenting;
    }

    self.addComment = function(nacho, comment){
      postComment(nacho, simpleLogin.user, comment);
    }

    function postComment(nacho, user, commentStr){
      comment = {
        text: commentStr,
        userId: user.uid,
        nachoId: nacho.$id
      }
      commentRef.push(comment);
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

    console.log("self.comments:", self.comments); 


    self.findComments = function(arr, nacho){
      var toReturn = [];
      for (var i = 0; i < arr.length; i++){
        if (arr[i].nachoId === nacho) toReturn.push(arr[i]);
      }
      return toReturn;
    }

    /* Modal */

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };

}]);
