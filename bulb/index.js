const button=document.getElementById('toggleButton');
const status=document.getElementById(`status`);
const bulb_ball=document.getElementById('bulb');

button.addEventListener('click',()=>{

     const innertext=button.innerText;

     if(innertext==`Turn On`){
        button.innerText=`Turn Off`;
        status.innerText=`Status: On`
        body.style.backgroundColor="black";
        body.style.color="white";
        bulb_ball.style.backgroundColor='#DAA520'
        bulb_ball.style.boxShadow="10px 10px 102px 44px rgba(232,208,127,1)"
       
      
        
        
    }else{
        button.innerText=`Turn On`
        status.innerText=`Status: Off`
        body.style.backgroundColor="white";
        body.style.color="black"
        bulb_ball.style.backgroundColor="#95a5a6"
        bulb_ball.style.boxShadow='none';
     }
    
    
})