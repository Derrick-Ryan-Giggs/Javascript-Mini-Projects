//initialise variables
const urlForm = document.getElementById('url-form')
const longUrlInput = document.getElementById('long-url')
const outputDiv = document.getElementById('output')

// load saved short urls from storage
let urlMap = JSON.parse(localStorage.getItem('urlMap')) || {} // check if there is existing url in storage

// add event listener to form
urlForm.addEventListener('submit', (e) => {
  e.preventDefault() // prevent form from reloading page

//get long url
const longURL = longUrlInput.value.trim() ;

//generate random short url
const shortURL = generateShortURL()

//Save long urls and its corresponding short in a url map
urlMap[shortURL] = longURL
// save updated urlmap to storage
localStorage.setItem('urlMap', JSON.stringify(urlMap))

//display shoretened url
displayShortURL(shortURL, longURL)

// clear input
longUrlInput.value = ''
})

//function to generate short url
function generateShortURL(){
  const characters = 'https://www.bing.com/search?q=uopeople+student+portal&gs_lcrp=EgZjaHJvbWUqBwgAEEUYwgMyBwgAEEUYwgMyBwgBEEUYwgMyBwgCEEUYwgMyBwgDEEUYwgMyBwgEEEUYwgMyBwgFEEUYwgMyBwgGEEUYwgMyBwgHEEUYwgPSAQsxOTU0MjA1ajBqN6gCCLACAQ&FORM=ANNTA0&PC=W044';
  let result = ''
  for(let i = 0; i < 6 ; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

//function to display shorturl and long url
function displayShortURL(shortURL, longURL){
  outputDiv.innerHTML = `<p> Shortened URL: <span> class = "shortURL" data-url =" ${longURL}">${shortURL}</span></p>`
}

//event listener to handle click event
outputDiv.addEventListener('click', (e) => {
  if(e.target.classList.contains('shortURL')){
    const longURL = e.target.getAttribute('data-url')
    window.open(longURL, '_blank') // open long url in new tab
  }
})