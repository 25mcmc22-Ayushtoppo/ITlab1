const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const phoneInput = document.getElementById("phone");

nameInput.addEventListener("keyup", () => {
    const regex = /^[A-Za-z\s]+$/;
    document.getElementById("nameError").textContent =
        regex.test(nameInput.value) ? "" : "Only alphabets allowed";
});

emailInput.addEventListener("keyup", () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    document.getElementById("emailError").textContent =
        regex.test(emailInput.value) ? "" : "Invalid email format";
});

passwordInput.addEventListener("keyup", () => {
    const password = passwordInput.value;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const percent = Math.min(Math.floor((strength / 5) * 100), 100);
    const text = document.getElementById("passwordStrength");

    if (percent < 40) {
        text.textContent = "Weak Password";
        text.style.color = "red";
    } else if (percent < 80) {
        text.textContent = "Medium Password";
        text.style.color = "orange";
    } else {
        text.textContent = "Strong Password";
        text.style.color = "green";
    }

    document.getElementById("passwordError").textContent =
        strength < 5
            ? "Password must include uppercase, lowercase, number & special character"
            : "";
});

dobInput.addEventListener("change", () => {
    const dob = new Date(dobInput.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    document.getElementById("dobError").textContent =
        age >= 18 ? "" : "You must be at least 18 years old";
});

phoneInput.addEventListener("keyup", () => {
    const regex = /^[0-9]{10}$/;
    document.getElementById("phoneError").textContent =
        regex.test(phoneInput.value) ? "" : "Phone number must be 10 digits";
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = document.querySelectorAll(".error");
    let valid = true;
    errors.forEach(err => {
        if (err.textContent !== "") valid = false;
    });

    if (valid) {
        alert("Registration Successful!");
        form.reset();
        document.getElementById("passwordStrength").textContent = "";
    } else {
        alert("Please fix validation errors before submitting.");
    }
});
