const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const newQuoteBtn = document.getElementById('new-quote')
const twitterBtn = document.getElementById('twitter')
const loader = document.getElementById('loader')

// let apiQuotes = []

// Show loading
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}
// Hide loader
function complete() {
  loader.hidden = true
  quoteContainer.hidden = false
}

// Show new quote
function newQuote() {
  loading()

  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
  quoteText.textContent = quote.text
  quote.text.length > 100
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote')

  authorText.textContent = quote.author ? quote.author : 'Unknown Author'
  complete()
}

// Get quotes from api
async function getQuotes() {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (err) {
    //   Catch error here
    console.log(err)
    getQuotes()
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// Event listeners
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', newQuote)

// On load
// getQuotes()
newQuote()
