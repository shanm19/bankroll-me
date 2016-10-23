angular.module("BankrollMe")
    .service("FindService", ["$http", function ($http) {

        var _this = this;
        var baseUrl = "http://localhost:8080/";
        this.foundUsers = [];

        this.get = function (name) {
            return $http.get(baseUrl + "find/?" + "name=" + name).then(function (response) {
                //_this.foundUsers = response.data;
                angular.copy(response.data, _this.foundUsers);
                return response.data;
            });
        };

    }]);