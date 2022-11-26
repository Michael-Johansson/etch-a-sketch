"use strict";

const container = document.querySelector(".container");
const newGrid = document.getElementById("new-grid");
const erase = document.getElementById("erase");
const colorPick = document.getElementById("color-pick");
const rainbow = document.getElementById("rainbow");
const outline = document.getElementById("outline");
const color = document.getElementById("color");
const colorWrapper = document.getElementById("color-wrapper");
const rainbowR = () => Math.round(Math.random());
const rainbowG = () => Math.round(Math.random());
const rainbowB = () => Math.round(Math.random());
let rainbowMode = false;
let mouseDown = false;
colorWrapper.addEventListener("change", () => {
  colorWrapper.style.backgroundColor = color.value;
})


//Creates a grid of divs with event listeners
const createGrid = (size) => {
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    container.append(div);
    colorWrapper.style.backgroundColor = color.value;

    div.addEventListener("mousedown", () => {
      if (rainbowMode === true) {
        div.style.backgroundColor = `rgb(${rainbowR() * 200},
          ${rainbowG() * 200},
          ${rainbowB() * 200}, 0.85)`;
      } else {
        div.style.backgroundColor = color.value;
      }
    })

    div.addEventListener("mouseover", () => {
      if (mouseDown) {
        if (rainbowMode === true) {
          div.style.backgroundColor = `rgb(${rainbowR() * 200},
            ${rainbowG() * 200},
            ${rainbowB() * 200}, 0.85)`;
        } else {
          div.style.backgroundColor = color.value;
        }
      }
      
    });
  }
  window.addEventListener("mousedown", () => {
    mouseDown = true;
  })
  window.addEventListener("mouseup", () => {
    mouseDown = false;
  })
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
    createGrid(16);
  } else {
    createGrid(gridSize);
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
    rainbow.style.background = "linear-gradient(0deg, #ff4800, #ffee00, #00ff2a, #00ccff, #0011ff)";
  }
});

outline.addEventListener("click", () => {
  container.childNodes.forEach((node) => {
    node.classList.toggle("outline")
  })
})

createGrid(16);
