// countdown.js

// Set the target date for UPSC Prelims 2026
const prelimsDate = new Date("May 24, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = prelimsDate - now;

    // Time calculations
    const months = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 30.4375)); // average month length
    const days = Math.floor((timeLeft % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display result
    document.getElementById("countdown").innerHTML = 
        `${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Stop the countdown when the date is reached
    if (timeLeft < 0) {
        document.getElementById("countdown").innerHTML = "EXAM DAY!";
        clearInterval(timerInterval);
    }
}

// Update every second
const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Run immediately on load
