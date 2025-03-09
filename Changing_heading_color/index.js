


const heading=document.getElementById('mainHeading');

const select=document.querySelector('.color-buttons');
console.log(select);


document.querySelector('.color-buttons').addEventListener('click',(event)=>{

    if(event.target.id === 'greenButton'){
        heading.style.color='green';     
    }else if(event.target.id === 'redButton'){
        heading.style.color='red'
    }else if(event.target.id === 'blueButton'){
        heading.style.color='blue';
    }else if(event.target.id==='purpleButton'){
        heading.style.color='purple'
    }else{
        heading.style.color='black';
    }

})

