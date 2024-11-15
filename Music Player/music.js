// initialise variables
const audioPlayer = document.getElementById('audio-player') // selects audio element
const playBtn = document.getElementById('play-btn') //selects play btn
const pauseBtn = document.getElementById('pause-btn') // selects pause btn
//const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const songInfo = document.getElementById('song-info')

// songs to play
const songs = [
'Songs/21 Savage - a lot (Official Video) ft. J. Cole(0).mp3', 'Songs/21 Savage - Monster (Official Audio) (1).mp3', 'Songs/21 Savage - Famous (Official Audio).mp3'
]
const songNames = ['a lot', 'Monster', 'Famous']
let currentSongIndex = 0 // keep track of songs


//load last song on page load
window.addEventListener('load', () => {
  const savedSongIndex = localStorage.getItem('currentSong')
  if(savedSongIndex){
    currentSongIndex = parseInt(savedSongIndex)
    audioPlayer.src = songs[currentSongIndex]
    songInfo.textContent = `Now playing ${songNames[currentSongIndex]}`
  }
})



// add event listerners
playBtn.addEventListener('click', () =>{
  audioPlayer.play() // play the audio
})

//pause
pauseBtn.addEventListener('click', () => {
  audioPlayer.pause() //pause the song
})



// next
nextBtn.addEventListener('click', () => {
currentSongIndex = (currentSongIndex + 1 ) % songs.length  // move to next song
localStorage.setItem('currentSong', currentSongIndex) //save to local storage
audioPlayer.src = songs[currentSongIndex] // update audio src
songInfo.textContent = `Now playing ${songNames[currentSongIndex]}` // update song title
  audioPlayer.play() // play  new loaded song
})




