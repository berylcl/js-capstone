import {baseApi} from './mealdetails.js';

export const getMeals = async () => {
  const response = await fetch(`${baseApi}/filter.php?a=Jamaican`);
  const { meals } = await response.json();
  return meals;
};

export const getComments = async (apiId, itemId) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiId}/comments?item_id=${itemId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
