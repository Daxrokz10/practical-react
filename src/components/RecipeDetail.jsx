import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipeService } from '../services/recipeService';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Try fetching as number first, then as string
        let data = await recipeService.getRecipeById(id);
        if (data) {
          setRecipe(data);
        } else {
          console.error('Recipe not found with ID:', id);
          alert('Recipe not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        alert('Failed to load recipe');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container">
        <p style={{ textAlign: 'center', padding: '2rem' }}>⏳ Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container">
        <p style={{ textAlign: 'center', padding: '2rem' }}>❌ Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '2rem' }}>
        ← Back to Recipes
      </button>

      <div className="recipe-detail">
        <div className="recipe-detail-image">
          <img src={recipe.image} alt={recipe.name} />
        </div>

        <div className="recipe-detail-content">
          <h1>{recipe.name}</h1>
          <p className="recipe-author">👨‍🍳 By: {recipe.author}</p>
          
          <div className="recipe-section">
            <h3>📝 Description</h3>
            <p>{recipe.description}</p>
          </div>

          <div className="recipe-section">
            <h3>🥘 Ingredients</h3>
            <ul className="ingredients-list">
              {Array.isArray(recipe.ingredients) ? (
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>✓ {ingredient}</li>
                ))
              ) : (
                <li>✓ {recipe.ingredients}</li>
              )}
            </ul>
          </div>

          <div className="recipe-section">
            <h3>👨‍🍳 Cooking Instructions</h3>
            <div className="instructions">
              {Array.isArray(recipe.cookingInstructions) ? (
                <ol>
                  {recipe.cookingInstructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              ) : (
                <ol>
                  {recipe.cookingInstructions.split('\n').filter(line => line.trim()).map((line, index) => (
                    <li key={index}>{line.trim()}</li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
