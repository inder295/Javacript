const todo=document.getElementById('todo-input')
const addBtn=document.getElementById('add-btn')
const todos=document.getElementById("todos");

addBtn.addEventListener('click',()=>{
    const value=todo.value; //go to gym
    
    const li= document.createElement('li'); //<li></li>
    li.innerText=value; //<li>Go to gym</li>

    const delbtn=document.createElement('button'); // <button> </button>
    delbtn.innerText='x';  //<button> x </button>
    li.appendChild(delbtn)

    delbtn.addEventListener('click',()=>{
        li.remove();
    })
    todos.appendChild(li);
    todo.value='';  //make input field empty
})

//add one delete button that can delete all todos at one time