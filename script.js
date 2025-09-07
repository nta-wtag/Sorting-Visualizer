const barsContainer = document.getElementById("bars");
const generateBtn = document.getElementById("generate");
const sortBtn = document.getElementById("sort");

let array = [];
let worker;

function generateArray(size = 15) {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
  renderBars(array);
}

function renderBars(arr) {
  barsContainer.innerHTML = "";
  arr.forEach(value => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 5}px`;
    barsContainer.appendChild(bar);
  });
}

generateBtn.addEventListener("click", () => {
  generateArray();
});

sortBtn.addEventListener("click", () => {
  if (worker) worker.terminate(); 
  worker = new Worker("sorterWorker.js");
  worker.postMessage(array);

  worker.onmessage = (e) => {
    if (e.data.type === "update") {
      renderBars(e.data.array);
    } else if (e.data.type === "done") {
      renderBars(e.data.array);
      console.log("Sorting complete!");
    }
  };
});

generateArray();
