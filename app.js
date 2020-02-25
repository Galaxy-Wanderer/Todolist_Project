class Todo {
    constructor(name, time) {
        this.name = name;
        this.time = time;
    }
}
class TodoListCore {
    static displayTodos() {
        const todos = TodoStorage.getTodos();
        todos.forEach(todo => { 
            if(todo.name !== 'undefined') {
                TodoListCore.addTodo(todo);
            }
        });
    }
    static addTodo(todo) {
        const list = document.getElementById('todo-list');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${todo.name}</td><td>${todo.time}</td><td><button class="delete">X</button></td>`;
        list.appendChild(row);
    }
    static deleteTodo(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}
class TodoStorage {
    static getTodos() {
        let todos;
        if(localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        return todos;
    }
    static addTodo(todo) {
        const todos = TodoStorage.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    static removeTodo(name) {
        const todos = TodoStorage.getTodos();
        todos.forEach((todo, index) => {
            if(todo.name === name) {
                todos.splice(index, 1);
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}
document.addEventListener('DOMContentLoaded', TodoListCore.displayTodos());
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    name = document.getElementById('name').value;
    time = document.getElementById('time').value;
    if(!name || !time) {
        document.querySelector('.alert-fill').style.display = 'flex';
    } else {
        document.querySelector('.alert-added').style.display = 'flex';
        const todo = new Todo(name, time);
        TodoListCore.addTodo(todo);
        TodoStorage.addTodo(todo);
        document.querySelector('#name').value = '';
        document.querySelector('#time').value = '';
    }
});
const alertButtons = document.querySelectorAll('.alert button');
alertButtons.forEach(index => {
    index.addEventListener('click', (e) => {
        e.target.parentElement.style.display = 'none';
    });
});
document.getElementById('todo-list').addEventListener('click', (e) => {
    if(e.target.className === 'delete') {
        TodoListCore.deleteTodo(e.target);
        TodoStorage.removeTodo(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        document.querySelector('.alert-delete').style.display = 'flex';
    }
});
