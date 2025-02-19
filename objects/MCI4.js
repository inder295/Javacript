let p1={
    name:"inderpreet",
    age:22,
    address:{
       flat:1,
       place:"New Delhi"
    }
    
}

let p2={
    ...p1

}

p1.address.flat= "arshpret"

console.log(p1);
console.log(p2);

