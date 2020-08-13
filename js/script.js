const quotes = [
    {
        quote: 'I build neat stuff, got a great girl, occasionally save the world. So why can’t I sleep?',
        author: 'Tony Stark',
        citation: 'Iron Man',
        class: 'blue-gradient',
        category: 'Movies Quote',
        tags: ['Iron Man', 'Tony Stark']
    },
    {
        quote: 'Tatata bala tu',
        author: 'Bob the Minion',
        citation: 'Despicable Me',
        year: '2015',
        class: 'green-gradient',
        category: 'Funny Quote',
        tags: ['Minion', 'Despicable Me']
    },
    {
        quote: `I'm Not Crazy. My Mother Had Me Tested.`,
        author: 'Sheldon',
        citation: 'Big Bang Theory',
        class: 'purple-gradient',
        category: 'Tv Show Quote'
    },
    {
        quote: `Chewie, we're home.`,
        author: 'Han Solo',
        citation: 'Star Wars',
        year: '2015',
        class: 'star-wars',
        category: 'Movies Quote',
        tags: ['Star Wars', 'Episode VII: The Force Awakens']
    },
    {
        quote: 'Magic Mirror on the wall, who is the fairest one of all?',
        author: 'The Queen',
        citation: 'Snow White and the Seven Dwarves',
        year: '1937',
        class: 'pink-gradient',
        category: 'Movies Quote',
        tags: ['Snow White', 'The Queen']
    },
    {
        quote: 'May the Force be with you.',
        author: 'Han Solo',
        citation: 'Star Wars',
        year: '1997',
        class: 'star-wars',
        category: 'Movies Quote',
        tags: ['Star Wars', 'The Force']
    }
];

var last = 0;
var quoteHistory = [];
let interval;
const intervalTime = 5000;
const btnPrevious = document.getElementById('btnPrevious');
const btnGenerate = document.getElementById('btnGenerate');
const removeProgressBar = document.querySelector('header');
const addProgressBar = document.querySelector('header');
const toggleAutoGenerate = document.getElementById('autoGenerateToggle');

// This function returns a random number from 0 to the total quotes record
getRandom = () => { return Math.floor(Math.random() * quotes.length) };

// sets inital quote
printQuote();
// after interval timer value generates new quote
onAutoGenerateToggle();

// this function handles the new quote event
function printQuote() {
    let newQuote = getRandomQuote();
    displayQuote(newQuote);

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
        btnPrevious.setAttribute("disabled", "true");
    }

}

// This function handles the on auto-generate toggle event
function onAutoGenerateToggle() {
    if (toggleAutoGenerate.checked) {
        addProgressBar.classList.add('progress-bar');
        interval = getRandomQuoteInterval();
        btnPrevious.setAttribute("disabled", "true");
        btnGenerate.setAttribute("disabled", "true");
    } else {
        removeProgressBar.classList.remove('progress-bar');
        clearInterval(interval);
        interval = null;
        if (quoteHistory.length > 0) {
            btnPrevious.removeAttribute("disabled");
        }
        btnGenerate.removeAttribute("disabled");
    }
}

// This function returns the interval object for auto-generate quote
function getRandomQuoteInterval() {
    return setInterval(function () {
        removeProgressBar.classList.remove('progress-bar');
        printQuote();
    }, intervalTime);
}

// This function returns a random quote object
function getRandomQuote() {
    let random = getRandom();
    while (random === last) {
        random = getRandom();
    }
    last = random;
    quoteHistory.push(random);

    let quote = quotes[random];

    return quote;
}

// This function returns the last quote object, removing the last index stored in quoteHistory array
function getPreviousQuote() {

    quoteHistory.pop();
    let lastIndex = quoteHistory.pop();
    let lastQuote = quotes[lastIndex];

    if (quoteHistory.length < 1) {
        btnPrevious.setAttribute("disabled", "true");
    }
    quoteHistory.push(lastQuote);

    return lastQuote;
}

// This function accepts quote object as a param to render the quote data in html
function displayQuote(quote) {
    if (quote) {
        if (toggleAutoGenerate.checked) {
            addProgressBar.classList.add('progress-bar');
        }

        document.querySelector('body').className = quote.class;

        let source = '';

        if (quote.author) {
            source += quote.author;
        }
        if (quote.citation) {
            source += `<span class="citation">${quote.citation}</span>`;
        }
        if (quote.year) {
            source += `<span class="year">${quote.year}</span>`;
        }

        document.getElementById('quote').innerHTML = quote.quote;
        document.getElementById('source').innerHTML = source;
        document.getElementById('tags').innerHTML = createTags(quote.tags);
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