'use strict';


angular.module('nightlynachosApp')
  .controller('NachoListCtrl', ['$scope', '$animate', 'simpleLogin', 'fbutil', '$timeout', 'FBURL',
    function ($scope, $animate, simpleLogin, fbutil, $timeout, FBURL) {

    // Load Data

    var self = this,
        user = simpleLogin.user,
        comment = "",
        ref = fbutil.ref(),
        nachosRef = fbutil.ref().child('nachos'),
        commentRef = fbutil.ref().child('comments'),
        userRef = fbutil.ref().child('users'),
        userPhotoCache = {};

    self.nachos = fbutil.syncArray('nachos', {limitToLast: 15});
    self.nachos.$loaded().catch(alert);
    
    self.comments = fbutil.syncArray('comments', {limitToLast: 200});
    self.comments.$loaded().catch(alert);

    self.user = simpleLogin.user;

    // Load DOM logic

    self.commenting = false;
    $scope.modalShown = false;

    // Public functions

    self.clearForm = function(){
      var defaultForm = {
        title       : "",
        description : "",
        tags        : [],
        photos      : [],
      };
      self.nacho = defaultForm;
      self.nachoFiles = [];
      self.tag = "";
    }

    self.clearForm();
    
    self.addTag = function(tag) {
      if (tag.length){
        self.nacho.tags.push(tag);
        console.log(self.nacho.tags);
        self.tag = "";
      }
    }

    self.findNachoUrl = function(nacho){
      var url = '/#/nachos/' + nacho.$id;
      return url;
    }

    self.findNachoUser = function(nacho){   
      return fbutil.syncObject('users/' + nacho.userId);
    }

    self.submit = function() {
      if (self.nacho) {
        self.nacho.userId = user.uid;
        console.log('nacho submitted:', self.nacho)
        nightlyNachosParse.postFiles(self.nachoFiles);
        // .then(
          // function(){
          //   postNacho(self.nacho);
          //   $scope.toggleModal();
          // })
      }
    };

    self.showEditor = function(nacho){
      self.nachoToEdit = nacho;
      self.editing = !self.editing;
    };

    self.editNacho = function(nacho){
      putNacho(nacho);
      getComment(nacho);
    };

    self.deleteNacho = function(nacho) {
      removeNacho(nacho);
    };

    self.newComment = function(){
      self.commenting = !self.commenting;
    }

    self.addComment = function(nacho, comment){
      postComment(nacho, simpleLogin.user, comment);
    }

    self.findComments = function(arr, nacho){
      var toReturn = [];
      for (var i = 0; i < arr.length; i++){
        if (arr[i].nachoId === nacho) toReturn.push(arr[i]);
      }
      return toReturn;
    }

    self.featurePhoto = function(nacho, photo){
      nacho.featuredPhoto = photo;
    };

    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
      $("#new-nacho-file-input").change(function() {
        console.log(this.files);
      })
    }

    // Private functions


    function strToArray(str){
      var array = [];
      if (/.\, ./g.exec(str)){
        array = str.split(', ');
      }else{
        array.push(str);
      }
      return array;
    }

    function postNacho(newNacho) {
      newNacho.photos = strToArray(newNacho.photos);
      newNacho.featuredPhoto = newNacho.photos[0];
      if (typeof newNacho.title === 'string') {
        nachosRef.push(newNacho);
        self.clearForm();
      }
    }

    function putNacho(nacho) {
      if (typeof nacho.title === 'string') {
        self.nachos.$save(nacho);
      }
    }

    function removeNacho(nacho) {
      self.nachos.$remove(nacho);
    }

    function postComment(nacho, user, commentStr){
      comment = {
        text: commentStr,
        userId: user.uid,
        nachoId: nacho.$id,
        color: comment.color || 'green'
      }
      commentRef.push(comment);
    }

    function findCommentUserId(comment){
      return comment.userId;
    }

    function findUserPicture(userId){
      if (userPhotoCache[userId]) {
        return commentPhotoCache[userId];
      }else{
        userRef.once(userId, function(user){
          var photo = user.picture
          userPhotoCache[userId] = photo;
          return photo;
        })
      }
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

}]);

