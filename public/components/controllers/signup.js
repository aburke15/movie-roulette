var app = angular.module("MovieApp.Auth");

app.controller("SignupController", ["$scope", "UserService", function($scope, UserService) {
    $scope.passwordMessage = "";
    $scope.signup = function(user) {
        // check to see if the user password matches the repeat password
        if (user.password !== $scope.passwordRepeat) {
            // if passwords do not match display error message
            $scope.passwordMessage = "Passwords do not match!";
        } else {
            // else send the data to the user service and navigate to the login page
            UserService.signup(user).then(function(response) {
                // send user to the login page
                $location.path("/login");
            }, function(response) {
                // if there is an issue with login display error message
                alert("There was a problem " + response.data.message);
            });
        }
    }
}]);