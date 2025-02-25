let allMessages = [];
let isDarkMode = false;

// Check authentication on page load
document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("authenticated")) {
        window.location.href = "index.html"; // Redirect to login page if not authenticated
    }
});

// Secure Logout Function
function logout() {
    sessionStorage.removeItem("authenticated"); // Clear session
    window.location.href = "index.html"; // Redirect to login page
}

// Prevent going back to dashboard after logout
window.addEventListener("pageshow", function (event) {
    if (event.persisted || window.performance && window.performance.navigation.type === 2) {
        sessionStorage.removeItem("authenticated"); // Ensure session is cleared
        window.location.href = "index.html"; // Redirect to login page
    }
});

// Load chat messages
async function loadChat() {
    try {
        let response = await fetch("sample_chat.json");
        let data = await response.json();
        allMessages = data.messages;
        displayMessages(allMessages);
    } catch (error) {
        console.error("Error loading chat:", error);
    }
}

// Define alternative names
const nameMapping = {
    "Maha": "Maha",
    "A B H I S H E K G O W D A": "Abhi"
};

function displayMessages(messages) {
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    messages.forEach(msg => {
        let msgDiv = document.createElement("div");
        msgDiv.classList.add("message");

        // Replace sender name with alternative name
        let displayName = nameMapping[msg.sender_name] || msg.sender_name;

        if (msg.sender_name.includes("Maha")) {
            msgDiv.classList.add("maha");
        } else {
            msgDiv.classList.add("abhishek");
        }

        let date = new Date(msg.timestamp_ms);
        let timeString = date.toLocaleString();

        msgDiv.innerHTML = `<strong>${displayName}:</strong> ${msg.content} <br><small>${timeString}</small>`;
        chatBox.appendChild(msgDiv);
    });
}

// Add Logout Button in Dashboard
document.body.insertAdjacentHTML("beforeend", `<button id="logoutButton" onclick="logout()">Logout</button>`);

// Load chat messages
loadChat();
