var app = angular.module("MovieApp");

app.service("MovieService", ["$http", function($http) {
    var self = this;
    this.movieList = [];
    var params = " ";
    var baseUrl = "http://api.themoviedb.org/3/search/keyword";

    this.getMovies = function() {
        $http.get(baseUrl + params, {
            "api_key": "e7abc6f83806ca61fe8c1034816974cd"
        }).then(function(response) {
            console.log(response);
            return response;
        });
    }
}]);