let gameseq = [];
let userseq = [];
let started = false;
let level = 0;
let highScore = 0;

let btns = ["red", "green", "blue", "yellow"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
    if (!started) {

        console.log("Game is started");
        started = true;
        levelup();
    }
});


function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 200);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 200);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {

        if (level > highScore) {
            highScore = level;
        }

        h2.innerHTML = `Game Over! Your score is <b>${level}</b>.<br>Highest Score: <b>${highScore}</b><br>Press any key to restart`;

        document.body.classList.add("wrong");
setTimeout(() => {
    document.body.classList.remove("wrong");
}, 300);

        restart();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length - 1);
}

function levelup() {
    userseq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameseq.push(randomColor);
    console.log(gameseq);

    gameflash(randomBtn);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function restart() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
