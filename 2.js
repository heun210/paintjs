"use strict";

//@ paint js
//* ELEMENTS : Canvas
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

//* ELEMENTS : Color & Line Width
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const check = document.getElementById("jsCheck");

//* ELEMENTS : Button
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//* ELEMENTS : INIT VALUE
const WH = document.getElementById("jsCanvas");
const INITIAL_COLOR = "#2c2c2c";

canvas.width = WH.offsetWidth;
canvas.height = WH.offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
/* ctx.fillStyle = "green";
ctx.fillRect(50, 20, 100, 49); */

check.style.backgroundColor = INITIAL_COLOR;

let painting = false;
let filling = false;

//@ FUNCTIONS
//* FUNCTION : PAINTING
function stopPainting(event) {
  painting = false;
}

function startPainting(event) {
  painting = true;
}

function onMouseMove(event) {
  //* 여기에서 모든 움직임을 감지함
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //* 클릭하고 움직이기 전에 작동 -> 클릭하고 움직이면 작동X
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

/* function onMouseDown(event) {
  painting = true;
} // startPainting으로 

function onMouseUp(event) {
  stopPainting();
} // stopPainting으로 */

//* FUNCTION : FILLING
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

//* FUNCTION : COLOR
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
  check.style.backgroundColor = ctx.fillStyle;
}

//* FUNCTION : RANGE (LINE WIDTH)
function handleRangeChange(event) {
  const Size = event.target.value;
  ctx.lineWidth = strokeSize;
}

//* FUNCTION : BUTTON (MODE)
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

//* FUNCTION : BUTTON (SAVE)
function handleSaveClick() {
  const image = canvas.toDataURL();
  /* console.log(image); */
  const link = document.createElement("a");
  link.href = image;
  link.download = savedUserWriteTitle;
  link.click();
}

function handleCM(event) {
  event.preventDefault();
}

//* EVENT
if (canvas) {
  //* EVENT : PAINT
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); //
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  //* EVENT : FILL
  canvas.addEventListener("click", handleCanvasClick);
  //* EVENT : SAVE
  canvas.addEventListener("contextmenu", handleCM);
  /* canvas.addEventListener("mouseenter", startPainting); */
}

//* EVENT : COLOR
Array.from(colors).forEach((event) =>
  event.addEventListener("click", handleColorClick)
);
//* EVENT : RANGE (LINE WIDTH)
if (range) {
  range.addEventListener("input", handleRangeChange);
}

//* EVENT : BUTTON (MODE)
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
//* EVENT : BUTTON (SAVE)
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

//@ Canvas Title
//* ELEMENTS : SAVE TITLE
const titleForm = document.querySelector("#titleForm");
const titleInput = document.querySelector("#titleForm input");
const titleBtn = document.querySelector(".title__btn");

/* const btnContainer = document.querySelector(".btn__container"); */
//* ELEMENTS : DELETE TITLE
const delForm = document.querySelector("#delForm");
const delBtn = document.querySelector(".title__delbtn");

const CANVASTITLE = "canvasTitle";

//* FUNCTION : SAVE TITLE
function onTitleSubmit(구멍) {
  구멍.preventDefault();
  //titleInput.classList.add(HIDDEN);
  titleInput.style.display = "none";
  const userTitleWrite = titleInput.value;
  localStorage.setItem("canvasTitle", userTitleWrite);
  location.reload();
  /* titleBtn.innerText = userTitleWrite;
  titleBtn.style.display = "block"; */
  paintTitle(userTitleWrite);
}
//* EVENT : SAVE TITLE
if (titleForm) {
  titleForm.addEventListener("submit", onTitleSubmit);
}

//* FUNCTION : SAVE TITLE
function paintTitle(userTitleWrite) {
  titleBtn.innerText = ` TITLE : ${userTitleWrite}`;
  titleBtn.style.display = "block";
  titleInput.style.display = "none";
  delBtn.style.display = "block";
}

//* ELEMENTS : SAVE TITLE
const savedUserWriteTitle = localStorage.getItem(CANVASTITLE);

//* EVENT : SAVE TITLE
if (savedUserWriteTitle === null) {
  // show the form
  titleInput.style.display = "block";
  titleForm.addEventListener("submit", onTitleSubmit);
} else {
  // show the title
  /* titleBtn.innerText = userTitleWrite;
  titleBtn.style.display = "block"; */
  paintTitle(savedUserWriteTitle);
}

//@ Delete Title
//* FUNCTION : DELETE TITLE
function onTitleDel() {
  localStorage.removeItem(CANVASTITLE);
  window.location.reload(true);
}

//* EVENT : DELETE TITLE
if (delForm) {
  delForm.addEventListener("click", onTitleDel);
}
