function changeBackground(color){
    document.body.style.backgroundColor=color;
}

function textColor(color){
    document.body.style.color=color
}

const theme=document.getElementById("theme-button");

theme.addEventListener("click",()=>{
    
  const color=document.body.style.backgroundColor;
  

  if(!color || color=='white'){
      changeBackground("black")
      textColor('white')

  }else{
    textColor('black')
    changeBackground('white')
  }

    
})