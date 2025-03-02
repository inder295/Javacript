const arr=[1,2,3,4,5];

function bucket(arr){
    return new Proxy(arr,{

        get(arr,prop,value){
            const index=Number(prop);

            if(index<0){
                return arr[-index]
            }

            return arr[index];
        },

        set(arr,prop,value){
            const index=Number(prop);
            arr[index]=value;
            return true;
        }
    })
}

const proxyArr=bucket(arr);

proxyArr[1]=0;
console.log(proxyArr);
console.log(arr);

