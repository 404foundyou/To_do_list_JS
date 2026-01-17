document.addEventListener('DOMContentLoaded',()=>{
    let todoinput = document.getElementById("to_do_input");
    let addtaskbtn = document.getElementById("add_task_btn");
    let todolist = document.getElementById("list_item");
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => rendertask(task));
    
    addtaskbtn.addEventListener('click',()=>{
        const task_text = todoinput.value.trim();
        if(task_text === "") return;  
        
        const new_task = {
            id: Date.now(),
            text: task_text,
            completed: false
        }
        
        tasks.push(new_task);
        saveTask();
        rendertask(new_task);
        todoinput.value = "" ; // clear input
        console.log(tasks);
        
    });
    

    function rendertask(task){
        const li = document.createElement("li");
        li.setAttribute('data-id',task.id);
        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>
        `;
        todolist.appendChild(li);

    }
    
    function saveTask(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})


