const fs=require("fs");

setTimeout(()=>console.log(`settimeout`),0)
setImmediate(()=>console.log(`immediate`),0);

//console.log(`hello world`);

//this function depends on cpu instensive task ,in our labtop setimmediate will all first
