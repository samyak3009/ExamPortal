(function() {
  'use strict';
angular
    .module('minotaur').factory('BaseUrl',function(){
	var Str='https://microsoftback.herokuapp.com/';
	// var Str='https://tech.kiet.edu/api/hrms/';
	return {
		RetBaseUrl:function(){ return Str; }
	};
});
})();
