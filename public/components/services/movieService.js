var app = angular.module("MovieApp");

app.service("MovieService", ["$http", function ($http) {
    var self = this;
    this.movieList = [];
    var baseUrl = "http://api.themoviedb.org/3/search/movie?callback=JSON_CALLBACK&api_key=e7abc6f83806ca61fe8c1034816974cd&query=";
    var api_key = "e7abc6f83806ca61fe8c1034816974cd";

    this.getMovies = function (params) {
        $http.jsonp(baseUrl + params, {
            headers: {
                "Accept": "Application/json"
            }
        }).then(function (response) {
            self.movieList.push(response.data.results);
            console.log(self.movieList);
        }, function (response) {
            alert("There was a problem!");
        });
    }

    this.saveMovie = function () {
        
    }

    this.getOneMovie = function () {

    }
}]);