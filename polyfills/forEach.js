if(!Array.prototype.myforEach){
  Array.prototype.myforEach=function(userfn){

    let arr=this;
    for(let i=0;i<arr.length;i++){
        userfn(arr[i],i,arr);
    }
  }
}












// if(!Array.prototype.myforEach){
//     Array.prototype.myforEach=function(userfn){
//         const arr=this
//         for(let i=0;i<arr.length;i++){
//             userfn(arr[i],i,arr);
//         }
//     }
// }

// if(!Array.prototype.myforEach){
//     Array.prototype.myforEach=function(userfn){
//       let arr=this ;
//       let i=0;
//       while(i<arr.length){
//        // console.log(`${arr[i]} - ${i} - ${arr}`);
//         userfn(arr[i],i,arr);
//         i++;
//       }
//     }
// }
    //   for(let i=0;i<arr.length;i++){
    //       userfn(arr[i],index,arr) 
    //        //.log(`${value} - ${index} - ${arr}`);
        
    //   }

/*  1 - 0 - 1,2,3,4,5
    2 - 1 - 1,2,3,4,5
    
*/


const arr=[1,2,3,4,5];

arr.forEach((value,index,arr)=>{
     
    //console.log(`${value} - ${index} - ${arr}`);
    
})

console.log(`------------------------`);


arr.myforEach(function(value,index,arr){
    
    console.log(`value-${value} index-${index} arr-${arr}`);
    
})

















// arr.myforEach((value,index,arr)=>{
//     console.log(`${value} - ${index} - ${arr}`);
    
// })



