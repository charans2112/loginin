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
    const correctHashedUsername = "890de92ebc9019ab9448a029b841c199351b9472f38c6aaf026bb63cba90f5b6";
    const correctHashedPassword = "dbe777f4568d7aeab67eca6f565d5e0536e6478337808ff69d92c09909986b77"; 

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
