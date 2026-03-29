const contentHeader = document.getElementById("contentHeader");
const board = document.getElementById("board");
const genre = document.getElementsByClassName("genre");
const classFoot = document.getElementsByClassName("classFoot");
const card = document.getElementsByClassName("card");
const classHeadText = document.getElementsByClassName("classHeadText");
const X = document.getElementsByClassName("X");

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
  contentHeader.style.color = "black";
  contentHeader.style.backgroundColor = "#dbdbdb";
  board.style.color = "black";
  board.style.backgroundColor = "#fff";
  for (let i = 0; i < genre.length; i++) {
    const e = genre[i];
    e.style.color = "black";
    e.style.backgroundColor = "#cfcfcf";
  }
  for (let i = 0; i < classFoot.length; i++) {
    const e = classFoot[i];
    e.style.color = "black";
    e.style.backgroundColor = "#b9b9b9";
  }
  for (let i = 0; i < card.length; i++) {
    const e = card[i];
    e.style.color = "black";
    e.style.backgroundColor = "#ffffff";
  }
  for (let i = 0; i < classHeadText.length; i++) {
    const e = classHeadText[i];
    e.style.color = "black";
  }
  for (let i = 0; i < X.length; i++) {
    const e = X[i];
    e.style.color = "black";
  }
  renamer.style.backgroundColor = "white";
  renamer.style.color = "black";
  themeBool = true;
};

const darkmode = function () {
  mode.classList.remove("fa-sun");
  mode.classList.add("fa-moon");
  contentHeader.style.color = "white";
  contentHeader.style.backgroundColor = "#4c4c4c";
  board.style.color = "white";
  board.style.backgroundColor = "#2f2f2f";
  for (let i = 0; i < genre.length; i++) {
    const e = genre[i];
    e.style.color = "white";
    e.style.backgroundColor = "#1f1f1f";
  }
  for (let i = 0; i < classFoot.length; i++) {
    const e = classFoot[i];
    e.style.color = "white";
    e.style.backgroundColor = "#3f3f3f";
  }
  for (let i = 0; i < card.length; i++) {
    const e = card[i];
    e.style.color = "white";
    e.style.backgroundColor = "#2f2f2f";
  }
  for (let i = 0; i < classHeadText.length; i++) {
    const e = classHeadText[i];
    e.style.color = "white";
  }
  for (let i = 0; i < X.length; i++) {
    const e = X[i];
    e.style.color = "white";
  }
  renamer.style.backgroundColor = "#2f2f2f";
  renamer.style.color = "white";
  themeBool = false;
};
