(function(){
  'use-strict';
  angular.module('minotaur')
   .controller('mms_Submit_Co',mms_Submit_Co);

   function mms_Submit_Co($http,BaseUrl,$cookies,ResponseCheck,$scope,NgTableParams,ExportToExcel,MMS_CONST,constApi,MMS_Student_NOMINAL,MMS_GET_COMPONENT_ACADEMICS,MMS_SET_CO_DETAILS,REQUEST_KEY)
   {
     var vm=this;
     var editData = {};
     vm.isEdit = false;
     vm.newCosIndex = [];
     var examArray;
     var filterExam = [];
     vm.isEditTrue = false;
    vm.addco=[];
    vm.showCourseDetails = true;
    vm.showinput=false;
    vm.inputco=[];
    vm.savedisable=true;
    vm.editExternal = false;
    
    vm.subarray=[];
    var params_course={};
      params_course[REQUEST_KEY.REQUEST_TYPE]='form_data';
      params_course[REQUEST_KEY.REQUEST_BY]='faculty';
     var k = constApi.getRequest(params_course,MMS_Student_NOMINAL)
     k.then(function(response){
       vm.courseDetails=response.data.course;
     });
    vm.onCourseChange = function()
    {
      if(vm.course==undefined)
       return;
       vm.showinput=false;
       var params_branch={};
         params_branch[REQUEST_KEY.REQUEST_TYPE]='fac_time_dept';
         params_branch[REQUEST_KEY.COURSE]=vm.course;
       var k = constApi.getRequest(params_branch,MMS_GET_COMPONENT_ACADEMICS);
       k.then(function(response){
         vm.branchDetails=response.data.data;
         if(vm.branchDetails.length  > 0)
         {
            vm.branch = vm.branchDetails[0]['section__sem_id__dept'];
           vm.onBranchChange();
         }

       })
    }
    vm.onBranchChange = function()
    {
      if(vm.branch == undefined || vm.branch==null)
      return;
      vm.semester=null;
      vm.subjectDetails=null;
      vm.showinput=false;
      var params_semester={};
        params_semester[REQUEST_KEY.REQUEST_TYPE] ='sem';
        params_semester[REQUEST_KEY.DEPT]=vm.branch;

      var k=constApi.getRequest(params_semester,MMS_SET_CO_DETAILS)
      k.then(function(response){
        vm.semesterDetails=response.data.data;
        if(vm.semesterDetails.length > 0)
        {
            vm.semester = vm.semesterDetails[0]['section__sem_id__sem'];
          vm.onSemesterChange();
        }
      })
    }
    vm.onSemesterChange = function()
    {
      if(vm.semester ==null || vm.semester ==undefined)
        return;
      vm.showinput=false;
      var params_subject={};
        params_subject[REQUEST_KEY.REQUEST_TYPE]='subjects';
        params_subject[REQUEST_KEY.SEM]=vm.semester;
        params_subject['dept']=vm.branch;
      var k=constApi.getRequest(params_subject,MMS_SET_CO_DETAILS);
      k.then(function(response){
        vm.subjectDetails=response.data.data;
        console.log(vm.subjectDetails);
        if(vm.subjectDetails.length>0){
          for(var i=0;i<vm.subjectDetails.length;i++){
            vm.sub_name=vm.subjectDetails[i]['subject_id__sub_name'];
            vm.sub_alpha=vm.subjectDetails[i]['subject_id__sub_alpha_code'];
            vm.sub_code=vm.subjectDetails[i]['subject_id__sub_num_code'];
            vm.subject_code=vm.subjectDetails[i]['subject_id'];
            vm.subarray = vm.subjectDetails;
            console.log(vm.sub_name);
            console.log(vm.sub_alpha);
            console.log(vm.sub_code);
            // vm.obj={};
            // vm.obj={'subject_id':vm.subject_code,'subject':vm.sub_name+'('+vm.sub_alpha+'-'+vm.sub_code+')'};
            for (var x in vm.subarray) {
              vm.subarray[x]['subject_id__sub_name'] = vm.subarray[x]['subject_id__sub_name'] + " (  " + vm.subarray[x]['subject_id__sub_alpha_code']+"-"+vm.subarray[x]['subject_id__sub_num_code']+" )"  ;
            }
            // vm.subarray.push(vm.obj);
            console.log(vm.subarray);
          }
        }

      })
    }
    vm.Submit = function()
    {
      vm.showinput=false;
      vm.externalattainment = null;
      var params_co={};
          params_co[REQUEST_KEY.REQUEST_TYPE]= 'form_data1';
          params_co[REQUEST_KEY.SUBJECT_ID]= vm.subject;
      var k=constApi.getRequest(params_co,MMS_SET_CO_DETAILS);
      k.then(function(response){
        console.log(response)
        for(var i=0; i<response.data.data1.length; i++)
        {
           var k = response.data.data1[i]['value'].toUpperCase();
           if(k === 'EXAM NAME')
           {
              response.data.data1[i]['value'] = 'THEORY';
           }
           if(k === 'LAB MANUAL')
           {
              response.data.data1[i]['value'] = 'LAB RECORD';
            }
        }
        for(var j=0; j<response.data.data.length; j++)
        {
          var exam_array = response.data.data[j]['exams'];
          response.data.data[j]['isSubmitted'] = true;
          for(var k=0; k<exam_array.length; k++)
          {
            try{
            if(exam_array[k]['value'].toUpperCase() === 'EXAM NAME')
            {
              exam_array[k]['value'] = 'THEORY';
            }
            if(exam_array[k]['value'].toUpperCase() === 'LAB MANUAL')
            {
              exam_array[k]['value'] = 'LAB RECORD';
            }
          } catch(error){
            if(exam_array[k]['value'] === 'EXAM NAME')
            {
              exam_array[k]['value'] = 'THEORY';
            }
            if(exam_array[k]['value'] === 'LAB MANUAL')
            {
              exam_array[k]['value'] = 'LAB RECORD';
            }
            console.log("error",error)
          }
          }
        }
        examArray = response.data.data1;
        vm.courseoutcome = response.data.data;
        if(response.data.data2.length > 0)
        {
          vm.externalAttainment = parseInt(response.data.data2[0]['attainment_per']);
        }
        vm.tabIndex = 0;
        vm.showCourseDetails = true;
        vm.showinput = true;
      })
    }

    vm.submitExternal = function(k)
    {
      var params = {};
      params[REQUEST_KEY.REQUEST_TYPE] = REQUEST_KEY.UNIVERSITY_ATTAIN_PER;
      params[REQUEST_KEY.SUBJECT_ID] = vm.subject;
      params[REQUEST_KEY.ATTAINMENT_PER] = k;
      console.log(params)
      var k = constApi.getRequest(params, MMS_SET_CO_DETAILS);
      k.then(function(response)
      {
        console.log(response)
        if(response.status == 200)
        {
          swal('Success',response.data.msg,'success');
        }
        else
        {
          vm.externalAttainment = null;
        }
        // console.log(response);
      })
    }

    vm.delete=function(k)
    {
      var data={};
        data[REQUEST_KEY.SUBJECT_ID]= vm.subject;
        // data[MMS_CONST.CO_NUM]= k;
        console.log(data)
        var k=constApi.deleteRequest(data,MMS_SET_CO_DETAILS)
      k.then(function(response){
        console.log(response)
        vm.Submit();
      })
    }
    vm.tabSelect = function(k)
    {
      if(k==0)
        vm.showCourseDetails = true;
      else
        vm.showCourseDetails = false;
    }
    vm.validate = function(index)
    {
      if(vm.courseoutcome[index].description == null || vm.courseoutcome[index].description == undefined || vm.courseoutcome[index].description == '')
       {
        swal('Warning', 'CO-Description is Empty, can not save','warning');
        return false;
       }
       return true;
    }
    vm.filterExam = function(index)
    {
      var k = [];
      var len = vm.courseoutcome[index]['exams'].length;
      for(var i=0; i<len; i++)
     {
      if(vm.courseoutcome[index]['exams'][i]['attainment_per'] != null && vm.courseoutcome[index]['exams'][i]['attainment_per'] != undefined)
        {
          k.push(vm.courseoutcome[index]['exams'][i])
        }
     }
        vm.courseoutcome[index]['exams'] = [];
        for(var j=0; j<k.length; j++)
        {
          vm.courseoutcome[index]['exams'].push(k[j]);
        }
    }
    vm.addExamData = function(index)
    {
      // examArray contains full exam list
      console.log(examArray)
      console.log("**************")
      console.log(vm.courseoutcome[index]['exams'])
      var length =vm.courseoutcome[index]['exams'].length;
      var copy, flag = 0;
      for(var j=0; j<examArray.length; j++)
      {
        if(length == 0)
        {
          var copy_json = JSON.stringify(examArray[j]);
          copy_json = JSON.parse(copy_json);
          vm.courseoutcome[index]['exams'].push(copy_json)
        }
        else
        {
          for(var i=0; i<vm.courseoutcome[index]['exams'].length; i++)
          {
            if(parseInt(vm.courseoutcome[index]['exams'][i]['sno']) != parseInt(examArray[j]['sno']))
            {
              console.log(parseInt(vm.courseoutcome[index]['exams'][i]['sno'])+" , "+parseInt(examArray[j]['sno']))
              flag=1;

            }
            else
            {
              flag = 0;
              break;
            }
          }
          if(flag == 1)
          {
            copy = JSON.stringify(examArray[j])
            copy = JSON.parse(copy)
            vm.courseoutcome[index]['exams'].push(copy);
            flag=0;
          }
        }
      }

    }
    vm.edit=function(k, index)
    {
      console.log(k)
      vm.addExamData(index)
      for(var i=0; i<vm.courseoutcome.length; i++)
      {
        if(vm.courseoutcome[i]['co_num'] == parseInt(k))
        {
          editData = vm.courseoutcome[i];
          vm.courseoutcome[i]['edit'] = true;
          vm.isEdit = true;
        }
      }


    }
    vm.update=function(index, co_num)
    {
      var data={};

      if(vm.validate(index))
      {
        // vm.filterExam(index);
        // vm.courseoutcome[index]['exams'] = filterExam;
        data[MMS_CONST.CO_NUM]= co_num;
        data[REQUEST_KEY.SUBJECT_ID]= vm.subject;
        data[REQUEST_KEY.CO_ID] = vm.courseoutcome[index]['co_id'];
        data[REQUEST_KEY.DESCRIPTION]= vm.courseoutcome[index]['description'];
        data[REQUEST_KEY.EXAMS]= vm.courseoutcome[index]['exams'];
        console.log(data)
        var l=constApi.putRequest(data,MMS_SET_CO_DETAILS)
        l.then(function(response){
          if(response.status == 200)
          {
            swal('Success', response.data.msg, 'success');
          }
         vm.Submit();
        })
      }
    }
    vm.addNew=function()
    {
      var copy, coNum;
      vm.courseoutcome.push({});
      var len = vm.courseoutcome.length-1;
      console.log("len",len)
      vm.newCosIndex.push(len);
      if(len == 0)
      {
        coNum = vm.courseoutcome[len]['co_num'];
      }
      else
      {
        coNum = vm.courseoutcome[len-1]['co_num'];
      }
      coNum = vm.courseoutcome[len]['co_num'];
      vm.courseoutcome[len]['exams'] =  [];
      vm.courseoutcome[len]['edit'] = true;
      vm.courseoutcome[len]['co_num'] = len+1;
      // Array.prototype.push.apply(vm.courseoutcome[len]['exams'], examArray.slice(0))
      for(var i=0; i<examArray.length; i++)
      {
        copy = JSON.stringify(examArray[i])
        copy = JSON.parse(copy);
        vm.courseoutcome[len]['exams'].push(copy);
      }
    }
    vm.submitNewCO=function()
    {
      var data={}, data1 = [], data2 = {};
      console.log("vm.newCosIndex",vm.newCosIndex)
      for(var i=0; i<vm.newCosIndex.length; i++)
      {
        console.log("vm.newCosIndex[i]",vm.newCosIndex[i])
        if(vm.validate(vm.newCosIndex[i]))
        {
          var l = vm.newCosIndex[i];
          vm.filterExam(l);
          data1.push(vm.courseoutcome[l])
        }
      }
      console.log("vm.courseoutcome",vm.courseoutcome)
      data2[REQUEST_KEY.DESCRIPTION] = data1;
      data2[REQUEST_KEY.SUBJECT_ID]=vm.subject;
      console.log(data2)
      if(data1.length > 0)
      {
        var k=constApi.postRequest(data2,MMS_SET_CO_DETAILS);
        k.then(function(response){
          if(response.status == 200)
          {
            vm.Submit();
            data1 = [];
            vm.courseoutcome = [];
            vm.newCosIndex = [];
          }
        })
      }
    }
   }
})();
