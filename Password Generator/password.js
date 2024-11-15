// get tml elements
const generateBtn = document.getElementById('generate-btn')
const passwordOutput = document.getElementById('password-output')
const lengthInput = document.getElementById('length')

//function to generate a random passwd
function generatePasswd(length){
const characters = 'ABCJEJFHJDJIEIUQTREWYRUIDSFNFJOCMPQVNVBXVZCZDAFAYEWYUEEWIURERPTOYTIIUTIUTakwkrireutywoibbcxmxvzvcufhvbgmngtypupiljmnjghsdfqeacaczczdsfxdgwrwfshdmcjfkgjtiyuypulljiiuokmbnvbvxvsv01234567890968745647364637$~!%^&*()+@!@#'
let passwd = '' // stores generated passwd as empty string

//loop thro characters to pick random character
for(let i = 0; i < length; i++){
    const randomIndex = Math.floor(Math.random() * characters.length) //pick random char from characters
    passwd += characters[randomIndex] // add chosen char to passwd
}
return passwd 
}

//event listener to generate btn
generateBtn/addEventListener('click', () => {
    const length = parseInt(lengthInput.value) // length from user input
    const passwd = generatePasswd(length) //calls generatepasswd func to generate a passwd
    passwordOutput.textContent = `Your generated password is : ${passwd}` // displays generated passwd
    // save it to local storage
    localStorage.setItem('generatedPasswd', passwd)
})

//retrieve last passwd from storage
window.addEventListener('load',() => {
    const savedPasswd = localStorage.getItem('generatedPasswd')
    if(savedPasswd){
        passwordOutput.textContent = `Your saved password is : ${savedPasswd}`
    }
})