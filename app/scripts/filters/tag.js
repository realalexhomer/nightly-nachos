'use strict';

angular.module('nightlynachosApp')
  .filter('sortTags', function() {
    return function(item, tag) {
      return item if item.tags.indexOf(tag) > -1;
      // return angular.isArray(items)? items.slice().reverse() : [];
    };
  });

// "nacho in nachoCtrl.nachos"
