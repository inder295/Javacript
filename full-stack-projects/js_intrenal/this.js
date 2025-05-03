const user = {
    name: "Inder",
    greet: function () {
      console.log(this.name);
    },
  };
  
  //const greet = user.greet;
  user.greet();
 
  
  const greet=user.greet;
  greet();

  console.log(this);
  
  