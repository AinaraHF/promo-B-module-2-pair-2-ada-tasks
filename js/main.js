'use strict';

const taskList = document.querySelector('.js-tasklist');
const btnFilter = document.querySelector('.js-btn-filter');
const inputFilter = document.querySelector('.js-text-task-filter');
const sentence = document.querySelector('.js-sentence');
const inputAdd = document.querySelector('.js-text-task-add');
const btnAdd = document.querySelector('.js-btn-add');



let tasks = [];
const GITHUB_USER = "<tu_usuario_de_github_aqui>";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;

fetch('https://dev.adalab.es/api/todo')
  .then((response) => response.json())
  .then((data) => {
    //console.log(data);
    tasks = data.results;
    renderTasks(tasks);
  });
  

function renderTasks(array){
    taskList.innerHTML = '';
    for(const task of array){
    if (task.completed === true){
        taskList.innerHTML += `<li class="tachado"><input id="${task.id}" type="checkbox" checked/>${task.name}</li>`;
    }else{
        taskList.innerHTML += `<li><input id="${task.id}" type="checkbox"/>${task.name}</li>`;
    }
    }
    addSentence();
  };

renderTasks(tasks);

const handleClickList = (event) => {
  const taskId = parseInt(event.target.id); // Obtengo el id del checkbox clickado por la usuaria
  if (!taskId) return; // Si no ha pulsado en el checkbox, no queremos hacer nada y salimos de la función
  const doneTask = tasks.findIndex((task)=> task.id === taskId);
  console.log(doneTask);
  
  if(tasks[doneTask].completed === true){
    tasks[doneTask].completed = false;
  }else {
    tasks[doneTask].completed = true;

  }
  
  renderTasks(tasks);
  // Busca la tarea que tenga el id `taskId` en el array `tasks`
  // Una vez que has obtenido la tarea, actualiza la propiedad `completed`
  // Pinta de nuevo las tareas en el html
};

taskList.addEventListener('click', handleClickList);


function handleClickFilter(ev){
  ev.preventDefault();
    const inputValue = inputFilter.value;
    const filteredValue = tasks.filter((task)=> task.name.includes(inputValue));
    renderTasks(filteredValue);
};

btnFilter.addEventListener('click', handleClickFilter);


//Ejercicio 2

//crear una funcion

function addSentence (){
  const completedTask = tasks.filter((task) => task.completed === true);
  const unfinishedTask = tasks.filter((task) => task.completed === false);
  sentence.innerHTML = `Tienes ${tasks.length} tareas.  ${completedTask.length} tareas completadas. ${unfinishedTask.length} tareas por realizar.`;
  console.log(completedTask);

};

//ejercicio Agregar un nueva tarea

const handleNewTask = (event) => {
  event.preventDefault();
  const newTaskValue = inputAdd.value;
  const newTask = {
    name: `${newTaskValue}`,
    completed: false,
  };
  tasks.push(newTask);
  renderTasks(tasks);

  localStorage.setItem('userTasks', JSON.stringify(tasks));

};


btnAdd.addEventListener('click', handleNewTask);


const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));


//ejercicio 2 pendiente
if (tasksLocalStorage !== null) {
  renderTasks(tasksLocalStorage);

  // pinta la lista de tareas almacenadas en tasksLocalStorage
} else {
  //sino existe el listado de tareas en el local storage
  // pide los datos al servidor
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((data) => {
      //guarda el listado obtenido en el Local Storage
      // pinta la lista de tareas
    })
    .catch((error) => {
      console.error(error);
    });
}