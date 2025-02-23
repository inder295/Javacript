/*
   signature -> map
   return -> new array, traverse every eleemnt


 */

if(!Array.prototype.mymap){
   Array.prototype.mymap=function(userfn){
     let res=[];
     for(let i=0;i<this.length;i++){
        const element=userfn(this[i],i,arr);
        res[i]=element
        
     }
     return res;
   }
}

const arr=[1,2,3,4,5];
//map makes a new array 
//if i dont return the value than by default it return undefined
//arguments =key,value,array
const p=arr.map((e,index,arr)=>{
     
    //e=e*3
    return {value: e*2 ,indexL: {index,arr: {arr,index}}}
  
});

const d=arr.mymap(function(e){
    return e*10
})

console.log(d);



