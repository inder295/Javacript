const timeElement=document.getElementById("time");
const dateElement=document.getElementById("date");


function getTime(){

        const now=new Date();
        
        
        const hours=now.getHours()%12 || 12 ;
        const minutes=now.getMinutes().toString().padStart(2,"0");
        const seconds=now.getSeconds();
        const AMPM= now.getHours()>=12 ? "AM" : "PM";
        
        timeElement.textContent=`${hours}:${minutes}:${seconds} ${AMPM}`;

        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };

        dateElement.textContent=now.toLocaleDateString(undefined,options)
//If u dont know your locale time zone than u write undefined

    }

setInterval(()=>{
 getTime();
},1000)

getTime();





