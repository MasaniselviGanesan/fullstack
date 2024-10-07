 const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a new task to the list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Add event listener for task completion
        li.addEventListener('click', completeTask);
        
        // Create and append Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', editTask);
        li.appendChild(editBtn);

        // Create and append Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
        taskInput.value = '';
    }
}

// Handle task completion
function completeTask(event) {
    const task = event.target;
    task.classList.toggle('completed');
}

// Handle task deletion
function deleteTask(event) {
    event.stopPropagation(); // Prevent triggering the completeTask function
    const task = event.target.parentElement;
    taskList.removeChild(task);
}

// Handle task editing
function editTask(event) {
    event.stopPropagation(); // Prevent triggering the completeTask function
    const taskItem = event.target.parentElement;
    const currentTaskText = taskItem.firstChild.textContent;
    const newTaskText = prompt('Edit the task:', currentTaskText);
    
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskItem.firstChild.textContent = newTaskText.trim();
    }
}
