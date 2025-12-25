// filepath: script.js

// ตัวแปรเก็บตัวเลขลับ
let secretNumber = 0;
// ตัวแปรนับจํานวนครั้งที่ทาย
let attemptCount = 0;

// --- ส่วนที่เพิ่มใหม่ (Timer Variables) ---
let timer;
let timeLeft = 60;

// ฟังก์ชันเริ่มเกมใหม่
function initializeGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptCount = 0;

  // รีเซ็ตสถานะ Input และปุ่ม
  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessInput").value = "";
  document.getElementById("resultContainer").innerHTML = "";

  updateDisplay();
  startTimer(); // <--- เริ่มจับเวลา
  document.getElementById("guessInput").focus();
}

// --- ส่วนที่เพิ่มใหม่ (Timer Logic) ---
function startTimer() {
  clearInterval(timer); // เคลียร์ของเก่า
  timeLeft = 60; // ตั้งเวลา 60 วินาที
  document.getElementById(
    "timerContainer"
  ).textContent = `เวลาเหลือ: ${timeLeft} วินาที`;
  document.getElementById("timerContainer").className =
    "mt-2 text-danger fw-bold fs-4 text-center";

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById(
      "timerContainer"
    ).textContent = `เวลาเหลือ: ${timeLeft} วินาที`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGameLost(); // เวลาหมด
    }
  }, 1000);
}

function endGameLost() {
  document.getElementById("resultContainer").innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4>หมดเวลา! </h4>
            <p>เฉลยคือ: ${secretNumber}</p>
        </div>
    `;
  document.getElementById("guessInput").disabled = true;
}
// ----------------------------------------

// ฟังก์ชันตรวจสอบการทาย
function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guessValue = parseInt(guessInput.value);
  const resultContainer = document.getElementById("resultContainer");

  // Validation
  if (isNaN(guessValue) || guessInput.value === "") {
    resultContainer.innerHTML = `<div class="alert alert-danger">กรุณาใส่ตัวเลข!</div>`;
    return;
  }
  if (guessValue < 1 || guessValue > 100) {
    resultContainer.innerHTML = `<div class="alert alert-danger">กรุณาใส่ตัวเลข 1-100!</div>`;
    return;
  }

  attemptCount++;

  if (guessValue === secretNumber) {
    clearInterval(timer); // <--- หยุดเวลาเมื่อชนะ
    resultContainer.innerHTML = `
      <div class="alert alert-success" role="alert">
        <h5>✓ ถูกต้อง!</h5>
        <p>คุณทายถูกในครั้งที่ ${attemptCount}</p>
        <p>ใช้เวลาไป ${60 - timeLeft} วินาที</p>
      </div>
    `;
  } else if (guessValue > secretNumber) {
    resultContainer.innerHTML = `<div class="alert alert-warning">↓ ตัวเลขสูงไป</div>`;
  } else {
    resultContainer.innerHTML = `<div class="alert alert-info">↑ ตัวเลขตํ่าไป</div>`;
  }

  updateDisplay();
  guessInput.value = "";
  guessInput.focus();
}

function updateDisplay() {
  const attemptsContainer = document.getElementById("attemptsContainer");
  attemptsContainer.textContent = `ทายแล้ว: ${attemptCount} ครั้ง`;
}

function resetGame() {
  initializeGame();
}

window.addEventListener("load", initializeGame);
