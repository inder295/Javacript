const arr=[1,2,3,4,5];

function negativeResult(arr){
    return new Proxy(arr,{
        
        get(target,prop){
            prop=Number(prop);
           // console.log(prop);

            if(prop<0){
                prop=-prop;
                return target[prop%target.length];
            }

            return target[prop];
            
        },

        set(target,prop,value){
            const index=Number(prop);
            if(index<0){
                target[-index%target.length]=value;
            }else{
                target[index]=value;
            }
            return true;
        }
    })
}

const proxyArr=negativeResult(arr);

proxyArr[2]=9;
arr[2]=0
console.log(arr);
console.log(proxyArr);



console.log(arr[-1]);
console.log(proxyArr[-1]);



