var app = angular.module("MovieApp.Auth");

app.controller("LogoutController", ["UserService", function(UserService) {
    UserService.logout();
}]);