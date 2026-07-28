const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const gotoSignup = document.getElementById("gotoSignup");
const gotoLogin = document.getElementById("gotoLogin");

function showForm(formToShow) {
    if (formToShow === "signup") {
        signupForm.style.display = "flex";
        loginForm.style.display = "none";
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
    } else {
        loginForm.style.display = "flex";
        signupForm.style.display = "none";
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
    }
}

loginTab.addEventListener("click", () => showForm("login"));
signupTab.addEventListener("click", () => showForm("signup"));
gotoSignup.addEventListener("click", (e) => {
    e.preventDefault();
    showForm("signup");
});

gotoLogin.addEventListener("click", (e) => {
    e.preventDefault();
    showForm("login");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
        message.textContent = result.message || "Login successful.";
        message.className = "form-message success";
    } else {
        message.textContent = result.error || "Login failed.";
        message.className = "form-message error";
    }
});

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const message = document.getElementById("signupMessage");

    const response = await fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();
    if (response.ok) {
        message.textContent = result.message || "Account created.";
        message.className = "form-message success";
    } else {
        message.textContent = result.error || "Signup failed.";
        message.className = "form-message error";
    }
});
});

function togglePassword(id, icon) {
    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
showForm("login");