const abj={
    name :"Inderpreet",
    Last_name:"singh",
    age:19,
    blood_Group:"ABC",
    Address:{
        Line1: 2423,
        Line2: "New Delhi",
        Line3: 12334
    }
}


//deep copy using spread operator 

const copy={
    ...abj,
    Address:{
        ...abj.Address
    }
}

abj.name="Arshpreet";
abj.Address.Line1="Hello city";

console.log(abj);
console.log(copy);


/* 
   deep copy 2nd method
  object -> convert string -> copy -> new object 
*/

const abj_string= JSON.stringify(abj);
console.log(abj);

let deep_copy={};
deep_copy=JSON.parse(abj_string)

