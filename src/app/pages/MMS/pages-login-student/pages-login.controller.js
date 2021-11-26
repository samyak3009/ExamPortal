(function () {
  "use strict";

  angular
    .module("minotaur")
    .controller("LoginControllerStudent", LoginControllerStudent);

  /** @ngInject */
  function LoginControllerStudent(
    $http,
    $location,
    $window,
    Base64,
    BaseUrl,
    $timeout,
    $uibModal,
    $log,
    $document,
    UserService,
    CheckSession,
    $rootScope,
    $cookies,
    alertify,
    $state,
    ResponseCheck
  ) {
    var vm = this;
    // var Coo = CheckSession.coo();
    // if (Coo != undefined) {
    //   $state.go("dashboard");
    // }
    //$log.log(BaseUrl.RetBaseUrl());
    vm.login = function () {
      console.log(vm.username + ":" + vm.password);
      var Send = Base64.encode(vm.username + ":" + vm.password);
      var pass = vm.password;
      console.log(vm.Send);
      $http({
        method: "POST",
        url: BaseUrl.RetBaseUrl() + "exam/login/",
        data: { user: vm.username, pass: Base64.encode(pass) },
        // data: {user: vm.username, pass: vm.password.encode('ascii')},
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: false,
      })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            localStorage.setItem(
              "data",
              JSON.stringify({
                role: "student",
                detail: response.data.student,
              })
            );
            $state.go("stuDashboard");
          } else {
            alertify.error(response.data.msg);
          }
          //parent.location.hash = "dashboard";
        })
        .catch(function (data) {
          if (data.status == 401) {
            alertify.error("Wrong Credentials");
          } else {
            ResponseCheck.ResponseStatus(data);
          }
        });
    };
  }
})();
