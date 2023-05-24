import './style.css';
import { getMeals} from './modules/api-comments.js';
import { truncateDescription} from './modules/truncate descripion.js';
import { fetchMealDetails} from './modules/mealdetails.js';

const displayMeals = async () => {
  const meals = await getMeals();
  meals.forEach((meal) => {
    document.querySelector('.meals').innerHTML += createMeal(meal);
  });
  console.log(meals);
};

displayMeals();

const createMeal = (meal) => `
    <div class="meal" data-meal-id="${meal.idMeal}">
      <div class="image">
        <img src="${meal.strMealThumb}" alt="meal image" />
      </div>

      <div class="title">
        <h3>${meal.strMeal}</h3>
      </div>

      <div class="actions">
        <button class="comments">Comments</button>
        <button class="reservation">Reservations</button>
      </div>
    </div>
  `;

const showCommentsPopup = async (mealId) => {
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

    console.log(mealDetails);
  } catch (error) {
    console.error('Error fetching meal details:', error);
  }
};

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('comments')) {
    const { mealId } = event.target.closest('.meal').dataset;
    showCommentsPopup(mealId);
  }
});
