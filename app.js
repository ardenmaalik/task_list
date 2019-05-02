//Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const  clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove Task event

    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);

    //DOM Load Event

    document.addEventListener('DOMContentLoaded', getTasks);
}

// Get Tasks from LS

function getTasks() {
    let tasks;

        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

    tasks.forEach(function (task) {
        //Create li Element
        const li = document.createElement('li');

        //Add Class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        //Add Class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class ="fa fa-remove"></i>';
        //Append link  to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}

    //Add Task
    function addTask(e) {
        if(taskInput.value === '') {
            alert('Add Task');
        }

        //Create li Element
        const li = document.createElement('li');

        //Add Class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        //Add Class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class ="fa fa-remove"></i>';
        //Append link  to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);

        //Store in LS
        storeTaskInLocalStorage(taskInput.value);

        //Clear Input
        taskInput.value = '';
        e.preventDefault();
    }

    //Store Task
    function storeTaskInLocalStorage(task) {
        let tasks;

        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //Remove Task
    function removeTask(e) {
        if(e.target.parentElement.classList.contains('delete-item')){
            if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();


            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
            }
        }
    }

    //Remove from LS

    function removeTaskFromLocalStorage(taskItem) {
        let tasks;
        if(localStorage.getItem('tasks') == null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task, index) {
            if(taskItem.textContent === task) {
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //Clear Tasks
    function clearTasks() {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        clearTasksFromLocalStorage();

    }

    //Clear Tasks From LS
    function clearTasksFromLocalStorage() {
        localStorage.clear();
    }

    //Filter Tasks  
    function filterTasks(e) {
        const text = e.target.value.toLowerCase();

        document.querySelectorAll('.collection-item').forEach (function(task) {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

        });
    }

