import { getMeals } from './api-comments.js';
import { createMeal } from './meals.js';

export const displayMeals = async () => {
  const meals = await getMeals();
  const mealsContainer = document.querySelector('.meals');
  meals.forEach((meal) => {
    const mealElement = createMeal(meal);
    mealsContainer.appendChild(mealElement);
  });
  console.log(meals);
};
