// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit', addTask);

  // Delete task event
  // Event delegation on task-list
  taskList.addEventListener('click', removeTask);

  // Clear task list
  clearBtn.addEventListener('click', clearTasks);

  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local storage
function getTasks(e) {
  let tasks;
  if (localStorage.getItem('tasks') === '') {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    // Create new link element for delete
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; // To have something to the right using materialise secondary-content class should be given
    // Create new tag class insdie a tag
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append to tasklist
    taskList.appendChild(li);
  });
}

// Add task to list when Add Item is clicked
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element for delete
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; // To have something to the right using materialise secondary-content class should be given
    // Create new tag class insdie a tag
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append to tasklist
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
  }
  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === '') {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  // We want 'a' tag
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      removeTaskInLocalStorage(
        e.target.parentElement.parentElement.textContent
      );
    }
  }
  e.preventDefault();
}

function removeTaskInLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === '') {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (task === taskItem) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e) {
  // Slower
  // taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

// Filter tasks with the matching letters being typed
function filterTasks(e) {
  let text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
