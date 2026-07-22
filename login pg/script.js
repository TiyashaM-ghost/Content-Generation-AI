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