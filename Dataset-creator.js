/**
 * DOM Node section
 */
// title input
var titleNode = document.getElementById("title");
// number of words input
var list_length = document.getElementById("list_length");
// minus button
var min_len = document.getElementById("min_length");
// plus button
var plus_len = document.getElementById("plus_length");
// word entry div
var word_input = document.getElementById("word_input");
// work area
var work_area = document.getElementById("work_area");


/**
 * Global Variables
 */
// hold title of project in string
var title;
// hold number of words
var num = list_length.value;
// hold all words
var words = [];
// hold all defs
var definitions = [];
var WORDS;
var DEFS;

function resetWordInput() {

    word_input.innerHTML = "";
    // initial setup stuff
    for(var i = 0; i < num; i++) {
        var inputs = document.createElement("input");
        inputs.className = "inputs";
        var defs = document.createElement("input");
        defs.className = "defs";
        var brs = document.createElement("br");
        defs.placeholder = "def " + (i + 1);
        inputs.placeholder = "word " + (i + 1);
        word_input.appendChild(inputs);
        word_input.appendChild(defs);
        word_input.appendChild(brs);
    }

    WORDS = document.getElementsByClassName("inputs");
    DEFS = document.getElementsByClassName("defs");
}

function setupCanvas() {
    words.length = 0;
    definitions.length = 0;

    // get word and definition inputs in variables
    var inputs = document.getElementsByClassName("inputs");
    var defs = document.getElementsByClassName("defs");

    // add words and definitions to arrays
    for(var i = 0; i < inputs.length; i++) {
        words.push(inputs[i].value);
    }
    for(var i = 0; i < defs.length; i++) {
        definitions.push(defs[i].value);
    }
    work_area.innerHTML = "";
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width = 1000;
    var height = canvas.height = 11000/8.5;
    work_area.appendChild(canvas);
    canvas.style.border="groove";

    // paper background
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    // title
    ctx.fillStyle = "#000000";
    ctx.font = "bold 17pt courier";
    ctx.textAlign = "center";
    if(title !== undefined) {
        ctx.fillText(title, width/2, 11000/93.5);
    } else{
        ctx.fillText("title unspecified", width/2, 11000/93.5);
    }

    // enumerations and text
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    for(var i = 0; i < num/2; i++) {
        ctx.font= "14pt monospace";
        ctx.fillText(i + 1 + ".", 1000/8.5, 40 * i + 22000/93.5);
        ctx.font = "14pt times";
        ctx.fillText(words[i], 1000/8.5 + 25, 40 * i + 22000/93.5, ((1000/8.5 * 4.5) - (1000/8.5 
            + 25))/2 - 10);
        ctx.fillText(definitions[i], 1000/8.5 + 25 + ((1000/8.5 * 4.5) - (1000/8.5 + 25))/2 + 10, 40 * i + 22000/93.5, ((1000/8.5 * 4.5) - (1000/8.5 
            + 25))/2 - 15); 
    }
    for(var i = Math.round(num/2); i < num; i ++) {
        ctx.font= "14pt monospace";
        ctx.fillText(i + 1 + ".", 1000/8.5 * 4.5, 40 * (i - Math.round(num/2)) + 22000/93.5);
        ctx.font = "14pt times";
        ctx.fillText(words[i], 1000/8.5 * 4.5 + 25, 40 * (i - Math.round(num/2)) + 22000/93.5, ((1000/8.5 * 4.5) - (1000/8.5 + 25))/2 - 10);
        ctx.fillText(definitions[i], 1000/8.5 * 4.5 + 25 + ((1000/8.5 * 4.5) - (1000/8.5 + 25))/2 + 10, 40 * (i - Math.round(num/2)) + 22000/93.5, ((1000/8.5 * 4.5) - (1000/8.5 
            + 25))/2 - 15); 
    }
}

resetWordInput();
setupCanvas();

/**
 * Event Listener Section
 */
// update title
titleNode.addEventListener("change", function() {
    title = titleNode.value;
    setupCanvas();
});
// update list length
list_length.addEventListener("change", function() {
    if(!isNaN(list_length.value)) {
        num = list_length.value;
    } else{
        alert("Please input an integer instead of a string.");
        list_length.value = 12;
        num = 12;
    }

    resetWordInput();
    setupCanvas();
});
min_len.addEventListener("mousedown", function() {
    if(list_length.value > 0) {
        list_length.value--;
    }
    num = list_length.value;

    resetWordInput();
    setupCanvas();
});
plus_len.addEventListener("mousedown", function() {
    if(list_length.value < 100) {
        list_length.value++;
    }
    num = list_length.value;

    resetWordInput();
    setupCanvas();
});


for(var i = 0; i < WORDS.length; i++) {
    WORDS[i].addEventListener("change", function() {
        setupCanvas();
    });
    DEFS[i].addEventListener("change", function() {
        setupCanvas();
    });
}
