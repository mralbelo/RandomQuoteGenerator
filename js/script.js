var quoteHistory = [];
let interval;
const intervalTime = 8000;
const btnPrevious = document.getElementById('btnPrevious');
const btnGenerate = document.getElementById('btnGenerate');
const header = document.querySelector('header');
const toggleAutoGenerate = document.getElementById('autoGenerateToggle');

// sets inital quote
printQuote();

// after interval timer value generates new quote
onAutoGenerateToggle();

// this function handles the new quote event
function printQuote() {
    let newQuote = getRandomQuote();
    displayQuote(newQuote);

    // Validation for back button
    if (quoteHistory.length > 1) {
        if (btnPrevious.hasAttribute("disabled") && !toggleAutoGenerate.checked) {
            btnPrevious.removeAttribute("disabled");
        }
    } else {
        btnPrevious.setAttribute("disabled", "true");
    }
}

// this function handles the previous Quote event
function printPreviousQuote() {

    if (quoteHistory.length > 1) {
        let lastQuote = getPreviousQuote();
        displayQuote(lastQuote);
    } else {
        // This validates if previous button should be enabled
        btnPrevious.setAttribute("disabled", "true");
    }

}

// This function handles the on auto-generate toggle event
function onAutoGenerateToggle() {
    // If toggle is checked it enable the geRandomQuoteInverval, adds progress bar and disables buttons.
    if (toggleAutoGenerate.checked) {
        header.classList.add('progress-bar');
        interval = getRandomQuoteInterval();
        btnPrevious.setAttribute("disabled", "true");
        btnGenerate.setAttribute("disabled", "true");
    } else {
        // If toggle is unchecked it removes progress bar, clears interval and re-enable's the buttons
        header.classList.remove('progress-bar');
        clearInterval(interval);
        interval = null;

        // Extra validation for if the user tries to click previous quote button and there's not previous
        if (quoteHistory.length > 1) {
            btnPrevious.removeAttribute("disabled");
        }
        btnGenerate.removeAttribute("disabled");
    }

}

// This function returns the interval object for auto-generate quote
function getRandomQuoteInterval() {
    return setInterval(function () {
        header.classList.remove('progress-bar');
        printQuote();
    }, intervalTime);
}

// This function returns a random quote object
function getRandomQuote() {
    let index = getRandomIndex();
    let rgbValue = getRandomRGB();
    
    let lastQuote = 0;

    if (quoteHistory.length > 0) {
        lastQuote = quoteHistory[quoteHistory.length - 1];
    }

    // This Validates the current quote with the last quote to prevent showing duplicates in a row
    while (index === lastQuote.index) {
        index = getRandomIndex();
    }

    quoteHistory.push({index: index, rgbValue: rgbValue});

    var currentQuote = quotes[index];
    currentQuote.rgbValue = rgbValue;

    let quote = currentQuote;

    return quote;
}

// This function returns the last quote object, removing the last index stored in quoteHistory array
function getPreviousQuote() {
    quoteHistory.pop();
    let lastIndex = quoteHistory.pop();
    let lastQuote = quotes[lastIndex.index];
    lastQuote.rgbValue = lastIndex.rgbValue;

    // Validation for back button
    if (quoteHistory.length < 1) {
        btnPrevious.setAttribute("disabled", "true");
    }
    quoteHistory.push({index: lastIndex.index, rgbValue: lastIndex.rgbValue});

    return lastQuote;
}

// This function accepts quote object as a param to render the quote data in html
function displayQuote(quote) {
    if (quote) {
        // Add's progress bar if Auto-Generate Quote is enabled
        if (toggleAutoGenerate.checked) {
            header.classList.add('progress-bar');
        }

        // adds class to body to change background color
        document.querySelector('body').setAttribute('style', `background-color: rgb(${quote.rgbValue});`);

        let html = '';

        html += `
        <p class="quote">${quote.quote}</p>
        <p class="source">${quote.source}
        <span class="citation">${quote.citation}</span></p>`;

        // Checks if quote has year, removes p.source closing tag, adds year and adds the p.source closing tag back again.
        if (quote.year) { 
            html = html.slice(0, html.length - 4);
            html += `<span class="year">${quote.year}</span></p>`;
        } 

        // Cheks if quote has tags, passes tags array into createTags function
        if (quote.tags) {
            html += `<p id="tags">${createTags(quote.tags)}</p>`;
        }

        // Display's final html content in Quote Box
        document.getElementById('quote-box').innerHTML = html;
    }

}

// This function accepts tags array from a single quote object, returning the tags in a Html format
function createTags(tags) {
    let tagsHtml = '';
    if (tags !== undefined) {
        for (let i = 0; i < tags.length; i++) {
            tagsHtml += `<span class="tag">${tags[i]}</span>`;
        }
    }
    return tagsHtml;
}

// This function returns a random number from 0 to the total quotes record
function getRandomIndex() {
    randomIndex = Math.floor(Math.random() * quotes.length);
    return randomIndex;
}

// This function returns a random RGB value
function getRandomRGB() {
    red = Math.floor(Math.random() * 255);
    green = Math.floor(Math.random() * 255);
    blue = Math.floor(Math.random() * 255);

    return `${red}, ${green}, ${blue}`;
}