/*
  @Author: Marc Maycas
*/

// Global scope array of objects to hold the quotes to show
var quotes = [{
  quote: "To avoid criticism do nothing, say nothing, be nothing.",
  source: "Elbert Hubbard",
  tags: ["inspirational", "action"]
}, {
  quote: "Sometimes life hits you in the head with a brick. Don't lose faith.",
  source: "Steve Jobs",
  tags: ["motivational", "optimism"]
}, {
  quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
  source: "Albert Einstein",
  tags: ["philosophy", "science", "humor"]
}, {
  quote: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
  source: "Dr. Seuss",
  tags: ["dreams", "love"]
}, {
  quote: "Be the change that you wish to see in the world.",
  source: "Elbert Hubbard",
  tags: ["friendship", "knowledge", "love"]
}, {
  quote: "A friend is someone who knows all about you and still loves you.",
  source: "Mahatma Gandhi",
  tags: ["action", "change", "inspirational", "love", "peace"]
}, {
  quote: "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
  source: "Martin Luther King Jr",
  citation: "A Testament of Hope: The Essential Writings and Speeches",
  year: 1968,
  tags: ["hate", "light", "inspirational"]
}, {
  quote: "I am so clever that sometimes I don't understand a single word of what I am saying.",
  source: "Oscar Wilde",
  citation: "The Happy Prince and Other Stories",
  year: 1888,
  tags: ["intelligence", "self-deprecation"]
}, {
  quote: "Without music, life would be a mistake.",
  source: " Friedrich Nietzsche",
  citation: "Twilight of the Idols",
  year: 1889,
  tags: ["inspirational", "music"]
}];

// Global array storing all the quotes already shown in order to control when one quote has already
// been shown. The strategy to follow-up will be popping the already printed quotes from the quotes
// array of objects and reset it to shown quotes as soon as it is empty.
// It has already the first quote that appears at the beginning of the application
var shownQuotes = [{
  quote: "You can do anything but not everything.",
  source: "David Allen",
  citation: "Making It All Work",
  year: 2009,
  tags: ["inspirational"]
}];

// Variable to store the last selected color so this doesn't get repeated
var lastColor = "#36b55c"; // This is the first color that the page starts with

// Event listener to respond to "Show another quote" button clicks
// When user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// Change the quote every 30 seconds
window.setInterval(printQuote, 30000);

// Pops a random quote from the quotes array, which is returned. Moreover, this popped quote is
// stored in the shownQuotes array, so it's not selected if it has already been shown.
function getRandomQuote() {
  // Reset the quotes array and the shownQuotes array in case all the quotes in the quotes array
  // has been shown
  if (quotes.length === 0) {
    quotes = shownQuotes;
    shownQuotes = [];
  }

  // Select a random quote and push it into the shownQuotes array
  var randNum = Math.floor(Math.random() * quotes.length);
  var selectedQuote = quotes.splice(randNum, 1)[0];
  shownQuotes.push(selectedQuote);

  return selectedQuote;
}

// Function that it's called as soon as the 'Show another quote button' is pushed.
// It prints a new quote and changes the color of the body's background randomly.
function printQuote() {
  var quoteToShow = getRandomQuote();
  var randomColor = getRandomColor();

  // Insert a quote with the mandatory fields, quote and source
  var html = '<p class="quote">' + quoteToShow.quote + '</p> <p class="source">' + quoteToShow.source;

  // Insert a citation in case it exists (!undefined)
  if (quoteToShow.citation) {
    html += '<span class="citation">' + quoteToShow.citation + '</span>';
  }
  // Insert a year in case it exists (!undefined)
  if (quoteToShow.year) {
    html += '<span class="year">' + quoteToShow.year + '</span>';
  }
  html += '</p>';

  // Set the different tags, if there are any (!undefined), using a loop to go over them and inserting them as list items
  if (quoteToShow.tags) {
    html += '<ul class="tags">';
    for (var i = 0; i < quoteToShow.tags.length; i++) {
      html += '<li>' + quoteToShow.tags[i] + '</li>';
    }
    html += '</ul>';
  }

  // Update the whole quote in the quote box
  document.getElementById('quote-box').innerHTML = html;

  // Update the body and the button's background color randomly
  document.body.style.background = randomColor;
  document.getElementById("loadQuote").style.background = randomColor;
}

// Gets a new random color in order to change the background
// It also has a mechanism to avoid selecting the same color twice
function getRandomColor() {
  var colors = ["#36b55c", "#ff0000", "#0000ff", " #ff00ff", "#ff6347",
    "#000000", " #ffa500", "#da70d6", " #6a5acd", "#a9a9a9", "#ffe4c4"
  ];

  // Keep selecting a random color if the new one is the same as the last one
  do {
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
  } while (lastColor === randomColor);

  //Once the new color is selected, update the new color
  lastColor = randomColor;

  return randomColor;
}
