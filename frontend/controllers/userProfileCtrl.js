angular.module("BankrollMe")
    .controller("UserProfileCtrl", ["$scope", "SignInService", "ProfileService", function ($scope, SignInService, ProfileService) {

        $scope.user = SignInService.user;
        $scope.toggleForm = false;
        $scope.toggleDesires = false;
        $scope.type = {
            name: ""
        };
        $scope.desire = {};

        //create a desire
        $scope.createDesire = function () {
            if ($scope.type.name === "needs") {
                $scope.user.needs.push($scope.desire);
            } else if ($scope.type.name === "wants") {
                $scope.user.wants.push($scope.desire);
            }
            // ProfileService.update($scope.user._id, $scope.desire).then(function (response) {
            //     console.log(response);
            // });
            ProfileService.update($scope.user, $scope.desire, $scope.type.name).then(function (response) {
                console.log(response);
            });
            $scope.type.name = "";
            $scope.desire = {};
        };

        //upgrade tooltip
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

        //btn ripple effect
        (function ($) {
            $(".ripple-effect").click(function (e) {
                var rippler = $(this);

                // create .ink element if it doesn't exist
                if (rippler.find(".ink").length == 0) {
                    rippler.append("<span class='ink'></span>");
                }

                var ink = rippler.find(".ink");

                // prevent quick double clicks
                ink.removeClass("animate");

                // set .ink diametr
                if (!ink.height() && !ink.width()) {
                    var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
                    ink.css({
                        height: d,
                        width: d
                    });
                }

                // get click coordinates
                var x = e.pageX - rippler.offset().left - ink.width() / 2;
                var y = e.pageY - rippler.offset().top - ink.height() / 2;

                // set .ink position and add class .animate
                ink.css({
                    top: y + 'px',
                    left: x + 'px'
                }).addClass("animate");
            })
        })(jQuery);

    }]);