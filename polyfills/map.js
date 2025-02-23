const arr=[1,2,3,4,5];
//map makes a new array 
//if i dont return the value than by default it return undefined
//arguments =key,value,array
const p=arr.map((e,index,arr)=>{
     
    //e=e*3
    return {value: e*2 ,indexL: {index,arr: {arr,index}}}
  
});

console.log(p);
