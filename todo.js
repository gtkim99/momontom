// <⚠️ DONT DELETE THIS ⚠️>
//import "index.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const li = event.target.parentNode;
  const taskId = parseInt(li.id);

  toDos = toDos.filter(function (toDo) {
    return toDo.id !== taskId;
  });

  li.parentNode.removeChild(li);
  savetoLocalstorage();
}

function genericLi(toDoObj) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  delBtn.innerText = "❌";

  delBtn.addEventListener("click", deleteToDo);

  span.innerText = toDoObj.text;
  li.id = toDoObj.id;

  li.appendChild(span);
  li.appendChild(delBtn);

  return li;
}

function findTask(taskId) {
  return toDos.find(function (task) {
    return task.id === taskId;
  });
}

function backtoPending(event) {
  const li = event.target.parentNode;
  const taskId = parseInt(li.id);
  const task = findTask(taskId);

  task.status = "pending";

  li.parentNode.removeChild(li);
  paintPending(task);

  savetoLocalstorage();
}

function savetoLocalstorage() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintFinished(task) {
  const backBtn = document.createElement("button");
  let li = genericLi(task);

  backBtn.innerText = "⤴️";

  li.appendChild(backBtn);
  finishedList.appendChild(li);

  backBtn.addEventListener("click", backtoPending);
}
function finishToDo(event) {
  const li = event.target.parentNode;
  const taskId = parseInt(li.id);
  const task = findTask(taskId);

  task.status = "finished";

  li.parentNode.removeChild(li);
  paintFinished(task);

  savetoLocalstorage();
}

function paintPending(task) {
  const finBtn = document.createElement("button");
  let li = genericLi(task);
  finBtn.innerText = "✅";

  li.appendChild(finBtn);
  pendingList.appendChild(li);

  finBtn.addEventListener("click", finishToDo);
}

function inputStart(text) {
  const status = "pending";
  const newId = toDos.length + 1;

  const toDoObj = {
    text: text,
    status: status,
    id: newId
  };
  paintPending(toDoObj);

  toDos.push(toDoObj);
  savetoLocalstorage();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  inputStart(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  toDos = JSON.parse(localStorage.getItem(TODOS_LS)) || [];

  toDos.forEach(function (toDo) {
    if (toDo.status === "pending") {
      paintPending(toDo);
    } else if (toDo.status === "finished") {
      paintFinished(toDo);
    }
  });
}

function init() {
  loadToDos();

  toDoForm.addEventListener("submit", handleSubmit);
}

init();
