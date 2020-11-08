// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
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

    // Clear input
    taskInput.value = '';
  }

  e.preventDefault();
}
