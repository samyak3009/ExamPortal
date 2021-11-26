(function () {
  "use strict";

  angular
    .module("minotaur")
    .controller("DashboardController", DashboardController);

  /** @ngInject */
  function DashboardController(
    moment,
    $http,
    BaseUrl,
    BaseUrl_Files,
    $cookies,
    ResponseCheck,
    $log,
    $state
  ) {
    var vm = this;
    if (
      JSON.parse(localStorage.getItem("data")) === null ||
      JSON.parse(localStorage.getItem("data")).role != "faculty"
    ) {
      $state.go("login");
    }
    vm.goToLink = function (link) {
      if (link === "create") {
        $state.go("CreateActivityForm");
      } else if (link === "evaluate") {
        $state.go("EvaluateForm");
      }
    };
    vm.detail = JSON.parse(localStorage.getItem("data")).detail;
  }
})();
