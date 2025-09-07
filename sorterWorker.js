self.onmessage = function (e) {
  const arr = [...e.data];
  bubbleSort(arr);
};

// Bubble Sort with step updates
function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  let delay = 300; // ms between updates

  (async function sortLoop() {
    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;

          // send array update
          self.postMessage({ type: "update", array: [...arr] });
          await sleep(delay);
        }
      }
      if (!swapped) break;
    }
    self.postMessage({ type: "done", array: arr });
  })();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
