const baseApi = 'https://www.themealdb.com/api/json/v1/1';
const InvolvementApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';

const apiId = 'peHlM9hq9qKvsrh6N3Wm';
export const getMeals = async () => {
  const response = await fetch(`${baseApi}/filter.php?a=Jamaican`);
  const { meals } = await response.json();
  return meals;
};

export const fetchMealDetails = async (mealId) => {
  const response = await fetch(`${baseApi}/lookup.php?i=${mealId}`);
  const { meals } = await response.json();
  if (meals && meals.length > 0) {
    return meals[0];
  }
  throw new Error('Meal details not found.');
};
export const getComments = async (mealId) => {
  try {
    const response = await fetch(`${InvolvementApi}/apps/${apiId}/comments?item_id=${mealId}`);
    const { comments } = await response.json();
    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
};
