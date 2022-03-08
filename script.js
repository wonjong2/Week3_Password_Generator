// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// pre-defined arrays for alphabet(lower/upper) and special characters
var alphabet = [['a', 'A'], ['b', 'B'], ['c', 'C'], ['d', 'D'], ['e', 'E'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['i', 'I'], ['j', 'J'], ['k', 'K'], ['l', 'L'], ['m', 'M'], ['n', 'N'], ['o', 'O'], ['p', 'P'], ['q', 'Q'], ['r', 'R'], ['s', 'S'], ['t', 'T'], ['u', 'U'], ['v', 'V'], ['w', 'W'], ['x', 'X'], ['y', 'Y'], ['z', 'Z']];
var specialChar = [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

// Generate one random character
function generateRandomChar(typeOfChar) {
  // generate random number(1~100)
  var randomVal = Math.floor(Math.random() * 100) + 1;

  switch(typeOfChar){
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
  var generatedPassword = ""; 
  var typeOfChar = 0;

  // this array will be updated with answer from user
  var passwordPolicy = [];

  // get the number of characters in password (range : 8~128)
  passwordPolicy[0] = prompt("How Many characters would you like your password to contain?", "8 ~ 128");
  // If user's answer is invalid, ask it again.
  while (passwordPolicy[0] < 8 || passwordPolicy[0] > 128) {
    passwordPolicy[0] = prompt("Sorry, your answer is invalid. How Many characters would you like your password to contain?", "8 ~ 128");    
  }

  do {
    // password will include Lowercase character?
    if (confirm("Click OK to confirm including lowercase characters.")){
      passwordPolicy.push(["LC", "Not Included"]);
    }

    // password will include uppercase character?
    if (confirm("Click OK to confirm including uppercase characters."))
    {
      passwordPolicy.push(["UC", "Not Included"]);
    }    

    // password will include numeric character?
    if (confirm("Click OK to confirm including numeric characters.")) {
      passwordPolicy.push(["NC", "Not Included"]);
    }

    // password will include special character?
    if (confirm("Click OK to confirm including special characters.")){
      passwordPolicy.push(["SC", "Not Included"]);
    }

    // validate if user selected at least one character type or not.
    // 'passwordPolicy.length === 1' means user doesn't select any character type, ask again !!
    if (passwordPolicy.length === 1) {
      confirm("Oops! At least one character type to be included in password should be selected. Please check again.")
    }
  } while (passwordPolicy.length === 1)

  // generate a new password based on user's answer
  for (var i = 0; i < passwordPolicy[0]; i++) {
    // generate one random character, which type of character
    typeOfChar = ((Math.floor(Math.random() * 10) + 1)%(passwordPolicy.length-1)) + 1;
    generatedPassword += generateRandomChar(passwordPolicy[typeOfChar][0]);
    passwordPolicy[typeOfChar][1] = "Included";

    // check wheather user selected character types are inlcuded in password or not
    // if there are any missing character types in password, force them to be included. 
    if (passwordPolicy.length === (passwordPolicy[0] - i)) {
      for (var j = 1; j < passwordPolicy.length; j++) {
        if (passwordPolicy[j][1] === "Not Included") {
          generatedPassword += generateRandomChar(passwordPolicy[j][0]);
          passwordPolicy[j][1] = "Included";
          i++;
        }
      }
    }
  }

  return generatedPassword; // return generated password
}
