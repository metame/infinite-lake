'use strict';
// front-end version that returns an object with the results

function calculateSteps(target, bucket1, bucket2){
    // convert string to number
    target = parseInt(target, 10);
    bucket1 = parseInt(bucket1, 10);
    bucket2 = parseInt(bucket2, 10);
    
    var impossible = "Your target can't be reached. Either change your target or your bucket sizes!",
        errCapacity = "One of your buckets has to have enough room for how much water you want!",
        success = "You have " + target + "L of water",
        result = {success: false};
    
    if(target > bucket1 && target > bucket2){  // target is larger than buckets
    
        console.log(errCapacity);
        result.success = false;
        result.message = errCapacity;
        
        console.log(result);
        return result;
        
    } else {
        
        if( target % gcd(bucket1, bucket2) !== 0 ){
            
            result.success = false;
            result.message = impossible;
            console.log(result);
            return result;
            
        } else {
        
            // create bucket object
            var bucket = {};
            
            bucket.fill = function(){
                this.vol = this.size;
            };
            
            bucket.dump = function(){
                this.vol = 0;
            };
            
            bucket.pour = function(thatBucket, steps){
                if(this.vol > thatBucket.size - thatBucket.vol ){ // source vol greater than target capacity
                    this.vol -= thatBucket.size - thatBucket.vol;
                    thatBucket.vol = thatBucket.size;
                } else {
                    thatBucket.vol += this.vol;
                    this.dump();
                }
            };
            
            // create lg & sm buckets objects & assign values
            var lgBucket = Object.create(bucket),
                smBucket = Object.create(bucket);
                
            
                
            if(bucket1 > bucket2){ // bucket 1 is larger
                
                lgBucket.name = "first bucket",
                lgBucket.size = bucket1,
                lgBucket.vol = 0,
                
                smBucket.name = "second bucket",
                smBucket.size = bucket2,
                smBucket.vol = 0;
                
            } else { // bucket 2 is larger
            
                lgBucket.name = "second bucket",
                lgBucket.size = bucket2,
                lgBucket.vol = 0,
                
                smBucket.name = "first bucket",
                smBucket.size = bucket1,
                smBucket.vol = 0;
                
            }
            
            var firstAlg = firstAlgorithm(target, lgBucket, smBucket);
            var secondAlg = secondAlgorithm(target, lgBucket, smBucket);
            
            if( firstAlg.success === true || secondAlg.success === true) {
                result.success = true;
                result.result = success;
            }
            
            result.algorithms = [firstAlg, secondAlg];
            console.log(result);
            return result;
            
        }
    }
    
    // define functions
    function printBucketVol(){
        console.log(lgBucket.vol + ":" + smBucket.vol);
    }
    
    function gcd(a,b) {
        if (a < 0) a = -a;
        if (b < 0) b = -b;
        if (b > a) {var temp = a; a = b; b = temp;}
        while (true) {
            if (b == 0) return a;
            a %= b;
            if (a == 0) return b;
            b %= a;
        }
    }
    
    function firstAlgorithm(target, lgBucket, smBucket){
        
        var firstAlg = {
            id: 1,
            steps: ["Fill the " + lgBucket.size + "L bucket"],
            count: 0
        };
    
        var sequence = [
            function(steps){ 
                while( lgBucket.vol >= smBucket.size ) {
                    var lgInit = lgBucket.vol;
                    lgBucket.pour(smBucket);
                    var lgDiff = lgInit - lgBucket.vol;
                    printBucketVol();
                    steps.push("Pour " + lgDiff + "L of water from the " + lgBucket.size + "L bucket into the " + smBucket.size + "L bucket");
                    if(lgBucket.vol === target || smBucket.vol === target){
                        break;
                    }
                }
            },
            function(steps){
                smBucket.dump();
                steps.push("Dump the " + smBucket.size + "L bucket");
            },
            function(steps){
                var lgInit = lgBucket.vol;
                lgBucket.pour(smBucket);
                var lgDiff = lgInit - lgBucket.vol;
                printBucketVol();
                steps.push("Pour " + lgDiff + "L of water from the " + lgBucket.size + "L bucket into the " + smBucket.size + "L bucket");
            },
            function(steps){
                lgBucket.fill();
                steps.push("Fill the " + lgBucket.size + "L bucket");
            },
            function(steps){
                var lgInit = lgBucket.vol;
                lgBucket.pour(smBucket);
                var lgDiff = lgInit - lgBucket.vol;
                printBucketVol();
                steps.push("Pour " + lgDiff + "L of water from the " + lgBucket.size + "L bucket into the " + smBucket.size + "L bucket");
            }
        ];
    
        // make sure buckets are empty
        lgBucket.dump();
        smBucket.dump();
        
        
        // first fill
        lgBucket.fill();
        printBucketVol();
        
    
        var sequenceSteps = runSequence(sequence); // get steps from sequence
        firstAlg.steps = firstAlg.steps.concat(sequenceSteps); // add sequence steps to initial fill step
        firstAlg.count = firstAlg.steps.length; // assign step count to object
        
        if(smBucket.vol === target){
            firstAlg.tbucket = smBucket.size + "L";
        } else {
            firstAlg.tbucket = lgBucket.size + "L";
        }
        
        console.log(firstAlg);
        return firstAlg;
    }
    
    function secondAlgorithm(target, lgBucket, smBucket){
        var secondAlg = {
            id: 2,
            steps: [],
            count: 0
        };
        
        var sequence = [
            function(steps){
                while(lgBucket.vol !== lgBucket.size){
                    
                    smBucket.fill();
                    printBucketVol();
                    steps.push("Fill the " + smBucket.size + "L bucket with " + smBucket.size + "L of water");
                    if(lgBucket.vol === target || smBucket.vol === target){
                        break;
                    }
                    
                    var smInit = smBucket.vol;
                    smBucket.pour(lgBucket);
                    var smDiff = smInit - smBucket.vol;
                    printBucketVol();
                    steps.push("Pour " + smDiff + "L of water from the " + smBucket.size + "L bucket into the " + lgBucket.size + "L bucket");
                    if(lgBucket.vol === target || smBucket.vol === target){
                        break;
                    }
                }
            },
            function(steps){ 
                lgBucket.dump(); 
                steps.push("Dump the " + lgBucket.size + "L bucket");
            },
            function(steps){ 
                var smInit = smBucket.vol;
                smBucket.pour(lgBucket); 
                var smDiff = smInit - smBucket.vol;
                steps.push("Pour " + smDiff + "L of water from the " + smBucket.size + "L bucket into the " + lgBucket.size + "L bucket");
            }
        ];
        
        // make sure buckets are empty
        lgBucket.dump();
        smBucket.dump();
        
        var steps = runSequence(sequence); // get Steps from sequence
        secondAlg.steps = steps;
        secondAlg.count = steps.length; // count of how many steps solution took
        secondAlg.success = true;
        
        if(smBucket.vol === target){
            secondAlg.tbucket = smBucket.size + "L";
        } else {
            secondAlg.tbucket = lgBucket.size + "L";
        }
        console.log(secondAlg);
        return secondAlg;
        
    }
    
    function runSequence(sequence){
        var cycle = 0,
            steps = [];
            
            
        for(var i=0; i<sequence.length; i++){
            
            // check if target has been met
            if(lgBucket.vol === target || smBucket.vol === target){
                if( i === sequence.length -1 ){
                    printBucketVol();
                }
                console.log(success);
                break;
            }
            
            // run next function in sequence
            sequence[i](steps);
            
            // print to console unless this function is the while loop
            if(i !== 0)  printBucketVol();
            
            // rerun sequence if target not found
            if(i === sequence.length - 1){
                i = -1;
            }
            
            // prevent infinite loop
            cycle++;
            if(cycle === 1000){
                break;
            }
            
        }
        
        console.log(steps);
        return steps;
    }
}



