angular.module("BankrollMe")
    .service("ProfileService", ["$http", function ($http) {

        var _this = this;
        baseUrl = "http://localhost:8080/";

        //POST a new user
        this.post = function (user) {
            return $http.post(baseUrl + "users/", user).then(function (response) {
                return response.data;
            });
        };

        //PUT user update
        this.update = function (user, desire, updateType) {
            return $http.put(baseUrl + "users/" + user._id + "?type=" + updateType, desire).then(function (response) {
                return response.data;
            });
        };

        //PUT a new friend
        this.newFriend = function (user, newFriend) {
            return $http.put(baseUrl + "users/" + user._id + "?type=friends", newFriend).then(function (response) {
                return response.data;
            });
        };

    }]);