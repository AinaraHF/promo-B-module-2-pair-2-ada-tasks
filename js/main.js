'use strict';

const taskList = document.querySelector('.js-tasklist');
const btnFilter = document.querySelector('.js-btn-filter');
const inputFilter = document.querySelector('.js-text-task-filter');

/*const tasks = [
    { name: "Recoger setas en el campo", completed: true, id: 1 },
    { name: "Comprar pilas", completed: true, id: 2 },
    { name: "Poner una lavadora de blancos", completed: true, id: 3 },
    { name: "Aprender cómo se realizan las peticiones al servidor en JavaScript", completed: false, id: 4,},
  ];*/

let tasks = [];
const GITHUB_USER = "<tu_usuario_de_github_aqui>";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;

fetch('https://dev.adalab.es/api/todo')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
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
  };

renderTasks(tasks);

//obtener el id del checkboc clickado con finindex
//buscar en que posicion se encuentra la tarea con ese id
//cambiar dentro del array con valor completed al valor contrario

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
