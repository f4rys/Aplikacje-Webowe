let timer;
let seconds = 0;

function updateTimerDisplay() {
  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;
  document.getElementById("timer").textContent =
    minutes > 0 ? `${minutes}min ${displaySeconds}s` : `${displaySeconds}s`;
}

document.getElementById("start").addEventListener("click", () => {
  if (!timer) {
    timer = setInterval(() => {
      seconds++;
      updateTimerDisplay();
    }, 1000);
  }
});

document.getElementById("stop").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  updateTimerDisplay();
});
