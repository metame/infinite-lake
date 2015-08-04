angular.module('app.Services', []).service('stepsService', function(){
    var fastSteps = ['step 1', 'step 2', 'step 3'],
        slowSteps = ['step 1', 'step 2', 'step 3'],
        resultStr = '';
    init();
    
    function init(){
        fastSteps = ['step 1', 'step 2', 'step 3'];
        slowSteps = ['step 1', 'step 2', 'step 3'];
        result = '';
    }

    var getFastSteps=function(){
        return fastSteps;
    };
    
    var getSlowSteps=function(){
        return slowSteps;
    }
    
    var calcSteps = function(target, bucket1, bucket2) {
        console.log("You want " + target + "L of water from a " + bucket1 + "L bucket and a " + bucket2 + "L bucket?");
        var stepsObject = {};
        stepsObject = calculateSteps(target, bucket1, bucket2);
        console.dir("from steps service: " + stepsObject.algorithms[0].count);
        
        if(stepsObject.success === false){
            resultStr = stepsObject.result;
        } else {
            var alg1 = stepsObject.algorithms[0],
                alg2 = stepsObject.algorithms[1];
                
            if(alg1.count <= alg2.count){
                fastSteps = alg1.steps;
                resultStr = " in the " + alg1.tbucket + " bucket!";
                slowSteps = alg2.steps;
            } else {
                fastSteps = alg2.steps;
                resultStr = " in the " + alg2.tbucket + " bucket!";
                slowSteps = alg1.steps;
            }
            
            resultStr = stepsObject.result + resultStr;
        }
        
    };
    
    var result = function(){
        return resultStr;
    };

    return{
        getFastSteps: getFastSteps,
        getSlowSteps: getSlowSteps,
        calcSteps: calcSteps,
        result: result
    };
});