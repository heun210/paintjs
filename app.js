"use strict";
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
/* ctx.fillStyle = "green";
ctx.fillRect(50, 20, 100, 49); */

let painting = false;
let filling = false;

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

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const strokeSize = event.target.value;
  ctx.lineWidth = strokeSize;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
    ctx.fillStyle = strokeStyle;
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  /* console.log(image); */
  const link = document.createElement("a");
  link.href = image;
  link.download = "";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
  /* canvas.addEventListener("mouseenter", startPainting); */
}

Array.from(colors).forEach((event) =>
  event.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

//* canvas는 pixel을 다루기 때문에 기본적으로 image를 만든다.
//* 현재는 canvas의 backgroundColor를 설정안해서 transparent로 나온다. -> HTML에만 설정해줌
//* canvas가 load되자마자 설정 되도록 해줘야 한다. -> canvas는 위에서 아래로 실행된다.
//* 검은색으로 설정 되기 전에 default 값으로 흰색을 준다. -> ctx.fillStyle = "white";
//* 캔버스 전체를 칠해줘야 하니 ctx.fillRect도 같이 사용해준다. -> ctx.fillRect(0,0,canvas.width. canvas.height);

//* 마우스 우클릭 방지 -> contextMenu에 preEventDefault를 설정해준다.

//* 우리가 원하는건 여기에 있는 내가 그린 것들을 다 넣고, image안에 담아내는 것이다.
//* 1. canvas의 데이터를 image처럼 얻는것.
//* HTMLCanvasElement.toDataURL() : (기본적으로 PNG로 설정된) type parameter에 의해 지정된 포맷의 이미지 표현을 포함한 data URL을 반환함.
//* link를 만들어줄껀데 존재하지 않는 링크같은 것.
//* download는 anchor("a")태그의 attribute
//* click을 가짜로 만들어 주면 된다.
//* link.href = canvas.toDataURL();
//* link.download = "mypainting.png";
