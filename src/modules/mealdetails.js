export const baseApi = 'https://www.themealdb.com/api/json/v1/1';
export const InvolvementApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';

export const apiId = 'peHlM9hq9qKvsrh6N3Wm';
export const fetchMealDetails = async (mealId) => {
  const response = await fetch(`${baseApi}/lookup.php?i=${mealId}`);
  const { meals } = await response.json();
  if (meals && meals.length > 0) {
    return meals[0];
  }
  throw new Error('Meal details not found.');
};