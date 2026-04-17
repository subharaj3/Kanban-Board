let cardData = [];

function saveData() {
  localStorage.setItem("myData", JSON.stringify(cardData));
}

window.addEventListener("load", () => {
  const storageData = localStorage.getItem("myData");

  if (storageData) {
    cardData = JSON.parse(storageData);
    cardData.forEach((card) => {
      cardRender(card);
    });
  }
});

function cardRender(card) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("card");

  taskCard.id = card.id;

  taskCard.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", taskCard.id);
  });

  taskCard.innerHTML = `
            <div class="cardTag" draggable="true">
              <span class="TagName">${card.tag}</span>
              <span class="X"><i class="fa-solid fa-xmark"></i></span>
            </div>
            <div class="cardName">${card.name}</div>
            <span class="cardDesc">${card.desc}</span>
            <div class="cardDet">
              <span class="priority">
                <i class="fa-solid fa-circle-info"></i>
                ${card.priority}
              </span>
              <span class="assigne">${card.assignees}</span>
            </div>
          `;

  const CardGenre = document
    .getElementById(card.type)
    .querySelector(".cardContainer");
  CardGenre.appendChild(taskCard);
}

const contentHeader = document.getElementById("contentHeader");
const board = document.getElementById("board");
const genre = document.getElementsByClassName("genre");
const classFoot = document.querySelectorAll(".classFoot");
const card = document.getElementsByClassName("card");
const classHeadText = document.getElementsByClassName("classHeadText");
const X = document.getElementsByClassName("X");
const cardPopUp = document.querySelectorAll(".cardPopUp");

//date functionality
const boardDate = document.getElementById("boardDate");
const dt = new Date();
boardDate.innerText = `${dt.toLocaleDateString()}`;

//rename functionality
let renameBool = false;
const renameIcon = document.getElementById("renameIcon");
const renamer = document.getElementById("renamer");
const boardName = document.getElementById("boardName");

renameIcon.addEventListener("click", () => {
  if (!renameBool) {
    renameDisplayer();
  } else {
    renameRemover();
  }
});

const renameDisplayer = function () {
  renameIcon.classList.remove("fa-feather-pointed");
  renameIcon.classList.add("fa-circle-arrow-right");
  renamer.style.display = "block";
  renameBool = true;
};

const renameRemover = function () {
  const newName = renamer.value;
  if (newName) {
    boardName.innerText = newName;
  }
  renamer.style.display = "none";
  renameBool = false;
  renameIcon.classList.remove("fa-circle-arrow-right");
  renameIcon.classList.add("fa-feather-pointed");
};

//theme functionality
const mode = document.getElementById("mode");
mode.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    mode.classList.replace("fa-moon", "fa-sun");
  } else {
    mode.classList.replace("fa-sun", "fa-moon");
  }
});

classFoot.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const popUp = e.currentTarget.previousElementSibling;

    if (popUp.style.visibility === "visible") {
      popUp.style.visibility = "hidden";
    } else {
      popUp.style.visibility = "visible";
    }
  });
});

function taskMaker(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const formGenre = e.currentTarget.parentElement.id;
  const formData = new FormData(form);

  const newTaskData = {
    tag: formData.get("TaskTag"),
    name: formData.get("TaskName"),
    desc: formData.get("TaskDesc"),
    priority: formData.get("prio"),
    assignees: formData.getAll("taskAssignee"),
    type: formGenre,
    id: Date.now(),
  };

  if (
    newTaskData.tag !== "" ||
    newTaskData.name !== "" ||
    newTaskData.desc !== ""
  ) {
    cardRender(newTaskData);
    cardData.push(newTaskData);

    saveData();
  }

  form.reset();
  form.style.visibility = "hidden";
}

cardPopUp.forEach((form) => {
  form.addEventListener("submit", taskMaker);

  const cardCancel = form.querySelector(".cardCancel");
  cardCancel.addEventListener("click", () => {
    form.reset();
    form.style.visibility = "hidden";
  });
});

function cardRemover(e) {
  const deleteBtn = e.target.closest(".X");

  if (deleteBtn) {
    const contain = deleteBtn.closest(".card");

    if (contain) {
      const cardId = contain.id;

      contain.remove();

      cardData = cardData.filter((card) => card.id != cardId);

      saveData();
    }
  }
}

document.getElementById("board").addEventListener("click", cardRemover);

const cardContainers = document.querySelectorAll(".cardContainer");

cardContainers.forEach((container) => {
  container.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  container.addEventListener("drop", function (e) {
    e.preventDefault();

    const dragId = e.dataTransfer.getData("text/plain");

    const draggedElement = document.getElementById(dragId);

    if (draggedElement) {
      const dropZone = e.target.closest(".cardContainer");
      if (dropZone) {
        dropZone.appendChild(draggedElement);

        const newGenre = dropZone.parentElement.id;
        console.log(newGenre);

        for (let i = 0; i < cardData.length; i++) {
          if (cardData[i].id == dragId) {
            cardData[i].type = newGenre;
            break;
          }
        }

        saveData();
      }
    }
  });
});
