console.log("greet first");

const start=Date.now();

function greet(){
    console.log(`greet second `);
    
}

while(Date.now()-start<3000){}

console.log("greet third ");


export default greet;


