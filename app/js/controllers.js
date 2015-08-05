angular.module('app.Controllers', ['app.Services'])
.controller('mainCtrl', function($scope, $state, stepsService){

    $scope.notice = "Calculate something";
    
    $scope.calculate = function() {
        $scope.hideForm = true;
        $scope.requirements = "You want " + $scope.target + "L of water using a " + $scope.bucket1 + "L bucket and a " + $scope.bucket2 + "L bucket?";
        
        $scope.notice = "Calculating...";
        
        if($scope.bucket1 >= $scope.bucket2){
            $scope.lgBucket = $scope.bucket1;
            $scope.smBucket = $scope.bucket2;
        } else {
            $scope.lgBucket = $scope.bucket2;
            $scope.smBucket = $scope.bucket1;
        }
        
        stepsService.calcSteps($scope.target, $scope.bucket1, $scope.bucket2);
        
        var result = stepsService.result();
        console.log(result);
        if(result.success === true){
            $scope.notice = '';
            $state.go('fastWay');
        } else {
            $scope.notice = "That quantity of water could not be reached!";
            $scope.error = result.message;
        }
        
        console.log("from controller " + result.message);
        
        // reset input fields
        $scope.target = '';
        $scope.bucket1 = '';
        $scope.bucket2 = '';
        
    };
    
    $scope.tryagain = function(){
        $scope.requirements = '';
        $scope.notice = "Calculate Something";
        $scope.error = '';
        $scope.hideForm = false;
        $state.go('index');
    };
    
    
})
.controller('fastWay', function($scope, $state, stepsService){

    var result = stepsService.result();
    
    $scope.fastSteps = stepsService.getFastSteps();
    
    if($scope.fastSteps.length === 0){
        $state.go('index');
    }
    
    $scope.message = "Reached in " + $scope.fastSteps.length + " steps the fastest way!";
    
    $scope.result = result.message;
    
})
.controller('slowWay', function($scope, $state, stepsService){

    var result = stepsService.result();
    
    $scope.slowSteps = stepsService.getSlowSteps();
    
    if($scope.slowSteps.length === 0){
        $state.go('index');
    }
    
    $scope.message = "Reached in " + $scope.slowSteps.length + " steps the slowest way!";
    
    $scope.result = result.message;
    
})