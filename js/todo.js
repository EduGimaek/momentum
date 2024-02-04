const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
//const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    //toDo.id == int
    //li.id == string
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodoObj){
    const li = document.createElement('li');
    li.id = newTodoObj.id;

    const blank = document.createElement('span');
    blank.innerText = "  ";

    const span = document.createElement('span');
    span.innerText = newTodoObj.text;

    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(blank);
    li.appendChild(button);

    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    console.log(toDoInput.value);
    toDoInput.value = "";
    const newTodoObj = {
        id: Date.now(),
        text:newTodo,
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos!== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    //parsedToDos.forEach((item)=>{paintToDo(item)});
    parsedToDos.forEach(paintToDo);
}
