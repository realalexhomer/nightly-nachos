'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('nightlynachosApp')
  .controller('AccountCtrl', function ($scope, user, simpleLogin, fbutil, $timeout, nnImageUpload) {
    $scope.user = user;
    $scope.logout = simpleLogin.logout;
    $scope.messages = [];
    var profile;
    loadProfile(user);


    $scope.fileLoaded = function(e) {
      nnImageUpload.upload(e, $scope.user, 'profile');
    }





    // $scope.fileLoaded = function (e) {
    //   var tgt = e.target || window.event.srcElement,
    //       files = tgt.files,
    //       fileReader;

    //   if (FileReader && files && files.length) {
    //       fileReader = new FileReader();
    //       fileReader.onload = function () {

    //           $scope.loadedFile = {
    //             name: files[0].name,
    //             img:  fileReader.result,
    //             user: $scope.user,
    //             category: 'profile'
    //           }

    //           $scope.$apply();
    //       }
    //       fileReader.readAsDataURL(files[0]);
    //   } else {
    //       alert('Real nacho lovers use modern browsers. You will not be able to upload images unless you upgrade your browser.');
    //   }

    //   //TODO: Send loadedFile to FB & make this a service

    // };

    $scope.showFiles = function(){
      console.log(nnImageUpload.loadedFile);
    }

    $scope.changePassword = function(oldPass, newPass, confirm) {
      $scope.err = null;
      if( !oldPass || !newPass ) {
        error('Please enter all fields');
      }
      else if( newPass !== confirm ) {
        error('Passwords do not match');
      }
      else {
        simpleLogin.changePassword(profile.email, oldPass, newPass)
          .then(function() {
            success('Password changed');
          }, error);
      }
    };

    $scope.changeEmail = function(pass, newEmail) {
      $scope.err = null;
      simpleLogin.changeEmail(pass, newEmail, profile.email)
        .then(function() {
          profile.email = newEmail;
          profile.$save();
          success('Email changed');
        })
        .catch(error);
    };

    function error(err) {
      alert(err, 'danger');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }

    function loadProfile(user) {
      if( profile ) {
        profile.$destroy();
      }
      profile = fbutil.syncObject('users/'+user.uid);
      profile.$bindTo($scope, 'profile');
    }
  });
