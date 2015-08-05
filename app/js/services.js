angular.module('app.Services', []).service('stepsService', function(){
    var fastSteps = [],
        slowSteps = [],
        resultObj = {message: "Nothing calculated yet!", success: false};
    init();
    
    function init(){
        fastSteps = [];
        slowSteps = [];
        resultObj = {message: "Nothing calculated yet!", success: false};
    }

    var getFastSteps=function(){
        return fastSteps;
    };
    
    var getSlowSteps=function(){
        return slowSteps;
    }
    
    var calcSteps = function(target, bucket1, bucket2) {
        console.log("You want " + target + "L of water from a " + bucket1 + "L bucket and a " + bucket2 + "L bucket?");
        
        
        
        if(!target || !bucket1 || !bucket2){
            resultObj.success = false;
            if(!target){
                resultObj.message = "If you didn't want any water, you could have just said so!";
            } else {
                resultObj.message = "You need two buckets that will hold water--no more, no less!";
            }
            return;
        }
        
        
        var stepsObject = {};
        stepsObject = calculateSteps(target, bucket1, bucket2);

        if(stepsObject.success === false){
            resultObj.message = stepsObject.message;
            resultObj.success = false;
        } else {
            var alg1 = stepsObject.algorithms[0],
                alg2 = stepsObject.algorithms[1];
                
            resultObj.success = true;
                
            if(alg1.count <= alg2.count){
                fastSteps = alg1.steps;
                resultObj.message = " in the " + alg1.tbucket + " bucket!";
                slowSteps = alg2.steps;
                resultObj.altMessage = " in the " + alg2.tbucket + " bucket!";
            } else {
                fastSteps = alg2.steps;
                resultObj.message = " in the " + alg2.tbucket + " bucket!";
                slowSteps = alg1.steps;
                resultObj.altMessage = " in the " + alg2.tbucket + " bucket!";
            }
            
            resultObj.message = stepsObject.message + resultObj.message;
            resultObj.altMessage = stepsObject.message + resultObj.altMessage;
        }
        
    };
    
    var result = function(){
        return resultObj;
    };

    return{
        getFastSteps: getFastSteps,
        getSlowSteps: getSlowSteps,
        calcSteps: calcSteps,
        result: result
    };
});