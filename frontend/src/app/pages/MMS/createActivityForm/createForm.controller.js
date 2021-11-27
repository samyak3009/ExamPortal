(function () {
  "use-strict";
  angular
    .module("minotaur")
    .controller("CreateActivityForm", CreateActivityForm);

  function CreateActivityForm(
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
    BaseUrl_Files,
    fileUpload
  ) {
    var vm = this;
    // =========================================
    if (
      JSON.parse(localStorage.getItem("data")) == null ||
      JSON.parse(localStorage.getItem("data")).role != "faculty"
    ) {
      $state.go("login");
    }
    // ===================INITIAL VARIABLES===============================================================================================
    vm.count = 0;
    vm.edit_status = false;
    vm.element_count = 0;
    vm.AddForm = false;
    vm.AddQues = false;
    vm.ques_type = true;
    vm.ques_attribute = false;
    vm.Formsteps = false;
    vm.survey_btn = true;
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
    vm.answerable = false;
    vm.mandatory = false;
    vm.report_att = true;
    vm.input_type = false;
    vm.enbl_po = true;
    vm.inputText = false;
    vm.inputNumeric = false;
    vm.inputEmail = false;
    vm.options = [null];
    vm.options_answer = [null];
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
    vm.table_rows = [null];
    vm.tes = {
      element_id: 1,
      type: "input",
      label: "Name",
      value: "test",
      mand: true,
      info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus possimus accusantium quae, enim, odit omnis dolorem labore esse iusto fugit impedit consequatur id mollitia optio eligendi pariatur magnam deleniti!",
      category: "text",
      options: ["op1", "op2"],
      answer: "Test answer",
      answerable: "y",
    };
    // ===================END INITIAL VARIABLES===============================================================================================

    vm.datetime_conversion = function () {
      console.log(vm.startDate);
      if (vm.course == "" || vm.course == undefined || vm.course == null) {
        swal("warning", "Course cannot be empty", "warning");
        return;
      }
      if (vm.subject == "" || vm.subject == undefined || vm.subject == null) {
        swal("warning", "Subject cannot be empty", "warning");
        return;
      }
      console.log(vm.startDate);
      if (
        vm.startDate == "" ||
        vm.startDate == undefined ||
        vm.startDate == null
      ) {
        swal("warning", "Start Date cannot be empty", "warning");
        return;
      }
      if (vm.endDate == "" || vm.endDate == undefined || vm.endDate == null) {
        swal("warning", "End Date cannot be empty", "warning");
        return;
      }
      if (
        vm.start_time == "" ||
        vm.start_time == undefined ||
        vm.start_time == null
      ) {
        swal("warning", "Start Time cannot be empty", "warning");
        return;
      }
      if (
        vm.end_time == "" ||
        vm.end_time == undefined ||
        vm.end_time == null
      ) {
        swal("warning", "End Time cannot be empty", "warning");
        return;
      }
      if (
        vm.exam_title == "" ||
        vm.exam_title == undefined ||
        vm.exam_title == null
      ) {
        swal("warning", "Exam Title cannot be empty", "warning");
        return;
      }

      vm.nextStep();

      dd = vm.startDate.getDate();
      mm = vm.startDate.getMonth() + 1;
      yyyy = vm.startDate.getFullYear();
      hh = vm.start_time.getHours();
      min = vm.start_time.getMinutes();
      if (hh < 10) {
        hh = "0" + hh;
      }
      if (min < 10) {
        min = min + "0";
      }
      var exam_start =
        yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + "00";

      dd = vm.endDate.getDate();
      mm = vm.endDate.getMonth() + 1;
      yyyy = vm.endDate.getFullYear();
      hh = vm.end_time.getHours();
      min = vm.end_time.getMinutes();
      if (hh < 10) {
        hh = "0" + hh;
      }
      if (min < 10) {
        min = min + "0";
      }
      var exam_end =
        yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + "00";

      var k = new Date(exam_end);

      if (Date.parse(exam_start) > Date.parse(exam_end)) {
        swal("From Date-time should be less than To Date-time", "", "warning");
        return;
      }

      vm.exam_start = exam_start;
      vm.exam_end = exam_end;

      console.log(exam_start);
      console.log(exam_end);
    };

    vm.nextStep = function () {
      vm.Formsteps = true;
      vm.checkSession = false;
      vm.session = null;
      vm.formJson1.survey_id = vm.survey_selected;
      vm.formJson1.dept = vm.branch;
      console.log(vm.formJson1);
      vm.widthSlider.value = 6;
    };
    vm.test = function () {
      for (var i = 0; i < 3; i++) {
        console.log(vm.slider_table[i]);
      }
    };

    // ===================================================================================================================
    // =========================Main JSON=====================
    vm.formJson1 = {
      course: "",
      subject: "",
      exam_title: "",
      start_time: "",
      date_of_exam: "",
      end_time: "",
      elements: {
        form: [],
      },
    };
    // =======================Form Json==================
    vm.forms = vm.formJson1.elements.form;
    // ///////////////////////////////////////////////////////////////
    // ========Clear Form Button===================
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
    // ===========Add Question Button================
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
    // ==============Submit Form Button===========
    vm.editable = function () {
      if (vm.checkSession == true) {
        var param = {
          request_type: "get_status_of_survey",
          dept: vm.branch,
          survey_id: vm.survey_selected,
          session: vm.session,
        };
      } else {
        var param = {
          request_type: "get_status_of_survey",
          dept: vm.branch,
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
    // =====================send Json================
    vm.sendJson = function () {
      if (vm.course == "" || vm.course == undefined || vm.course == null) {
        swal("warning", "Course cannot be empty", "warning");
        return;
      }
      if (vm.subject == "" || vm.subject == undefined || vm.subject == null) {
        swal("warning", "Subject cannot be empty", "warning");
        return;
      }
      if (
        vm.startDate == "" ||
        vm.startDate == undefined ||
        vm.startDate == null
      ) {
        swal("warning", "Start Date cannot be empty", "warning");
        return;
      }
      if (vm.endDate == "" || vm.endDate == undefined || vm.endDate == null) {
        swal("warning", "End Date cannot be empty", "warning");
        return;
      }
      if (
        vm.start_time == "" ||
        vm.start_time == undefined ||
        vm.start_time == null
      ) {
        swal("warning", "Start Time cannot be empty", "warning");
        return;
      }
      if (
        vm.end_time == "" ||
        vm.end_time == undefined ||
        vm.end_time == null
      ) {
        swal("warning", "End Time cannot be empty", "warning");
        return;
      }
      if (
        vm.exam_title == "" ||
        vm.exam_title == undefined ||
        vm.exam_title == null
      ) {
        swal("warning", "Exam Title cannot be empty", "warning");
        return;
      }

      vm.datetime_conversion();

      vm.formJson1.course = vm.course;
      vm.formJson1.subject = vm.subject;
      vm.formJson1.exam_title = vm.exam_title;
      vm.formJson1.start_time = vm.exam_start;
      vm.formJson1.end_time = vm.exam_end;
      vm.formJson1.date_of_exam = vm.startDate;

      console.log(vm.formJson1);

      vm.formJson1.elements.form = vm.forms;

      if (vm.formJson1.elements.form.length == 0) {
        console.log("empty");
        swal("warning", "No questions Added!!", "warning");
        return;
      }
      console.log(vm.formJson1);
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
          for (var i = 0; i < vm.formJson1.elements.form.length; i++) {
            vm.formJson1.elements.form[i].element_id = i + 1;
          }

          $http({
            method: "POST",
            url: BaseUrl.RetBaseUrl() + "exam/create_form/",
            data: vm.formJson1,
            headers: {
              "Content-Type": undefined,
            },
          })
            .then(function (response) {
              if (response.status === 200) {
                vm.edit_status = false;
                vm.prevForm();
                vm.course = "";
                vm.subject = "";
                vm.startDate = null;
                vm.endDate = null;
                vm.start_time = null;
                vm.end_time = null;
                vm.exam_title = null;
                swal("Done!", "The form has been saved.", "success");
                vm.Formsteps = false;
                vm.formJson1.elements.form = [];
                vm.forms = [];
              } else if (response.status === 202) {
                swal("warning!", response.data.msg, "warning");
              }
            })
            .catch(function (response) {
              ResponseCheck.ResponseStatus(response);
            });
        }
      );
    };
    // =================Menu Function=================
    vm.moveUp = function (element) {
      for (x = 0; x < vm.forms.length; x++) {
        if (vm.forms[x].element_id == element && x > 0) {
          var a = vm.forms[x];
          vm.forms.splice(x, 1);
          vm.forms.splice(x - 1, 0, a);
          break;
        }
      }
    };
    vm.deleteElement = function (element) {
      for (x = 0; x < vm.forms.length; x++) {
        if (vm.forms[x].element_id == element) {
          vm.forms.splice(x, 1);
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

          vm.len = vm.forms[x].len_check;

          vm.report_att = vm.forms[x].reportAtt;

          vm.widthSlider.value = vm.forms[x].width;
          vm.max_words = vm.forms[x].max_words;
          vm.maxMarks = vm.forms[x].max_marks;

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
    vm.moveDown = function (element) {
      for (x = 0; x < vm.forms.length; x++) {
        if (vm.forms[x].element_id == element && x < vm.forms.length - 1) {
          var a = vm.forms[x];
          vm.forms.splice(x, 1);
          vm.forms.splice(x + 1, 0, a);
          break;
        }
      }
    };
    // ////////////////////////////////////////////////////////////////////////////////////////
    // ===============close Question Button================
    vm.closeQues = function () {
      vm.clearFields();
      vm.AddForm = false;
      vm.btnForm = true;
      // }
    };
    // ============================Add Question Type Button=============
    vm.newElement = function (element) {
      vm.element = element;
      if (vm.element == "paragraph") {
        vm.widthSlider.value = 12;
      } else {
        vm.widthSlider.value = 6;
      }
      vm.ques_attribute = true;
      vm.ques_type = false;
    };
    vm.previewQues = function () {
      vm.demo_ques = vm.label;
    };

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
    vm.Addrow = function (add) {
      vm.table_rows.push(null);
      console.log(vm.slider_start);
      console.log(vm.slider_end);
    };

    vm.Removerow = function () {
      vm.table_rows.splice(-1);
    };
    // ================================================make JSON=====================================
    vm.assign_elementId = function () {
      for (var i = 0; i < vm.forms.length; i++) {
        if (vm.forms[i].element_id == vm.element_count) {
          vm.element_count = vm.element_count + 1;
          vm.assign_elementId();
        }
      }
    };

    // ===================================Add Question Json=========================
    vm.makeJson = function (edit, index) {
      vm.btnForm = true;

      if (vm.label == "" || vm.label == null || vm.label == undefined) {
        swal("Warning", "Question cannot be empty", "warning");
        return;
      }

      // if (vm.maxMarks == "" || vm.maxMarks == null || vm.maxMarks == undefined) {
      //   swal("Warning", "Please fill the Max Marks", "warning");
      //   return;
      // }

      vm.assign_elementId();

      vm.Json = {
        type: null,
        category: null,
        label: null,
        mand: false,
        max_marks: null,
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

      var arr_false = ["mandatory", "answerable", "remarks", "report_att"];
      var arr_null = ["info", "value", "start", "end", "min", "max"];

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

      if (
        vm.maxMarks == null ||
        vm.maxMarks == undefined ||
        vm.maxMarks == ""
      ) {
        vm.Json.max_marks = null;
      } else {
        vm.Json.max_marks = vm.maxMarks;
      }

      ///////////////////////input_text////////////////
      if (vm.element == "text") {
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "text";
        vm.Json.answer = vm.value;
        vm.Json.width = vm.widthSlider.value;
        if (vm.len == null || vm.len == undefined || vm.len == "") {
          vm.Json.len_check = null;
        } else {
          vm.Json.len_check = vm.len;
        }
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
      }

      //////////////////////////////////Date////////////////////////
      else if (vm.element == "date") {
        vm.Json.type = "input";
        vm.Json.element_id = vm.element_count;
        vm.Json.category = "date";
        vm.Json.width = vm.widthSlider.value;
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

    vm.clearFields = function () {
      vm.element = null;
      vm.label = "";
      vm.mandatory = false;
      // vm.answerable = false;
      // vm.remarks = false;
      vm.info = "";
      vm.value = "";
      vm.start_date = "";
      vm.end_date = "";
      vm.min = "";
      vm.max = "";
      vm.maxMarks = null;
      vm.max_words = "";
      vm.len = "";
      vm.options = [null];
      vm.options_answer = [null];
      // vm.report_att = false;
      vm.demo_ques = null;
    };
    // =============End Add Question===========================================
    // ====================================================View Previous=======================================================================
    vm.hideviewPrevious = function () {
      if (vm.viewPrevious == true) {
        vm.viewPrevious = false;
      } else {
        vm.viewPrevious = true;
        vm.prevForm();
      }
    };
    vm.prevForm = function () {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "exam/create_form/",
        params: { request_type: "get_form" },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          vm.data = response.data;
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
    // // =================View Survey Button======================
    vm.getOldJson = function (id) {
      var param = {};
      vm.Formsteps = true;
      param = {
        request_type: "get_data",
        form_id: id,
      };
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "exam/create_form/",
        params: param,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          if (response.status === 200) {
            vm.edit_status = true;
            document.documentElement.scrollTop = 0;
            vm.formJson1 = response.data;
            vm.forms = vm.formJson1.elements;
            vm.course = vm.formJson1.course;
            vm.subject = vm.formJson1.subject;
            vm.exam_title = vm.formJson1.exam_title;
            vm.startDate = new Date(vm.formJson1.start_time);
            vm.endDate = new Date(vm.formJson1.end_time);
            vm.end_time = new Date(vm.formJson1.end_time);
            vm.start_time = new Date(vm.formJson1.start_time);
          }
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };
    // ========================Delete Survey Button=======================
    vm.deleteForm = function (id) {
      swal(
        {
          title: "Are you sure?",
          text: "You want to delete the form!",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-primary",
          confirmButtonText: "Yes",
          closeOnConfirm: false,
        },
        function () {
          $http({
            method: "GET",
            url: BaseUrl.RetBaseUrl() + "exam/create_form/",
            params: { request_type: "get_delete", form_id: id },
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              ResponseCheck.ResponseStatus(response);

              if (response.status == 200) {
                swal("Success", "Form successfully deleted", "success");
                vm.prevForm();
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
    // //////////////////////////////////////////////////===========================================================================================================
  }
})();
