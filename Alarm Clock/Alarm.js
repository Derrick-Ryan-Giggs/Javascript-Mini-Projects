//initialise variables
let alarmTime = null;
let alarmTimeout = null;
const currentTimeDisplay = document.getElementById('current-time');
const alarmTimeInput  = document.getElementById('alarm-time');
const alarmStatus = document.getElementById('alarm-status');




//function to update current time each second
function updateTime(){
const now = new Date(); // gets current date and time
const hours = now.getHours().toString().padStart(2, '0'); // gets current hours and pads it into 2 digits
const minutes = now.getMinutes().toString().padStart(2, '0');  // gets current minutes and pads it into 2 digits
const seconds  = now.getSeconds().toString().padStart(2, '0');
const AmPm = hours >= 12? 'PM' : 'AM'; // determines whether time is Am or Pm


//Function to format to 12hours system 
const formatedHours = hours % 12 || 12; 
currentTimeDisplay.textContent = `${formatedHours}:${minutes}:${seconds}:${AmPm}`; // updates html to display current time

//check if current time matches alarmtime
if(alarmTime && `${hours}:${minutes}` === alarmTime){ // compares currenttime with set alarmtime
  alert('Your Alarm is ringing'); //alerts you when alarmtime is reached
  clearAlarm() //invokes the function to clear alarm after it rings
}
}

//function to set alarm
function setAlarm(){
  const alarmValue = alarmTimeInput.value; // retrieves the users alarm time input
  if(alarmValue){
    const alarmHour = alarmValue.split(':')[0]; //extracts the hour from the input
    const alarmMinute = alarmValue.split(':')[1]; // extracts the minute from the input
    alarmTime = `${alarmHour}:${alarmMinute}`; // updates alarmtime in HH:MM format
    alarmStatus.textContent = `Alarm set for ${alarmTime}`; // updates the message to show when alarm is set

    saveAlarmTime(alarmTime); // saves alarm time to local storage by calling the savealarmtime function

  } else{
    alarmStatus.textContent = 'Please set a valid time'; // updates the error message if no time is input

}
}



//function to clear alarm
function clearAlarm(){
  alarmTime = null; //resets alarm time to no value
  alarmStatus.textContent = 'Alarm cleared' // updates message that says alarm is cleared
  localStorage.removeItem('alarmTime'); //clear alarm time from local storage
}

//function to save alarmtime to localstorage
function saveAlarmTime(Alarmtime){
localStorage.setItem('alarmTime', Alarmtime) // Saves alarm time in local storage
}
// function to load alarm time from local storage
function loadAlarmTime(){
  const savedAlarmTime = localStorage.getItem('alarmTime') // loads saved alarmtime from localstorage
  if(savedAlarmTime){ //checks if there is saved alarmtime
    alarmTime = savedAlarmTime; // restores saved alarmtime to the AlarmTime variable
    alarmStatus.textContent = `Alarm set for ${alarmTime}`
  }
}

//add event listeners
document.getElementById('set-alarm').addEventListener('click', setAlarm) // adds an event listener to set alarm button to trigger set alarm function
document.getElementById('clear-alarm').addEventListener('click', clearAlarm) // adds a click event to clear alarm button to trigger the clear alarm function


// save to storage
loadAlarmTime() // load alarmtime from local storage if it exists when the page loads 

updateTime(); // initial call to display current time immidiately the page loads
setInterval(updateTime, 1000) // updates time every second by calling updatetime function