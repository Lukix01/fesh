let readline = require("readline");
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

let playerX = 0;
let playerY = 0;
let playerIcon = "⬜";
let playerScore = 0;

let yellow = "\x1b[33m%s\x1b[0m";

let pointX = 0;
let pointY = 0;

function newPoint() {
    pointX = Math.floor(Math.random() * 100);
    pointY = Math.floor(Math.random() * 25);
}

function newPosition() {
    for (let y = 0; y < playerY; y++) {
        process.stdout.write("\n");
    }
    for (let x = 0; x < playerX; x++) {
        process.stdout.write(" ");
    }
}

function pointDetect() {
    if (playerX == pointX && playerY == pointY) {
        newPoint();
        score++;
    }
}

newPoint();

function showStats() {
    console.log(yellow, "Your position -", `(X: ${playerX} | Y: ${playerY})`);
    console.log(yellow, "Next point -", `(X: ${pointX} | Y: ${pointY})`);
    console.log(`Score: ${playerScore}`);
}

process.stdin.on("keypress", (chunk, key) => {
    switch (key.name) {
        case "w":
            playerY--;
            console.clear();
            pointDetect();
            showStats();
            newPosition();
            process.stdout.write(playerIcon);
            break;
        case "s":
            playerY++;
            console.clear();
            pointDetect();
            showStats();
            newPosition();
            process.stdout.write(playerIcon);
            break;
        case "a":
            playerX--;
            console.clear();
            pointDetect();
            showStats();
            newPosition();
            process.stdout.write(playerIcon);
            break;
        case "d":
            playerX++;
            console.clear();
            pointDetect();
            showStats();
            newPosition();
            process.stdout.write(playerIcon);
            break;
        case "q":
            process.exit();
    }
});
