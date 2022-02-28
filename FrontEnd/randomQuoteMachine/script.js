let link = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

let randomColor = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
]

var quotes;

const getQuotes = () => {
    return $.ajax({
        headers: {
            Accept: "applicaton/json"
        },
        url: link,
        success: resp => {
            quotes = JSON.parse(resp)
        }
    })
}

const getRandomQuote = () => {
    let randoms = Math.floor(Math.random() * quotes.quotes.length)
    return quotes.quotes[randoms]
}

const getQuote = () => {
    let quotes = getRandomQuote();

    let quote = quotes.quote;
    let author = quotes.author

    $("#text span").html(quote);
    $("#author").html(author);

    $('#tweet-quote').attr(
        "href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent('"' + quote + '" ' + author)
    );
    
    let randoms = Math.floor(Math.random() * randomColor.length)
    $(".container").css("backgroundColor", randomColor[randoms])
    $(".quote-act a button").css("backgroundColor", randomColor[randoms])
    $("#new-quote").css("backgroundColor", randomColor[randoms])
}

$(document).ready(() => {
    getQuotes().then(() => getQuote())

    $("#new-quote").on("click", getQuote)
})