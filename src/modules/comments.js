import { fetchMealDetails } from './mealdetails.js';
import { truncateDescription } from './truncate-descripion.js'
import { getComments } from './api-comments.js';

export const showCommentsPopup = async (mealId) => {
  // Create the popup element
  const popupContent = document.createElement('div');
  popupContent.classList.add('launch-card');
  popupContent.innerHTML = `
    <button class="close-modal">&times;</button>
    <div class="launch-img">
      <img class="image-popup" src="" alt="meal image" />
    </div>
    <div id="comment">
      <h2></h2>
      <h2>Comments (<span class="comments-count"></span>)</h2>
      <ul class="commentList"></ul>
      <div class="entry">
        <h2>Add a Comment</h2>
        <form>
          <div class="form-group">
            <label for="txt-visitor">Name:</label>
            <input id="txt-visitor" type="text" placeholder="Your name" />
          </div>
          <div class="form-group">
            <label for="txt-comment">Comment:</label>
            <input id="txt-comment" type="text" placeholder="Your comment" />
          </div>
          <input id="launch-id" type="hidden" />
          <div class="form-group">
            <input class="comments" id="btn-save-comment" type="button" value="Comment" />
          </div>
        </form>
      </div>
    </div>
  `;

  popupContent.style.display = 'none';

  const closePopupButton = popupContent.querySelector('.close-modal');
  closePopupButton.addEventListener('click', () => {
    popupContent.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === popupContent) {
      popupContent.style.display = 'none';
    }
  });

  try {
    const mealDetails = await fetchMealDetails(mealId);
    const mealImage = popupContent.querySelector('.image-popup');
    const mealName = popupContent.querySelector('h2');
    const mealDescription = popupContent.querySelector('.entry > h2');
    const truncatedDescription = truncateDescription(mealDetails.strInstructions, 60); // Adjust the word count as desired

    mealImage.src = mealDetails.strMealThumb;
    mealName.textContent = mealDetails.strMeal;
    mealDescription.textContent = truncatedDescription;

    // Remove any existing popup before showing a new one
    const existingPopup = document.querySelector('.launch-card');
    if (existingPopup) {
      existingPopup.remove();
    }

    // Append the popup to the document body
    document.body.appendChild(popupContent);

    // Show the popup
    popupContent.style.display = 'block';

    // Fetch comments from the Involvement API
    const comments = await getComments(mealId);

    // Update the comment list in the popup
    const commentList = popupContent.querySelector('.commentList');
    commentList.innerHTML = ''; // Clear existing comments

    comments.forEach((comment) => {
      const commentItem = document.createElement('li');
      commentItem.textContent = comment.text;
      commentList.appendChild(commentItem);
    });

    // Update the comments count
    const commentsCount = popupContent.querySelector('.comments-count');
    commentsCount.textContent = comments.length;

    console.log(mealDetails);
  } catch (error) {
    console.error('Error fetching meal details:', error);
  }
};
