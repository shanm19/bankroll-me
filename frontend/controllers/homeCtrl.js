angular.module("BankrollMe")
    .controller("HomeCtrl", ["$scope", "SignInService", function ($scope, SignInService) {
        $scope.user = SignInService.user;
    }]);