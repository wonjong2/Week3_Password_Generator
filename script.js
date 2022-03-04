// Assignment Code
var generateBtn = document.querySelector("#generate");

// pre-defined arrays for alphabet(lower/upper) and special characters
const alphabet = [['a', 'A'], ['b', 'B'], ['c', 'C'], ['d', 'D'], ['e', 'E'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['i', 'I'], ['j', 'J'], ['k', 'K'], ['l', 'L'], ['m', 'M'], ['n', 'N'], ['o', 'O'], ['p', 'P'], ['q', 'Q'], ['r', 'R'], ['s', 'S'], ['t', 'T'], ['u', 'U'], ['v', 'V'], ['w', 'W'], ['x', 'X'], ['y', 'Y'], ['z', 'Z']];
const specialChar = [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

// Write password to the #password input

// Generate random character according to 'policy' which is character type
function getRandomChar(policy) {
  // generate random number(1~100)
  let randomVal = Math.floor(Math.random() * 100) + 1;

  switch(policy){
    case "UC":  // Uppercase Character
      return alphabet[randomVal%26][1];
    case "SC":  // Special Character
      return specialChar[randomVal%33];
    case "NC":  // Numeric Character
      return randomVal%10;
    default:  // Lowercase Character
      return alphabet[randomVal%26][0];
  }
}

function generatePassword() {
  // Variable for the generated pwd
  let generatedPassword = ""; 

  // let appliedPolicy = false;
  let policyIndex = 0;

  // this array will be updated with answer from user
  let passwordPolicy = [];

  // get the number of characters in password (range : 8~128)
  passwordPolicy[0] = prompt("How Many characters would you like your password to contain?", "8 ~ 128");
  // If user's answer is invalid, ask it again.
  while (passwordPolicy[0] < 8 || passwordPolicy[0] > 128) {
    passwordPolicy[0] = prompt("Sorry, your answer is invalid. How Many characters would you like your password to contain?", "8 ~ 128");    
  }

  // password will include special character?
  if (confirm("Click OK to confirm including special characters.")){
    passwordPolicy.push(["SC", false]);
  }

  // password will include numeric character?
  if (confirm("Click OK to confirm including numeric characters.")) {
    passwordPolicy.push(["NC", false]);
  }

  // password will include uppercase character?
  if (confirm("Click OK to confirm including uppercase characters."))
  {
    passwordPolicy.push(["UC", false]);
  }

  // for(let index = 0; index < passwordPolicy.length; index++) {
  //   appliedPolicy &= passwordPolicy[index][1];
  // }

  // generate a new password based on user's answer
  for (let index1 = 0; index1 < passwordPolicy[0]; index1++) {

    // if(((passwordPolicy[0]-index1) === (passwordPolicy.length-1)) && !appliedPolicy) {
    //   for(let index2 =0; index2 < passwordPolicy.length; index2) {
    //     if(passwordPolicy[index2][1] == false){
    //       generatedPassword += getRandomChar(passwordPolicy[index2]);
    //       passwordPolicy[index2][1] = true;
    //     }
    //   }
    //   return generatedPassword;
    // }

    policyIndex = (Math.floor(Math.random() * 100) + 1)%passwordPolicy.length;
    if (policyIndex === 0) {
      generatedPassword += getRandomChar("LC");
    }
    else {
      generatedPassword += getRandomChar(passwordPolicy[policyIndex][0]);
      // passwordPolicy[policyIndex][1] = true;
    }
  }

  return generatedPassword;
}

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
//