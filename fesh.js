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

let pointX = 0;
let pointY = 0;

function newPoint() {
    pointX = Math.floor(Math.random() * process.stdout.columns);
    pointY = Math.floor(Math.random() * process.stdout.rows);
}

function newPosition() {
    for (let y = 0; y < playerY; y++) {
        process.stdout.write("\n");
    }
    for (let x = 0; x < playerX; x++) {
        process.stdout.write(" ");
    }
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
        console.clear();
        console.log("game won, congratulations!");
        clearInterval(timer);
        fs.writeFileSync(
            "your_games",
            `Game time: ${gameTime.toString()} seconds | Score: ${playerScore} | Window size: (width: ${
                process.stdout.columns
            } | height: ${process.stdout.rows})`
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
