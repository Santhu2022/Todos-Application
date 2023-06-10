let todoItemsContainerEle = document.getElementById('todoItemsContainer');
let addTodoButtonElement = document.getElementById('addTodoButton');
let todoUserInputEle = document.getElementById('todoUserInput');
let saveTodoButtonEle = document.getElementById('saveTodoButton');


function getTodosFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem('todoList');
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodosFromLocalStorage();
let todosCount = todoList.length;

saveTodoButtonEle.onclick = function() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle('checked');

    let checkedBoxIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoID = 'todo' + eachTodo.uniqueNo;
        if (eachTodoID === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[checkedBoxIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainerEle.removeChild(todoElement);

    let deletetodoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoID = 'todo' + eachTodo.uniqueNo;
        if (eachTodoID === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletetodoIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = 'checkbox' + todo.uniqueNo;
    let labelId = 'label' + todo.uniqueNo;
    let todoId = 'todo' + todo.uniqueNo;

    let todoElement = document.createElement('li');
    todoElement.classList.add('todo-item-container', 'd-flex', 'flex-row');
    todoElement.id = todoId;
    todoItemsContainerEle.appendChild(todoElement);

    let inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked; //new
    inputElement.classList.add('checkbox-input');
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container', 'd-flex', 'flex-row');
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add('checkbox-label');
    labelElement.textContent = todo.text; //****
    if (todo.isChecked) {
        labelElement.classList.toggle('checked')
    } //new
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement('div');
    deleteIconContainer.classList.add('delete-icon-container');
    labelContainer.appendChild(deleteIconContainer);

    let deleteiconElement = document.createElement('i');
    deleteiconElement.classList.add('far', 'fa-trash-alt', 'delete-icon');
    deleteIconContainer.appendChild(deleteiconElement);

    deleteiconElement.onclick = function() {
        onDeleteTodo(todoId);
    };
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

addTodoButtonElement.onclick = function() {
    let task = todoUserInputEle.value;
    if (task === "") {
        alert('Enter valid Input');
        return;
    }
    todosCount++;
    let todo = {
        text: task,
        uniqueNo: todosCount,
        isChecked: false
    };

    createAndAppendTodo(todo);
    todoList.push(todo);
    todoUserInputEle.value = '';
};