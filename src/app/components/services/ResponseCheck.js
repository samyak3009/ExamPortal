(function() {
  'use strict';
angular
    .module('minotaur').factory('ResponseCheck',function($state,$cookies){
	return {
		ResponseStatus:function(response){
		
		 if(response.status == 200)
		 	return;
		 	else
		 	{
		 		// if($cookies.get('sessionid') == undefined){
		 		// 	swal("Session Expired","You Are Unauthenticated","error");
		 		// 	$state.go('pages.login');
		 		// 	return;
		 		// }		 		
		 		if(response.status == 400)
		 		swal("Warning","Kindly Check The Data You Entered","warning");
		 		if(response.status == 401){	
		 			swal("Session Expired","You Are Unauthenticated","warning");
		 			$state.go('pages.login');
		 		}
                if(response.status == 403){
		 		swal("Warning","You Don't Have Permission to access this","warning");
		 		$state.go('dashboard');
		 	   	}
		 	    if(response.status == 202){
		 	    	if(response.data.msg!=undefined)
		 	    	{
		 	    		var k = 'Portal is Locked, please contact Dean Academics office to unlock the portal.';
		 	    		// var res = response.data.msg.toUpperCase();
		 	    		// if(res.indexOf('DEAN') != -1 || res.indexOf('DEAN ACADEMICS') != -1)
		 	    		if(response.data.msg.toUpperCase() === k.toUpperCase())
		 	    		{
		 	    			swal({
			                    title: "Warning",
			                    text: response.data.msg,
			                    type: "warning",
			                    showCancelButton: true,
			                    confirmButtonClass: "btn-success",
			                    confirmButtonText: "Send E-Mail to DEAN",
			                    cancelButtonText: "No, cancel !",
			                    closeOnConfirm: true,
			                    closeOnCancel: true
			                },
			                function(isConfirm) {
			                    if(isConfirm)
			                    {
			                        var k = window.open("https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=dean_ac@kiet.edu&su=Unlock Portal&shva=1", '_blank');
			                        k.focus();
			                    }
			                });
		 	    		}
		 	    		else
		 	    		{
		 	    			swal('Warning',response.data.msg, 'warning');
		 	    		}
		 	    	}
		 	    	return false;
		 	    }
		 	    if(response.status == 420){
		 	    	if(response.data.msg!=undefined)
		 	    	{
		 	    		var k = 'Portal is Locked, please contact Dean Academics office to unlock the portal.';
		 	    		// var res = response.data.msg.toUpperCase();
		 	    		// if(res.indexOf('DEAN') != -1 || res.indexOf('DEAN ACADEMICS') != -1)
		 	    		if(response.data.msg.toUpperCase() === k.toUpperCase())
		 	    		{
		 	    			swal({
			                    title: "Warning",
			                    text: response.data.msg,
			                    type: "warning",
			                    showCancelButton: true,
			                    confirmButtonClass: "btn-success",
			                    confirmButtonText: "Send E-Mail to DEAN",
			                    cancelButtonText: "No, cancel !",
			                    closeOnConfirm: true,
			                    closeOnCancel: true
			                },
			                function(isConfirm) {
			                    if(isConfirm)
			                    {
			                        var k = window.open("https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=dean_ac@kiet.edu&su=Unlock Portal&shva=1", '_blank');
			                        k.focus();
			                    }
			                });
		 	    		}
		 	    		else
		 	    		{
		 	    			swal('Warning',response.data.msg, 'warning');
		 	    		}
		 	    	}
		 	    	return false;
		 	    }
		 		if(response.status == 405)
		 		swal("Error","Kindly Contact the Developers","error");
		 		if(response.status == 408)
		 		swal("Error","Time Limit Exceeded...","error");
		 		if(response.status == 404)
		 		swal("Error","URL Not Found...","error");
		 		if(response.status == 415)
		 		swal("Warning","This File Is Not Supported...","warning");
		 		if(response.status == 429)
		 		swal("Warning","You Made Too Many Attempts Kindly Wait For Some Time...","warning");
		 		if(response.status == 500)
		 		swal("Error","Your Request Could Not Be Processed At The Moment...","error");
		 		if(response.status == 502)
		 		swal("Error","No Response","error");
		 		if(response.status == 503)
		 		swal("Error","This Service Is Currently Unavailable...","error");
		 		if(response.status == 511)
		 		swal("Error","Kindly Login To Your Captive Portal To Access This...","error");
		 		if(response.status == 409)
		 		swal("Conflict","Entry Already Found","warning");
		 		if(response.status == 204)
		 		swal("Conflict","Data Requested Could Not Be Found","warning");
		 		return false;
		 	}
		}
	};
}
);
})();
