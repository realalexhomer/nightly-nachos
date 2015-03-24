'use strict'


angular.module('nightlynachosApp')
  .controller('NachoListCtrl', function ($scope) {
    self = this;
    self.nacho = {title: "",
      description: "",
      tags: [],
      photos: []};
    self.nachos = [
      {'title': 'Delicious nachos',
       'description': 'Say cheese!',
        'tags': 'Say cheese!',
        'photos': ''},
      {'title': 'Chocolate Covered Nachos',
       'description': 'What do you get when you combine chocolate with cheese??'},
      {'title': 'DBC Nachos',
       'description': 'Beautiful and meaningful things.'}
    ];
    self.submit = function() {
      if (self.nacho) {
        console.log(self.nacho)
      }
    };
});
