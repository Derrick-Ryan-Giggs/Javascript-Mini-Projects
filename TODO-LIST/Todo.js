// Select HTML elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dueDateInput = document.getElementById('due-date-input');
const todoList = document.getElementById('todo-list');

// Initialize todos array from localStorage or as an empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to render the todos
function renderTodos() {
    todoList.innerHTML = ''; // Clear the list before rendering

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : ''; // Add class based on completion status

        // Create the inner HTML for the list item, including the todo text, due date, and delete button
        li.innerHTML = `
            ${todo.text} (Due: ${todo.dueDate})
            <button class="delete" onclick="deleteTodo(${index})">Delete</button>
        `;

        // Add event listener for completing the todo
        li.addEventListener('click', () => {
            toggleComplete(index);
        });

        // Append the list item to the todoList
        todoList.appendChild(li);
    });
}

// Function to add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    const dueDate = dueDateInput.value;

    if (todoText === '' || dueDate === '') {
        alert('Please enter both a todo and a due date.');
        return;
    }

    todos.push({ text: todoText, dueDate: dueDate, completed: false });
    todoInput.value = '';
    dueDateInput.value = '';

    saveTodos();
    renderTodos();
}

// Function to toggle the completion status of a todo
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add event listener to the form for adding a new todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

// Initial render of todos
renderTodos();
