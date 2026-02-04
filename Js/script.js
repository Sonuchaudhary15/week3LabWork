// THEME TOGGLE
const toggleBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
        toggleBtn.textContent = "☀️ Light Mode";
        toggleBtn.setAttribute("aria-pressed", "true");
        return;
    }

    document.body.classList.remove("dark");
    toggleBtn.textContent = "🌙 Dark Mode";
    toggleBtn.setAttribute("aria-pressed", "false");
}

applyTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light");

toggleBtn.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
});

// PRODUCT IMAGE FALLBACK
const img = document.getElementById("productImage");
img.onerror = () => {
    img.alt = "Image not available";
    img.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='%23333333'%3EImage%20not%20available%3C/text%3E%3C/svg%3E";
};

// ADD TO CART
document.getElementById("addToCart").onclick = () => {
    document.getElementById("cartMessage").textContent = "Product added to cart successfully!";
};

// FORM VALIDATION
const form = document.getElementById("registerForm");

const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

function showError(input, message) {
    const group = input.closest(".form-group");
    const error = group ? group.querySelector(".error") : null;
    if (!error) return;
    error.textContent = message;
    input.classList.add("invalid");
}

function clearError(input) {
    const group = input.closest(".form-group");
    const error = group ? group.querySelector(".error") : null;
    if (!error) return;
    error.textContent = "";
    input.classList.remove("invalid");
}

function validateInput(input) {
    if (input.id === "fullName" && input.value.trim() === "") {
        showError(input, "Full name is required");
        return false;
    }

    if (input.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        showError(input, "Enter a valid email");
        return false;
    }

    if (input.id === "password" && input.value.length < 8) {
        showError(input, "Password must be at least 8 characters");
        return false;
    }

    if (input.id === "confirmPassword" && input.value !== passwordInput.value) {
        showError(input, "Passwords do not match");
        return false;
    }

    clearError(input);
    return true;
}

function validateAll() {
    let valid = true;

    [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach((input) => {
        if (!validateInput(input)) valid = false;
    });

    return valid;
}

[fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach((input) => {
    input.addEventListener("blur", () => validateInput(input));
    input.addEventListener("input", () => {
        if (input.classList.contains("invalid")) validateInput(input);
        if (input === passwordInput && confirmPasswordInput.value.trim() !== "") {
            validateInput(confirmPasswordInput);
        }
    });
});

// SUBMIT HANDLING
form.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("formSuccess").textContent = "";

    if (!validateAll()) return;

    form.reset();
    [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach((input) => clearError(input));
    document.getElementById("formSuccess").textContent = "Registration completed successfully!";
});

// PASSWORD TOGGLE
document.querySelectorAll(".toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const input = document.getElementById(btn.dataset.target);
        input.type = input.type === "password" ? "text" : "password";
        btn.textContent = input.type === "password" ? "Show" : "Hide";
    });
});