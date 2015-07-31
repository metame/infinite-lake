var app = angular.module('infiniteLake', []);

app.controller('calculateCtrl', function($scope){
    $scope.btntext = "Calculate";
    
    $scope.message = 'Calculate something';
    
    $scope.calculate = function() {
        $scope.message = "You want " + $scope.target + "L of water from a " + $scope.bucket1 + "L bucket and a " + $scope.bucket2 + "L bucket!";
        if($scope.target > $scope.bucket1 && $scope.target > $scope.bucket2){
           $scope.result = "You don't have enough room in your buckets!";
        }
        $scope.target = '';
        $scope.bucket1 = '';
        $scope.bucket2 = '';
    };
});