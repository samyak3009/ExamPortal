(function() {
  'use strict';

  angular
    .module('minotaur')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $translateProvider, $locationProvider,httpMethodInterceptorProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // angular-language
    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/languages/',
      suffix: '.json'
    });
    $translateProvider.useLocalStorage();
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);

    // remove ! hash prefix
    $locationProvider.hashPrefix('');

    //angularloader
    httpMethodInterceptorProvider.whitelistDomain('127.0.0.1');
    httpMethodInterceptorProvider.whitelistDomain('10.0.0.12');
    httpMethodInterceptorProvider.whitelistDomain('10.21.66.14');
    httpMethodInterceptorProvider.whitelistDomain('10.21.67.240');
    httpMethodInterceptorProvider.whitelistDomain('10.21.66.233');
    httpMethodInterceptorProvider.whitelistDomain('hrms.kiet.edu');
    httpMethodInterceptorProvider.whitelistDomain('www.kiet.edu');

    httpMethodInterceptorProvider.whitelistDomain('tech.kiet.edu');


  }

})();
