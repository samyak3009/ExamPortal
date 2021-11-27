(function() {
  'use strict';
angular
    .module('minotaur').factory('BaseUrl',function(){
	var Str='https://microsoftback.herokuapp.com/';
	return {
		RetBaseUrl:function(){ return Str; }
	};
});
})();
