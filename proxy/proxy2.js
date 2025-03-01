const target={
    name:"inderpreet singh",
    username :"inder001",
    password:"inder123"
}

const handler={

    get(target,prop){
       if(prop==='password'){
        return "Access denied"
       }

       return target[prop];
    }
}

const data=new Proxy(target,handler);
console.log(data.password);
console.log(data.username);
console.log(data.name);
