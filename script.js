// Array that holds all post objects in memory
let posts = [];

// Track which post is being edited (null means we are adding a new post)
let editingId = null;

// DOM references
let postForm = document.getElementById("postForm");
let titleInput = document.getElementById("postTitle");
let contentInput = document.getElementById("postContent");
let titleError = document.getElementById("titleError");
let contentError = document.getElementById("contentError");
let submitBtn = document.getElementById("submitBtn");
let cancelBtn = document.getElementById("cancelBtn");
let postList = document.getElementById("postList");

// Generate a simple unique id using the current timestamp
function generateId() {
    return Date.now().toString();
}

// Format a timestamp into a readable date string
function formatDate(timestamp) {
    let date = new Date(parseInt(timestamp));
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

// Save the posts array to localStorage
function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Load posts from localStorage into the posts array
function loadPosts() {
    let stored = localStorage.getItem("posts");
    if (stored) {
        try {
            posts = JSON.parse(stored);
        } catch (e) {
            posts = [];
        }
    }
}

// Show an error on a field
function showError(input, span, message) {
    span.textContent = message;
    input.classList.add("invalid");
}

// Clear an error from a field
function clearError(input, span) {
    span.textContent = "";
    input.classList.remove("invalid");
}

// Validate the form — returns true if valid
function validateForm() {
    let valid = true;

    if (!titleInput.value.trim()) {
        showError(titleInput, titleError, "Title is required.");
        valid = false;
    } else {
        clearError(titleInput, titleError);
    }

    if (!contentInput.value.trim()) {
        showError(contentInput, contentError, "Content is required.");
        valid = false;
    } else {
        clearError(contentInput, contentError);
    }

    return valid;
}