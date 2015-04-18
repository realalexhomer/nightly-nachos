'use strict';


angular.module('nightlynachosApp')
  .controller('NachoListCtrl', ['$scope', '$animate', 'simpleLogin', 'fbutil', '$timeout', 'FBURL',
    function ($scope, $animate, simpleLogin, fbutil, $timeout, FBURL) {

    var self = this;
    var user = simpleLogin.user;
    self.user = simpleLogin.user;
    console.log(self.user)

    if (!simpleLogin.user) console.log('you imposter')

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

    var comment = "";

    self.commenting = false;

    var ref = fbutil.ref();

    var nachosRef = fbutil.ref().child('nachos');
    self.nachos = fbutil.syncArray('nachos', {limitToLast: 100});
    self.nachos.$loaded().catch(alert);
    

    var commentRef = fbutil.ref().child('comments');
    self.comments = fbutil.syncArray('comments', {limitToLast: 1000});
    self.comments.$loaded().catch(alert);

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
        nachoId: nacho.$id,
        userPhoto: user.photo || DEFAULT_USER_PHOTO,
        color: comment.color || 'green'
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

    self.featurePhoto = function(nacho, photo){
      nacho.featuredPhoto = photo;
    };

    /* Modal && File Upload */

    $scope.modalShown = false;

    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
      $("#new-nacho-file-input").change(function() {
        console.log(this.files);
      })
    }



}]);

