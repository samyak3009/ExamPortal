
( function() {
	'use strict';
	
	angular
	.module('minotaur')
	.controller('resetLogin', resetLogin);
	
	function resetLogin($http,BaseUrl,CheckSession,$cookies,$log,$state,NgTableParams,ResponseCheck){
		var vm = this;
		
		vm.load = function(){
			
			$http({
				method: "post",
				url: BaseUrl.RetBaseUrl() + 'resetdata/',
				headers: {
					'Cookie': $cookies.get('sessionid'),
				},
				withCredentials: true
				}).then(function(response) {
				
				if(response.data.error==false){
					vm.table = response.data.data;
					vm.tableParams = new NgTableParams({
					
					}, {
						getData: function($defer, params) {
						//NgTableParams is dependency inject it  your controller
						//tableParams is an object of that dependency   
							    vm.tableParams = new NgTableParams({
								  // initial filter
								  sorting: {
									//for initial sorting example emp_id : 'asc'
									emp_id : 'asc'
								  },
								  filter: { 
									  // for initial filter  name: "T"
									  }
								}, {
								//dataset is predefined in dericeive set your table data in it 
								
								  dataset: vm.table
								});
														
						}
					});
					$log.log(response.data);
				}
			})
		}
		//load function loads your dataset in view as $data......Thanku DevilCodingSimplified :)
		vm.load(NgTableParams);
		vm.reset = function(data,data2){
			
			
			
			swal({
  title: "Are you sure?",
  text: "",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#5CB85C",
  confirmButtonText: "Yes,Reset Password!",
  cancelButtonText: "Cancel !",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {
  
      var data1={"emp_id":data,"emp_name":data2};
			$http({
				method: "post",
				data : data1,
				url: BaseUrl.RetBaseUrl() + 'resetpassword/',
				headers: {
					'Cookie': $cookies.get('sessionid'),
				},
				withCredentials: true
				}).then(function(response) {
				if(response.data.error==false){
					swal(
					'Reset Succesful!',
					response.data.msg,
					'success'
					)
				}
				
				
				
			});
          
  } else {
    swal("Cancelled", "", "error");
  }
});

			/**/
			
		}
		
		
	}
})();	