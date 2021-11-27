(function() {
    'use strict';
    angular
        .module('minotaur')
        .constant('BRANCH', 'branch')
        .constant('COURSE', 'course')
        .constant('SEMESTER', 'semester')
        .constant('FORM_DATA','form_data')
        .constant('VERBS', 'verbs')
        .constant('PREV_VAL','previous_values')
        .constant('SHOW_PREV','show_previous')
         .constant('MMS_KEY',{
            ON_SUBMIT: "on_submit",
            FILTERED_DEPT:"filtered_dept",
            BRANCH: "branch",
            COURSE: "course",
            SEMESTER: "semester",
            REQUEST_HOD: "hod",
            REQUEST_DEAN: "dean",
            DEPARTMENT: "dept",
            V_TYPE:"type",
            ATTEMPT_TYPE:"attempt_type",
            
        })
})();
