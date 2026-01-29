// Recipe Reducer
const recipeInitialState = {
  recipes: JSON.parse(localStorage.getItem('recipes')) || [
    {
      id: 1,
      name: 'Doro Wat',
      description: 'Ethiopian chicken stew',
      image: 'https://via.placeholder.com/300x200?text=Doro+Wat',
      userId: 1,
      author: 'demo'
    },
    {
      id: 2,
      name: 'Injera',
      description: 'Ethiopian flatbread',
      image: 'https://via.placeholder.com/300x200?text=Injera',
      userId: 1,
      author: 'demo'
    }
  ]
};

export const recipeReducer = (state = recipeInitialState, action) => {
  switch (action.type) {
    case 'ADD_RECIPE': {
      const newRecipe = {
        ...action.payload,
        id: Date.now()
      };
      const updated = [...state.recipes, newRecipe];
      localStorage.setItem('recipes', JSON.stringify(updated));
      return { ...state, recipes: updated };
    }
    case 'UPDATE_RECIPE': {
      const updated = state.recipes.map(r => 
        r.id === action.payload.id ? action.payload : r
      );
      localStorage.setItem('recipes', JSON.stringify(updated));
      return { ...state, recipes: updated };
    }
    case 'DELETE_RECIPE': {
      const updated = state.recipes.filter(r => r.id !== action.payload);
      localStorage.setItem('recipes', JSON.stringify(updated));
      return { ...state, recipes: updated };
    }
    case 'SET_RECIPES': {
      localStorage.setItem('recipes', JSON.stringify(action.payload));
      return { ...state, recipes: action.payload };
    }
    default:
      return state;
  }
};

// Auth Reducer
const authInitialState = {
  user: JSON.parse(localStorage.getItem('currentUser')) || null,
  users: JSON.parse(localStorage.getItem('users')) || [
    { id: 1, name: 'Demo User', email: 'demo@example.com', password: 'demo123', username: 'demo' }
  ]
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case 'REGISTER': {
      const newUser = {
        id: Date.now(),
        ...action.payload
      };
      const updated = [...state.users, newUser];
      localStorage.setItem('users', JSON.stringify(updated));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return { ...state, users: updated, user: newUser };
    }
    case 'LOGIN': {
      const user = state.users.find(
        u => u.email === action.payload.email && u.password === action.payload.password
      );
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { ...state, user };
      }
      return state;
    }
    case 'LOGOUT': {
      localStorage.removeItem('currentUser');
      return { ...state, user: null };
    }
    case 'SET_USER': {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};
