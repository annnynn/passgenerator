const lengthSlider = document.querySelector(".pass-length input");
options = document.querySelectorAll(".option input");
passwordInput = document.querySelector(".input-box input");
passIndicator = document.querySelector(".pass-strength span");
passStrengthColor = document.querySelectorAll(".pass-strength rectangle");
generateBtn = document.querySelector(".generate-button");
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "";
    randomPassword = "",
    passLength = lengthSlider.value;
    options.forEach(option => {
        if(option.checked){
            staticPassword = staticPassword + characters[option.id];
        }
    })

    for (let i = 0; i < passLength; i++) {
       randomPassword = randomPassword + staticPassword[Math.floor(Math.random() * staticPassword.length)];
    }
   passwordInput.value = randomPassword;
}

updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "WEAK" : lengthSlider.value <= 10 ? "MEDIUM" : "STRONG";
    document.querySelector(".pass-strength span").innerText = passIndicator.id;
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click",generatePassword);