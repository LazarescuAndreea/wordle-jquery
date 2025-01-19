// CONSTANTS
const WORD_LIST = ["ghoul", "warty", "slime", "tribe", "lover", "kayak", "mouse", "bride", "brave", "diner"];
const GREEN = '#538d4e';
const ORANGE = '#b59f3b';
const GREY = '#3a3a3c';
const MAX_GUESSES = 6;
const MAX_LETTERS = 5;

// GLOBAL VARS
let submissionCounter = 0;
const sessionRandomWord = wordRandomizer();

function wordRandomizer() {
    return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

function getLetterDivId(rowId, letterId) {
    return `row${rowId}Letter${letterId}`;
}

function createLetters(rowId, rowIdName) {
    for (let j = 1; j < MAX_LETTERS + 1; j++) {
        const letterId = j;
        const letterElement = $(`<div class="letter" id="${getLetterDivId(rowId, letterId)}"></div>`);
        $(`#${rowIdName}`).append(letterElement);
    }
}

function createRows() {
    for (let i = 1; i < MAX_GUESSES + 1; i++) {
        const rowId = i;
        const rowElement = $(`<div class="wordRow" id="wordRow${rowId}"></div>`);
        $(`#board`).append(rowElement);
        createLetters(rowId, `wordRow${rowId}`);
    }
}

function submitButtonHandler(input) {
    var input = $("#wordInput").val();
    submissionCounter += 1;

    for (let i = 0; i < input.length; i++) {
        const letterId = i + 1;
        const letter = input.substring(i, i + 1);
        $(`#${getLetterDivId(submissionCounter, letterId)}`).text(letter);
    }

    wordSubmissionColor(input);
    $('#wordInput').val('');

    if (input === sessionRandomWord) {
        $(`#successMessage`).text("Yay correct word!");
        $(`#input`).empty();
    } else if (submissionCounter === MAX_GUESSES) {
        $(`#successMessage`).text(`The word was: ${sessionRandomWord.toUpperCase()}. Better luck next time!`);
        $(`#input`).empty();
    }
}

function createForm() {
    const input = $(`<input type="text" id="wordInput" minlength="3" maxlength="${MAX_LETTERS}">`);
    const button = $('<button/>', {
        text: "Submit",
        id: "submitButton",
        click: () => submitButtonHandler(input)
    });
    $(`#input`).append(input);
    $(`#input`).append(button);
}

function wordSubmissionColor(input) {
    for (let i = 0; i < MAX_LETTERS + 1; i++) {
        const rowId = submissionCounter;
        const letterId = i + 1;

        if (input.substring(i, i + 1) === sessionRandomWord.substring(i, i + 1)) {
            $(`#${getLetterDivId(rowId, letterId)}`).css('background-color', GREEN);
        } else if (sessionRandomWord.includes(input.substring(i, i + 1)) > 0) {
            $(`#${getLetterDivId(rowId, letterId)}`).css('background-color', ORANGE);
        } else {
            $(`#${getLetterDivId(rowId, letterId)}`).css('background-color', GREY);
        }
    }
}

function renderPage() {
    createRows();
    createForm();
}

$(document).ready(renderPage);