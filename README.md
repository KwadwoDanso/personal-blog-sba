# Personal Blog SBA

 This is a client-side personal blog platform built with HTML, CSS, and JavaScript. Users can create, edit, delete, and view blog posts, and the posts persist in localStorage after refresh.

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)



## Overview
- Create New Post
- Display Posts
- Edit posts
- Delete posts
- Data Persistence with localStorage



## Reflections

- Challenges faced?
    --The biggest challenge was managing the form's two modes adding a new post and editing an existing one. Using one form for both meant the submit handler needed to know which mode it was in at any given moment. 

- How I overcame the challenges? 
    -- An editingId variable was used to track state. When it's null, the form is in add mode. When it holds a post's id, the form is in edit mode.

- How I handled edit posts? 
    -- When the Edit button is clicked, the function finds the matching post in the array using its data-id attribute, fills the title and content fields with that post's existing data, sets editingId to that post's id, and changes the submit button text to Update Post.


- How I saved to loaclStorage? 
    -- The posts array is always kept as the single source of truth in memory. Any time the array changes after adding, editing, or deleting savePosts() is called immediately, which converts the array to a string using JSON.stringify and writes it to localStorage. On page load, loadPosts() reads that string back with localStorage.getItem, converts it back to an array using JSON.parse inside a try/catch in case the data is corrupted, and then renderPosts() displays everything.

### Links

- Solution URL:(https://github.com/KwadwoDanso/personal-blog-sba.git)


## My process
- Set up variables — the posts array to hold everything in memory, and editingId set to null to track whether the form is in add or edit mode.
- loadPosts and savePosts — written first since everything depends on storage working. Load reads from localStorage and parses the JSON, save converts the array back to a string and writes it.
- renderPosts — loops through the array and builds a card for each post using createElement, with an Edit and Delete button on each one. Clears and rebuilds the list from scratch every time it's called.
- validateForm — checks that both fields have content, shows error messages if not, returns true or false.
- Submit handler — calls event.preventDefault(), runs the validator, then either creates a new post object and pushes it to the array, or finds the existing post by editingId and updates it in place.
- handleEdit — reads the post id from the button's data-id, finds that post in the array, fills the form fields with its data, and switches the form into edit mode.
- handleDelete — reads the id, filters that post out of the array, checks if it was the one being edited and resets the form if so, then saves and re-renders.
cancelEdit — resets editingId, clears the form, and switches the button label back.

### Built with

-Javascript
-HTML/CSS



### What I learned

- The use of DOM.
- Updating the DOM to reflect changes in user input.
- Using event handling for interactivity for adding, updating and removing items. 
- Rerendering posts
- event listeners to edit
- Timestamps on ID 


## Author
-Author is Kwadwo 

## Acknowledgments


- MDN Web Docs
- w3schools
- Per Scholas JS lessons
- https://eloquentjavascript.net/14_dom.html
- https://eloquentjavascript.net/15_event.html

