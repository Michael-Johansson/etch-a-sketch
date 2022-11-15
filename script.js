"use strict";

const container = document.querySelector(".container");
const div = document.createElement("div");
const child = document.querySelector(".child");
const newGrid = document.getElementById("new-grid");
const erase = document.getElementById("erase");
const colorPick = document.getElementById("color-pick");
const rainbow = document.getElementById("rainbow");
const color = document.getElementById("color");

//Creates a grid of divs with event listeners
const createGrid = (size) => {
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("child");
    container.append(div);

    div.addEventListener("mouseover", () => {
      // div.classList.add("draw");
      div.style.backgroundColor = color.value;
    });
  }
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
};

// Removes original grid completely and creates a new grid based on user input
newGrid.addEventListener("click", (gridSize) => {
  gridSize = prompt("Choose a grid size between 1 - 64");
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  if (gridSize > 64) {
    alert("Grid size must be between 1 - 64");
  } else {
    createGrid(gridSize);
  }
});

// Removes all colors from the grid
erase.addEventListener("click", () => {
  container.childNodes.forEach((node) => {
    // node.classList.remove("draw");
    node.style.backgroundColor = "white";
  });
});

createGrid(16);
