(function () {
  "use strict";

  angular.module("minotaur").controller("LoginController", LoginController);

  /** @ngInject */
  function LoginController(
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
    //     $state.go('CreateActivityForm');
    // }
    //$log.log(BaseUrl.RetBaseUrl());
    vm.login = function () {
      console.log("dsnijdnji");
      if (vm.username == "4444" && vm.password == "1234") {
        localStorage.setItem(
          "data",
          JSON.stringify({
            role: "faculty",
            detail: {
              course: null,
              email: "admin@abc.com",
              id: 4444,
              mobile: 9455965247,
              name: "ADMIN",
              username: "admin",
              date_of_birth: "2000-09-30",
            },
          })
        );
        $state.go("dashboard");
      } else {
        alertify.error("Wrong Credentials");
      }
    };
  }
})();
