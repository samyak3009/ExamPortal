(function () {
  "use strict";

  angular.module("minotaur").directive("minotaurHeader", minotaurHeader);
  function minotaurHeader($window) {
    var directive = {
      restrict: "E",
      templateUrl: "app/components/partials/header/header.html",
      controller: HeaderController,
      controllerAs: "header",
      bindToController: true,
      link: function (scope, element) {
        var app = angular.element(".appWrap"),
          $el = angular.element(element),
          w = angular.element($window);

        function setViewport() {
          if ($window.innerWidth < 768) {
            $el.addClass("viewport-sm");
            app.addClass("viewport-sm");
          } else {
            $el.removeClass("viewport-sm");
            app.removeClass("viewport-sm");
          }
        }

        setViewport();

        w.bind("resize", setViewport);
      },
    };

    return directive;

    /** @ngInject */
    function HeaderController(
      $http,
      CheckSession,
      BaseUrl,
      BaseUrl_Files,
      $cookies,
      $log,
      $scope,
      $rootScope,
      ResponseCheck,
      $state
    ) {
      var vm = this;
      vm.toggle = 0;
      var Coo = CheckSession.coo();
      document.getElementById("text_data").click();

      vm.logout = function () {
        sessionStorage.clear();
        localStorage.clear();
        $state.go("HomePage");
      };

      console.log(JSON.parse(localStorage.getItem("data")));
      if (
        JSON.parse(localStorage.getItem("data")) != null ||
        JSON.parse(localStorage.getItem("data")) != undefined ||
        JSON.parse(localStorage.getItem("data")) != ""
      ) {
        if (JSON.parse(localStorage.getItem("data")).role == "faculty") {
          vm.imagepath = "assets/images/teacher.png";
        } else if (JSON.parse(localStorage.getItem("data")).role == "student") {
          vm.imagepath = "assets/images/student.png";
        }
      }

      vm.onTextClick = function () {
        if (vm.toggle == 0) {
          document.getElementById("ui").click();
          document.getElementById("ui").classList.add("open");
          document
            .getElementById("profile_view")
            .setAttribute("aria-expanded", true);
          // document.getElementById('ui').click();
          vm.toggle = 1;
          // document.getElementById('ui').classList.add("open")
          // document.getElementById('dropwn').className +=" chosen-with-drop chosen-container-active";
        } else {
          // document.getElementById('ui').click();
          document.getElementById("ui").classList.remove("open");
          document
            .getElementById("profile_view")
            .setAttribute("aria-expanded", false);
          document.getElementById("ui").click();
          vm.toggle = 0;
        }
      };
    }
  }
})();
