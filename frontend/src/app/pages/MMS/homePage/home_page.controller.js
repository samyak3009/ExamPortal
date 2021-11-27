(function () {
  "use strict";

  angular.module("minotaur").controller("HomePage", HomePage);

  /** @ngInject */
  function HomePage(
    moment,
    $http,
    BaseUrl,
    BaseUrl_Files,
    $cookies,
    ResponseCheck,
    $state,
    $log,
    $scope
  ) {
    var vm = this;
    sessionStorage.clear();
    localStorage.clear();
    vm.goToUrl = function (url) {
      if (url === "teacher") {
        $state.go("login");
      } else if (url == "student") {
        $state.go("loginStudent");
      }
    };
  }
})();
