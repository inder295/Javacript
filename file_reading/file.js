const fs=require('fs');

console.log(`started of program.`);

fs.readFile('./file.txt','utf-8',function(err,textContent){
    if(err){
        console.log(`error in file reading.`);
        
    }else{
        console.log(`file reading completed -> ${textContent}`);
        
    }
})

console.log(`end of program`);




