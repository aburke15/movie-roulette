var app = angular.module("MovieApp.Auth"); 

app.controller("LoginController", ["$scope" "$location", "UserService", function($scope, $location, UserService) {
    $scope.login = function(user) {
        UserService.login(user).then(function(response) {
            $location.path("/movies");
        }, function(response) {
            alert("Login was unsuccessful!"); 
        });
    }
}]);