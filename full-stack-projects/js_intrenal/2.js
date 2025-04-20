const fs=require('fs');

setTimeout(()=>{console.log(`hello world 1`)},0);

setImmediate(()=> console.log(`hello world 2`));

fs.readFile("sample.txt","utf-8",(err,data)=>{

    setTimeout(()=>{console.log(`hello world 3`)},0);

  setImmediate(()=> console.log(`hello world 4`));

})

console.log(`hello`);


