angular.module("BankrollMe")
    .service("SignInService", ["$http", function ($http) {

        var _this = this;
        var baseUrl = "http://localhost:8080/";
        this.user = {};

        //GET
        this.get = function (username, password) {
            return $http.get(baseUrl + "signin/?" + "username=" + username + "&password=" + password).then(function (response) {
                if (response.data) {
                    console.log(response.data);
                    angular.copy(response.data, _this.user);
                    return "pass";
                } else {
                    return "fail";
                }
            });
        };

    }]);