'use strict';


angular.module('nightlynachosApp')
  .controller('NachoListCtrl', ['$scope', 'simpleLogin', 'fbutil', 'validations', '$timeout',
    function ($scope, simpleLogin, fbutil, validations, $timeout) {



    var user = simpleLogin.user

    if (!simpleLogin.user) console.log('you imposter')
      
    var self = this;

    var comment = "";
    self.commenting = false;

    var ref = fbutil.ref();

    var commentRef = fbutil.ref().child('comments');
    self.comments = fbutil.syncArray('comments', {limitToLast: 1000});
    self.comments.$loaded().catch(alert);

    var nachosRef = fbutil.ref().child('nachos');
    self.nachos = fbutil.syncArray('nachos', {limitToLast: 100});
    self.nachos.$loaded().catch(alert);

    self.submit = function() {
      if (self.nacho) {
        self.nacho.userId = user.uid;
        console.log('nacho submitted:', self.nacho)
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

    function getComment(nacho) {
      ref = new Firebase("https://nightlynachos.firebaseio.com/comments");
      ref.orderByChild("nachoId").on('value', function(snapshot) {
        var commentsToReturn = new Array();
        snapshot.forEach(function(childSnapshot){
          commentsToReturn.push(childSnapshot.val());
        })
      return commentsToReturn;
      });
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

    function findCommentsFilter(element, nachoId){
      if (element.nachoId === nachoId) return element;
    }

    function findCommentsFilter(nachoId) {
      return function(element) {
        if (element.nachoId === nachoId) return element;
      }
    }

    self.findNachoComments = function(nachoId, comments){
      return comments.filter(findCommentsFilter(nachoId));
    };


    console.log("self.comments:", self.comments); 


    function findComments(arr, nacho){
      var toReturn = [];
      for (var i = 0; i < arr.length; i++){
        console.log('wtf');
        if (arr[i]) toReturn.push(arr[i]);
      }
      return toReturn;
    }

    commentRef.on('value', function(snapshot){
    console.log('hi')
    console.log("filtered:", self.findNachoComments('-JlHqWkA7UI_I3SDnSwf', self.comments));
    console.log('another attempt:', findComments(self.comments, '-JlHqWkA7UI_I3SDnSwf'));
    });

}]);
