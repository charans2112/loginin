document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const passwordField = document.getElementById("password");
    const password = passwordField.value;
    const errorMessage = document.getElementById("error-message");

    async function hashData(data) {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    const hashedUsername = await hashData(username);
    const hashedPassword = await hashData(password);

    // Precomputed SHA-256 hashes
    const correctHashedUsername = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
    const correctHashedPassword = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"; 

    if (hashedUsername === correctHashedUsername && hashedPassword === correctHashedPassword) {
        sessionStorage.setItem("authenticated", "true"); // Store session authentication
        errorMessage.style.display = "none"; 
        passwordField.value = ""; 
        window.location.href = "dashboard.html"; 
    } else {
        errorMessage.textContent = "Invalid username or password!";
        errorMessage.style.display = "block";
    }
});

// Disable right-click
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, and Ctrl+U (both uppercase & lowercase)
document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase(); // Convert key to lowercase

    if (
        event.ctrlKey && 
        (event.key === "u" || event.key === "U" || event.key === "s" || event.key === "S") ||
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "i" || event.key === "J" || event.key === "j" || event.key === "C" || event.key === "c"))
    ) {
        event.preventDefault();
    }
});

if (document.documentElement) {
    Object.defineProperty(document, 'documentElement', {
        get: function () {
            window.location.href = "about:blank";
            return null;
        }
    });
}

setInterval(() => {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        document.body.innerHTML = "";
        window.location.replace("about:blank");
    }
}, 1000);
