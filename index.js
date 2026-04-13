const cardData = [];
// window.addEventListener("load", () => {
//   cardData.forEach((card) => {
//     cardRender(card);
//   });
// })

// function cardRender() {

// }
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
  for (let i = 0; i < X.length; i++) {
    const e = X[i];
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
  for (let i = 0; i < X.length; i++) {
    const e = X[i];
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
  const formData = new FormData(form);

  const newTaskData = {
    tag: formData.get("TaskTag"),
    name: formData.get("TaskName"),
    desc: formData.get("TaskDesc"),
    priority: formData.get("prio"),
    // .getAll() is used for checkboxes since there can be more than one!
    assignees: formData.getAll("taskAssignee"),
  };

  cardData.push(newTaskData);

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
