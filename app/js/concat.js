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
                result.message = success;
            }
            
            result.algorithms = [firstAlg, secondAlg];
            console.log(result);
            return result;
            
        }
    }
    
    // define functions
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
            steps: [],
            count: 0
        };
        
        
        //   ****  Algorithm 1 sequence ****
        //         1. Fill lgBucket
        //         2. Until lgBucket.vol is less than smBucket: Pour lgBucket into smBucket then dump smBucket
        //         3. Pour lgBucket into smBucket
        //         4. Fill lgBucket
        //         Repeat until target is reached
        
        
    
        var sequence = [
            function(steps){ 
                while( lgBucket.vol >= smBucket.size ) {
                    var lgInit = lgBucket.vol;
                    lgBucket.pour(smBucket);
                    var lgDiff = lgInit - lgBucket.vol;
                    
                    steps.push({lgVol: lgBucket.vol, description: "Pour " + lgDiff + "L of water from the " + lgBucket.size + "L bucket into the " + smBucket.size + "L bucket", smVol: smBucket.vol});
                    if(lgBucket.vol === target || smBucket.vol === target){
                        break;
                    }
                    
                    smBucket.dump()
                    steps.push({lgVol: lgBucket.vol, description: "Dump the " + smBucket.size + "L bucket", smVol: smBucket.vol});
                }
            },
            function(steps){
                var lgInit = lgBucket.vol;
                lgBucket.pour(smBucket);
                var lgDiff = lgInit - lgBucket.vol;
                
                steps.push({lgVol: lgBucket.vol, description: "Pour " + lgDiff + "L of water from the " + lgBucket.size + "L bucket into the " + smBucket.size + "L bucket", smVol: smBucket.vol});
            },
            function(steps){
                lgBucket.fill();
                steps.push({lgVol: lgBucket.vol, description: "Fill the " + lgBucket.size + "L bucket", smVol: smBucket.vol});
            }
        ];
    
        // make sure buckets are empty
        lgBucket.dump();
        smBucket.dump();
        
        
        // first fill
        lgBucket.fill();
        
        firstAlg.steps.push({lgVol: lgBucket.vol, description: "Fill the " + lgBucket.size + "L bucket", smVol: smBucket.vol});
        
    
        var sequenceSteps = runSequence(sequence); // get steps from sequence
        firstAlg.steps = firstAlg.steps.concat(sequenceSteps); // add sequence steps to initial fill step
        firstAlg.count = firstAlg.steps.length; // assign step count to object
        
        if(smBucket.vol === target){
            firstAlg.tbucket = smBucket.size + "L";
        } else {
            firstAlg.tbucket = lgBucket.size + "L";
        }
        
        return firstAlg;
    }
    
    function secondAlgorithm(target, lgBucket, smBucket){
        var secondAlg = {
            id: 2,
            steps: [],
            count: 0
        };
        
        // **** Algorithm 2 sequence ****
        //      1. Until lgBucket is full: Fill smBucket and pour smBucket into lgBucket
        //      2. Dump the lgBucket
        //      3. Pour the smBucket into lgBucket
        //      Repeat until target is reached
        
        var sequence = [
            function(steps){
                while(lgBucket.vol !== lgBucket.size){
                    
                    smBucket.fill();
                    
                    steps.push({lgVol: lgBucket.vol, description:  "Fill the " + smBucket.size + "L bucket with " + smBucket.size + "L of water", smVol: smBucket.vol});
                    if(lgBucket.vol === target || smBucket.vol === target){
                        break;
                    }
                    
                    var smInit = smBucket.vol;
                    smBucket.pour(lgBucket);
                    var smDiff = smInit - smBucket.vol;
                    
                    steps.push({lgVol: lgBucket.vol, description:  "Pour " + smDiff + "L of water from the " + smBucket.size + "L bucket into the " + lgBucket.size + "L bucket", smVol: smBucket.vol});
                    if(lgBucket.vol === target || smBucket.vol === target){
                        break;
                    }
                }
            },
            function(steps){ 
                lgBucket.dump(); 
                steps.push({lgVol: lgBucket.vol, description:  "Dump the " + lgBucket.size + "L bucket", smVol: smBucket.vol});
            },
            function(steps){ 
                var smInit = smBucket.vol;
                smBucket.pour(lgBucket); 
                var smDiff = smInit - smBucket.vol;
                steps.push({lgVol: lgBucket.vol, description:  "Pour " + smDiff + "L of water from the " + smBucket.size + "L bucket into the " + lgBucket.size + "L bucket", smVol: smBucket.vol});
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
        return secondAlg;
        
    }
    
    function runSequence(sequence){
        var cycle = 0,
            steps = [];
            
            
        for(var i=0; i<sequence.length; i++){
            
            // check if target has been met
            if(lgBucket.vol === target || smBucket.vol === target){
                console.log(success);
                break;
            }
            
            // run next function in sequence
            sequence[i](steps);
            
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
        
        return steps;
    }
}



