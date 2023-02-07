"use strict";

const toast = document.querySelector(".toast"),
  notif = document.querySelector("#notif"),
  submitForm = document.querySelector("#submitform"),
  taskTitle = document.querySelector("#task"),
  doneTask = document.querySelector("#done"),
  progressTask = document.querySelector("#progress"),
  mainList = document.querySelector(".list"),
  delTask = document.querySelectorAll(".del"),
  editTask = document.querySelectorAll(".edit"),
  checkTask = document.querySelectorAll(".check"),
  modal = document.querySelector(".modal-wrapper"),
  editTodoInput = document.querySelector(".editTodoName"),
  cancelModal = document.querySelector(".cancelBtn"),
  editButton = document.querySelector(".editButton");

//  ----------------------- task list  -------------------------------------------- ////
let task = [];

//  ----------------------------- dynamic task list ---------- - -- --   - -- - //

function renderTaskList(tasklist) {
  if (tasklist.length) {
    tasklist.forEach((task) => {
      console.log(task);
      const taskItem = createElement(
        "li",
        "w-full p-3 flex justify-between shadow-lg bg-white rounded-md mb-3 list_item",
        `
            <p class="text-xl text-[#5A5A5A]">${task.title}</p> 
            <div class="btn-group flex justify-between">
                <i data-del="${
                  task.id
                }" class='del bx bx-trash text-2xl text-red-600 mx-2 cursor-pointer active:text-red-800' ></i>
                <i data-edit="${
                  task.id
                }" class='edit bx bx-edit text-2xl text-sky-600 mx-2 cursor-pointer active:text-sky-800'></i>
                <i data-check="${
                  task.id
                }" class='check bx bx-check-circle text-2xl mx-2 ${
          task.status
            ? "text-green-600   active:text-green-800"
            : "text-black  active:text-[#3a3a3a]"
        } cursor-pointer'></i>
            </div>
            
            
            `
      );
      mainList.append(taskItem);
    });
  } else {
    mainList.innerHTML =
      "<h2 class='text-center text-xl text-red-500'> NOT FOUND !</h2>";
  }
}

renderTaskList(task);

//// ------------- dynamic task list rendering finished ----------- ///

/// -- - ----------- count task done or not ----------------------------------- ///

function countTaskDone(taskList) {
  const done = taskList.filter((item) => item.status === true).length;
  const progress = taskList.filter((item) => item.status === false).length;

  doneTask.textContent = done;
  progressTask.textContent = progress;
}

countTaskDone(task);

/// -- - ----------- count task done or not finishing ----------------------------------- ///

function addNewTask() {
  const title = taskTitle.value;

  const newTask = {
    id: Date.now(),
    title: title,
    status: false,
  };

  const check = {
    title: newTask.title.trim().length === 0,
  };
  if (check.title) {
    alert("Please enter a title for the task");
    // toast warning message
  } else {
    task.push(newTask);
    taskTitle.value = "";
    // toast succes message
  }
}

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask();
  mainList.innerHTML = "";
  renderTaskList(task);
  countTaskDone(task);
});

mainList.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    mainList.innerHTML = "";
    const id = e.target.getAttribute("data-del");
    task = task.filter((task) => task.id != id);
    renderTaskList(task);
    countTaskDone(task);
  } else if (e.target.classList.contains("check")) {
    const id = e.target.getAttribute("data-check");
    mainList.innerHTML = "";
    task.forEach((item) => {
      if (item.id == id) {
        item.status = true;
      }
    });
    renderTaskList(task);
    countTaskDone(task);
  } else if(e.target.classList.contains("edit")){
    console.log('object');
    const id = e.target.getAttribute("data-edit");
    const todo = task.filter((t) => t.id == id);
    renderModal(todo)
  }
});
cancelModal.addEventListener("click" , ()=> {
  modal.classList.add("hidden")
})

editButton.addEventListener("click", (e)=> {
  e.preventDefault()
  console.log(editTodoInput)
  const dataId = editTodoInput.getAttribute("data-id")
  editTodo(dataId , editTodoInput.value)
})


function renderModal(todo) {
  console.log(todo)
  modal.classList.remove("hidden");
  const {title , id} = todo[0]
  editTodoInput.value = title;
  // p.style.listStyle = 'line-through'
  editTodoInput.dataset.id = id
}



function editTodo (id , title) {
  task.map(todo => {
    if(todo.id == id){
      todo.title = title
    }
  })
  console.log(task)
  modal.classList.add("hidden");
  mainList.innerHTML = ""
  renderTaskList(task)
  countTaskDone(task)
}
