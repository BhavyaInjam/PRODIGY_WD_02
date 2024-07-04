const controls = document.querySelectorAll('.controls button');

controls.forEach(button => {
    button.addEventListener('click', () => {
        controls.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

let timerInterval;
let startTime;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const lapList = document.getElementById("lapList");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const resetLapBtn = document.getElementById("resetLapBtn");

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTimer);
resetLapBtn.addEventListener("click", resetLaps);

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - (timerInterval || 0);
        timerInterval = setInterval(updateTimer, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timerDisplay.textContent = "00:00:00.000";
    lapList.innerHTML = "";
}

function lapTimer() {
    const lapTime = timerDisplay.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
}

function resetLaps() {
    lapList.innerHTML = "";
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;

    timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(value, length = 2) {
    return value.toString().padStart(length, "0");
}
