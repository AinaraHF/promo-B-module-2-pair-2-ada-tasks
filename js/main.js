'use strict';

const taskList = document.querySelector('.js-tasklist');

const tasks = [
    { name: "Recoger setas en el campo", completed: true, id: 1 },
    { name: "Comprar pilas", completed: true, id: 2 },
    { name: "Poner una lavadora de blancos", completed: true, id: 3 },
    { name: "Aprender cómo se realizan las peticiones al servidor en JavaScript", completed: false, id: 4,},
  ];

  function renderTasks(){
    taskList.innerHTML = '';
    for(const task of tasks){
    if (task.completed === true){
        taskList.innerHTML += `<li class="tachado">${task.name}</li>`;
    }else{
        taskList.innerHTML += `<li>${task.name}</li>`;
    }
    }
  };

  renderTasks();
