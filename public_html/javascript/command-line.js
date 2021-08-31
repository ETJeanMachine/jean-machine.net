

/**
 * Starts up the cursor blinker for the command line.
 */
function commandLine() {
    isTyping = false;
    stopTyping = false;
    // Blinking the cursor for a set interval.
    interval = setInterval(cursorBlink, 750);
}

function cursorBlink() {
    var cursor = document.getElementById("cursor");
    if (cursor.innerHTML == "█") {
        cursor.innerHTML = " ";
    } else {
        cursor.innerHTML = "█";
    }
}

async function tryCommand(str, callback) {
    await callback(str);
}

/**
 * Helper function that pauses processes for a set number of milliseconds.
 * @param {*} ms Milliseconds to wait for. 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function that "types" a command in a command space.
 * @param {*} str String that specifies the command to be typed.
 */
async function typeCommand(str) {
    // Getting where we are typing the command.
    var command = document.getElementById("command-area");
    // Making it so the cursor doesn't blink while "typing".
    clearInterval(interval);
    var cursor = document.getElementById("cursor");
    cursor.innerHTML = "█"
    // Reset the command area before doing anything.
    if(isTyping) {
        stopTyping = true;
    }
    command.innerHTML = "";
    await typeChars(command, str);
    interval = setInterval(cursorBlink, 750);
    return sleep(0);
}

/**
 * 
 * @param {*} command 
 * @param {*} str 
 */
async function typeChars(command, str) {
    if (str == "" || stopTyping) {
        isTyping = false;
        stopTyping = false;
        return sleep(0);
    }
    isTyping = true;
    c = str.charAt(0);
    str = str.substring(1);
    command.innerHTML += c;
    await sleep(50)
    typeChars(command, str);
}

async function deleteCommand() {
    if(isTyping) {
        stopTyping = true;
    }
    // Getting where we are typing the command.
    var command = document.getElementById("command-area");
    // Making it so the cursor doesn't blink while "typing".
    clearInterval(interval);
    var cursor = document.getElementById("cursor");
    cursor.innerHTML = "█"
    command.innerHTML = "";
    // Restarting the blinking.
    interval = setInterval(cursorBlink, 750);
    return sleep(0);
}