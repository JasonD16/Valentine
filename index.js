const yesBtn = document.querySelector(".btn-yes");
const noBtn = document.querySelector(".btn-no");
const memeImg = document.querySelector(".meme-img");
const memeText = document.querySelector(".meme-text");

// Create floating hearts background
function createHearts() {
    const container = document.body;
    const heartSymbols = ["❤️", "💕", "💖", "💗", "💘"];

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 5 + 10) + "s";
        heart.style.animationDelay = (Math.random() * 10) + "s";
        container.appendChild(heart);
    }
}

createHearts();

let countNoBtnHover = 0;

function moveNoButton() {
    countNoBtnHover++;

    if (countNoBtnHover >= 5) {
        noBtn.style.display = "none";
        memeImg.style.display = "block";
        memeText.style.display = "block";

        setTimeout(() => {
            memeImg.style.display = "none";
            memeText.style.display = "none";
        }, 2000);

        return;
    }

    const zone = document.getElementById("safe-zone");

    // Calculate max positions relative to the safe-zone
    const maxX = zone.offsetWidth - noBtn.offsetWidth;
    const maxY = zone.offsetHeight - noBtn.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    noBtn.style.zIndex = "999";
}

yesBtn.addEventListener("click", () => {
    // Celebration effect
    document.body.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    const header = document.querySelector("h1");
    header.innerHTML = "I knew you'd say yes! ❤️";
    header.style.fontSize = "3rem";
    document.querySelector(".card-body").style.display = "none";

    // Create extra hearts for celebration
    for (let i = 0; i < 30; i++) {
        setTimeout(createHearts, i * 100);
    }
});

// Handle both hover (desktop) and click (mobile)
noBtn.addEventListener("mouseover", (e) => {
    // Only move on hover if it's not a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        moveNoButton();
    }
});

noBtn.addEventListener("click", (e) => {
    // On touch devices, movement happens on click
    if (!window.matchMedia("(pointer: fine)").matches) {
        moveNoButton();
    } e.preventDefault();
});
