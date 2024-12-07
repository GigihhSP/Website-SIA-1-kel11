const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click",() =>
{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click",() =>
{
    container.classList.remove("sign-up-mode");
});

sign_up_btn2.addEventListener("click",() =>
{
    container.classList.add("sign-up-mode2");
});

sign_in_btn2.addEventListener("click",() =>
{
    container.classList.remove("sign-up-mode2");
});
document.addEventListener("DOMContentLoaded", () => {
        const signInForm = document.querySelector(".sign-in-form");
        const signUpForm = document.querySelector(".sign-up-form");
    
        signInForm.addEventListener("submit", (e) => {
            e.preventDefault();
            validateSignIn();
            window.location.href = "/index.html";
        });
    
        signUpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            validateSignUp();
            window.location.href = "/index.html";
        });
    
        function validateSignIn() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
    
            resetErrorMessages();
    
            let isValid = true;
    
            if (username.length < 5 || username.length > 15) {
                showError("error-username-signin", "Username harus antara 5-15 karakter.");
                isValid = false;
            }
            if (!validatePassword(password, username)) {
                showError("error-password-signin", "Password harus memiliki minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan karakter khusus.");
                isValid = false;
            }
    
            if (isValid) {
                signInForm.submit();
            }
        }
    
        function validateSignUp() {
            const username = document.getElementById("username-signup").value;
            const email = document.getElementById("email-signup").value;
            const password = document.getElementById("password-signup").value;
    
            resetErrorMessages();
    
            let isValid = true;
 
            if (username.length < 5 || username.length > 15) {
                showError("error-username-signup", "Username harus antara 5-15 karakter.");
                isValid = false;
            }
    
            if (!validateEmail(email)) {
                showError("error-email-signup", "Format email tidak valid.");
                isValid = false;
            }
    

            if (!validatePassword(password, username)) {
                showError("error-password-signup", "Password harus memiliki minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan karakter khusus.");
                isValid = false;
            }
    
            if (isValid) {
                signUpForm.submit();
            }
        }
    
        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    
        function validatePassword(password, username) {
            const minLength = 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            return (
                password.length >= minLength &&
                hasUpperCase &&
                hasLowerCase &&
                hasNumber &&
                hasSpecialChar &&
                password !== username
            );
        }
    
        function showError(elementId, message) {
            const errorMessageElement = document.getElementById(elementId);
            errorMessageElement.textContent = message;
            errorMessageElement.style.display = "block";
        }
    
        function resetErrorMessages() {
            const errorMessages = document.querySelectorAll(".error-message");
            errorMessages.forEach((errorMessage) => {
                errorMessage.textContent = "";
                errorMessage.style.display = "none";
            });
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        const togglePasswordSignin = document.querySelector("#togglePassword-signin");
        const passwordInputSignin = document.querySelector("#password");
    
        const togglePasswordSignup = document.querySelector("#togglePassword-signup");
        const passwordInputSignup = document.querySelector("#password-signup");
        togglePasswordSignin.addEventListener("click", () => {
            const type = passwordInputSignin.getAttribute("type") === "password" ? "text" : "password";
            passwordInputSignin.setAttribute("type", type);
            togglePasswordSignin.classList.toggle("fa-eye-slash");
        });
    
        togglePasswordSignup.addEventListener("click", () => {
            const type = passwordInputSignup.getAttribute("type") === "password" ? "text" : "password";
            passwordInputSignup.setAttribute("type", type);
            togglePasswordSignup.classList.toggle("fa-eye-slash");
        });
    });
    
