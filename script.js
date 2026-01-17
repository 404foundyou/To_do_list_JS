document.addEventListener('DOMContentLoaded',()=>{
    let todoinput = document.getElementById("to_do_input");
    let addtaskbtn = document.getElementById("add_task_btn");
    let todolist = document.getElementById("list_item");
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => rendertask(task));

    function add_new_task(){
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
    }
    
    addtaskbtn.addEventListener('click', add_new_task);
    todoinput.addEventListener('keydown',(e)=>{
        if(e.key === "Enter"){
            add_new_task();
        }
    })

    

    function rendertask(task){
        const li = document.createElement("li");
        li.setAttribute('data-id',task.id);

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>
        `;
        
        li.addEventListener('click',(e)=>{
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTask();
        })
        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation(); // prevent toggle from firing
            tasks = tasks.filter((t) => t.id != task.id);
            li.remove();
            saveTask();
        })


        todolist.appendChild(li);



    }
    
    function saveTask(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})


