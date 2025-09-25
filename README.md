# COP3060-PA0X

This repo contains coursework demos for PA0X.

## How to run/test
- Open `index.html` in your web browser (double-click or drag into a tab).
- Open the browser DevTools Console to see a welcome log line with the repo URL.
- Try the form:
  - Type an email; live feedback appears below the form.
  - Submit the form to validate email format and password length (no page reload).
- See the "My Hobbies" section populated by JavaScript via a loop.
- Click "Load Users" to fetch public data; use the Sort selector to reorder results.

## Tech notes
- No third-party libraries are used.
- All logic is in `app.js`, included via `<script src="app.js" defer></script>`.
- Public API used: JSONPlaceholder Users endpoint
  - Base: https://jsonplaceholder.typicode.com
  - Endpoint: `/users` (no authentication required)

## Notes about commits
If you are submitting this assignment, make at least 6 meaningful commits with clear messages describing each change (e.g., "Add app.js with validation & fetch", "Wire up event listeners", "Render users grid").

