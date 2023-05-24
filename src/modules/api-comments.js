import {baseApi} from './mealdetails.js';

export const getMeals = async () => {
  const response = await fetch(`${baseApi}/filter.php?a=Jamaican`);
  const { meals } = await response.json();
  return meals;
};


export const getComments = async (apiId, itemId) => {
  const url = `${baseApi}/comments?item_id=${itemId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to retrieve comments');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
