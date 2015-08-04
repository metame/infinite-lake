angular.module('app.Controllers', ['app.Services'])
.controller('calculateCtrl', function($scope, stepsService){

    $scope.message = "Calculate something";
    
    $scope.fastSteps = '';
    
    $scope.result = '';
    
    $scope.calculate = function() {
        $scope.message = "Calculating...";
        $scope.requirements = "You want " + $scope.target + "L of water using a " + $scope.bucket1 + "L bucket and a " + $scope.bucket2 + "L bucket?";
        
        stepsService.calcSteps($scope.target, $scope.bucket1, $scope.bucket2);
        $scope.fastSteps = stepsService.getFastSteps();
        $scope.message = "Accomplished in " + $scope.fastSteps.length + " steps!";
        $scope.result = stepsService.result();
        console.log("from controller " + stepsService.result());
        
        // reset input fields
        $scope.target = '';
        $scope.bucket1 = '';
        $scope.bucket2 = '';
        
    };
    
    $scope.tryagain = function(){
        $scope.fastSteps = '';
        $scope.result = '';
        $scope.message = "Calculate Something";
    };
    
    
});