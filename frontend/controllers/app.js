var app = angular.module("BankrollMe", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .otherwise('/', {
            templateUrl: "./templates/home.html",
            controller: "HomeCtrl"
        })
        .when('/', {
            templateUrl: "./templates/home.html",
            controller: "HomeCtrl"
        })
        .when('/signin', {
            templateUrl: "./templates/signin.html",
            controller: "SignInCtrl"
        })
        .when('/userProfile', {
            templateUrl: "./templates/userProfile.html",
            controller: "UserProfileCtrl"
        })
        .when('/findUser', {
            templateUrl: "./templates/findUser.html",
            controller: "FindUserCtrl"
        });
});

app.controller("MainController", ["$scope", "SignInService", "FindService", "$location", function ($scope, SignInService, FindService, $location) {
    $scope.user = SignInService.user;

    //navbar stuff
    $scope.findFriends = function (q) {
        if (q) {
            FindService.get(q).then(function (response) {
                $location.path("/findUser");
            });
        }
    };
}]);