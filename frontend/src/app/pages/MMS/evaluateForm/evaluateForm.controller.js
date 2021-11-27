(function () {
  "use-strict";
  angular
    .module("minotaur")
    .controller("EvaluateFormController", EvaluateFormController)
    .controller("MyModalInstanceController", MyModalInstanceController);

  function MyModalInstanceController(
    $uibModalInstance,
    ExportToExcel,
    $log,
    status
  ) {
    var vm = this;
    // vm.view1=true;
    // vm.view2=false;
    // vm.view3=false
    vm.viewTab = false;
    vm.status = status;
    vm.selectedTab = true;

    vm.ok = function () {
      $uibModalInstance.close("ok");
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };

    vm.exportToExcel = function (tableId, filename) {
      ExportToExcel.export(tableId, filename);
    };
  }

  function EvaluateFormController(
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
    $uibModal
  ) {
    var vm = this;
    // =============================================
    if (
      JSON.parse(localStorage.getItem("data")) == null ||
      JSON.parse(localStorage.getItem("data")) == undefined ||
      JSON.parse(localStorage.getItem("data")) == "" ||
      JSON.parse(localStorage.getItem("data")).role != "faculty"
    ) {
      $state.go("login");
    }
    // ================INITIAL VARIABLES=====================================
    vm.count = 0;
    vm.showStudent = false;
    vm.htmlVariable =
      '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li class="text-red">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
    vm.mainForm = false;
    vm.category = null;
    vm.subCategory = null;
    // ================JSON Format=================================
    vm.formJson1 = {
      form_title: "Form Title",
      form_id: null,
      elements: {
        form: [
          {
            answer: null,
            category: "text",
            element_id: 1,
            isremarks: false,
            label: "<p>ssad<br/></p>",
            len_check: null,
            remarks: "",
            reportAtt: false,
            type: "input",
            width: 6,
          },
          {
            answer: "",
            answerable: false,
            category: "email",
            element_id: 2,
            info: "",
            isremarks: false,
            label: "<p>asdasd<br/></p>",
            mand: false,
            remarks: "",
            reportAtt: false,
            type: "input",
            width: 6,
          },
          {
            answer: "",
            answerable: false,
            category: "textarea",
            element_id: 3,
            info: "",
            isremarks: false,
            label: "<p>sadsad<br/></p>",
            mand: false,
            max_words: null,
            remarks: "",
            reportAtt: false,
            type: "input",
            width: 12,
          },
          {
            answerable: false,
            category: "select",
            element_id: 5,
            info: "",
            isremarks: false,
            label: "<p>asdasd<br/></p>",
            mand: false,
            options: [
              {
                name: "sadsad",
                value: "sadsad",
              },
              {
                name: "sadsa",
                value: "sadsa",
              },
            ],
            options_answer: ["sadsa"],
            remarks: "",
            reportAtt: false,
            type: "select",
            width: 6,
          },
          {
            answerable: false,
            category: "file",
            element_id: 6,
            info: "",
            isremarks: false,
            label: "<p>adasd<br/></p>",
            mand: false,
            remarks: "",
            reportAtt: false,
            type: "input",
            width: 6,
          },
          {
            answer: "",
            answerable: false,
            category: "number",
            element_id: 7,
            info: "",
            isremarks: false,
            label: "<p>sadasd<br/></p>",
            len_check: "",
            mand: false,
            max: "",
            min: "",
            po_id: [23, 24],
            remarks: "",
            reportAtt: false,
            type: "input",
            width: 6,
          },
        ],
      },
    };

    vm.image_index = function (index) {
      console.log("index", index);
      vm.indexImg = index;
    };

    $scope.upload = function (files, id, folder, ind, index) {
      console.log(index);
      console.log(ind);
      var field = id;
      var myFile1 = [];
      vm.file = false;
      myFile1[field] = files[0];
      console.log(files);
      console.log(id);
      console.log(folder);
      var promise = fileUpload.uploadFileToUrl(
        myFile1[field],
        "https://tech.kiet.edu/api/hrms/" + "dashboard/upload/",
        "activity/" + folder
      );
      promise.then(function (response) {
        if (response.data["msg"] == "uploaded") {
          vm.doc = response.data.data;
          vm.file = true;
          vm.image = true;
          console.log("doc", vm.doc);

          vm.forms[vm.indexImg].answer = vm.doc;
          console.log(vm.forms);
        }
      });
    };

    vm.get_data = function () {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "exam/check_status/",
        params: { request_type: "get_drop" },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          console.log(response);
          if (response.status == 200) {
            vm.table_data = response.data;
          }
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };

    vm.validtaion = function () {
      for (var i = 0; i < vm.forms.length; i++) {
        // if(vm.form[i].category == 'email'){
        if (vm.forms[i].mand == true) {
          if (
            vm.forms[i].answer == null ||
            vm.forms[i].answer == undefined ||
            vm.forms[i].answer == ""
          ) {
            swal(
              "Warning",
              "Question No. " + (i + 1) + " is Mandatory",
              "warning"
            );
            return false;
          } else {
            if (vm.forms[i].category == "email") {
              var reg =
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              console.log(reg.test(vm.forms[i]["answer"]));
              if (reg.test(vm.forms[i]["answer"]) == false) {
                // console.log('karan')
                swal(
                  "Warning",
                  "Email not correct in question No.  " + (i + 1),
                  "warning"
                );
                return false;
              }
            } else if (vm.forms[i].category == "number") {
              if (vm.forms[i].min != null) {
                if (vm.forms[i].answer < vm.forms[i].min) {
                  swal(
                    "Warning",
                    "Answer cannot be smaller than minimum value in question No.  " +
                      (i + 1),
                    "warning"
                  );
                  return false;
                }
              }
              if (vm.forms[i].max != null) {
                if (vm.forms[i].answer > vm.forms[i].max) {
                  swal(
                    "Warning",
                    "Answer cannot be bigger than maximum value in question No.  " +
                      (i + 1),
                    "warning"
                  );
                  return false;
                }
              }

              if (
                vm.forms[i].len_check != null &&
                vm.forms[i].len_check != ""
              ) {
                // console.log(vm.forms[i].answer.toString().length)
                if (
                  vm.forms[i].answer.toString().length != vm.forms[i].len_check
                ) {
                  swal(
                    "Warning",
                    "Required length in question No. " +
                      (i + 1) +
                      " is " +
                      vm.forms[i].len_check,
                    "warning"
                  );
                  return false;
                }
              }
            } else if (vm.forms[i].category == "paragraph") {
              var str = vm.forms[i].answer;
              str = str.replace(/(^\s*)|(\s*$)/gi, "");
              str = str.replace(/[ ]{2,}/gi, " ");
              str = str.replace(/\n /, "\n");
              var str_count = str.split(" ").length;
              console.log(str);
              console.log(str_count);
              console.log(str_count > vm.forms[i].max_words);
              if (vm.forms[i].max_words != null) {
                if (str_count > vm.forms[i].max_words) {
                  // swal("Warning", "Answer more than word limit in question No.  " + (i+1), "warning")
                  swal(
                    "Warning",
                    "Word limit in Question No. " +
                      (i + 1) +
                      " is " +
                      vm.forms[i].max_words,
                    "warning"
                  );
                  str = "";
                  return false;
                }
              }
            } else if (vm.forms[i].category == "slider") {
              if (vm.forms[i].answer < vm.forms[i].min) {
                return false;
              }

              if (vm.forms[i].answer > vm.forms[i].max) {
                return false;
              }
            } else if (vm.forms[i].category == "text") {
              if (vm.forms[i].len_check != null) {
                if (vm.forms[i].answer.length != vm.forms[i].len_check) {
                  swal(
                    "Warning",
                    "Required length in question No. " +
                      (i + 1) +
                      " is " +
                      vm.forms[i].len_check,
                    "warning"
                  );

                  return false;
                }
              }
            } else if (vm.forms[i].category == "date") {
              if (vm.forms[i].start != null) {
                if (vm.forms[i].answer < vm.forms[i].start) {
                  swal(
                    "Warning",
                    "Wrong date in question No.  " + (i + 1),
                    "warning"
                  );
                  return false;
                }
              }
              if (vm.forms[i].end != null) {
                if (vm.forms[i].answer > vm.forms[i].end) {
                  swal(
                    "Warning",
                    "Wrong date in question No.  " + (i + 1),
                    "warning"
                  );
                  return false;
                }
              }
            }
          }
        } else {
          if (
            vm.forms[i].answer != null &&
            vm.forms[i].answer != undefined &&
            vm.forms[i].answer != ""
          ) {
            if (vm.forms[i].category == "email") {
              var reg =
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              console.log(reg.test(vm.forms[i]["answer"]));
              if (reg.test(vm.forms[i]["answer"]) == false) {
                // console.log('karan')
                swal(
                  "Warning",
                  "Email not correct!! in question No.  " + (i + 1),
                  "warning"
                );
                return false;
              }
            } else if (vm.forms[i].category == "number") {
              if (vm.forms[i].min != null) {
                if (vm.forms[i].answer < vm.forms[i].min) {
                  swal(
                    "Warning",
                    "Answer cannot be smaller than minimum value in question No.  " +
                      (i + 1),
                    "warning"
                  );
                  return false;
                }
              }
              if (vm.forms[i].max != null) {
                if (vm.forms[i].answer > vm.forms[i].max) {
                  swal(
                    "Warning",
                    "Answer cannot be bigger than maximum value in question No.  " +
                      (i + 1),
                    "warning"
                  );
                  return false;
                }
              }

              if (
                vm.forms[i].len_check != null &&
                vm.forms[i].len_check != ""
              ) {
                // console.log(vm.forms[i].answer.length)
                if (
                  vm.forms[i].answer.toString().length != vm.forms[i].len_check
                ) {
                  swal(
                    "Warning",
                    "Required length in question No. " +
                      (i + 1) +
                      " is " +
                      vm.forms[i].len_check,
                    "warning"
                  );
                  return false;
                }
              }
            } else if (vm.forms[i].category == "paragraph") {
              var str = vm.forms[i].answer;
              str = str.replace(/(^\s*)|(\s*$)/gi, "");
              str = str.replace(/[ ]{2,}/gi, " ");
              str = str.replace(/\n /, "\n");
              var str_count = str.split(" ").length;
              console.log(str);
              console.log(str_count);
              console.log(vm.forms[i].max_words);
              if (vm.forms[i].max_words != null) {
                if (
                  str_count > vm.forms[i].max_words &&
                  vm.forms[i].max_words != null
                ) {
                  // swal("Warning", "Answer more than word limit in question No.  " + (i+1), "warning")
                  swal(
                    "Warning",
                    "Word limit in Question No. " +
                      (i + 1) +
                      " is " +
                      vm.forms[i].max_words,
                    "warning"
                  );
                  str = "";
                  return false;
                }
              }
            } else if (vm.forms[i].category == "slider") {
              if (vm.forms[i].answer < vm.forms[i].min) {
                return false;
              }

              if (vm.forms[i].answer > vm.forms[i].max) {
                return false;
              }
            } else if (vm.forms[i].category == "text") {
              if (vm.forms[i].len_check != null) {
                if (vm.forms[i].answer.length != vm.forms[i].len_check) {
                  swal(
                    "Warning",
                    "Required length in question No. " +
                      (i + 1) +
                      " is " +
                      vm.forms[i].len_check,
                    "warning"
                  );

                  return false;
                }
              }
            } else if (vm.forms[i].category == "date") {
              if (vm.forms[i].start != null) {
                if (vm.forms[i].answer < vm.forms[i].start) {
                  swal(
                    "Warning",
                    "Wrong date in question No.  " + (i + 1),
                    "warning"
                  );
                  return false;
                }
              }
              if (vm.forms[i].end != null) {
                if (vm.forms[i].answer > vm.forms[i].end) {
                  swal(
                    "Warning",
                    "Wrong date in question No.  " + (i + 1),
                    "warning"
                  );
                  return false;
                }
              }
            }
          }
        }
      }

      return true;
    };
    // =======================================================================================================================================================================

    vm.prevActivity = function () {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "exam/check_status/",
        params: { request_type: "get_drop" },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          vm.data = response.data;
          console.log(response.data);

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
    vm.prevActivity();

    // =======================================================================================================================================================================

    vm.getFormAnswer = function (event, x) {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "exam/check_status/",
        params: { request_type: "get_form_data", form_id: x.id },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          if (response.status == 200) {
            console.log(response);
            vm.showStudent = true;
            vm.conducted_title = x.exam_title;
            vm.conducted_sub = x.subject;
            vm.student_data = response.data.data;
            // vm.openSplash(event, response.data);
          }
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };
    vm.openSplash = function (event, data) {
      console.log(event);
      console.log(data);
      var options = angular.element(event.target).data("options");
      var modalInstance = $uibModal.open({
        templateUrl: "mySplashContent.html",
        controller: "MyModalInstanceController",
        controllerAs: "modal",
        size: "lg",
        backdropClass: "splash" + " " + options,
        windowClass: "splash" + " " + options,
        resolve: {
          status: function () {
            // console.log(field);
            console.log(data);
            // console.log(event);
            return data;
          },
        },
      });
      modalInstance.result.then(
        function (selectedItem) {
          vm.selected = selectedItem;
        },
        function () {}
      );
    };
    vm.get_student_form = function (event, x) {
      console.log("krgbiwrbgbribgkjrwgiwergb");
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "exam/check_status/",
        params: {
          request_type: "get_student",
          form_id: x.form_id,
          student_id: x.student_id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          if (response.status == 200) {
            console.log(response);
            vm.openSplash(event, {
              data: response.data.elements,
              title: vm.conducted_title,
              subject: vm.conducted_sub,
            });
          }
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };
  }
})();
