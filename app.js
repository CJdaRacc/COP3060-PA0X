// app.js
// Log a short welcome line and the repo URL; keep console clean of errors.
console.log("Welcome to COP3060-PA0X demo! Repo: https://github.com/cmitc/COP3060-PA0X");

// -----------------------------
// Variables, Types, Operators
// -----------------------------
const studentName = "Calvin";      // string
let courseNumber = 3060;            // number
const isSenior = true;              // boolean
const hobbies = ["Gaming", "Coding", "Music", "Cooking", "Art", "Entertainer"]; // array (>=5 for loop rendering)
const profile = {                   // object
    first: "Calvin",
    last: "Mitchell",
    major: "CIS"
};
let middleName = null;              // null
let nickname;                       // undefined

// Operators: arithmetic, strict comparison, logical
const yearsUntilGrad = 2026 - 2025; // arithmetic
const isExactCourse = courseNumber === 3060; // strict comparison
const isActiveStudent = isSenior || true;    // logical (example)

// Use results to avoid linter warnings (and to demonstrate)
if (isExactCourse && yearsUntilGrad >= 0) {
    // no-op; demo that variables are used
}

// -----------------------------
// DOM helpers
// -----------------------------
function $(selector) {
    return document.querySelector(selector);
}

function setStatus(message, ok = false) {
    const el = $("#status");
    if (!el) return;
    el.textContent = message;
    el.classList.remove("ok", "err", "muted");
    el.classList.add(ok ? "ok" : "err");
}

function clearStatus() {
    const el = $("#status");
    if (!el) return;
    el.textContent = "";
    el.classList.remove("ok", "err");
    el.classList.add("muted");
}

// -----------------------------
// Loop render: hobbies list (5–10 items)
// -----------------------------
function renderHobbies(list) {
    const ul = $("#hobbyList");
    if (!ul) return;
    ul.innerHTML = "";
    // Cap between 5 and 10 items for the demo
    const slice = list.slice(0, Math.max(5, Math.min(10, list.length)));
    for (const hobby of slice) {
        const li = document.createElement("li");
        li.textContent = hobby;
        ul.appendChild(li);
    }
}

// -----------------------------
// Validation (Control Flow) and Events
// -----------------------------
function isValidEmail(email) {
    // Simple email regex for demo purposes
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateFormFields(values) {
    const { email, password } = values;
    if (!isValidEmail(email)) {
        return { ok: false, msg: "Please enter a valid email address." };
    }
    if (typeof password !== "string" || password.length < 6) {
        return { ok: false, msg: "Password must be at least 6 characters." };
    }
    return { ok: true, msg: "Looks good! Form is valid." };
}

function onFormSubmit(e) {
    e.preventDefault(); // prevent default submission
    const email = $("#email").value.trim();
    const password = $("#password").value; // read values

    const result = validateFormFields({ email, password });
    if (result.ok === true) {
        setStatus(result.msg, true);
    } else {
        setStatus(result.msg, false);
    }
}

function onEmailInput() {
    const email = $("#email").value.trim();
    if (email.length === 0) {
        clearStatus();
        return;
    }
    if (isValidEmail(email)) {
        setStatus("Email format looks valid.", true);
    } else {
        setStatus("Email format looks off.", false);
    }
}

