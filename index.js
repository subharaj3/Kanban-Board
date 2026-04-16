const cardData = [];

window.addEventListener("load", () => {
  const storageData = localStorage.getItem("myData");

  if (storageData) {
    const cardData = JSON.parse(storageData);
    cardData.forEach((card) => {
      cardRender(card);
    });
  }
});

function cardRender(card) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("card");

  const boardElement = document.getElementById("board");

  if (boardElement.classList.contains("lightBoard")) {
    taskCard.classList.add("cardLight");
  } else {
    taskCard.classList.add("cardDark");
  }

  taskCard.id = card.id;
  taskCard.innerHTML = `
            <div class="cardTag">
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
let themeBool = false;
const mode = document.getElementById("mode");
mode.addEventListener("click", () => {
  if (!themeBool) {
    lightmode();
  } else {
    darkmode();
  }
});

const lightmode = function () {
  mode.classList.remove("fa-moon");
  mode.classList.add("fa-sun");
  contentHeader.classList.remove("darkHeader");
  contentHeader.classList.add("lightHeader");
  board.classList.remove("darkBoard");
  board.classList.add("lightBoard");
  for (let i = 0; i < cardPopUp.length; i++) {
    const e = cardPopUp[i];
    e.classList.add("lightCardPopUp");
  }
  for (let i = 0; i < genre.length; i++) {
    const e = genre[i];
    e.classList.remove("genreDark");
    e.classList.add("genreLight");
  }
  for (let i = 0; i < classFoot.length; i++) {
    const e = classFoot[i];
    e.classList.remove("darkFoot");
    e.classList.add("lightFoot");
  }
  for (let i = 0; i < card.length; i++) {
    const e = card[i];
    e.classList.add("cardLight");
    e.classList.remove("cardDark");
  }
  for (let i = 0; i < classHeadText.length; i++) {
    const e = classHeadText[i];
    e.style.color = "black";
  }
  renamer.classList.remove("renamerDark");
  renamer.classList.add("renamerLight");
  themeBool = true;
};

const darkmode = function () {
  mode.classList.remove("fa-sun");
  mode.classList.add("fa-moon");
  contentHeader.classList.remove("lightHeader");
  contentHeader.classList.add("darkHeader");
  board.classList.remove("lightBoard");
  board.classList.add("darkBoard");
  for (let i = 0; i < cardPopUp.length; i++) {
    const e = cardPopUp[i];
    e.classList.remove("lightCardPopUp");
  }
  for (let i = 0; i < genre.length; i++) {
    const e = genre[i];
    e.classList.remove("genreLight");
    e.classList.add("genreDark");
  }
  for (let i = 0; i < classFoot.length; i++) {
    const e = classFoot[i];
    e.classList.remove("lightFoot");
    e.classList.add("darkFoot");
  }
  for (let i = 0; i < card.length; i++) {
    const e = card[i];
    e.classList.remove("cardLight");
    e.classList.add("cardDark");
  }
  for (let i = 0; i < classHeadText.length; i++) {
    const e = classHeadText[i];
    e.style.color = "white";
  }
  renamer.classList.remove("renamerLight");
  renamer.classList.add("renamerDark");
  themeBool = false;
};

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

    const stringData = JSON.stringify(cardData);
    localStorage.setItem("myData", stringData);
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

      for (let i = cardData.length - 1; i >= 0; i--) {
        if (cardData[i].id == cardId) {
          cardData.splice(i, 1);
        }
      }
    }
  }
}

document.getElementById("board").addEventListener("click", cardRemover);
