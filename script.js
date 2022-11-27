"use strict";

const container = document.querySelector(".container");
const newGrid = document.getElementById("new-grid");
const gridInfo = document.getElementById("grid-info");
const erase = document.getElementById("erase");
const colorPick = document.getElementById("color-pick");
const rainbow = document.getElementById("rainbow");
const outline = document.getElementById("outline");
const color = document.getElementById("color");
const colorWrapper = document.getElementById("color-wrapper");
const rainbowR = () => Math.round(Math.random() * 255);
const rainbowG = () => Math.round(Math.random() * 255);
const rainbowB = () => Math.round(Math.random() * 255);
let rainbowMode = false;
let mouseDown = false;

//Creates a grid of divs with event listeners
const createGrid = (size) => {
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    container.append(div);
    colorWrapper.style.backgroundColor = color.value;

    // This makes it possible to color a square with a click, instead of only mouseover
    div.addEventListener("mousedown", () => {
      if (rainbowMode === true) {
        div.style.backgroundColor = `rgb(${rainbowR()},
          ${rainbowG()},
          ${rainbowB()}, 0.85)`;
      } else {
        div.style.backgroundColor = color.value;
      }
    });

    div.addEventListener("mouseover", (event) => {
      if (mouseDown) {
        if (rainbowMode === true) {
          div.style.backgroundColor = `rgb(${rainbowR()},
            ${rainbowG()},
            ${rainbowB()}, 0.85)`;
        } else {
          div.style.backgroundColor = color.value;
        }
      }
    });
  }

  // Toggles "mouseDown" so the user is drawing only while holding down the mouse button
  window.addEventListener("mousedown", () => {
    mouseDown = true;
  });
  window.addEventListener("mouseup", () => {
    mouseDown = false;
  });
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
};

// Removes original grid completely and creates a new grid based on user input
newGrid.addEventListener("click", () => {
  const gridSize = Number(prompt("Choose a grid size between 1 - 64"));
  if (gridSize > 64 || gridSize < 1 || isNaN(gridSize)) {
    alert("Grid size must be between 1 - 64");
    gridInfo.textContent = "16 x 16";
    container.innerHTML = "";
    createGrid(16);
  } else {
    container.innerHTML = "";
    createGrid(gridSize);
    gridInfo.textContent = `${gridSize} x ${gridSize}`;
  }
});

erase.addEventListener("click", () => {
  container.childNodes.forEach((node) => {
    node.style.backgroundColor = "white";
  });
});

rainbow.addEventListener("click", () => {
  if (rainbowMode) {
    rainbowMode = false;
    rainbow.style.background = "white";
  } else if (!rainbowMode) {
    rainbowMode = true;
    rainbow.style.background =
      "linear-gradient(0deg, #ff4800, #ffee00, #00ff2a, #00ccff, #0011ff)";
  }
});

outline.addEventListener("click", () => {
  container.childNodes.forEach((node) => {
    node.classList.toggle("outline");
  });
});

colorWrapper.addEventListener("change", () => {
  colorWrapper.style.backgroundColor = color.value;
});

createGrid(16);
