(function () {
  "use strict";

  angular
    .module("minotaur")
    .controller("StuDashboardController", StuDashboardController);

  /** @ngInject */
  function StuDashboardController(
    $http,
    BaseUrl,
    ResponseCheck,
    $state,
    $scope,
    $interval,
    $stateParams
  ) {
    var vm = this;
    if (
      JSON.parse(localStorage.getItem("data")) === null ||
      JSON.parse(localStorage.getItem("data")).role != "student"
    ) {
      $state.go("loginStudent");
    }
    vm.detail = JSON.parse(localStorage.getItem("data")).detail;

    vm.get_exam_data = function () {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "exam/submit_answer/",
        params: {
          student_id: vm.detail.id,
        },
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: false,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          if (response.status === 200) {
            vm.live_exam = response.data.data.live;
            vm.previous_exam = response.data.data.previous;
            vm.upcoming_exam = response.data.data.upcoming; 
          } else if (response.data === 202) {
            console.log(response);
          }
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };

    vm.get_exam_data();

    vm.openForm = function (id) {
      $http({
        method: "GET",
        url: BaseUrl.RetBaseUrl() + "exam/login/",
        params: {
          stu_id: vm.detail.id,
          form_id: id,
        },
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      })
        .then(function (response) {
          ResponseCheck.ResponseStatus(response);
          if (response.status === 200) {
            console.log(response);
            localStorage.removeItem("form_json");
            sessionStorage.setItem("form_json", JSON.stringify(response.data));
            console.log("sdlkfgiudbkjlgui");
            $state.go("FillForm", { form_json: response.data });
          } else if (response.data === 202) {
            console.log(response);
          }
        })
        .catch(function (response) {
          ResponseCheck.ResponseStatus(response);
        });
    };

    $scope.$on(
      "$stateChangeStart",
      function (evt, toState, toParams, fromState, fromParams) {
        $interval.cancel(x);
      }
    );

    var x = $interval(function () {
      if (vm.upcoming_exam) {
        for (var i = 0; i < vm.upcoming_exam.length; i++) {
          var countDownDate = new Date(
            vm.upcoming_exam[i].form_id__start_time
          ).getTime();
          var now = new Date().getTime();

          var distance = countDownDate - now;
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          vm.upcoming_exam[i].remaining_time =
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

          if (distance < 0) {
            $interval.cancel(x);
            $state.transitionTo($state.current, $stateParams, {
              reload: true,
              inherit: false,
              notify: true
          });
            // vm.get_exam_data();
          }
        }
      }
    }, 1000);
  }
})();
