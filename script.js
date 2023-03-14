var outputElement = document.getElementById("ascii-art");
var zoomInput = document.getElementById("zoom");
zoomInput.addEventListener("input", function(event) {
    var zoomValue = event.target.value / 100;
    outputElement.style.transform = `scale(${zoomValue})`;
});
var copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", function() {
    var asciiArtText = outputElement.innerText;
    navigator.clipboard.writeText(asciiArtText);
});
var asciiSizeInput = document.getElementById("ascii-size");
let asciiSizeValue = asciiSizeInput.value;
asciiSizeInput.addEventListener("input", function() {
    asciiSizeValue = asciiSizeInput.value;
});
document.getElementById("submit").addEventListener("click", function() {
    var inputElement = document.getElementById("image");
    var fileList = inputElement.files;
    var img = document.createElement("img");
    img.src = URL.createObjectURL(fileList[0]);
    img.onload = function() {
        var canvas = document.createElement("canvas");
        var ratio = img.width / img.height;
        var newHeight = Math.round(asciiSizeValue / ratio);
        canvas.width = asciiSizeValue;
        canvas.height = newHeight;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var asciiArt = convertToAscii(imageData);
        displayAsciiArt(asciiArt);
    };
});

function convertToAscii(imageData) {
    var asciiChars = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."];
    var asciiArt = "";
    for (var i = 0; i < imageData.data.length; i += 4) {
        var r = imageData.data[i];
        var g = imageData.data[i + 1];
        var b = imageData.data[i + 2];
        var brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        var index = Math.floor(brightness * asciiChars.length);
        var color = "rgb(" + r + "," + g + "," + b + ")";
        var asciiChar = "<span style=\"color:" + color + "\">" + asciiChars[index] + "</span>";
        asciiArt += asciiChar;
        if ((i / 4 + 1) % imageData.width == 0) {
            asciiArt += "<br/>";
        }
    }
    return asciiArt;
}

function displayAsciiArt(asciiArt) {
    var outputElement = document.getElementById("ascii-art");
    outputElement.innerHTML = asciiArt;
    var fontSize = window.innerWidth / asciiSizeValue;
    // outputElement.style.fontSize = fontSize + "px";
    //outputElement.style.lineHeight = fontSize + "px";
}
window.addEventListener("resize", function() {
    var asciiArt = document.getElementById("ascii-art").innerHTML;
    displayAsciiArt(asciiArt);
});
