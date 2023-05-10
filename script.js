"use strict";

const container = document.getElementById("container");

function createGrid(gridSize) {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement("div");
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.append(div);
  }
}

createGrid(10);
