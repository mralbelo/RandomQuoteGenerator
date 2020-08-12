const quotes = [
    { 
        quote: 'You can only become truly accomplished at something you love. Don’t make money your goal. Instead, pursue the things you love doing, and then do them so well that people can’t take their eyes off you.', 
        author: 'Maya Angelou',
        img: 'https://d3g9pb5nvr3u7.cloudfront.net/authors/5a1e02d318ab256db198e933/1303886734/256.jpg',
        class: 'blue-gradient',
        category: 'Inspirational Quote'
    },
    {
        quote: 'Before you judge a man, walk a mile in his shoes. After that who cares?... He’s a mile away and you’ve got his shoes!',
        class: 'green-gradient',
        category: 'Funny Quote'
    },
    {
        quote: 'We are what we repeatedly do. Excellence, therefore, is not an act, but a habit…',
        author: 'Aristotle',
        img: 'https://is1-ssl.mzstatic.com/image/thumb/Purple20/v4/dc/5b/19/dc5b19c7-a48a-3fcd-64ac-7110a16cd29c/source/256x256bb.jpg',
        class: 'purple-gradient',
        category: 'Excellence Quote'
    },
    {
        quote: `Chewie, we're home.`,
        author: 'Han Solo',
        img: 'https://c-sf.smule.com/rs-s32/arr/7e/05/dd18c31e-36a3-4c34-8b9e-1f0668bac3e4.jpg',
        class: 'dark-gradient',
        category: 'Movies Quote',
        tags: ['Star Wars Episode VII: The Force Awakens', '2015']
    },
    {
        quote: 'Magic Mirror on the wall, who is the fairest one of all?',
        class: 'pink-gradient',
        category: 'Movies Quote',
        tags: ['Snow White and the Seven Dwarves', '1937']
    },
    {
        quote: 'May the Force be with you.',
        class: 'star-wars',
        category: 'Movies Quote',
        tags: ['Star Wars', '1977']
    }
];

function createTags(arr) {
    let item = '';
    if (arr !== undefined) {
        for (let i = 0; i < arr.length; i++) {
            item += `<span class="badge">${arr[i]}</span>`;
        }
    }
    return item
}

var last = -1;
var quoteHistory = [];
var q = quoteHistory.length;

getRandom = () => { return Math.floor(Math.random() * quotes.length) };

function previousQuote() {
    q -= 1;
    let history = quoteHistory[q];
    let quote = quotes[history];
    setQuote(quote);
}

function newQuote() {
    let random = getRandom();
    while (random === last) {
        random = getRandom();
    }
    last = random;
    quoteHistory.push(random);
    q = quoteHistory.length

    let quote = quotes[random];
    setQuote(quote);
}

function setQuote(quote) {
    let body = document.querySelector('body');
    body.className = quote.class;

    if (quote.author != undefined || quote.author != null) {
        let author = `by ${quote.author}`;
        if (quote.img) {
            author += `<img src="${quote.img}" class="icon" alt="${quote.author}">`;
        }
        document.getElementById('description').innerHTML = author;
    } else {
        document.getElementById('description').innerHTML = '';
    }

    document.getElementById('quote').innerHTML = `"${quote.quote}"`;
    document.getElementById('category').innerHTML = quote.category;
    document.getElementById('tags').innerHTML = createTags(quote.tags);
}

newQuote();
