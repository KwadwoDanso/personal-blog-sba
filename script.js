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

// Render all posts to the page
function renderPosts() {
    postList.innerHTML = "";

    if (posts.length === 0) {
        postList.innerHTML = "<p>No posts yet. Add one above!</p>";
        return;
    }

    // Loop through posts in reverse so newest appears first
    for (let i = posts.length - 1; i >= 0; i--) {
        let post = posts[i];

        // Create the card
        let card = document.createElement("div");
        card.className = "post-card";

        // Title
        let title = document.createElement("h3");
        title.textContent = post.title;
        card.appendChild(title);

        // Date
        let meta = document.createElement("p");
        meta.className = "post-meta";
        meta.textContent = "Posted: " + formatDate(post.id);
        card.appendChild(meta);

        // Content
        let content = document.createElement("p");
        content.textContent = post.content;
        card.appendChild(content);

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "btn-edit";
        editBtn.setAttribute("data-id", post.id);
        editBtn.addEventListener("click", handleEdit);
        card.appendChild(editBtn);

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn-delete";
        deleteBtn.setAttribute("data-id", post.id);
        deleteBtn.addEventListener("click", handleDelete);
        card.appendChild(deleteBtn);

        postList.appendChild(card);
    }
}

// Handle form submission (add or update)
postForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    if (editingId) {
        // Update the existing post
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === editingId) {
                posts[i].title = titleInput.value.trim();
                posts[i].content = contentInput.value.trim();
                break;
            }
        }
        editingId = null;
        submitBtn.textContent = "Add Post";
        cancelBtn.style.display = "none";
        document.getElementById("form-heading").textContent = "New Post";
    } else {
        // Create a new post object
        let newPost = {
            id: generateId(),
            title: titleInput.value.trim(),
            content: contentInput.value.trim()
        };
        posts.push(newPost);
    }

    savePosts();
    renderPosts();
    postForm.reset();
    clearError(titleInput, titleError);
    clearError(contentInput, contentError);
});

// Handle edit button click
function handleEdit(event) {
    let id = event.target.getAttribute("data-id");

    // Find the post with this id
    let post = null;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
            post = posts[i];
            break;
        }
    }

    if (!post) { return; }

    // Populate the form with the post's data
    titleInput.value = post.title;
    contentInput.value = post.content;

    // Switch the form into edit mode
    editingId = id;
    submitBtn.textContent = "Update Post";
    cancelBtn.style.display = "inline-block";
    document.getElementById("form-heading").textContent = "Edit Post";

    // Scroll to the form
    postForm.scrollIntoView({ behavior: "smooth" });
}

// Handle delete button click
function handleDelete(event) {
    let id = event.target.getAttribute("data-id");

    // Filter out the deleted post
    posts = posts.filter(function (post) {
        return post.id !== id;
    });

    // If the deleted post was being edited, cancel edit mode
    if (editingId === id) {
        cancelEdit();
    }

    savePosts();
    renderPosts();
}

// Cancel editing and reset the form
function cancelEdit() {
    editingId = null;
    submitBtn.textContent = "Add Post";
    cancelBtn.style.display = "none";
    document.getElementById("form-heading").textContent = "New Post";
    postForm.reset();
    clearError(titleInput, titleError);
    clearError(contentInput, contentError);
}

// Cancel button click
cancelBtn.addEventListener("click", cancelEdit);

// Real-time validation
titleInput.addEventListener("input", function () {
    if (titleInput.value.trim()) {
        clearError(titleInput, titleError);
    }
});

contentInput.addEventListener("input", function () {
    if (contentInput.value.trim()) {
        clearError(contentInput, contentError);
    }
});

// Initialize — load from localStorage and render on page load
loadPosts();
renderPosts();