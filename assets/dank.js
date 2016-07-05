// Dank counter
var danks = 7;

// Updates the dank counter in the "dank-count" element.
function updateDankCounter(danks) {
    var dankCount = document.getElementById("dank-count");
    dankCount.innerHTML = "Danks: " + danks;

    dankCount.style.color = computeDankCounterColor(danks);
}

// Calculates the color for the dank counter, based on the number of danks.
function computeDankCounterColor(danks) {
    if (danks < 0) {
        return "red";
    } else if (danks > 420) {
        return "green";
    } else {
        var color = 255 - (danks / 420 * 255);
        console.log(color);
        return "rgb(" + color + ", 255, " + color + ")";
    }
}

// Performs the initial dank counter update to initialize the dank counter
// element.
updateDankCounter(danks);

var dankDecrementElem = document.getElementById("dank-increment");
var dankIncrementElem = document.getElementById("dank-increment");

document.getElementById("dank-decrement").addEventListener("click", function() {
    danks -= 1;
    updateDankCounter(danks);
});
document.getElementById("dank-increment").addEventListener("click", function() {
    danks += 1;
    updateDankCounter(danks);
});
