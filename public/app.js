var app = angular.module("MovieApp", ["ngRoute", "movieApp.Auth"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html"
        })
        .when("/movies", {
            templateUrl: "components/movies/movies.html",
            controller: "MovieController"
        })
        .when("/signup", {
            templateUrl: "components/auth/signup.html", 
            controller: "SignupController"
        })
        .when("/login", {
            templateUrl: "components/auth/login.html", 
            controller: "LoginController"
        })
        .when("/logout", {
            template: "", 
            controller: "LogoutController"
        })
        .otherwise({
            redirectTo: "/"
        });
});