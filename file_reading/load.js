
console.log(`program started`);


function sum(a,b,cb){
    setTimeout(()=>{
        cb(a+b)
    },5*1000)
}

sum(2,5,(result)=>{
 console.log(`sum is ${result}`);
 
})

console.log(`program ended`);
