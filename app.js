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

  // Delete task event
  // Event delegation on task-list
  taskList.addEventListener('click', removeTask);

  // Clear task list
  clearBtn.addEventListener('click', clearTasks);

  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
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

// Remove Task
function removeTask(e) {
  // We want 'a' tag
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  e.preventDefault();
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
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
  console.log(text);
}
