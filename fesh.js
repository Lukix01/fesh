let readline = require("readline");
let fs = require("fs");
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

let playerX = 0;
let playerY = 0;
let playerIcon = "⬜";
let playerScore = 0;

let yellow = "\x1b[33m%s\x1b[0m";
let gameTime = 0;
let gameEnded = false;

let pointX = 0;
let pointY = 0;

function newPoint() {
    pointX = Math.floor(Math.random() * process.stdout.columns);
    pointY = Math.floor(Math.random() * process.stdout.rows);
}

function newPosition() {
    console.clear();
    pointDetect();
    showStats();
    for (let y = 0; y < playerY; y++) {
        process.stdout.write("\n");
    }
    for (let x = 0; x < playerX; x++) {
        process.stdout.write(" ");
    }
    process.stdout.write(playerIcon);
}

let timer = setInterval(function () {
    gameTime++;
}, 1000);

function pointDetect() {
    if (playerX == pointX && playerY == pointY) {
        newPoint();
        playerScore++;
    }
    if (playerScore == 1) {
        gameEnded = true;
        console.clear();
        console.log("game won, congratulations!");
        clearInterval(timer);
        fs.appendFileSync(
            "your_games.txt",
            `Game time: ${gameTime.toString()} seconds | Score: ${playerScore} | Window size: (width: ${
                process.stdout.columns
            } | height: ${process.stdout.rows})\n`
        );
    }
}

newPoint();

function showStats() {
    console.log(yellow, "Your position -", `(X: ${playerX} | Y: ${playerY})`);
    console.log(yellow, "Next point -", `(X: ${pointX} | Y: ${pointY})`);
    console.log(`Score: ${playerScore} / 10`);
}

process.stdin.on("keypress", (chunk, key) => {
    if (!gameEnded) {
        switch (key.name) {
            case "w":
                playerY--;
                newPosition();
                break;
            case "s":
                playerY++;
                newPosition();
                break;
            case "a":
                playerX--;
                newPosition();
                break;
            case "d":
                playerX++;
                newPosition();
                break;
            case "q":
                process.exit();
        }
    }
});
