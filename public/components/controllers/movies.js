var app = angular.module("MovieApp");

app.controller("MovieController", ["$scope", "$location", "MovieService", function ($scope, $location, MovieService) {
    $scope.movieService = MovieService;
    var query = encodeURIComponent($scope.params);
    $scope.getMovies = function (query) {
        MovieService.getMovies(query);
        //$scope.params = ""; 
    } 
    
    $scope.saveMovies = function () {
        
    }
    
    $scope.clear = function() {
        MovieService.movieList = [];
        $scope.params = "";
        //console.log(MovieService.movieList); 
    }
}]);