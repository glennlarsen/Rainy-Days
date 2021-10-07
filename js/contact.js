
const form = document.querySelector("#contactForm");
const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const formSucces = document.querySelector("#formSucces");
const button = document.querySelector("#button");

console.log(button);
function validateName() {
    if (checkLength(name.value, 1) === true) {
        name.style.border = "1px solid green";
        nameError.style.display = "none";
    } else if (name.value === '') {
        name.style.border = "1px solid var(--color-ligther-green)";
        nameError.style.display = "none";
    } else {
        name.style.border = "1px solid red";
        nameError.style.display = "block";
    }
}

function validateNameInput() {
    if (checkLength(name.value, 1) === true) {
        name.style.border = "1px solid green";
        nameError.style.display = "none";
    } else if (name.value === '') {
        name.style.border = "1px solid var(--color-ligther-green)";
        nameError.style.display = "none";
    } else {
        name.style.border = "1px solid red";
    }
}

function validateEmail() {

    if (checkEmail(email.value) === true) {
        email.style.border = "1px solid green";
        emailError.style.display = "none";
    } else if (email.value === '') {
        email.style.border = "1px solid var(--color-ligther-green)";
        emailError.style.display = "none";
    } else {
        email.style.border = "1px solid red";
        emailError.style.display = "block";
    }
}

function validateEmailInput() {

    if (checkEmail(email.value) === true) {
        email.style.border = "1px solid green";
        emailError.style.display = "none";
    } else if (email.value === '') {
        email.style.border = "1px solid var(--color-ligther-green)";
        emailError.style.display = "none";
    } else {
        email.style.border = "1px solid red";
    }
}

function validateMessage() {
    if (checkLength(message.value, 9) === true) {
        message.style.border = "1px solid green";
        messageError.style.display = "none";
    } else if (message.value <= 9) {
        message.style.border = "1px solid var(--color-ligther-green)";
        messageError.style.display = "none";
    } else {
        message.style.border = "1px solid red";
        messageError.style.display = "block";
    }
}

function validateMessageInput() {
    if (checkLength(message.value, 9) === true) {
        message.style.border = "1px solid green";
        messageError.style.display = "none";
    } else if (message.value <= 9) {
        message.style.border = "1px solid var(--color-ligther-green)";
        messageError.style.display = "none";
    } else {
        message.style.border = "1px solid red";
    }
}

function validateForm(event) {
    event.preventDefault();

    if (checkLength(name.value, 1) === true && checkEmail(email.value) === true &&
        checkLength(message.value, 9) === true) {
        formSucces.style.display = "block";
        name.style.border = "1px solid var(--color-ligther-green)";
        email.style.border = "1px solid var(--color-ligther-green)";
        message.style.border = "1px solid var(--color-ligther-green)";
        button.disabled = true;
        button.style.opacity = .4;
        form.reset();
    } else {
        formSucces.style.display = "none";
    }

    //this will hide success message after 7 seconds
    setInterval(function () {
        formSucces.style.display = "none";
    }, 7000)
}

function buttonEnable() {
    if (checkLength(name.value, 1) === true && checkEmail(email.value) === true &&
        checkLength(message.value, 9) === true) {
        button.style.opacity = 1;
        button.disabled = false;
    } else {
        button.style.opacity = .4;
        button.disabled = true;
    }
}

name.addEventListener("blur", validateName);
name.addEventListener("input", validateNameInput);
email.addEventListener("blur", validateEmail)
email.addEventListener("input", validateEmailInput)
message.addEventListener("blur", validateMessage);
message.addEventListener("input", validateMessageInput);
form.addEventListener("submit", validateForm);
form.addEventListener("input", buttonEnable);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function checkEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

