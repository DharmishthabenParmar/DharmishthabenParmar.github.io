// functionality for showing/hiding the comments section

// Get references to the show/hide button and the comment wrapper
const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

// Initially, set the display of the comment wrapper to none
commentWrapper.style.display = 'none';

// Event listener for the show/hide button click
showHideBtn.onclick = function() {
  // Get the current text content of the button
  let showHideText = showHideBtn.textContent;
  // Toggle the display and update the button text accordingly
  if(showHideText === 'Show comments') {
    showHideBtn.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
  } else {
    showHideBtn.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
  }
};

// functionality for adding a new comment via the comments form
// Get references to the form, name field, comment field, and the comment container

const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');
// Event listener for the form submission
form.onsubmit = function(e) {
  // Prevent the default form submission
  e.preventDefault();
  // Call the function to submit the comment
  submitComment();
};
// Function to submit a new comment
function submitComment() {
   // Create HTML elements for the new comment
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  // Get the values from the name and comment fields
  const nameValue = nameField.value;
  const commentValue = commentField.value;
  // Set the text content of the created elements
  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;
   // Append the new comment elements to the comment container
  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);
  // Clear the form fields
  nameField.value = '';
  commentField.value = '';
}
