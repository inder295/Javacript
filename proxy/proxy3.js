const data={
    name:"inderpreet singh",
    username:"inder001",
    password:"inder123"
}

const handler={
    get(target,prop){
        if(prop==='password'){
            return 'Access Denied'
        }

        return target[prop];
    }
}

const proxy=new Proxy(data,handler);

console.log(proxy.username);
console.log(proxy.name);
console.log(proxy.password);
