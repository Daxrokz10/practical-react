// Recipe Actions
export const addRecipe = (recipe) => ({
  type: 'ADD_RECIPE',
  payload: recipe
});

export const updateRecipe = (recipe) => ({
  type: 'UPDATE_RECIPE',
  payload: recipe
});

export const deleteRecipe = (id) => ({
  type: 'DELETE_RECIPE',
  payload: id
});

export const setRecipes = (recipes) => ({
  type: 'SET_RECIPES',
  payload: recipes
});

// Auth Actions
export const register = (user) => ({
  type: 'REGISTER',
  payload: user
});

export const login = (email, password) => ({
  type: 'LOGIN',
  payload: { email, password }
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user
});
