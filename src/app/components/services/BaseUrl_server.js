(function() {
	'use strict';
  angular
	  .module('minotaur').factory('BaseUrl',function(){
	  var base_str = 	window.location.hostname;
	   var Str='http://'+base_str+ ':8000/';
	  console.log(Str);
	  return {
		  RetBaseUrl:function(){ return Str; }
  
	  };
  });
  })();
  