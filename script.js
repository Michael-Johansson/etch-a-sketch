"use strict";

const container = document.getElementById("container");
const colorPicker = document.getElementById("color-picker");
const colorBtn = document.getElementById("color-btn");
const sizeBtn = document.getElementById("size-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");
const cellBorderBtn = document.getElementById("cell-border-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const optionBtns = document.querySelectorAll("button");
const cells = document.querySelectorAll(".cell");
let mode = "color";
let isDrawing = false;

window.addEventListener("mousedown", () => {
  isDrawing = true;
});

window.addEventListener("mouseup", () => {
  isDrawing = false;
});

colorPicker.addEventListener("change", () => {
  mode = "color";
  activeModeButton(colorBtn);
});

colorBtn.addEventListener("click", () => {
  mode = "color";
  activeModeButton(colorBtn);
});

rainbowBtn.addEventListener("click", () => {
  if (mode == "rainbow") {
    mode = "color";
    activeModeButton(colorBtn);
  } else {
    mode = "rainbow";
    activeModeButton(rainbowBtn);
  }
});

eraserBtn.addEventListener("click", () => {
  if (mode == "eraser") {
    mode = "color";
    activeModeButton(colorBtn);
  } else {
    mode = "eraser";
    activeModeButton(eraserBtn);
  }
});

clearBtn.addEventListener("click", () => {
  container.childNodes.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
});

cellBorderBtn.addEventListener("click", () => {
  if (cellBorderBtn.classList.contains("active")) {
    cellBorderBtn.classList.remove("active");
  } else {
    cellBorderBtn.classList.add("active");
  }
  container.childNodes.forEach((cell) => {
    cell.classList.toggle("cell-border");
  });
});

sizeBtn.addEventListener("click", () => {
  const newSize = Number(prompt("Enter a new grid size between 1 - 64!"));
  if (isNaN(newSize)) {
    alert("A number is required.");
  } else if (newSize <= 0 || newSize >= 64) {
    alert("Grid size must be between 1 - 64.");
  } else {
    createGrid(newSize);
    cellBorderBtn.classList.remove("active");
  }
});

function createGrid(size) {
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mouseover", draw);
    cell.addEventListener("mousedown", draw);
    container.appendChild(cell);
  }
}

function draw(e) {
  if (isDrawing || e.type == "mousedown") {
    if (mode == "rainbow") {
      const r = Math.round(Math.random() * 255);
      const g = Math.round(Math.random() * 255);
      const b = Math.round(Math.random() * 255);
      e.target.style.backgroundColor = `rgba(${r},${g},${b}, 0.8)`;
    } else if (mode == "color") {
      e.target.style.backgroundColor = colorPicker.value;
    } else if (mode == "eraser") {
      e.target.style.backgroundColor = "white";
    }
  } else {
    return;
  }
}

function activeModeButton(button) {
  optionBtns.forEach((btn) => {
    if (btn.id == "cell-border-btn") {
      return;
    } else btn.classList.remove("active");
  });

  button.classList.add("active");
}

createGrid(32);
