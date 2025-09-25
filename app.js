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

// -----------------------------
// Fetch (AJAX) demo using JSONPlaceholder (public, no auth)
// Endpoint: https://jsonplaceholder.typicode.com/users
// -----------------------------
let usersCache = [];

function buildUrl(resource) {
    const base = "https://jsonplaceholder.typicode.com";
    return `${base}/${resource}`;
}

function cardHtml(user) {
    const company = user.company?.name ?? "(no company)";
    const city = user.address?.city ?? "(unknown city)";
    return `
    <div class="card">
      <h3>${user.name}</h3>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p class="muted">${city}</p>
    </div>
  `;
}

function renderUsers(list) {
    const container = $("#results");
    if (!container) return;
    container.innerHTML = "";
    if (!list || list.length === 0) {
        $("#fetchStatus").textContent = "No results to display.";
        return;
    }
    const take = list.slice(0, Math.max(10, Math.min(list.length, 50))); // render ≥10 or all if fewer
    container.innerHTML = take.map(cardHtml).join("");
}

function sortUsers(list, how) {
    const [field, dir] = how.split("-");
    const factor = dir === "desc" ? -1 : 1;
    return [...list].sort((a, b) => {
        const va = field === "company" ? (a.company?.name ?? "") : (a.name ?? "");
        const vb = field === "company" ? (b.company?.name ?? "") : (b.name ?? "");
        return va.localeCompare(vb) * factor;
    });
}

async function loadUsers() {
    const status = $("#fetchStatus");
    const btn = $("#loadUsersBtn");
    try {
        status.textContent = "Loading…";
        btn.disabled = true;
        const url = buildUrl("users");
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected response shape");
        usersCache = data; // keep in memory
        status.textContent = `Loaded ${usersCache.length} users.`;
        const how = $("#sortSelect").value;
        renderUsers(sortUsers(usersCache, how));
    } catch (err) {
        console.error(err);
        status.textContent = "Sorry, something went wrong while loading users.";
    } finally {
        btn.disabled = false;
    }
}

function onSortChange() {
    if (usersCache.length === 0) return;
    const how = $("#sortSelect").value;
    renderUsers(sortUsers(usersCache, how));
}

// -----------------------------
// Wire up events on DOMContentLoaded (but script is defer, so DOM is ready)
// -----------------------------
(function init() {
    // Render hobbies list using a loop
    renderHobbies(hobbies);

    // Event listeners (≥2): submit, input, click/change
    const form = $("#regForm");
    form?.addEventListener("submit", onFormSubmit);
    $("#email")?.addEventListener("input", onEmailInput);
    $("#loadUsersBtn")?.addEventListener("click", loadUsers);
    $("#sortSelect")?.addEventListener("change", onSortChange);
})();
