document.addEventListener('DOMContentLoaded', ()=>{
    const todoInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

//!To store these tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [] // creating array to store our tasks or getting the stored array back from the local storage

tasks.forEach(task => { //rendering task each time it's added
    renderTask(task);
});

addTaskButton.addEventListener('click', (e)=>{ //adding click event to add task button
    const taskText = todoInput.value.trim() //getting text from the input box
    if(taskText === ''){return} //if empty field do nothing
    const newTask = { //new task obj being created with properties
        id: Date.now(),
        text:  taskText,
        completed: false
    }
    tasks.push(newTask) //pushing new task obj to the array
    saveTasks() // calling save tasks function to store value to the localStorage
    renderTask(newTask)
    todoInput.value = '' // clearing the input box
    // location.reload()
    // console.log(tasks);
})
//!saving array to the local Storage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks))// storing tasks array in string format to the local storage
}
//!render function
function renderTask(task){
    const li = document.createElement('li')
    li.setAttribute('data-id', task.id)
    if(task.completed){
        li.classList.add('completed')
    }
    li.innerHTML = `<span>${task.text}</span><button>Delete</button>`
    li.addEventListener('click', (e)=>{
        if(e.target.tagName == 'BUTTON'){
            return
        }
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks()
    })
    li.querySelector('button').addEventListener('click', (e)=>{
        e.stopPropagation()
        tasks = tasks.filter((t)=>t.id!== task.id)
        li.remove()
        saveTasks()
    })
    todoList.appendChild(li)
}


})