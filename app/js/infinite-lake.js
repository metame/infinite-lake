var app = angular.module('infiniteLake', ['ui.router', 'app.Services', 'app.Controllers']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    
    $stateProvider
        .state('index', {
            url: "/",
            template: ''
        })
        .state('fastWay', {
            url: "/fast",
            templateUrl: "_fast.html",
            controller: 'fastWay'
        })
        .state('slowWay', {
            url: "/slow",
            templateUrl: "_slow.html",
            controller: 'slowWay'
        });
});