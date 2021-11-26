// (function(){
// 	'use-strict';
// 	angular.module("minotaur")
// 	.directive('dirlabel', function(){
//       return {
//         restrict: 'EA',
//         transclude: true,
//         replace:true,
//         scope: {label: '@' },
//         template: '<label for="text" class="control-label minotaur-label">{{label}}</label>'
//       };
//   })
// 	.directive('dirSelectSingle', function(){
// 		return{
// 			restrict: 'EA',
// 			transclude: true,
// 			replace: true,
// 			scope: {name:'@', model:'=' , required: '@', change: '=', options: '='},
// 			template: '<select name="{{name}}" class="form-control" ng-model="model" style="width:100%" ng-required="{{required}}" ng-change="change">'+'<option value="" disabled>Choose One</select>'
                                
// 		};
// 	})
	
// })();