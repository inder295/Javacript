function diceRoll(number){
  number=number*10;
  number=Math.floor(number);
  
  console.log(number);

  if(number<=6){
    console.log(`dice roll ${number}`);
    
  }else{
    diceRoll(Math.random());
  }
  
  
}

diceRoll(Math.random())