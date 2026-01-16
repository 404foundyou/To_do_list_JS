let todoinput = document.getElementById("to_do_input");
let addtaskbtn = document.getElementById("add_task_btn");
let listitem = document.getElementById("list_item");

let tasks = [];

addtaskbtn.addEventListener('click',()=>{
    const task_text = todoinput.value.trim();
    if(task_text === "") return;  

    const new_task = {
        id: Date.now(),
        text: task_text,
        completed: false
    }
    tasks.push(new_task);
    todoinput.value = "" ; // clear input
    console.log(tasks);
});