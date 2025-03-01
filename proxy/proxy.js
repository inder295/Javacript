//.length in array is the example of proxy-



//object=target
const object ={
    //properties,username,age,passwaord
    username : "Inderpreet Singh",
    email: 'inderpreet@gmail.com',
    password:"inder123"
}


const proxyUser= new Proxy(object,{
    
    get(target,prop){
        if(prop=='password'){
            throw new Error('access denied')
        }
        console.log(target);
        
        return target[prop];
    },

    set(target,prop,value){
        
    }
})

console.log(proxyUser.username);
console.log(proxyUser.email);
console.log(proxyUser.password);
console.log(object["email"]);

