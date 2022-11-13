"use strict";

const container = document.querySelector(".container");
const div = document.createElement("div");
const child = document.querySelector(".child");

const createGrid = (size) => {
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("child");
    container.append(div);

    div.addEventListener("mouseover", () => {
      div.classList.add("draw");
    });
  }

  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
};

createGrid(16);
