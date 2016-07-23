var app = angular.module("MovieApp"); 

app.service("MovieService", ["$http", function(http) {
    var self = this; 
    this.movieList = [];
    var baseUrl = ""; 
}])