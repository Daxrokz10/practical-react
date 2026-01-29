import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../redux/actions';
import { recipeService } from '../services/recipeService';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cookingInstructions, setCookingInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  if (!user) {
    return (
      <div className="container">
        <p>Please login to add recipes</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const recipeData = {
        name,
        description,
        image,
        ingredients: ingredients.split(',').map(ing => ing.trim()),
        cookingInstructions,
        userId: user.id,
        author: user.username
      };

      const savedRecipe = await recipeService.addRecipe(recipeData);
      dispatch(addRecipe(savedRecipe));
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to add recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header" style={{ marginBottom: '2rem' }}>
        <h2>🍳 Add New Recipe</h2>
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
            rows="3"
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
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '⏳ Adding...' : '✓ Add Recipe'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;

