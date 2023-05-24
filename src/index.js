import './style.css';
import { showCommentsPopup } from './modules/comments.js';
import { displayMeals } from './modules/display.js';

displayMeals();

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('comments')) {
    const { mealId } = event.target.closest('.meal').dataset;
    showCommentsPopup(mealId);
  }
});
