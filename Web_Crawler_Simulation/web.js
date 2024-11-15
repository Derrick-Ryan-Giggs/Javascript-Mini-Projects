// initialse btns and select html elements
const crawlBtn = document.getElementById('crawl-btn')
const urlInput = document.getElementById('url-input')
const urlList = document.getElementById('url-list')


let crawledUrl = JSON.parse(localStorage.getItem('crawledUrl')) || [] // retrieve crawled urls from local storage if they exist or set list to empty [] if they dont



//function to add urls to the ul list
function addUrl(url){
  const listItem = document.createElement('li') // create a new li to display the url
  listItem.textContent = url // set text of li to url
  urlList.appendChild(listItem) // add new list item to ul in html

}

//function to update crawled url to local storage
function updateLocalStorage(){
  localStorage.setItem('crawledUrl',JSON.stringify(crawledUrl)) // store updated list of urls to local storage, converting the [] to strings 
}



//function to simulate web crawling
function crawlUrl(url){
if(!crawledUrl.includes(url)){ //check if url is in list of crawled urls
crawledUrl.push(url) // push to array of crawled urls
addUrl(url) // calls add url function to add new url to list
updateLocalStorage() // call function to update stored urls in local storage
} else{
  alert('URL already crawled') // alert user if url is already crawled
}

}

//event listener for crawl button
crawlBtn.addEventListener('click', () => {
  const url = urlInput.value.trim() // get url and remove extra spaces by trimming

  if(url){// check if there is user input
crawlUrl(url) // call the crawl url function to crawl url
urlInput.value = '' // clears input field
  } 
})

// load and display crawled urls on page load
window.onload = () => {
  crawledUrl.forEach(url => addUrl(url)) // iterrate thro saved urls in storage and display them on page load
}