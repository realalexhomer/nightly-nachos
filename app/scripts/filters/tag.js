'use strict';

angular.module('nightlynachosApp')
  .filter('sortTags', function() {
    return function(item, tag) {
      return angular.isArray(items)? items.slice().reverse() : [];
    };
  });

"nacho in nachoCtrl.nachos"
