'use strict';

angular.module('nightlynachosApp')
  .filter('sortTags', function() {
    return function(items) {
      return angular.isArray(items)? items.slice().reverse() : [];
    };
  });
