'use strict'


angular.module('nightlynachosApp')
  .controller('RecipeListCtrl', function ($scope) {
    $scope.recipes = [
      {'name': 'Delicious nachos',
       'snippet': 'Say cheese!'},
      {'name': 'Chocolate Covered Nachos',
       'snippet': 'What do you get when you combine chocolate with cheese??'},
      {'name': 'DBC Nachos',
       'snippet': 'Beautiful and meaningful things.'}
    ];
});
