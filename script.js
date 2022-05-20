// Get Quotes From API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('quote-container');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuotes = [];

// Show New Quote
function newQuote() {

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   
    //checking if author fild is blank and replace with 'unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine stylling
    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')

    }

    quoteText.textContent = quote.text;
    complete();


}

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        loading();
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {        
        //Catch Error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote );
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
