var app = angular.module("MovieApp.Auth");

app.service("TokenService", ["$localStorage", function ($localStorage) {
    // return the token to the userService
    this.getToken = function () {
        return $localStorage.token;
    }
    // set the token in local storage
    this.setToken = function (token) {
        $localStorage.token = token;
    }
    // remove the token from local storage
    this.removeToken = function () {
        delete $localStorage.token;
    }
}]);