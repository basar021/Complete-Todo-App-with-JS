import { Todo } from './jsClasses/toDo.js';

/*
    step 1: create the html basic structure
    step 2: style html elements
    step 3: find all the html elements and add listeners 
    step 4: add todo
    step 5: showMessage
    step 6: adding todos in localstorage
    step 7: delete Todo
    step 8: reload/read todo
*/

// Selecting Elements
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#inputTodo');
const messageElement = document.querySelector('#message');
const todoLists = document.querySelector('#lists');

// showMessage
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);

    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.classList.remove(`bg-${status}`);
    }, 2000);
};

// createTodo
const createTodo = (newTodo) => {
    const todoElement = document.createElement('li');
    todoElement.id = newTodo.todoId;
    todoElement.classList.add('li-style');
    todoElement.innerHTML = `
        <span> ${newTodo.todoValue} </span>
        <span> 
            <button class="btn" id="deleteButton"> 
                <i class="fa fa-trash"> </i> 
            </button> 
        </span>
        `;

    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector('#deleteButton');
    deleteButton.addEventListener('click', deleteTodo);
};

// deleteTodo
const deleteTodo = (event) => {
    // find li = li>span>button>i for delete single li from the ul(todos)
    const selectTodo = event.target.parentElement.parentElement.parentElement;

    todoLists.removeChild(selectTodo);
    showMessage('Message is deleted.', 'danger');

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectTodo.id); // deleteTodo from localStorage

    localStorage.setItem('myTodos', JSON.stringify(todos));
};

// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem('myTodos')
        ? JSON.parse(localStorage.getItem('myTodos'))
        : [];
};

// addTodo
const addTodo = (event) => {
    event.preventDefault();

    // find todo input value
    const todoValue = todoInput.value;

    // unique id
    const todoId = Date.now().toString();

    const newTodo = new Todo(todoId, todoValue); // here Todo class has taken toDo.js file

    // createTodo function
    createTodo(newTodo);

    // showMessage function
    showMessage('Todo is successfully created.', 'success');

    // add todo to localStorage
    const todos = getTodosFromLocalStorage();
    todos.push(newTodo);

    localStorage.setItem('myTodos', JSON.stringify(todos));

    // empty the todo value after add todo
    todoInput.value = '';
};

// loadTodos
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo));
};

// Adding event listener
todoForm.addEventListener('submit', addTodo);
window.addEventListener('DOMContentLoaded', loadTodos);
