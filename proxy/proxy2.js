const target=[{
    name:"inderpreet singh",
    username :"inder001",
    password:"inder123"
},{
    name :"John Doe",
    username:"john",
    password:"john123"
}]



const handler={

    get(target,prop){
       if(prop==='password'){
        return "Access denied"
       }

       return target[prop];
    }
}

const data=new Proxy(target[4],handler);

console.log(data.password);
console.log(data.username);
console.log(data.name);
