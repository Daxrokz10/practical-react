const API_URL = 'http://localhost:3001/recipes';

export const recipeService = {
  // Get all recipes
  getAllRecipes: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch recipes');
      return await response.json();
    } catch (error) {
      console.warn('JSON Server unavailable, using localStorage:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem('recipes');
      return stored ? JSON.parse(stored) : [];
    }
  },

  // Get single recipe by ID
  getRecipeById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch recipe');
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('JSON Server unavailable, using localStorage:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem('recipes');
      const recipes = stored ? JSON.parse(stored) : [];
      return recipes.find(r => String(r.id) === String(id)) || null;
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
      console.warn('JSON Server unavailable, saving to localStorage:', error);
      // Fallback to localStorage
      const newRecipe = {
        ...recipe,
        id: Date.now()
      };
      const stored = localStorage.getItem('recipes');
      const recipes = stored ? JSON.parse(stored) : [];
      recipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      return newRecipe;
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
      console.warn('JSON Server unavailable, updating localStorage:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem('recipes');
      const recipes = stored ? JSON.parse(stored) : [];
      const index = recipes.findIndex(r => r.id === parseInt(id));
      if (index !== -1) {
        recipes[index] = { ...recipe, id: parseInt(id) };
        localStorage.setItem('recipes', JSON.stringify(recipes));
        return recipes[index];
      }
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
      console.warn('JSON Server unavailable, deleting from localStorage:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem('recipes');
      const recipes = stored ? JSON.parse(stored) : [];
      const filtered = recipes.filter(r => r.id !== parseInt(id));
      localStorage.setItem('recipes', JSON.stringify(filtered));
      return true;
    }
  }
};
