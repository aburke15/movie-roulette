var app = angular.module("MovieApp.Auth"); 

app.service("UserService", ["$http", "$location", "TokenService", function($http, $location, TokenService) {
    // sends a new user object and redirects user to the login page
    this.signup = function(user) {
        return $http.post("auth/signup", user);
        $location.path("/login"); 
    }
    
    // sends post request to user login endpoint on the server 
    this.login  = function(user) {
        return $http.post("auth/login", user).then(function(response) {
            TokenService.setToken(response.data.token); 
            return response; 
        }) ;
    }
    
    // remove the token from the user as they log out and redirect them home
    this.logout = function() {
        TokenService.removeToken();
        $location.path("/"); 
    }
    
    // retrieves token for authenticated users
    this.isAuthenticated = function () {
        return TokenService.getToken(); 
    }
}]); 