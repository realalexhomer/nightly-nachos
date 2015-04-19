'use strict';

angular.module('nightlynachosApp')
  .controller('NachoListCtrl', ['$scope', '$animate', 'simpleLogin', 'fbutil', '$timeout', 'FBURL', 'seedData',
    function ($scope, $animate, simpleLogin, fbutil, $timeout, FBURL, seedData) {


    var self = this,
        user = simpleLogin.user,
        comment = "",
        ref = fbutil.ref(),
        nachosRef = fbutil.ref().child('nachos'),
        commentRef = fbutil.ref().child('comments'),
        userRef = fbutil.ref().child('users');

    self.nachos = fbutil.syncArray('nachos', {limitToLast: 15});
    self.nachos.$loaded().catch(alert);
    
    self.comments = fbutil.syncArray('comments', {limitToLast: 200});
    self.comments.$loaded().catch(alert);

    self.user = simpleLogin.user;


    // need to put these in directives as they manipulate the DOM:

    self.commenting = false;
    $scope.modalShown = false;

    //


    $scope.saveFileToNacho = function(){
      $scope.loadedFile.timestamp = Date.now().toString();
      $scope.loadedFile.user = self.user;
      if (!$scope.photos){$scope.photos = [];};
      $scope.photos.push($scope.loadedFile);
    }


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
        // self.nacho.photos = $scope.photos;
        postNacho(self.nacho);
        console.log('nacho submitted:', self.nacho)
      }
    };

    self.showEditor = function(nacho){
      self.nachoToEdit = nacho;
      self.editing = !self.editing;
    };

    self.newComment = function(){
      self.commenting = !self.commenting;
    }

    self.editNacho = function(nacho){
      putNacho(nacho);
      getComment(nacho);
    };

    self.deleteNacho = function(nacho) {
      removeNacho(nacho);
    };

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

    $scope.modalOrError = function(){
      if (self.user) {
        $scope.toggleModal();
      }else{
        displayAuthError();
      }
    }

    function displayAuthError() {
      alert('log in to do that');
    }

    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
      $("#new-nacho-file-input").change(function() {
        console.log(this.files);
      })
    }

    self.findUserPhoto = function(uId){
      return findUserPicture(uId);
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
      newNacho.photos = $scope.photos;
      console.log(newNacho);
      newNacho.featuredPhoto = newNacho.photos[0].timestamp;
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

    function findUserPicture(userId){
      if (!self.userPhotoCache) {self.userPhotoCache = {};};
      if (self.userPhotoCache[userId]) {
        return self.userPhotoCache[userId].img;
      }else if (seedData.userPhotos[userId]){
        return seedData.userPhotoPath + seedData.userPhotos[userId];
      }else {
        var pictureRef = userRef.child(userId);
        pictureRef.once("value", function(userSnapshot){
          var photo = userSnapshot.val().picture;
          self.userPhotoCache[userId] = photo;
          if(!$scope.$$phase) { //TODO: FIGURE OUT WHY WE NEED TO MANUALLY DIGEST HERE AND HOPEFULLY FIX IT
            $scope.$digest();
          };
          return photo.img;
        });
      }
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

}]);

