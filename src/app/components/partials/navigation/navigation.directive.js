(function() {
    'use strict';

    angular
        .module('minotaur')
        .directive('minotaurNav', minotaurNav)
        .directive('dropdownTree', dropdownTree);

    /** @ngInject */
    function dropdownTree($document, $state, $timeout) {
        return {
            replace: true,
            templateUrl: 'app/components/partials/navigation/template.html',
            scope: {
                ngModel: '=',
                member: '=',
                ngDisabled: '='
            },
            link: function(scope, element) {

                scope.selectValue = function(model) {
                    if (model.sub_tabs.length > 0) {
                        var li = angular.element('#' + model.menu_id);
                        var ul = li.find("ul").first();

                        if (ul[0].style.display == 'none') {
                            $timeout(function() {
                                var opened = angular.element('.father.open');
                                var size = opened.length;
                                if (size <= 1 && li.hasClass('father')) {
                                    opened.find("ul").first().hide(200);
                                    opened.removeClass("open");
                                    var inner = angular.element('.open');
                                    var size_inner = inner.length;
                                    for (var i = 0; i < size_inner; i++) {
                                        var ang_ele = angular.element(inner[i]);
                                        ang_ele.find("ul").first().hide(200);
                                        ang_ele.removeClass("open");
                                    }
                                }
                                ul.show(200);
                                li.addClass('open');
                            }, 200);
                        } else if (ul[0].style.display == 'block') {
                            $timeout(function() {
                                ul.hide(200);
                                li.removeClass('open');
                            }, 200);
                        }
                        li = angular.element('#' + model.menu_id);
                        ul = li.find("ul").first();
                    } else {
                        $state.go(model.link_address);
                    }
                }
            }
        }
    }

    function minotaurNav($timeout, $window) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/partials/navigation/navigation.html',
            controller: NavigationController,
            controllerAs: 'navigation',
            bindToController: true,
            link: function(scope, $el) {

                $timeout(function() {

                    var $dropdowns = $el.find('ul');
                    var $a = $dropdowns.children('a'),
                        $notDropdowns = $el.find('.nav-sidebar').children('li').not($dropdowns),
                        $notDropdownsLinks = $notDropdowns.children('a'),
                        app = angular.element('.appWrap'),
                        $navigation_toggle = app.find('#navigation-toggle'),
                        w = angular.element($window);


                    $el.on('mouseenter', function() {
                        if (app.hasClass('hz-menu') && !app.hasClass('viewport-sm')) {
                            $el.addClass('nav-expanded');
                            app.addClass('nav-expanded');
                        }
                    });
                    $el.on('mouseleave', function() {
                        if (app.hasClass('hz-menu') && !app.hasClass('viewport-sm')) {
                            $el.removeClass('nav-expanded');
                            app.removeClass('nav-expanded');
                        }
                    });

                    $dropdowns.addClass('dropdown');

                    var $submenus = $dropdowns.find('ul >.dropdown');
                    $submenus.addClass('submenu');

                    $a.append('<span class="indicator"></span>');

                    $a.on('click', function(event) {

                        var $this = angular.element(this),
                            $parent = $this.parent('li'),
                            $openSubmenu = angular.element('.submenu.open');

                        if (!$parent.hasClass('submenu')) {
                            $dropdowns.not($parent).removeClass('open').find('ul').slideUp();
                        }

                        $openSubmenu.not($this.parents('.submenu')).removeClass('open').find('ul').slideUp();
                        $parent.toggleClass('open').find('>ul').stop().slideToggle();
                        event.preventDefault();
                    });

                    $notDropdownsLinks.on('click', function() {
                        $dropdowns.removeClass('open').find('ul').slideUp();
                    });

                    var $activeDropdown = angular.element('.dropdown>ul>.active').parent();

                    $activeDropdown.css('display', 'block');

                    scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
                        if ($el.find('ul').parent('li.open.active').length > 0 && toState.parent !== fromState.parent) {
                            $dropdowns.find('ul').slideUp();
                        }
                        if (app.hasClass('viewport-sm')) {
                            $el.addClass('navigation-hidden');
                            app.addClass('navigation-hidden');
                        }
                    });

                    $navigation_toggle.on('click', function() {
                        if (app.hasClass('viewport-sm')) {
                            $el.toggleClass('navigation-hidden');
                            app.toggleClass('navigation-hidden');
                        } else {
                            $el.toggleClass('navigation-sm');
                            app.toggleClass('navigation-sm');
                        }
                    });

                    function setSmallNavigation() {
                        if ($window.innerWidth < 1200 && $window.innerWidth > 768) {
                            $el.addClass('navigation-sm');
                            app.addClass('navigation-sm');
                            $el.removeClass('navigation-hidden');
                            app.removeClass('navigation-hidden');
                        } else if ($window.innerWidth <= 768) {
                            $el.removeClass('navigation-sm');
                            app.removeClass('navigation-sm');
                            $el.addClass('navigation-hidden');
                            app.addClass('navigation-hidden');
                        } else {
                            $el.removeClass('navigation-sm');
                            app.removeClass('navigation-sm');
                            $el.removeClass('navigation-hidden');
                            app.removeClass('navigation-hidden');
                        }
                    }

                    setSmallNavigation();

                    w.bind('resize', setSmallNavigation);

                });

            }
        };

        return directive;

        /** @ngInject */
        function NavigationController($http, BaseUrl, $cookies, CheckSession, $state, alertify, $log) {
            var Coo = CheckSession.coo();

            var navigation = this;
            if (Coo == undefined) {
                $state.go('pages.login');
            } else {
                $http({
                        method: 'GET',
                        url: BaseUrl.RetBaseUrl() + 'dashboard/left_panel1/',
                        params: { 'app_name': 'MMS' },
                        headers: {
                            'Cookie': $cookies.get('sessionid')
                        },
                        withCredentials: true
                    })
                    .then(function(data) {
                        //$log.log(data);
                        if (data.status == 200) {
                          navigation.SiteMenu=data.data.data;
                          navigation.emp_link=data.data.emp_link
                          navigation.SiteMenu=[
                              {
                                role: "ACADEMIC",
                                tabs: [
                                    {
                                        menu_id: 1,
                                        parent_id: 0,
                                        role_id: 14,
                                        link_name: "Create Form",
                                        link_address: "createQuestionPaper",
                                        icon: "fa fa-plus",
                                        priority: 1,
                                        coord_type: "",
                                        app_name: "Submission Tool",
                                        sub_tabs: []
                                    }
                                ]
                              }
                          ]
                          if(navigation.SiteMenu.length == 0 )
                  				{
                                    console.log("test 123", navigation.emp_link.address)
                  					window.location.href=navigation.emp_link.address;
                  				}
                        } else {
                            alertify.success(data.data.msg);
                        }
                    });
            }
            //var navigation = this;
        }

    }

})();
