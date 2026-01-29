import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteRecipe, setRecipes } from '../redux/actions';
import { recipeService } from '../services/recipeService';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const recipes = useSelector(state => state.recipes.recipes);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch recipes from API on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await recipeService.getAllRecipes();
        dispatch(setRecipes(data));
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [dispatch]);

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Delete this recipe?')) {
      try {
        await recipeService.deleteRecipe(id);
        dispatch(deleteRecipe(id));
      } catch (error) {
        alert('Failed to delete recipe');
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>My Recipes</h1>
        {user && (
          <button className="btn btn-primary" onClick={() => navigate('/add')}>
            + Add Recipe
          </button>
        )}
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="no-recipes">Loading recipes...</p>
      ) : filtered.length === 0 ? (
        <p className="no-recipes">No recipes found</p>
      ) : (
        <div className="recipes-grid">
          {filtered.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <div className="recipe-content">
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <p className="author">by {recipe.author}</p>
                
                <div className="actions">
                  <button
                    className="btn btn-small btn-view"
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  >
                    View Details
                  </button>
                  {user && user.id === recipe.userId && (
                    <>
                      <button
                        className="btn btn-small btn-edit"
                        onClick={() => navigate(`/edit/${recipe.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-small btn-delete"
                        onClick={() => handleDelete(recipe.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
