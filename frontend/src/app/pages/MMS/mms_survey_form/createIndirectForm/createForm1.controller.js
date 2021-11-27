(function () {
  "use-strict";
  angular
    .module("minotaur")
    .controller("CreateInternalIndirectController1", CreateIndirectController1);

  function CreateIndirectController1(
    $http,
    BaseUrl,
    $cookies,
    ResponseCheck,
    $scope,
    $state,
    REQUEST_KEY,
    constApi,
    NgTableParams,
    $uibModal,
    $log,
    MMS_GET_COMPONENT_ACADEMICS,
    MMS_Student_NOMINAL,
    BaseUrl_Files,
    fileUpload,
    COURSE_OVERALL_ATTAINMENT,
    MMS_CONST
  ) {
    var vm = this;
    vm.count = 0;
    vm.element_count = 0;
    // vm.ques_section = false

    vm.AddForm = false;
    vm.AddQues = false;

    vm.ques_type = true;
    vm.ques_attribute = false;

    vm.Formsteps = false;
    vm.survey_btn = true;

    // vm.btnQues = true
    vm.btnForm = true;

    vm.viewPrevious = false;

    vm.Addsurvey_button = true;

    vm.checkSession = false;

    vm.widthSlider = {
      value: 6,
      options: {
        floor: 4,
        ceil: 12,
        showSelectionBar: true,
      },
    };

    vm.slider1 = {
      value: 3,
      options: {
        ceil: 5,
        showSelectionBar: true,
      },
    };

    vm.items = ["item1", "item2", "item3"];

    // //////////////////////////////////////////Main Json//////////////
    vm.formJson1 = {
      survey_id: "",
      batch_from: "",
      batch_to: "",
      elements: {
        form: [],
      },
    };
    vm.formJson2 = {
      survey_id: "",
      dept: "",
      category: "",
      elements: {
        form: [],
      },
    };

    // vm.forms = vm.formJson1.elements.form;
    vm.forms = vm.formJson2.elements.form;
    // ///////////////////////////////////////////////////////////////
    console.log(vm);

    vm.hlo = "hello";
    console.log(vm.hlo);

    vm.nextStep = function (department, category, facultySurvey, x) {
      vm.department = department;
      vm.category = "Hello"; 
      vm.facultySurvey = facultySurvey;
      console.log($scope);
      console.log(vm);
      vm.hlo = "byee";
      console.log(vm.hlo);
      // for (var i = 0; i < vm.surveydropdown.length; i++) {
      //   if (vm.surveydropdown[i].sno == vm.survey_selected) {
      //     vm.heading_survey = vm.surveydropdown[i].value;
      //   }
      // }

      if (vm.category == null || vm.category == undefined || vm.category == "") {
        swal("warning", "Category field cannot be empty", "warning");
        return;
      }

      if (vm.facultySurvey == "" || vm.facultySurvey == undefined) {
        swal("warning", "Survey field cannot be empty", "warning");
        return;
      }

      vm.Formsteps = true;
      console.log(vm.Formsteps);

      vm.checkSession = false;
      vm.session = null;

      // vm.formJson1.survey_id = vm.survey_selected;
      vm.formJson2.survey_id = vm.facultySurvey;

      // var batch = vm.batch.split("-");
      // vm.formJson1.batch_from = vm.batch_from;
      // vm.formJson1.batch_to = vm.batch_to;
      // vm.formJson1.dept = vm.branch;
      vm.formJson2.dept = vm.department;
      vm.formJson2.category = vm.category;

      // console.log(vm.formJson1);
      console.log(vm.formJson2);

      vm.widthSlider.value = 6;

      vm.poConnection();
    };

    vm.editable = function () {
      if (vm.checkSession == true) {
        var param = {
          request_type: "get_status_of_survey",
          dept: vm.branch,
          batch_from: vm.batch_from,
          batch_to: vm.batch_to,
          survey_id: vm.survey_selected,
          session: vm.session,
        };
      } else {
        var param = {
          request_type: "get_status_of_survey",
          dept: vm.branch,
          batch_from: vm.batch_from,
          batch_to: vm.batch_to,
          survey_id: vm.survey_selected,
        };
      }

      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "StudentMMS/create_external_form/",
        params: param,
        headers: {
          Cookie: $cookies.get("sessionid"),
        },
        withCredentials: true,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          console.log(response.data);
          if (response.data.editable == true) {
            vm.sendJson();
          } else {
            swal("warning", response.data.status, "warning");
          }
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };

    vm.getOldJson = function (survey, dept, batchFrom, batchTo, session) {
      var param = {};
      vm.Formsteps = true;
      console.log(vm.Formsteps);
      if (!survey) {
        param = {
          request_type: "get_form_data",
          survey_id: vm.survey_selected,
          dept: vm.branch,
          batch_from: vm.batch_from,
          batch_to: vm.batch_to,
        };
      } else {
        param = {
          request_type: "get_form_data",
          survey_id: survey,
          dept: dept,
          batch_from: batchFrom,
          batch_to: batchTo,
          session: session,
        };

        vm.courseDropdown();
        vm.course = vm.coursedropdown[0]["course"];
        vm.getBranchDropdown();
        vm.getSurvey();
        vm.branch = dept;
        vm.batch_from = batchFrom;
        vm.batch_to = batchTo;
        vm.survey_selected = survey;

        vm.checkSession = true;
        vm.session = session;
      }
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "StudentMMS/create_external_form/",
        params: param,
        headers: {
          Cookie: $cookies.get("sessionid"),
        },
        withCredentials: true,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          vm.formJson1 = response.data;
          vm.forms = vm.formJson1.elements.form;
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };

    vm.hideviewPrevious = function () {
      if (vm.viewPrevious == true) {
        vm.viewPrevious = false;
      } else {
        vm.viewPrevious = true;
        vm.prevSurvey();
      }
    };

    vm.prevSurvey = function () {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "StudentMMS/create_external_form/",
        params: { request_type: "get_all_survey" },
        headers: {
          Cookie: $cookies.get("sessionid"),
        },
        withCredentials: true,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          // console.log(response)
          vm.data = response.data;

          for (var i = 0; i < vm.data.length; i++) {
            vm.data[i].creater =
              vm.data[i].created_by__name +
              " ( " +
              vm.data[i].created_by +
              " )";
          }
          vm.tableParams = new NgTableParams(
            {},
            {
              getData: function ($defer, params) {
                vm.tableParams = new NgTableParams(
                  {
                    sorting: {
                      requestdate: "desc",
                    },
                    filter: {},
                  },
                  {
                    counts: [10, 25, 50, 100, 250, 500],
                    dataset: vm.data,
                  }
                );
              },
            }
          );
          vm.load(NgTableParams);
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };

    vm.deleteSurvey = function (id) {
      swal(
        {
          title: "Are you sure?",
          text: "You want to delete the survey!",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-primary",
          confirmButtonText: "Yes",
          closeOnConfirm: false,
        },
        function () {
          $http({
            method: "DELETE",
            url: BaseUrl.RetBaseUrl() + "StudentMMS/create_external_form/",
            data: [{ id: id }],
            headers: {
              Cookie: $cookies.get("sessionid"),
            },
            withCredentials: true,
          })
            .then(function (response) {
              ResponseCheck.ResponseStatus(response);

              if (response.status == 200) {
                swal("Success", "Survey successfully deleted", "success");
                vm.prevSurvey();
                vm.Formsteps = false;
              } else {
                swal("warning", response.data.msg, "warning");
              }
            })
            .catch(function (response) {
              ResponseCheck.ResponseStatus(response);
            });
        }
      );
    };

    vm.clearForm = function () {
      if (vm.forms.length != 0) {
        swal(
          {
            title: "Are you sure?",
            text: "You want to clear form!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "Yes",
            closeOnConfirm: true,
          },
          function () {
            vm.forms = [];
            $scope.$digest();
          }
        );
      }
    };

    vm.enableBtn = function () {
      if (
        vm.batch_from != null &&
        vm.batch_to != null &&
        vm.survey_selected != null
      ) {
        vm.survey_btn = false;
      }
    };

    vm.test = function () {
      for (var i = 0; i < 3; i++) {
        console.log(vm.slider_table[i]);
      }
    };

    vm.tes = {
      element_id: 1,
      type: "input",
      label: "Name",
      value: "test",
      mand: true,
      info:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus possimus accusantium quae, enim, odit omnis dolorem labore esse iusto fugit impedit consequatur id mollitia optio eligendi pariatur magnam deleniti!",
      category: "text",
      options: ["op1", "op2"],
      answer: "Test answer",
      answerable: "y",
    };
    // vm['formJson1']['elements']['form'].push(vm.tes)
    // vm['forms'].push(vm.tes)
    // console.log("vm.tes",vm.tes)

    vm.newElement = function (element) {
      vm.element = element;
      if (vm.element == "paragraph" || vm.element == "dropdown") {
        vm.widthSlider.value = 12;
      } else {
        vm.widthSlider.value = 6;
      }
      vm.ques_attribute = true;
      vm.ques_type = false;
    };

    vm.input_type = false;

    vm.enbl_po = true;

    vm.inputText = false;

    vm.inputNumeric = false;

    vm.inputEmail = false;

    vm.options = [null];
    vm.options_answer = [null];

    vm.addOptions = function () {
      vm["options"].push(null);
      vm["options_answer"].push(null);
    };

    vm.delOptions = function () {
      if (vm["options"].length != 1) {
        vm["options"].splice(-1);
        vm["options_answer"].splice(-1);
      }
    };

    vm.assign_elementId = function () {
      for (var i = 0; i < vm.forms.length; i++) {
        if (vm.forms[i].element_id == vm.element_count) {
          vm.element_count = vm.element_count + 1;
          vm.assign_elementId();
        }
      }
    };

    vm.makeJson = function (edit, index) {
      vm.btnForm = true;
      if (vm.label == "" || vm.label == null || vm.label == undefined) {
        swal("Warning", "Question cannot be empty", "warning");
        return;
      }

      vm.assign_elementId();

      vm.Json = {
        type: null,
        category: null,
        label: null,
        mand: false,
        reportAtt: false,
        answerable: false,
        isremarks: false,
        remarks: null,
        po_id: null,
        answer: null,
        min: null,
        max: null,
        start: null,
        end: null,
        width: null,
        len_check: null,
        max_words: null,
        options_answer: [],
        options: [],
      };

      var arr_false = [
        "mandatory",
        "answerable",
        "remarks",
        "poconnection",
        "report_att",
      ];
      var arr_null = [
        "povalue",
        "info",
        "value",
        "start",
        "end",
        "min",
        "max",
        "len",
      ];

      for (var i = 0; i < arr_false.length; i++) {
        if (vm[arr_false[i]] == undefined || vm[arr_false[i]] == "") {
          console.log(vm[arr_false[i]]);
          vm[arr_false[i]] = false;
        }
      }

      for (var i = 0; i < arr_null.length; i++) {
        if (vm[arr_null[i]] == undefined || vm[arr_null[i]] == "") {
          console.log(vm[arr_null[i]]);
          vm[arr_null[i]] = null;
        }
      }

      vm.Json.label = vm.label;
      vm.Json.mand = vm.mandatory;
      vm.Json.answerable = vm.answerable;
      vm.Json.info = vm.info;

      if (vm.remarks == true) {
        vm.Json.isremarks = true;
        vm.Json.remarks = null;
      } else {
        vm.Json.isremarks = false;
        vm.Json.remarks = null;
      }

      if (vm.report_att == true) {
        vm.Json.reportAtt = true;
      } else {
        vm.Json.reportAtt = false;
      }

      if (vm.poconnection != true) {
        vm.Json.po_id = null;
      }

      ///////////////////////input_text////////////////
      if (vm.element == "text") {
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "text";
        vm.Json.answer = vm.value;
        vm.Json.width = vm.widthSlider.value;
        vm.Json.len_check = vm.len;
      }
      ///////////////////////input_email////////////////
      else if (vm.element == "email") {
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "email";
        vm.Json.answer = vm.value;
        vm.Json.width = vm.widthSlider.value;
      }
      ///////////////////////input_number////////////////
      else if (vm.element == "number") {
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "number";
        vm.Json.answer = vm.value;
        vm.Json.width = vm.widthSlider.value;

        if (
          vm.min != null ||
          (vm.min != undefined && vm.max != null) ||
          vm.max != undefined
        ) {
          if (vm.min > vm.max) {
            swal(
              "Warning",
              "Maximum value cannot be smaller than Minimum value",
              "warning"
            );
            return;
          }
        }
        vm.Json.max = vm.max;
        vm.Json.min = vm.min;

        vm.Json.len_check = vm.len;

        if (vm.poconnection == true) {
          if (vm.max == null || vm.max == undefined || vm.max == "") {
            swal("Warning", "Maximum value is mandatory", "warning");
            return;
          }
          vm.Json.po_id = vm.povalue;
        } else {
          vm.Json.po_id = null;
        }
      }
      /////////////////////////////paragraph/////////////////////////
      else if (vm.element == "paragraph") {
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "paragraph";
        vm.Json.answer = vm.value;
        vm.Json.width = vm.widthSlider.value;

        if (
          vm.max_words == null ||
          vm.max_words == undefined ||
          vm.max_words == ""
        ) {
          vm.Json.max_words = null;
        } else {
          vm.Json.max_words = vm.max_words;
        }
      }
      //////////////////////////radio////////////////////////////////
      else if (vm.element == "radio") {
        if (
          vm.options[0] == "" ||
          vm.options[0] == null ||
          vm.options[0] == undefined
        ) {
          swal("Warning", "Options are mandatory", "warning");
          return;
        }
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "radio";
        vm.Json.options = [];

        console.log(vm.options);
        console.log(vm.Json.options);

        for (var x = 0; x < vm.options.length; x++) {
          vm.Json.options[x] = vm.options[x];
        }

        vm.Json.options_answer = [];
        for (var x = 0; x < vm.options_answer.length; x++) {
          if (vm.options_answer[x] == true) {
            vm.Json.options_answer.push(vm.options[x]);
          }
        }
      }
      ////////////////////////////checkbox//////////////////////
      else if (vm.element == "checkbox") {
        if (
          vm.options[0] == "" ||
          vm.options[0] == null ||
          vm.options[0] == undefined
        ) {
          swal("Warning", "Options are mandatory", "warning");
          return;
        }
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "checkbox";
        vm.Json.options = [];

        for (var x = 0; x < vm.options.length; x++) {
          vm.Json.options[x] = vm.options[x];
        }

        vm.Json.options_answer = [];
        for (var x = 0; x < vm.options_answer.length; x++) {
          if (vm.options_answer[x] == true) {
            vm.Json.options_answer.push(vm.options[x]);
          }
        }
      }
      ////////////////////////////dropdown//////////////////////
      else if (vm.element == "dropdown") {
        if (
          vm.options[0] == "" ||
          vm.options[0] == null ||
          vm.options[0] == undefined
        ) {
          swal("Warning", "Options are mandatory", "warning");
          return;
        }
        vm.Json.type = "dropdown";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "dropdown";

        vm.Json.width = vm.widthSlider.value;
        // vm.Json.answer = ""
        vm.Json.options = [];

        console.log(vm.options);
        console.log(vm.Json.options);

        // for(var x=0 ; x<vm.options.length; x++){

        //     vm.Json.options[x] = { "name" : vm.options[x], "value" : vm.options[x]}

        // }

        for (var x = 0; x < vm.options.length; x++) {
          vm.Json.options[x] = vm.options[x];
        }
        vm.Json.options_answer = [];
        for (var x = 0; x < vm.options_answer.length; x++) {
          if (vm.options_answer[x] == true) {
            vm.Json.options_answer.push(vm.options[x]);
          }
        }
      }
      //////////////////////////////slider////////////////////////
      else if (vm.element == "slider") {
        if (vm.min == null || vm.min == undefined || vm.min == "") {
          swal("Warning", "Minimum value field is mandatory", "warning");
          return;
        }

        if (vm.max == null || vm.max == undefined || vm.max == "") {
          swal("Warning", "Maximum value field is mandatory", "warning");
          return;
        }

        if (vm.max < vm.min) {
          swal(
            "Warning",
            "Maximum value cannot be smaller than Minimum value",
            "warning"
          );
          return;
        }
        console.log(vm.value);
        if (vm.value != null && vm.value != undefined && vm.value != "") {
          if (vm.value > vm.max || vm.value < vm.min) {
            swal(
              "Warning",
              "Value Should be between maximum and minimum value ",
              "warning"
            );
            return;
          }
        }

        vm.Json.type = "slider";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "slider";
        vm.Json.answer = vm.value;
        vm.Json.data = {};
        vm.Json.data.floor = vm.min;
        vm.Json.data.ceil = vm.max;

        vm.Json.max = vm.max;
        vm.Json.min = vm.min;
        vm.Json.data.showSelectionBar = true;

        vm.Json.width = vm.widthSlider.value;
        if (vm.poconnection == true) {
          vm.Json.po_id = vm.povalue;
        } else {
          vm.Json.po_id = null;
        }
      }
      //////////////////////////////////Date////////////////////////
      else if (vm.element == "date") {
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "date";
        if (
          vm.start_date == null ||
          vm.start_date == undefined ||
          vm.start_date == ""
        ) {
          vm.Json.start = null;
        } else {
          vm.Json.start = vm.start_date;
        }

        if (
          vm.end_date == null ||
          vm.end_date == undefined ||
          vm.end_date == ""
        ) {
          vm.Json.end = null;
        } else {
          vm.Json.end = vm.end_date;
        }

        if (vm.start_date > vm.end_date) {
          swal(
            "Warning",
            "Ending date cannot be less than Starting date",
            "warning"
          );
          return;
        }
      }

      // ////////////////////file//////////////////////////////////
      else if (vm.element == "file") {
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "file";
        vm.Json.answer = null;
        vm.Json.width = vm.widthSlider.value;
      }

      // ////////////////table//////////////////////////////////////
      else if (vm.element == "table") {
        vm.Json.type = "table";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "file";

        var rowlabel = [];
        for (var i = 0; i < vm.table_rows.length; i++) {
          if (vm.row_label[i] == null || vm.row_label == undefined) {
            swal("warning", "All in the table are mandatory");
            return;
          }

          rowlabel[i] = vm.row_label[i];
        }

        vm.Json.rowlabel = rowlabel;
        console.log(vm.Json.rowlabel);

        vm.Json.sliderStart = vm.slider_start;
        vm.Json.sliderEnd = vm.slider_end;

        vm.Json.rowHeading = vm.row_heading;
      }

      ///////////////////////////////////////////////////

      for (var key in vm.Json) {
        if (vm["Json"].hasOwnProperty(key)) var push = true;
      }

      if (push == true) {
        if (edit == "edit") {
          vm["forms"][index] = vm.Json;
        } else if (vm.active_part == "form") {
          vm["forms"].push(vm.Json);
        }
      }

      console.log(vm.forms);
      // console.log(vm.forms[0].element_id)

      vm.AddForm = false;
      // vm.AddQues = false

      vm.clearFields();
    };

    vm.batchTo = function () {
      vm.batch_to = vm.batch_from + vm.course_duration;
      console.log(vm.batch_to);
    };

    vm.deleteElement = function (element) {
      for (x = 0; x < vm.forms.length; x++) {
        if (vm.forms[x].element_id == element) {
          vm.forms.splice(x, 1);
        }
      }

      console.log(vm.forms);
    };

    vm.slider_start = 1;

    vm.slider_end = 5;

    vm.sliderTable = {
      value: vm.slider_start,
      options: {
        floor: vm.slider_start,
        ceil: vm.slider_end,
        showSelectionBar: true,
      },
    };

    vm.clearFields = function () {
      vm.element = null;

      vm.label = "";
      vm.mandatory = false;
      vm.answerable = false;
      vm.poconnection = false;
      vm.remarks = false;
      vm.povalue = "choose";
      vm.info = "";
      vm.value = "";
      vm.start_date = "";
      vm.end_date = "";
      vm.min = "";
      vm.max = "";
      vm.max_words = "";
      vm.len = "";
      vm.options = [null];
      vm.options_answer = [null];
      vm.report_att = false;

      vm.demo_ques = null;
    };

    vm.table_rows = [null];

    vm.Addrow = function (add) {
      vm.table_rows.push(null);
      console.log(vm.slider_start);
      console.log(vm.slider_end);
    };

    vm.Removerow = function () {
      vm.table_rows.splice(-1);
    };

    vm.moveUp = function (element) {
      for (x = 0; x < vm.forms.length; x++) {
        if (vm.forms[x].element_id == element && x > 0) {
          var a = vm.forms[x];
          // console.log(a)
          // console.log(vm.forms)
          vm.forms.splice(x, 1);
          // console.log(vm.forms)
          vm.forms.splice(x - 1, 0, a);
          // console.log(vm.forms)
          break;
        }
      }
    };

    vm.moveDown = function (element) {
      for (x = 0; x < vm.forms.length; x++) {
        if (vm.forms[x].element_id == element && x < vm.forms.length - 1) {
          // console.log(vm.forms[x].element_id)
          var a = vm.forms[x];
          // console.log(x)
          // console.log(vm.forms)
          vm.forms.splice(x, 1);
          // console.log(vm.forms)
          vm.forms.splice(x + 1, 0, a);
          // console.log(vm.forms)
          break;
        }
      }
    };

    vm.editElement = function (element) {
      // vm.ques_attribute = true

      vm.add_btn = false;
      vm.edit_btn = true;

      for (x = 0; x < vm.forms.length; x++) {
        if (vm.forms[x].element_id == element) {
          vm.element = vm.forms[x].category;

          vm.AddForm = true;
          vm.ques_attribute = true;
          vm.ques_type = false;
          // console.log(vm.ques_attribute);

          vm.label = vm.forms[x].label;
          vm.mandatory = vm.forms[x].mand;
          vm.answerable = vm.forms[x].answerable;
          vm.remarks = vm.forms[x].isremarks;

          if (vm.forms[x].po_id != null) {
            vm.povalue = vm.forms[x].po_id;
          }

          vm.info = vm.forms[x].info;
          vm.value = vm.forms[x].answer;

          vm.start_date = vm.forms[x].start;
          vm.end_date = vm.forms[x].end;

          vm.min = vm.forms[x].min;
          vm.max = vm.forms[x].max;

          vm.len = vm.len_check;

          vm.report_att = vm.forms[x].reportAtt;

          vm.widthSlider.value = vm.forms[x].width;
          vm.max_words = vm.forms[x].max_words;

          if (
            vm.element == "checkbox" ||
            vm.element == "dropdown" ||
            vm.element == "radio"
          ) {
            for (var i = 1; i < vm.forms[x].options.length; i++) {
              vm["options"].push(null);
              vm["options_answer"].push(null);
            }

            for (var i = 0; i < vm.forms[x].options.length; i++) {
              vm.options[i] = vm.forms[x].options[i];

              for (var j = 0; j < vm.forms[x].options_answer.length; j++) {
                if (vm.forms[x].options[i] == vm.forms[x].options_answer[j]) {
                  vm.options_answer[i] = true;
                }
              }
            }
          }
          break;
        }
      }
      // console.log("eeeeeee",x)
      vm.edit_check = x;
    };

    vm.ShowQues = function (part) {
      if (part == "form") {
        vm.AddForm = true;

        vm.btnForm = false;

        vm.ques_type = true;
        vm.ques_attribute = false;

        vm.label = "";

        vm.active_part = "form";

        vm.add_btn = true;
        vm.edit_btn = false;
      }
    };

    vm.closeQues = function () {
      vm.clearFields();

      // console.log("karrr")
      // console.log(vm.active_part)
      // if (vm.active_part == "form") {
      vm.AddForm = false;
      vm.btnForm = true;
      // }
    };

    // vm.hideTile = function(){
    //     vm.Formsteps = false
    // }

    vm.courseDropdown = function () {
      var params_course = {};
      params_course[REQUEST_KEY.REQUEST_TYPE] = "form_data";
      params_course[REQUEST_KEY.REQUEST_BY] = REQUEST_KEY.NBA_COORD;
      params_course[REQUEST_KEY.COORDINATOR_TYPE] = "NC";
      // console.log(params_course)
      // console.log(MMS_Student_NOMINAL)
      var k = constApi.getRequest(params_course, MMS_Student_NOMINAL);
      k.then(function (response) {
        // console.log(response)
        vm.coursedropdown = response.data.course;
        vm.course_duration = response.data.course[0].duration;
      });
    };
    vm.courseDropdown();

    vm.getBranchDropdown = function () {
      for (var i = 0; i < vm.coursedropdown.length; i++) {
        if (vm.course == vm.coursedropdown[i]["course"]) {
          vm.course_name = vm.coursedropdown[i]["course__value"];
          break;
        }
      }
      var params_branch = {};
      params_branch[REQUEST_KEY.REQUEST_TYPE] = REQUEST_KEY.COORDINATOR_BRANCH;
      params_branch[REQUEST_KEY.COURSE] = vm.course;
      params_branch[REQUEST_KEY.COORD_TYPE] = "NC";
      var k = constApi.getRequest(params_branch, MMS_GET_COMPONENT_ACADEMICS);
      k.then(function (response) {
        // console.log(response)
        vm.branchdropdown = response.data.data;
        vm.branch = vm.branchdropdown[0]["section__sem_id__dept"];
        // vm.get_sem();
        // vm.get_survey();
        vm.getBatch();
      });
    };

    vm.getBatch = function () {
      var batch_params = {};
      var branch = vm.branch;
      batch_params[REQUEST_KEY.REQUEST_TYPE] = MMS_CONST.GET_BATCH;
      batch_params[REQUEST_KEY.DEPT] = branch;

      var k = constApi.getRequest(batch_params, COURSE_OVERALL_ATTAINMENT);
      k.then(function (response) {
        console.log(response);
        vm.batch_data = response.data;
        vm.batch = vm.batch_data[0]["value"];
        vm.getSurvey();
      });
    };

    vm.getSurvey = function () {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "StudentMMS/create_external_form/",
        params: {
          request_type: "get_survey",
        },
        headers: {
          Cookie: $cookies.get("sessionid"),
        },
        withCredentials: true,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          console.log(response);
          vm.surveydropdown =
            response.data["INDIRECT ATTAINMENT METHOD (EXTERNAL)"];
          // vm.survey_selected = response.data["INDIRECT ATTAINMENT METHOD (EXTERNAL)"][0].sno;
          // console.log(vm.surveydropdown);
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };

    vm.btn_disable = function () {
      vm.Addsurvey_button = false;
    };

    vm.poConnection = function () {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "StudentMMS/create_internal_fac_survey/",
        params: {
          request_type: "get_po",
          dept: vm.department,
        },
        headers: {
          Cookie: $cookies.get("sessionid"),
        },
        withCredentials: true,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          console.log(response);
          vm.po_data = response.data;
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };

    vm.previewQues = function () {
      vm.demo_ques = vm.label;
    };

    vm.sendJson = function () {
      if (vm.batch == null || vm.batch == undefined || vm.batch == "") {
        swal("warning", "Batch field cannot be empty", "warning");
        return;
      }

      if (vm.survey_selected == "" || vm.survey_selected == undefined) {
        swal("warning", "Survey field cannot be empty", "warning");
        return;
      }

      // vm.formJson1.elements.form = vm.forms;
      vm.formJson2.elements.form = vm.forms;

      // if (vm.formJson1.elements.form.length == 0) {
        if (vm.formJson2.elements.form.length == 0) {
        console.log("empty");
        swal("warning", "No questions Added!!", "warning");
        return;
      }

      console.log(vm.formJson2);

      swal(
        {
          title: "Are you sure?",
          text: "The form is completed!",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-primary",
          confirmButtonText: "Yes",
          closeOnConfirm: false,
        },
        function () {
          // for (var i = 0; i < vm.formJson1.elements.form.length; i++) {
          //   vm.formJson1.elements.form[i].element_id = i + 1;
          // }
          for (var i = 0; i < vm.formJson2.elements.form.length; i++) {
            vm.formJson2.elements.form[i].element_id = i + 1;
          }

          $http({
            method: "POST",
            url: BaseUrl.RetBaseUrl() + "StudentMMS/create_external_form/",
            // data: vm.formJson1,
            data: vm.formJson2,
            headers: {
              Cookie: $cookies.get("sessionid"),
            },
            withCredentials: true,
          })
            .then(function (response) {
              ResponseCheck.ResponseStatus(response);

              swal("Done!", "The form has been saved.", "success");
              vm.Formsteps = false;
              console.log("karan", vm.forms);
              vm.formJson1.elements.form = [];
              vm.forms = [];
              // vm.ques_paper = []
            })
            .catch(function (response) {
              ResponseCheck.ResponseStatus(response);
            });
        }
      );
    };
  }
})();
