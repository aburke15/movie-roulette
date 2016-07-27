var app = angular.module("MovieApp.Auth", ["ngStorage"]);

app.factory("AuthInterceptor", ["$location", "$q", "TokenService", function($location, $q, TokenService) {
    return {
        request: function(config) {
            var token = TokenService.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = "Bearer " + token;
            }
            return config;
        },
        ressponseError: function(response) {
            if (response.status === 401) {
                TokenService.removeToken();
                $location.path("/login");
            }
            return $q.reject(response);
        }
    }
}]);

app.config([$httpProvider, function($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
}]);