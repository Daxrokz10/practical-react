const API_URL = 'http://localhost:3001/recipes';

export const recipeService = {
  // Get all recipes
  getAllRecipes: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch recipes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  },

  // Get single recipe by ID
  getRecipeById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch recipe');
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe:', error);
      return null;
    }
  },

  // Add new recipe
  addRecipe: async (recipe) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      });
      if (!response.ok) throw new Error('Failed to add recipe');
      return await response.json();
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  },

  // Update recipe
  updateRecipe: async (id, recipe) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      });
      if (!response.ok) throw new Error('Failed to update recipe');
      return await response.json();
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  },

  // Delete recipe
  deleteRecipe: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete recipe');
      return true;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  }
};
