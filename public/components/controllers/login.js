var app = angular.module("MovieApp.Auth");

app.controller("LoginController", ["$scope", "$location", "UserService", function($scope, $location, UserService) {
    $scope.login = function(user) {
        // send the user object to the userservice to check for auth
        UserService.login(user).then(function(response) {
            // onces promise returns send user to movies view
            $location.path("/movies");
        }, function(response) {
            // if there is an issue with login display alert window
            console.log(response); 
            alert("Login was unsuccessful!");
        });
    }
}]);