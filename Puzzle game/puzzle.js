//select html
const puzzleContainer = document.getElementById('puzzle-container')
const shuffleBtn = document.getElementById('shuffle-btn')

//initialise variables
let tiles = [...Array(15).keys()].map( i => i + 1) // creates array of numbers 1-15 to represent tiles
tiles.push('')// last tile is empty
let shuffledTiles = [...tiles] // copy of original tile order for shuffling

// function to render tiles on grid
function renderPuzzle(){
puzzleContainer.innerHTML = '';
shuffledTiles.forEach(tile => {
    const tileDiv = document.createElement('div') // creates a new div for each tile
    tileDiv.textContent = tile; //tile number as textcontent
    tileDiv.classList.add('tile') // adds a tile class

    // make empty tile unstyled by adding empty class
    if(tile === ''){
        tileDiv.classList.add('empty')
    } else{
        //event listener to movable tiles
        tileDiv.addEventListener('click', () => moveTile(tile))
    }
    puzzleContainer.appendChild(tileDiv) // add tile to puzzle container
})
}

//function to move tile when clicked
function moveTile(tile){
    const tileIndex = shuffledTiles.indexOf(tile); // get index of clicked tile
    const emptyIndex = shuffledTiles.indexOf('') // get index of empty array

    // check if clicked tile is adjacent to empty tile
    const isAdjacent = [tileIndex - 1, tileIndex + 1, tileIndex - 4, tileIndex + 4].includes(emptyIndex)
    if(isAdjacent){
        shuffledTiles[emptyIndex] = tile // swap clicked tile with empty tile
        shuffledTiles[tileIndex] = ''
        localStorage.setItem('puzzleState', JSON.stringify(shuffledTiles)) // save puzzle state to storage
        renderPuzzle() //re-render puzzle after moving tile
    }
}

//shuffle tiles onclick of shuffle btn
shuffleBtn.addEventListener('click', () => {
    shuffledTiles = [...tiles] // reset to initial order
    shuffledTiles.sort( () => Math.random() - 0.5) // shuflle the tiles randomly
    localStorage.setItem('puzzleState', JSON.stringify(shuffledTiles)) // saved shuffled puzzle state to storage
    renderPuzzle() // re-render shuffled puzzle by calling this function
})
//load puzzle state from storage
window.addEventListener('load', () => {
    const savedPuzzleState = JSON.parse(localStorage.getItem('puzzleState'))
    if(savedPuzzleState){
        shuffledTiles = savedPuzzleState; // if saved state exists, use it
    }
    renderPuzzle()
})