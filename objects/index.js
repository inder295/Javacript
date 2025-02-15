let i=10;
//console.log(i+5);

const person={
   name: "Anonymous",
   age:30,
   blood_group:"ABC",
   designation: "Data analytics",
   isMarried:false,
   getFullname: function () {
    return "Anonymous user"
   },
   address:{
     hno :1,
     street: "Nehri place street",
     full_Address:{
        line1:{
            flat: 1
        },
        line2:{
            place: "kalkaji",
        },
        line3:{
          country : "India"
        }
     },
     hadcrush: Infinity
   }
}

console.log(person.hadcrush);
