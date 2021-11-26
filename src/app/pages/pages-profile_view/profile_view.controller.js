(function(){
	'use strict';

	angular
    .module('minotaur')
    .controller('ProfileViewController', ProfileViewController);

    function ProfileViewController($http,BaseUrl,BaseUrl_Files,$cookies,$log,ResponseCheck) {
    	var vm=this;
    	vm.show=false;
    	vm.sh=["", "danger", "" , "warning" ,"" , "active" ,"","info"];
     	
    	vm.show=true;
    	$http({method: 'POST',
			url: BaseUrl.RetBaseUrl() + 'dashboard/imagepath/',
			
			headers: {
				'Cookie': $cookies.get('sessionid')
			},
			withCredentials: true
			}).then(function(response) {
			var path=BaseUrl_Files.RetBaseUrl();
			vm.p=path+"/Musterroll/Employee_images/";
			vm.ac=path+"/Musterroll/Academic_documents/";
			vm.oc=path+"/Musterroll/Other_documents/";
			vm.imagepath=path+"/Musterroll/Employee_images/"+response.data.data[0].image_path;
			
			});
    	$http({
			method: 'GET',
			params:{ 'emp_id' :  vm.Select_Employee , 'request_type':'update_fetch_data'},
			url:BaseUrl.RetBaseUrl()+'musterroll/update_employee/info',
			headers: {
				'Cookie': $cookies.get('sessionid')
			},
			withCredentials: true
		}).then(function(response){
			vm.details1=response.data;
			console.log(response.data);
			vm.Linked_in = response.data.names.personal_details[0].Linked_in;
			vm.images = [];
			vm.images['dip_marksheet']=response.data.names.academic_details.diploma_marksheet;
			vm.images.doc_marksheet=response.data.names.academic_details.doctrate_marksheet;
			vm.images.other_marksheet=response.data.names.academic_details.other_marksheet;
			vm.images.pg_marksheet=response.data.names.academic_details.pg_marksheet;
			vm.images.ug_marksheet=response.data.names.academic_details.ug_marksheet;
			vm.images.x_marksheet=response.data.names.academic_details.x_marksheet;
			vm.images.xii_marksheet=response.data.names.academic_details.xii_marksheet;
			vm.images.emp_pic=response.data.names.personal_details[0].image;
			vm.images.medical=response.data.names.academic_details.medical;
			vm.images.cc=response.data.names.academic_details.cc;
			vm.images.emp_exp=response.data.names.academic_details.exp;
			vm.images.pg_degree=response.data.names.academic_details.pg_degree1;
			vm.images.ug_degree=response.data.names.academic_details.ug_degree1;
			console.log(response.data.names.academic_details.x_marksheet)
			console.log(vm.details1);
			ResponseCheck.ResponseStatus(response);
		});
           
           

    }

  
})();




