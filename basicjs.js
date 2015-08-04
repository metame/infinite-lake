// Node.js / Console version
// run it with `node basicjs t b1 b2'

var target = parseInt(process.argv[2]),
    bucket1 = parseInt(process.argv[3]),
    bucket2 = parseInt(process.argv[4]),
    impossible = "Your target can't be reached. Either change your target or your bucket sizes!",
    success = "You have " + target + "L of water!";
    
console.log("You want " + target + "L of water from a " + bucket1 + "L bucket and a " + bucket2 + "L bucket?");


if(target > bucket1 && target > bucket2){  // target is larger than buckets
    console.log("One of your buckets has to have enough room for how much water you want!");
} else {
    if( target % gcd(bucket1, bucket2) !== 0 ){
        console.log(impossible);
    } else {
    
        // create bucket object
        var bucket = {};
        
        bucket.fill = function(){
            this.vol = this.size;
        };
        
        bucket.dump = function(){
            this.vol = 0;
        };
        
        bucket.pour = function(thatBucket){
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
        
        firstAlgorithm(target, lgBucket, smBucket);
        secondAlgorithm(target, lgBucket, smBucket);

        
    }
}


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

    var sequence = [
        function(){ 
            while( lgBucket.vol >= smBucket.size ) {
                smBucket.vol = smBucket.size - smBucket.vol;
                lgBucket.vol -= smBucket.vol;
                printBucketVol();
                if(lgBucket.vol === target || smBucket.vol === target){
                    break;
                }
            }
        },
        function(){smBucket.dump()},
        function(){lgBucket.pour(smBucket)},
        function(){lgBucket.fill()},
        function(){lgBucket.pour(smBucket)}
    ];

    // make sure buckets are empty
    lgBucket.dump();
    smBucket.dump();
    
    // first fill
    lgBucket.fill();
    printBucketVol();
    

    runSequence(sequence);
}

function secondAlgorithm(target, lgBucket, smBucket){
    var sequence = [
        function(){
            while(lgBucket.vol !== lgBucket.size){
                
                smBucket.fill();
                printBucketVol();
                if(lgBucket.vol === target || smBucket.vol === target){
                    break;
                }
                
                smBucket.pour(lgBucket);
                printBucketVol();
                if(lgBucket.vol === target || smBucket.vol === target){
                    break;
                }
            }
        },
        function(){ lgBucket.dump(); },
        function(){ smBucket.pour(lgBucket); }
    ];
    
    // make sure buckets are empty
    lgBucket.dump();
    smBucket.dump();
    
    var cycle = 0;
    
    runSequence(sequence, cycle);
    
}

function runSequence(sequence){
    var cycle = 0;
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
        sequence[i]();
        
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
}