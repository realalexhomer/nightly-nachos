angular.module('nightlynachosApp')
    .directive('mixitup', function(){
        var linker = function(scope,element,attrs) {
            scope.$watch('entities', function(){

                console.log('reload');
                element.mixItUp();
            });
            console.log('starting');
        };
        
        return {
            restrict:'A',
            link: linker,
            scope:{entities:'='}
        }
    });
