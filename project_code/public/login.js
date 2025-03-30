document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");

    // Fixed username and password
    const FIXED_USERNAME = "admin";
    const FIXED_PASSWORD = "password123";

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to another page
        } else {
            errorMessage.textContent = "Invalid username or password!";
        }
    });
});
