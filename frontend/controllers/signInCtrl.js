angular.module("BankrollMe")
    .controller("SignInCtrl", ["$scope", "$location", "SignInService", "ProfileService", function ($scope, $location, SignInService, ProfileService) {

        $scope.user = {};
        $scope.newUser = {};
        $scope.toggle = false;
        $scope.toggleSignUp = false;

        //Sign In
        $scope.signIn = function (username, password) {
            SignInService.get(username, password).then(function (response) {
                if (response === "pass") {
                    $scope.user = SignInService.user;
                    $location.path('/userProfile');
                    $scope.toggle = false;
                } else {
                    $scope.toggle = true;
                }
            });
        };

        $scope.toggleSign = function () {
            $scope.toggleSignUp = !$scope.toggleSignUp;
        };

        //Sign Up
        $scope.signUp = function () {
            if ($scope.newUser.password === $scope.newUser.passwordAssert) {
                ProfileService.post($scope.newUser).then(function (response) {
                    $scope.signIn($scope.newUser.username, $scope.newUser.password);
                });
            } else {
                alert("Passwords do not match!");
            }
        };

    }]);