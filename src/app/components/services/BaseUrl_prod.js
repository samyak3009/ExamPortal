(function() {
  'use strict';
angular
    .module('minotaur').factory('BaseUrl',function(){
    var base_str = 	window.location.hostname;
 	var Str='http://127.0.0.1:8080/';
 	 // var Str='http://'+'10.21.66.243'+ ':8000/';
 	// var Str='http://10.21.66.88:8000/';
 	// var Str='https://tech.kiet.edu/api/hrms/';
	console.log(Str);
	return {
		RetBaseUrl:function(){ return Str; }

	};
});
})();