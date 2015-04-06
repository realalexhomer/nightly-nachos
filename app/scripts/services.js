'use strict';

angular.module('nightlynachosApp')
  .factory('validations', function(){

    return {
      validateNacho: function(nacho, nacoReqs) {

      }

    }

  });


angular.module('nightlynachosApp')
  .factory('nightlyNachosParse', function(){

    Parse.initialize("d7kBrTc5sJ7e4Xg91z5ZyPnBtBgN9jp8Oyv90v9y", "jWRjlRcLZxRkbrQmUdGpWt6046DU7kCIIUJm91ma");

    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
    // alert("yay! it worked");
    });



    return {
      postFile: function(file) {

        var parseFile = new Parse.File(file.name, file);

        parseFile.save()

        .then(function(){
          console.log('file successfully saved')
        }, function(error){
          console.log('error:', error)
        }); 

      },

      postFiles: function(filesArr) {
        console.log("files Arr is", filesArr)
        for (var i = 0; i < filesArr.length; i++){
          postFile(filesArr[i]);
        }
      }

    }

  })

  angular.module('nightlynachosApp')
  .factory('nightlyNachosFileUpload', function(){

    return {

    }


    function renderImage(file, containerDiv) {

    var reader = new FileReader();

  // inject an image with the src url
    reader.onload = function(event) {
      the_url = event.target.result
      $(containerDiv).html("<img src='" + the_url + "' />")
    }

  // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);

    }
})




