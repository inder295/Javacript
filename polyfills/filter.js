const arr=[1,2,3,4,5];

const p=arr.filter((e)=>{
   return e>3
})

//system of filter
// return new array,condition should satisfy,print only elements that satisfy condition

if(!Array.prototype.myFilter){
    Array.prototype.myFilter=function(userfn){
       let result=[];
       for(let i=0;i<this.length;i++){
         if(userfn(this[i],i,this)){
            result.push(this[i])
         }
       }
       return result;
    }
}

let q=arr.myFilter((e)=>{
    return e>1;
})

console.log(q);




console.log(p);
