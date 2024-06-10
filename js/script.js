const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const btnTwitter = document.getElementById("btn-twitter");
const btnNewQuote = document.getElementById("btn-new-quote");
const spinner = document.getElementById("spinner");

function loading() {
  spinner.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  spinner.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = [];

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is blank and replace with unknown
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set quote and hide loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
  loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const res = await fetch(apiURL);
    apiQuotes = await res.json();
    newQuote();
  } catch (error) {}
}

// Tweet Quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// Event Listeners
btnNewQuote.addEventListener("click", newQuote);
btnTwitter.addEventListener("click", tweetQuote);

// On Load
getQuotes();
