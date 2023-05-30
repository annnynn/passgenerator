const lengthSlider = document.querySelector(".pass-length input"); // input range value
const spanNumber = document.querySelector(".pass-length span");
options = document.querySelectorAll(".options input"); // checkbox inputs
passwordInput = document.querySelector(".input-box input"); // password input
copyIcon = document.querySelector(".input-box img");
const copiedText = document.querySelector(".input-box span");
const sliderTrack = document.querySelector(".slider-track");
const parent = document.querySelector(".scales");
passIndicator = document.querySelector(".pass-strength span");
let checkBoxes = document.querySelectorAll(".checkbox");

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
		if (option.checked) {
			staticPassword = staticPassword + characters[option.id];
		}
	})

	for (let i = 0; i < passLength; i++) {
		randomPassword = randomPassword + staticPassword[Math.floor(Math.random() * staticPassword.length)];
	}
	passwordInput.value = randomPassword;
}

const copyPassword = async () => {
	try {
		await navigator.clipboard.writeText(passwordInput.value);
		copyIcon.classList.add("green");
		copiedText.innerText = "copied";
		setTimeout(() => {
			copyIcon.classList.remove("green");
			copiedText.innerText = "";
		}, "1000");
	} catch (err) {
		console.log("failed to copy: ", err);
	}
}

const removeStyles = () => {
	Array.from(parent.children).forEach(child => {
		child.classList.remove("tooWeak", "weak", "medium", "strong");
	})
}

const calculatePerc = () => {
	let maxValue = 15;
	let currentValue = lengthSlider.value;
	sliderTrack.value = (currentValue / maxValue) * 100 + "%";
	sliderTrack.style.width = sliderTrack.value;

	if (currentValue == 0) {
		parent.children[1].classList.add("empty");
		passwordInput.value = "";
	} else {
		passIndicator.style = "display:block";
		parent.children[1].classList.add("tooWeak");
		parent.children[1].classList.remove("empty");
	}
}


const updatePassIndicator = () => {
	removeStyles();
	if (lengthSlider.value <= 4) {
		passIndicator.textContent = "TOO WEAK!";
		parent.children[1].classList.add("tooWeak");
	} else if (lengthSlider.value <= 8) {
		passIndicator.textContent = "WEAK";
		parent.children[1].classList.add("weak");
		parent.children[2].classList.add("weak");
	} else if (lengthSlider.value <= 12) {
		passIndicator.textContent = "MEDIUM";
		parent.children[1].classList.add("medium");
		parent.children[2].classList.add("medium");
		parent.children[3].classList.add("medium");
	} else {
		passIndicator.textContent = "STRONG";
		parent.children[1].classList.add("strong");
		parent.children[2].classList.add("strong");
		parent.children[3].classList.add("strong");
		parent.children[4].classList.add("strong");
	}

}
const scalesColor = () => {
	parent.children.forEach(child => {
		if (lengthSlider.value < 4) {
			child.classList.add("week");
		}
	})
}

function updateSlider() {
	document.querySelector(".pass-length span").innerText = lengthSlider.value;
	lengthSlider.innerHTML = lengthSlider.value;
	updatePassIndicator();
	calculatePerc();
}

const checkBox = () => {
	
}


updateSlider();
checkBox();


copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

