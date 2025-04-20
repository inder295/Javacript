const fs=require("fs");

fs.readFile(__filename,()=>{
    console.log("read file");
    
})

setTimeout(()=>{
    console.log("timpout");
    
},0);

console.log("end of file");
