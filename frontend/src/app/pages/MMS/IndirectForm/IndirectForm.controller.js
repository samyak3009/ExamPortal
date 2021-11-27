(function () {
    "use-strict";
    angular
        .module("minotaur")
        .controller("IndirectFormController", IndirectFormController);

    function IndirectFormController(
        $http,
        BaseUrl,
        $cookies,
        ResponseCheck,
        $scope,
        $state,
        REQUEST_KEY,
        constApi,
        NgTableParams,
        BaseUrl_Files,
        fileUpload,
        MMS_GET_COMPONENT_ACADEMICS,
        MMS_Student_NOMINAL,
        COURSE_OVERALL_ATTAINMENT,
        MMS_CONST
    ) {
        var vm = this;
        vm.count = 0;
        vm.htmlVariable = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li class="text-red">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
        vm.mainForm = false


        vm.formJson = {
            survey_id: 1,
            batch_from: 2017,
            batch_to: 2021,
            elements: {
                form: [
                    {
                        element_id: 12,
                        type: "input",
                        label: 'Text',
                        model: "Name1",
                        mand: true,
                        value: "test",
                        info: null,
                        category: "email",
                        options: ["op1", "op2", "op3", "op4"],
                        answer: "Test answer",
                        answerable: false
                    },
                    {
                        element_id: 1,
                        type: "input",
                        label: "Name",
                        model: "Name1",
                        mand: true,
                        value: "test",
                        info: null,
                        category: "text",
                        options: ["op1", "op2", "op3", "op4"],
                        answer: "Test answer",
                        answerable: false
                    },
                    {
                        element_id: 2,
                        type: "input",
                        label: "Address",
                        model: "Add1",
                        mand: true,
                        value: "test",
                        info: "Test info",
                        category: "date",
                        options: ["op1", "op2"],
                        answer: "Test answer",
                        answerable: false
                    },
                    {
                        element_id: 3,
                        type: "input",
                        label: "Mob. No.",
                        model: "mob",
                        mand: false,
                        value: "test",
                        info: "Test info",
                        category: "radio",
                        options: ["op1", "op2", "op3", "op4"],
                        answer: "Test answer",
                        answerable: false
                    },
                    {
                        element_id: 4,
                        type: "input",
                        label: "suggestions",
                        model: "sugg1",
                        mand: true,
                        value: "test",
                        info: "Test info",
                        category: "textarea",
                        options: ["op1", "op2"],
                        answer: "Test answer",
                        answerable: false
                    },
                    // {
                    //     element_id: 4,
                    //     type: "input",
                    //     label: "file upload",
                    //     model: "file1",
                    //     mand: true,
                    //     value: "test",
                    //     info: "Test info",
                    //     category: "file",
                    //     options: ["op1", "op2"],
                    //     answer: "Test answer",
                    //     answerable: false
                    // },
                    {
                        element_id: 5,
                        type: "select",
                        label: "select",
                        model: "select1",
                        mand: true,
                        value: "test",
                        info: "Test info",
                        category: "select",
                        options: [{
                            name: "kk",
                            value: "1"
                        },
                        {
                            name: "kk1",
                            value: "2"
                        },
                        {
                            name: "kk3",
                            value: "3"
                        },
                        {
                            name: "kk4",
                            value: "5"
                        }],
                        answer: "Test answer",
                        answerable: false
                    },
                    {
                        element_id: 2,
                        type: "input",
                        label: "jmmame",
                        value: "test",
                        mand: true,
                        info: "Test info",
                        category: "checkbox",
                        options: ["op1", "op2", "op3", "op4"],
                        answer: "Test answer",
                        answerable: false
                    }
                ],
                ques_paper: [
                    {
                        element_id: 1,
                        type: "input",
                        label: "Name",
                        value: "test",
                        mand: true,
                        info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus possimus accusantium quae, enim, odit omnis dolorem labore esse iusto fugit impedit consequatur id mollitia optio eligendi pariatur magnam deleniti!",
                        category: "text",
                        options: ["op1", "op2"],
                        answer: "Test answer",
                        answerable: "y"
                    },
                    {
                        element_id: 2,
                        type: "input",
                        label: "jmmame",
                        value: "test",
                        mand: true,
                        info: "Test info",
                        category: "date",
                        options: ["op1", "op2"],
                        answer: "Test answer",
                        answerable: "y"
                    },
                    {
                        element_id: 2,
                        type: "input",
                        label: "jmmame",
                        value: "test",
                        mand: true,
                        info: "Test info",
                        category: "checkbox",
                        options: ["op1", "op2", "op3", "op4"],
                        answer: "Test answer",
                        answerable: "y"
                    },
                    {
                        element_id: 2,
                        type: "input",
                        label: "jmmame",
                        value: "test",
                        mand: true,
                        info: "Test info",
                        category: "date",
                        options: ["op1", "op2"],
                        answer: "Test answer",
                        answerable: "y"
                    }
                ]
            }
        };



        vm.formJson1 = {
            "batch_from": 2017,
            "batch_to": 2021,
            "dept": 46,
            "elements": {
                "form": [
                    {
                        "answer": null,
                        "category": "text",
                        "element_id": 1,
                        "isremarks": false,
                        "label": "<p>ssad<br/></p>",
                        "len_check": null,
                        "remarks": "",
                        "reportAtt": false,
                        "type": "input",
                        "width": 6
                    },
                    {
                        "answer": "",
                        "answerable": false,
                        "category": "email",
                        "element_id": 2,
                        "info": "",
                        "isremarks": false,
                        "label": "<p>asdasd<br/></p>",
                        "mand": false,
                        "remarks": "",
                        "reportAtt": false,
                        "type": "input",
                        "width": 6
                    },
                    {
                        "answer": "",
                        "answerable": false,
                        "category": "textarea",
                        "element_id": 3,
                        "info": "",
                        "isremarks": false,
                        "label": "<p>sadsad<br/></p>",
                        "mand": false,
                        "max_words": null,
                        "remarks": "",
                        "reportAtt": false,
                        "type": "input",
                        "width": 12
                    },
                    {
                        "answerable": false,
                        "category": "select",
                        "element_id": 5,
                        "info": "",
                        "isremarks": false,
                        "label": "<p>asdasd<br/></p>",
                        "mand": false,
                        "options": [
                            {
                                "name": "sadsad",
                                "value": "sadsad"
                            },
                            {
                                "name": "sadsa",
                                "value": "sadsa"
                            }
                        ],
                        "options_answer": [
                            "sadsa"
                        ],
                        "remarks": "",
                        "reportAtt": false,
                        "type": "select",
                        "width": 6
                    },
                    {
                        "answerable": false,
                        "category": "file",
                        "element_id": 6,
                        "info": "",
                        "isremarks": false,
                        "label": "<p>adasd<br/></p>",
                        "mand": false,
                        "remarks": "",
                        "reportAtt": false,
                        "type": "input",
                        "width": 6
                    },
                    {
                        "answer": "",
                        "answerable": false,
                        "category": "number",
                        "element_id": 7,
                        "info": "",
                        "isremarks": false,
                        "label": "<p>sadasd<br/></p>",
                        "len_check": "",
                        "mand": false,
                        "max": "",
                        "min": "",
                        "po_id": [
                            23,
                            24
                        ],
                        "remarks": "",
                        "reportAtt": false,
                        "type": "input",
                        "width": 6
                    }
                ]
            },
            "survey_id": 751
        }

        // vm.exa="dd"

        // vm.forms = vm.formJson.elements.form;
        // vm.ques_paper = vm.formJson.elements.ques_paper;
        // console.log(vm.forms);
        vm.test = function () {
            console.log(vm.branch)
        };


        vm.image_index = function(index){
            console.log("index",index)

            vm.indexImg = index;
        }

        $scope.upload = function (files, id, folder, ind,index) {

            console.log(index)
            console.log(ind)
            var field = id;
            var myFile1 = []
            vm.file = false
            myFile1[field] = files[0];
            console.log(files)
            console.log(id)
            console.log(folder)
            var promise = fileUpload.uploadFileToUrl(myFile1[field], BaseUrl.RetBaseUrl() + 'dashboard/upload/', 'indirect/' + folder);
            promise.then(
                function (response) {
                    if (response.data['msg'] == 'uploaded') {
                        vm.doc = response.data.data;
                        vm.file = true;
                        vm.image = true;
                        console.log("doc",vm.doc)

                        vm.forms[vm.indexImg].answer = vm.doc
                        console.log(vm.forms)

                    }
                });
        }


        vm.hideTile = function(){
            vm.mainForm = false
        }

        vm.courseDropdown = function () {

            var params_course = {};
            params_course[REQUEST_KEY.REQUEST_TYPE] = 'form_data';
            params_course[REQUEST_KEY.REQUEST_BY] = REQUEST_KEY.NBA_COORD;
            params_course[REQUEST_KEY.COORDINATOR_TYPE] = 'NC';
            // console.log(params_course)
            // console.log(MMS_Student_NOMINAL)
            var k = constApi.getRequest(params_course, MMS_Student_NOMINAL);
            k.then(function (response) {
                console.log(response)
                vm.coursedropdown = response.data.course;
                vm.course_duration = response.data.course[0].duration;
            });

        }()



        vm.getBranchDropdown = function () {

            for (var i = 0; i < vm.coursedropdown.length; i++) {
                if (vm.course == vm.coursedropdown[i]['course']) {
                    vm.course_name = vm.coursedropdown[i]['course__value'];
                    break;
                }
            }
            var params_branch = {};
            params_branch[REQUEST_KEY.REQUEST_TYPE] = REQUEST_KEY.COORDINATOR_BRANCH;
            params_branch[REQUEST_KEY.COURSE] = vm.course;
            params_branch[REQUEST_KEY.COORD_TYPE] = 'NC';
            var k = constApi.getRequest(params_branch, MMS_GET_COMPONENT_ACADEMICS);
            k.then(function (response) {
                // console.log(response)
                vm.branchdropdown = response.data.data;
                vm.branch = vm.branchdropdown[0]['section__sem_id__dept'];
                // vm.get_sem();
                // vm.get_survey();
                // vm.getBatch()

            })

        }


        // vm.getBatch = function()
        // {
        //     // var batch_params = {};
        //     // var branch = vm.branch
        //     // console.log("branch",branch);
        // 	// batch_params[REQUEST_KEY.REQUEST_TYPE] = MMS_CONST.GET_BATCH;
        // 	// batch_params[REQUEST_KEY.DEPT] = branch;

        // 	// var k = constApi.getRequest(batch_params, COURSE_OVERALL_ATTAINMENT);
	    //     // k.then(function(response){
	    //     // 	console.log(response)
	    //     // 	vm.batch_data = response.data;
	    //     // 	vm.batch = vm.batch_data[0]['value'];
	    //     // 	vm.getSurvey()
        //     // })
            
        //     $http({
        //         method: "GET",
        //         url: BaseUrl.RetBaseUrl() + "StudentMMS/create_external_form/",
        //         params: {
        //             request_type: "get_batch",
        //             dept: vm.branch
        //         },
        //         headers: {
        //             Cookie: $cookies.get("sessionid"),
        //         },
        //         withCredentials: true,
        //     })
        //     .then(function (response) {
        //         ResponseCheck.ResponseStatus(response);
        //         console.log(response);
        //         vm.batch_data = response.data;
        //         // vm.getSurvey()
        //     })
        //     .catch(function (response) {
        //         ResponseCheck.ResponseStatus(response);
        //     });


        // }


        vm.batchTo_value = function(){
            vm.batch_to = parseInt(vm.batch) + vm.course_duration
            vm.getSurvey();
        }


        vm.getSurvey = function () {
            console.log(vm.branch)

            $http({
                method: 'GET',
                url: BaseUrl.RetBaseUrl() + 'StudentMMS/create_external_form/',
                params: {
                    'request_type': 'get_filled_survey',
                    dept: vm.branch,
                    batch_from:vm.batch,
                    batch_to:vm.batch_to
                },
                headers: {
                    'Cookie': $cookies.get('sessionid')
                },
                withCredentials: true
            }).then(function (response) {
                ResponseCheck.ResponseStatus(response);
                console.log(response)
                vm.surveydropdown = response.data

            }).catch(function (response) {
                ResponseCheck.ResponseStatus(response);
            });
        }


        vm.getJson = function () {

            for(var i=0; i<vm.surveydropdown.length; i++){
                if(vm.surveydropdown[i].survey_id == vm.survey_selected){
                    vm.heading_survey = vm.surveydropdown[i].survey_id__value
                }
            }

            if(vm.survey_selected =="" || vm.survey_selected == null || vm.survey_selected == undefined){
                swal("warning","Select survey","warning")
                return
            } 

            // var batch = vm.batch.split("-")

            $http({
                method: 'GET',
                url: BaseUrl.RetBaseUrl() + 'StudentMMS/create_external_form/',
                params: { 'request_type': 'get_form_data', 'survey_id': vm.survey_selected, 'dept': vm.branch, 'batch_from':vm.batch, 'batch_to':vm.batch_to },
                headers: {
                    'Cookie': $cookies.get('sessionid')
                },
                withCredentials: true
            }).then(function (response) {
                ResponseCheck.ResponseStatus(response);
                console.log(response)
                vm.mainForm = true
                vm.formJson1 = response.data
                console.log()
                vm.forms = vm.formJson1.elements.form


                console.log(vm.forms)

            }).catch(function (response) {
                ResponseCheck.ResponseStatus(response);
            });
        }


        vm.checkboxAnswer = function () {
            var ans = []
            for (var i = 0; i < vm.forms.length; i++) {
                if (vm.forms[i].category == 'checkbox') {


                    // console.log(vm.forms[i].options)
                    for (var j = 0; j < vm.forms[i].options.length; j++) {
                        // console.log(vm.forms[i].answer[j])
                        if (vm.forms[i].answer[j] == true) {
                            console.log(vm.forms[i].answer[j])
                            ans.push(vm.forms[i].options[j])
                        }
                    }
                    vm.forms[i].answer = ans;
                }
            }
        }


        vm.submit = function () {

            vm.checkboxAnswer();

            console.log("validation", vm.validtaion())
            if (!vm.validtaion()) {
                console.log("karan")
                return
            }
            else {

                swal({
                    title: "Are you sure?",
                    text: "You Want To Submit!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-primary",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                },
                    function () {

                        // max = 1445
                        // min = 5564
                        // vm.formJson1.ans_id = parseInt(Math.random() * (max - min) + min);

                        $http({
                            method: 'POST',
                            url: BaseUrl.RetBaseUrl() + 'StudentMMS/submit_answer_external_form/',
                            data: vm.formJson1,
                            headers: {
                                'Cookie': $cookies.get('sessionid')
                            },
                            withCredentials: true
                        }).then(function (response) {
                            ResponseCheck.ResponseStatus(response);

                            swal("Done!", "The form has been submit.", "success");
                            vm.hideTile();
                            vm.forms = []

                        }).catch(function (response) {
                            ResponseCheck.ResponseStatus(response);
                        });


                    });

            }


        }

        vm.validtaion = function () {

            for (var i = 0; i < vm.forms.length; i++) {

                // if(vm.form[i].category == 'email'){
                if (vm.forms[i].mand == true) {
                    if (vm.forms[i].answer == null || vm.forms[i].answer == undefined || vm.forms[i].answer == "") {
                        swal("Warning", "Question No. "+(i+1)+" is Mandatory", "warning")
                        return false;
                    }
                    else {
                        if (vm.forms[i].category == 'email') {
                            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            console.log(reg.test(vm.forms[i]['answer']))
                            if (reg.test(vm.forms[i]['answer']) == false) {
                                // console.log('karan')
                                swal("Warning", "Email not correct in question No.  " + (i+1), "warning")
                                return false;
                            }
                        }
                        else if (vm.forms[i].category == 'number') {
                            if (vm.forms[i].min != null) {
                                if (vm.forms[i].answer < vm.forms[i].min) {
                                    swal("Warning", "Answer cannot be smaller than minimum value in question No.  " + (i+1), "warning")
                                    return false
                                }
                            }
                            if (vm.forms[i].max != null) {
                                if (vm.forms[i].answer > vm.forms[i].max) {
                                    swal("Warning", "Answer cannot be bigger than maximum value in question No.  " + (i+1), "warning")
                                    return false
                                }
                            }

                            if (vm.forms[i].len_check != null && vm.forms[i].len_check != "") {
                                // console.log(vm.forms[i].answer.toString().length)
                                if (vm.forms[i].answer.toString().length != vm.forms[i].len_check) {
                                    swal("Warning", "Required length in question No. " + (i+1) +" is " + (vm.forms[i].len_check), "warning")
                                    return false
                                }
                            }
                        }
                        else if (vm.forms[i].category == 'paragraph') {
                            var str = vm.forms[i].answer
                            str = str.replace(/(^\s*)|(\s*$)/gi, "");
                            str = str.replace(/[ ]{2,}/gi, " ");
                            str = str.replace(/\n /, "\n");
                            var str_count = str.split(' ').length;
                            console.log(str)
                            console.log(str_count)
                            console.log(str_count > vm.forms[i].max_words)
                            if( vm.forms[i].max_words !=null){
                                if (str_count > vm.forms[i].max_words) {
                                    // swal("Warning", "Answer more than word limit in question No.  " + (i+1), "warning")
                                    swal("Warning", "Word limit in Question No. " + (i+1)+" is "+(vm.forms[i].max_words), "warning")
                                    str = ""
                                    return false
                                }
                            }
                            
                        }

                        else if (vm.forms[i].category == 'slider') {
                            if (vm.forms[i].answer < vm.forms[i].min) {

                                return false
                            }

                            if (vm.forms[i].answer > vm.forms[i].max) {
                                return false
                            }
                        }

                        else if (vm.forms[i].category == 'text') {
                            if (vm.forms[i].len_check != null) {

                                if (vm.forms[i].answer.length != vm.forms[i].len_check) {
                                    swal("Warning", "Required length in question No. " + (i+1) +" is " + (vm.forms[i].len_check), "warning")

                                    return false
                                }
                            }
                        }
                        else if (vm.forms[i].category == 'date') {

                            if (vm.forms[i].start != null) {
                                if (vm.forms[i].answer < vm.forms[i].start) {
                                    swal("Warning", "Wrong date in question No.  " + (i+1), "warning")
                                    return false
                                }
                            }
                            if (vm.forms[i].end != null) {
                                if (vm.forms[i].answer > vm.forms[i].end) {
                                    swal("Warning", "Wrong date in question No.  " + (i+1), "warning")
                                    return false
                                }
                            }
                        }
                    }
                }

                else {
                    if (vm.forms[i].answer != null && vm.forms[i].answer != undefined && vm.forms[i].answer != "") {

                        if (vm.forms[i].category == 'email') {
                            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            console.log(reg.test(vm.forms[i]['answer']))
                            if (reg.test(vm.forms[i]['answer']) == false) {
                                // console.log('karan')
                                swal("Warning", "Email not correct!! in question No.  " + (i+1), "warning")
                                return false;
                            }
                        }
                        else if (vm.forms[i].category == 'number') {
                            if (vm.forms[i].min != null) {
                                if (vm.forms[i].answer < vm.forms[i].min) {
                                    swal("Warning", "Answer cannot be smaller than minimum value in question No.  " + (i+1), "warning")
                                    return false
                                }
                            }
                            if (vm.forms[i].max != null) {
                                if (vm.forms[i].answer > vm.forms[i].max) {
                                    swal("Warning", "Answer cannot be bigger than maximum value in question No.  " + (i+1), "warning")
                                    return false
                                }
                            }

                            if (vm.forms[i].len_check != null && vm.forms[i].len_check != "") {
                                // console.log(vm.forms[i].answer.length)
                                if (vm.forms[i].answer.toString().length != vm.forms[i].len_check) {
                                    swal("Warning", "Required length in question No. " + (i+1) +" is " + (vm.forms[i].len_check), "warning")
                                    return false
                                }
                            }
                        }
                        else if (vm.forms[i].category == 'paragraph') {
                            var str = vm.forms[i].answer
                            str = str.replace(/(^\s*)|(\s*$)/gi, "");
                            str = str.replace(/[ ]{2,}/gi, " ");
                            str = str.replace(/\n /, "\n");
                            var str_count = str.split(' ').length;
                            console.log(str)
                            console.log(str_count)
                            console.log(vm.forms[i].max_words)
                            if( vm.forms[i].max_words !=null){
                            if (str_count > vm.forms[i].max_words && vm.forms[i].max_words != null) {
                                // swal("Warning", "Answer more than word limit in question No.  " + (i+1), "warning")
                                swal("Warning", "Word limit in Question No. " + (i+1)+" is "+(vm.forms[i].max_words), "warning")
                                str = ""
                                return false
                            }
                            }
                        }

                        else if (vm.forms[i].category == 'slider') {
                            if (vm.forms[i].answer < vm.forms[i].min) {

                                return false
                            }

                            if (vm.forms[i].answer > vm.forms[i].max) {
                                return false
                            }
                        }

                        else if (vm.forms[i].category == 'text') {
                            if (vm.forms[i].len_check != null) {

                                if (vm.forms[i].answer.length != vm.forms[i].len_check) {
                                    swal("Warning", "Required length in question No. " + (i+1) +" is " + (vm.forms[i].len_check), "warning")
                                    
                                    return false
                                }
                            }
                        }
                        else if (vm.forms[i].category == 'date') {

                            if (vm.forms[i].start != null) {
                                if (vm.forms[i].answer < vm.forms[i].start) {
                                    swal("Warning", "Wrong date in question No.  " + (i+1), "warning")
                                    return false
                                }
                            }
                            if (vm.forms[i].end != null) {
                                if (vm.forms[i].answer > vm.forms[i].end) {
                                    swal("Warning", "Wrong date in question No.  " + (i+1), "warning")
                                    return false
                                }
                            }
                        }
                    }
                }

            }

            return true

        }


    }
})();
