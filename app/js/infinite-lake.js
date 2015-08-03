var app = angular.module('infiniteLake', []);

app.controller('calculateCtrl', function($scope, stepsService){
    $scope.btntext = "Calculate";
    
    $scope.message = 'Calculate something';
    
    $scope.calculate = function() {
        $scope.message = "You want " + $scope.target + "L of water from a " + $scope.bucket1 + "L bucket and a " + $scope.bucket2 + "L bucket?";
        
        var smallBucket,
            largeBucket;
        
        
        if($scope.target > $scope.bucket1 && $scope.target > $scope.bucket2){  // target is larger than buckets
            stepsService.resolve("One of your buckets has to have enough room for how much water you want!");
        } else {
            // compare bucket sizes
            if($scope.bucket1 === $scope.bucket2){ // bucket sizes are equal
                if($scope.bucket1 === $scope.target){
                    
                    stepsService.add("Fill up the first bucket with " + $scope.bucket1 + "L of water");  
                    
                    
                    stepsService.resolve("You have " + $scope.target + "L of water!");
                }
            }
        }
        
        // reset input fields
        $scope.target = '';
        $scope.bucket1 = '';
        $scope.bucket2 = '';
    };
});

app.controller('stepsCtrl', function($scope, stepsService){
    $scope.steps = stepsService.getSteps();
    $scope.result = stepsService.result;
});


app.service('stepsService', function(){
    var steps = [],
        resultStr = '';
    init();
    
    function init(){
        steps = [];
        result = '';
    }

    var getSteps=function(){
        return steps;
    };

    var add=function(newStep){
        steps.push(newStep);
    };
    
    var resolve = function(newResult){
        resultStr = newResult;
    };
    
    var result = function(){
        return resultStr;
    }

    return{
        getSteps: getSteps,
        add: add,
        resolve: resolve,
        result: result
    };
});