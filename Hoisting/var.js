console.log('Age is ',age);

test(); //memory me function save hai

function test(){
    console.log('Function age is ',age);    
}
console.log(burst());

const burst=function(){
    console.log(`testing the hoisting in var function`);
    
}

var age=10;

console.log('age is ',age);


