import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateRecipe } from '../redux/actions';

const EditRecipe = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cookingInstructions, setCookingInstructions] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const recipes = useSelector(state => state.recipes.recipes);
  const recipe = recipes.find(r => String(r.id) === String(id));

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setDescription(recipe.description);
      setImage(recipe.image);
      setIngredients(Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients || '');
      setCookingInstructions(recipe.cookingInstructions || '');
    }
  }, [recipe]);

  if (!recipe) {
    return <div className="container"><p>❌ Recipe not found</p></div>;
  }

  if (!user || (String(user.id) !== String(recipe.userId) && user.id !== recipe.userId)) {
    return <div className="container"><p>⛔ You can only edit your own recipes</p></div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(updateRecipe({
      ...recipe,
      name,
      description,
      image,
      ingredients: ingredients.split(',').map(ing => ing.trim()),
      cookingInstructions
    }));
    
    navigate('/');
  };

  return (
    <div className="container">
      <div className="header" style={{ marginBottom: '2rem' }}>
        <h2>✏️ Edit Recipe</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-group">
          <label>📝 Recipe Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter recipe name"
            required
          />
        </div>
        
        <div className="form-group">
          <label>📋 Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Brief description of the recipe"
            required
          />
        </div>
        
        <div className="form-group">
          <label>🖼️ Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div className="form-group">
          <label>🥘 Ingredients (comma-separated)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="3"
            placeholder="e.g., Chicken, Onions, Garlic, Salt"
            required
          />
        </div>

        <div className="form-group">
          <label>👨‍🍳 Cooking Instructions</label>
          <textarea
            value={cookingInstructions}
            onChange={(e) => setCookingInstructions(e.target.value)}
            rows="5"
            placeholder="1. First step&#10;2. Second step&#10;3. Third step..."
            required
          />
        </div>
        
        <div className="button-group">
          <button type="submit" className="btn btn-primary">✓ Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
