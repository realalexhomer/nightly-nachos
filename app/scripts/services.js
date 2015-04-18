'use strict';










// DONT NEED PARSE UNLESS WE ARE STORING MORE THAN 100MB OF IMAGES (LOL);










// angular.module('nightlynachosApp')
//   .factory('nightlyNachosParse', function($http){

//     var nnPrivateParse = {};
//     nnParse.applicationId = "d7kBrTc5sJ7e4Xg91z5ZyPnBtBgN9jp8Oyv90v9y";
//     nnParse.restApiKey = "35lKbh6ROK48FgVvKwub7ueIcCFyCaEt4T69V3OK";

//     var nnPublicParse = {};

//     nnPublicParse.post = function (imgName, dataBinary, contentType) {

//     }





//     // Parse.initialize("d7kBrTc5sJ7e4Xg91z5ZyPnBtBgN9jp8Oyv90v9y", "jWRjlRcLZxRkbrQmUdGpWt6046DU7kCIIUJm91ma");


//     // var TestObject = Parse.Object.extend("TestObject");
//     // var testObject = new TestObject();
//     // testObject.save({foo: "bar"}).then(function(object) {

//     // });



//     return {



//       var req = {
//        method: 'POST',
//        url: 'https://d7kBrTc5sJ7e4Xg91z5ZyPnBtBgN9jp8Oyv90v9y:javascript-key=jWRjlRcLZxRkbrQmUdGpWt6046DU7kCIIUJm91ma@api.parse.com/1/classes/GameScore/Ed1nuqPvcm',
//        headers: {
//          'Content-Type': undefined
//        },
//        data: { test: 'test' }
//       }

//       $http(req).success(function(){...}).error(function(){...});


// curl -X POST \
//   -H "X-Parse-Application-Id: d7kBrTc5sJ7e4Xg91z5ZyPnBtBgN9jp8Oyv90v9y" \
//   -H "X-Parse-REST-API-Key: 35lKbh6ROK48FgVvKwub7ueIcCFyCaEt4T69V3OK" \
//   -H "Content-Type: image/jpeg" \
//   --data-binary '@myPicture.jpg' \
//   https://api.parse.com/1/files/pic.jpg





























//       postFile: function(file) {

//         var parseFile = new Parse.File(file.name, file);

//         parseFile.save()

//         .then(function(){
//           console.log('file successfully saved')
//         }, function(error){
//           console.log('error:', error)
//         }); 

//       },

//       postFiles: function(filesArr) {
//         console.log("files Arr is", filesArr)
//         for (var i = 0; i < filesArr.length; i++){
//           postFile(filesArr[i]);
//         }
//       }

//     }

//   })


// /// ---- /////// ---////////////////////////////////////

//   angular.module('nightlynachosApp')
//   .factory('nightlyNachosFileUpload', function(){

//     return {

//     }


//     function renderImage(file, containerDiv) {

//     var reader = new FileReader();

//   // inject an image with the src url
//     reader.onload = function(event) {
//       the_url = event.target.result
//       $(containerDiv).html("<img src='" + the_url + "' />")
//     }

//   // when the file is read it triggers the onload event above.
//     reader.readAsDataURL(file);

//     }
// })




