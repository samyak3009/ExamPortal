(function () {
  "use-strict";
  angular
    .module("minotaur")
    .controller("FillForm", FillForm)
    .controller("MyModalInstanceController", MyModalInstanceController);

  function MyModalInstanceController($uibModalInstance, ExportToExcel, status) {
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

  function FillForm(
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
    $uibModal,
    $interval
  ) {
    var vm = this;

    // ================INITIAL VARIABLES=====================================
    vm.count = 0;
    vm.htmlVariable =
      '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li class="text-red">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
    vm.mainForm = false;
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

    vm.formJson1 = JSON.parse(sessionStorage.getItem("form_json"));
    console.log(vm.formJson1);
    vm.forms = vm.formJson1.elements;

    vm.end_time = vm.formJson1.end_time;

    // ===============COUNTDOWN============================
    var x = $interval(function () {
      var countDownDate = new Date(vm.end_time).getTime();

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      vm.countdown =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        $interval.cancel(x);
        console.log("Hello");
        vm.submit(true);
        // document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);

    $scope.$on(
      "$stateChangeStart",
      function (evt, toState, toParams, fromState, fromParams) {
        $interval.cancel(x);
      }
    );

    // ================END COUNTDOWN=========================

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
    vm.hideTile = function () {
      vm.mainForm = false;
    };

    vm.getJson = function () {
      console.log("hello");
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "exam/login/",
        params: {
          stu_id: 1001,
          form_id: 3,
        },
        headers: {
          Cookie: $cookies.get("sessionid"),
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          if (response.status === 200) {
            vm.mainForm = true;
            console.log(response);
            vm.formJson1 = response.data;
            vm.forms = vm.formJson1.elements;
          } else if (response.data === 202) {
            console.log(response);
          }
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };

    vm.checkboxAnswer = function () {
      var ans = [];
      for (var i = 0; i < vm.forms.length; i++) {
        if (vm.forms[i].category == "checkbox") {
          // console.log(vm.forms[i].options)
          for (var j = 0; j < vm.forms[i].options.length; j++) {
            // console.log(vm.forms[i].answer[j])
            if (vm.forms[i].answer[j] == true) {
              ans.push(vm.forms[i].options[j]);
            }
          }
          vm.forms[i].answer = ans;
        }
      }
    };

    vm.submit = function (bool) {
      vm.checkboxAnswer();
      console.log("validation", vm.validtaion());
      if (!vm.validtaion()) {
        return;
      } else if (bool) {
        vm.formJson1.sub_category_id = vm.subCategory;
        $http({
          method: "POST",
          url: BaseUrl.RetBaseUrl() + "exam/submit_answer/",
          data: vm.formJson1,
          headers: {
            // Cookie: $cookies.get("sessionid"),
            // "Content-Type": undefined,
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        })
          .then(function (response) {
            ResponseCheck.ResponseStatus(response);
            sessionStorage.clear();
            swal("Done!", "The form has been submit.", "success");
            $state.go("stuDashboard");
            // vm.hideTile();
            // vm.prevActivity();
            vm.forms = [];
          })
          .catch(function (response) {
            ResponseCheck.ResponseStatus(response);
          });
      } else {
        swal(
          {
            title: "Are you sure?",
            text: "You Want To Submit!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "Yes",
            closeOnConfirm: false,
          },
          function () {
            vm.formJson1.sub_category_id = vm.subCategory;
            $http({
              method: "POST",
              url: BaseUrl.RetBaseUrl() + "exam/submit_answer/",
              data: vm.formJson1,
              headers: {
                // Cookie: $cookies.get("sessionid"),
                // "Content-Type": undefined,
                "Content-Type": "application/json",
              },
              // withCredentials: true,
            })
              .then(function (response) {
                ResponseCheck.ResponseStatus(response);
                sessionStorage.clear();
                swal("Done!", "The form has been submit.", "success");
                $state.go("stuDashboard");
                // vm.hideTile();
                // vm.prevActivity();
                vm.forms = [];
              })
              .catch(function (response) {
                ResponseCheck.ResponseStatus(response);
              });
          }
        );
      }
    };

    // =======================================================================================================================================================================

    vm.getFormAnswer = function (event, x) {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "StudentSMM/SubmitActivtyForm/",
        params: { request_type: "view_form", id: x.id },
        headers: {
          Cookie: $cookies.get("sessionid"),
        },
        withCredentials: true,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          console.log(response);
          if (response.status == 200) {
            vm.openSplash(event, response.data);
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
  }
})();
