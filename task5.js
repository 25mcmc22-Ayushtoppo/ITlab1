let tasks = [];

const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filter = document.getElementById('filter');
const sortBtn = document.getElementById('sortBtn');

function renderTasks() {
    taskList.innerHTML = '';
    let filteredTasks = tasks;
    if(filter.value === 'completed') filteredTasks = tasks.filter(t => t.completed);
    if(filter.value === 'pending') filteredTasks = tasks.filter(t => !t.completed);

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        const text = document.createElement('span');
        text.textContent = `${task.description} (Due: ${task.dueDate})`;
        text.style.flex = '1';
        li.appendChild(text);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Done';
        completeBtn.onclick = () => {
            task.completed = !task.completed;
            renderTasks();
        };
        li.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            tasks.splice(index,1);
            renderTasks();
        };
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener('click', () => {
    const description = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    if(description === '' || dueDate === '') return alert('Please enter task and due date');

    tasks.push({description, dueDate, completed: false});
    taskInput.value = '';
    dueDateInput.value = '';
    renderTasks();
});

filter.addEventListener('change', renderTasks);

sortBtn.addEventListener('click', () => {
    tasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
    renderTasks();
});
