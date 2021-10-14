//create todoItems
const list = document.getElementById("list");
const form = document.getElementById("new-todo-form");
const formInput = document.getElementById("todo-input");
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST";
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
let todos = loadTodos();
todos.forEach(renderToDos); //you don't have to do forEach(todo => {renderTodos()}), it is passed automtically

list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;
  //get todo that is clicked on
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const clickedToDo = todos.find((todo) => todo.id === todoId);
  //toggle the complete property to be equal tothe checkbox value
  clickedToDo.complete = e.target.checked;
  //save our updated todo
  saveTodos();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let todoItemName = formInput.value;
  if (todoItemName === "") return;
  const newTodo = {
    name: todoItemName,
    complete: false,
    id: new Date().valueOf().toString(), //this gives you the number of millliseconds that have gone by from 01/01/97 till now. It is good for creating a new ID because we get a different number as each milisecond goes by
  };
  todos.push(newTodo);
  renderToDos(newTodo);
  saveTodos();
  formInput.value = "";
});

function renderToDos(todo) {
  const template = document.getElementById("list-item-template");
  const templateClone = template.content.cloneNode(true);
  console.log(templateClone);
  const textNode = templateClone.querySelector("[data-list-item-text]");
  textNode.innerText = todo.name;
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;
  //toggling the complete status
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]");
  checkbox.checked = todo.complete;

  list.appendChild(templateClone);
}

//save todos
function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}

//load todos
function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(todosString) || [];
}

//delete todos

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  //remove todo from screen
  parent.remove();
  //remove todo from list
  todos = todos.filter((todo) => todo.id !== todoId);
  //save the new todos
  saveTodos();
});

//complete todos
