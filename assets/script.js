const quotes = [
    { 
        quote: 'You can only become truly accomplished at something you love. Don’t make money your goal. Instead, pursue the things you love doing, and then do them so well that people can’t take their eyes off you.', 
        author: 'Maya Angelou',
        backgroundColor: '#007FFF'
    },
    {
        quote: 'this',
        author: 'me',
        backgroundColor: 'red'
    }
];

function randomQuotePicker() {
    let randomId = Math.floor(Math.random() * 2);

    const html = `
    <h1> ${quotes[randomId].quote} </h1>
    <h3 class="align-right"> - ${quotes[randomId].author} </h3>
    `;
    
    document.querySelector('body').setAttribute("style", 'background-color: ' + quotes[randomId].backgroundColor);
    document.querySelector('main').innerHTML = html;
}

randomQuotePicker();
