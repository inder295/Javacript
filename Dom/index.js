
const theme=document.getElementById("theme-button");

function changeBackground(color){
    document.body.style.backgroundColor=color;
}
theme.addEventListener("onClick",()=>{
    
    
    let theme_color=document.body.style.backgroundColor;
    console.log(theme_color);
    
    if(!theme_color || theme_color=='white'){
        changeBackground("black")
    }else {
        changeBackground("white")
    }

    console.log(theme_color);
    
    
})