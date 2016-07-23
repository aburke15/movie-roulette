var app = angular.module("MovieApp", ["ngRoute", "MovieApp.Auth"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html"
        })
        .when("/movies", {
            templateUrl: "components/movies/movies.html",
            controller: "MovieController"
        })
        .when("/profile", {
            templateUrl: "components/profile/profile.html",
            controller: "ProfileController"
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