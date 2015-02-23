angular.module('OWMApp', ['ngRoute'])
    .value('owmCities', ['New York', 'Dallas', 'Chicago'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeController'
        })
        .when('/cities/:city', {
            templateUrl : 'city.html',
            controller : 'CityController',
            resolve : {
                city: function(owmCities, $route, $location) {
                    var city = $route.current.params.city;
                    if(owmCities.indexOf(city) == -1 ) {
                        $location.path('/error');
                        return;
                    }
                    return city;
                }
            }
        })
        .when('/error', {
            template : '<p>Error - Page Not Found</p>'
        })

    }])
    .run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function() {
            $location.path('/error');
        });
    })
    .controller('CityController', function($scope, city) {
        $scope.city = city;
    })
    .controller('HomeController', ['$scope', function($scope) {
        //empty for now
    }])
    .controller('CityCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
        $scope.city = $routeParams.city;
    }]);