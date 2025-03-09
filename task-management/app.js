const button=document.getElementById('addButton')
const ul=document.getElementById('taskList')
button.addEventListener('click',()=>{
    const task=document.getElementById('taskInput').value;

    const li=document.createElement('li');
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.id='checkbox';
    const button=document.createElement('button');
    button.innerText='Delete';

    li.appendChild(checkbox)
    li.appendChild(task.value)
    li.appendChild(button);
    ul.appendChild(li);

    console.log(li);
        
    
})