let readline = require("readline");
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

let playerX = 0;
let playerY = 0;
let playerIcon = "⬜";
let playerScore = 0;

// let pointX = 0;
// let pointY = 0;

function newPosition() {
    for (let y = 0; y < playerY; y++) {
        process.stdout.write("\n");
    }
    for (let x = 0; x < playerX; x++) {
        process.stdout.write(" ");
    }
}

// pointX = Math.floor(Math.random() * 10);
// pointY = Math.floor(Math.random() * 10);

function showStats() {
    console.log(`X: ${playerX} | Y: ${playerY}`);
    console.log(`Score: ${playerScore}`);
}

process.stdin.on("keypress", (chunk, key) => {
    switch (key.name) {
        case "w":
            playerY--;
            console.clear();
            showStats();
            newPosition();
            process.stdout.write(playerIcon);
            break;
        case "s":
            playerY++;
            console.clear();
            showStats();
            newPosition();
            process.stdout.write(playerIcon);
            break;
        case "a":
            playerX--;
            console.clear();
            showStats();
            newPosition();
            process.stdout.write(playerIcon);
            break;
        case "d":
            playerX++;
            console.clear();
            showStats();
            newPosition();
            process.stdout.write(playerIcon);
            break;
        case "q":
            process.exit();
    }
});
