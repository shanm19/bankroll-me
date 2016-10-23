angular.module("BankrollMe")
    .controller("FindUserCtrl", ["$scope", "FindService", "SignInService", "ProfileService", function ($scope, FindService, SignInService, ProfileService) {
        $scope.foundUsers = FindService.foundUsers;

        //add friend to user
        $scope.addFriend = function (newFriend) {
            if (newFriend && SignInService.user) {
                ProfileService.newFriend(SignInService.user, newFriend).then(function (response) {
                    alert("Added " + newFriend.firstName + "!");
                });
            }
        };
    }]);