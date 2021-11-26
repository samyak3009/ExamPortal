(function() {
  'use strict';

  angular
    .module('minotaur')
    .directive('fileModel', ['$parse','$log',fileModel]);

  /** @ngInject */
  function fileModel($parse,$log) {
    var directive = {
      restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                    $log.log(element[0].files);
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
    }
}
    return directive;
  
}
})();
