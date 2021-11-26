(function () {
  "use strict";

  angular.module("minotaur").config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

    // ====================================================================
      .state("HomePage", {
        url: "/home_page",
        templateUrl: "app/pages/MMS/homePage/home_page.html",
        controller: "HomePage",
        controllerAs: "vm",
        specialClass: "core",
      })
      .state("loginStudent", {
        url: "/student_login",
        templateUrl: "app/pages/MMS/pages-login-student/index.html",
        controller: "LoginControllerStudent",
        controllerAs: "ctrl",
        // parent: "pages",
        specialClass: "core",
      })
      .state("stuDashboard", {
        url: "/stu_dashboard",
        templateUrl: "app/pages/MMS/student_dashboard/dashboard.html",
        controller: "StuDashboardController",
        controllerAs: "dashboard",
      })
      .state("login", {
        url: "/login",
        templateUrl: "app/pages/MMS/pages-login/login.html",
        controller: "LoginController",
        controllerAs: "ctrl",
        // parent: "pages",
        specialClass: "core",
      })
      .state("dashboard", {
        url: "/fac_dashboard",
        templateUrl: "app/pages/MMS/dashboard/dashboard.html",
        controller: "DashboardController",
        controllerAs: "dashboard",
      })
      .state("CreateActivityForm", {
        url: "/createQuestionPaper",
        templateUrl: "app/pages/MMS/createActivityForm/createForm.html",
        controller: "CreateActivityForm",
        controllerAs: "vm",
        // specialClass: "core",
      })
      .state("FillForm", {
        url: "/FillForm",
        templateUrl: "app/pages/MMS/fillForm/ActivityForm.html",
        controller: "FillForm",
        controllerAs: "vm",
        params: { form_json: null },
      })
      .state("EvaluateForm", {
        url: "/evaluate_form",
        templateUrl: "app/pages/MMS/evaluateForm/evaluateForm.html",
        controller: "EvaluateFormController",
        controllerAs: "vm",
        // specialClass: "core",
      })
      .state("pages", {
        url: "/erp/pages",
        template: "<div ui-view></div>",
      })

      .state("ui.elements", {
        url: "/elements",
        templateUrl: "app/pages/MMS/ui-elements/ui-elements.html",
        controller: "UiElementsController",
        controllerAs: "ui",
        parent: "ui",
      });
    // =======================================================================================

    $urlRouterProvider.otherwise("/home_page");
  }
})();
