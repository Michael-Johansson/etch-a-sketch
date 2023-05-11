"use strict";

const container = document.getElementById("container");
const gridSizeBtn = document.getElementById("grid-size-btn");
const overlay = document.querySelector(".overlay");

function createGrid(gridSize) {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement("div");
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.append(div);
  }
}

gridSizeBtn.addEventListener("click", () => {
  overlay.classList.toggle("active");
})

createGrid(5);
