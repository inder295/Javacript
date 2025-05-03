function sum(a,b){
    return a+b;
}

Promise.resolve(1)
.then(function(){
    return sum(2,3)
})
.catch(console.log(`error`))
.finally(()=>{console.log(`finally`)});


console.log(sum(1,2));

