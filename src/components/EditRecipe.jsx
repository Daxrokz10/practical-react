import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateRecipe } from '../redux/actions';

const EditRecipe = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const recipes = useSelector(state => state.recipes.recipes);
  const recipe = recipes.find(r => r.id === parseInt(id));

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setDescription(recipe.description);
      setImage(recipe.image);
    }
  }, [recipe]);

  if (!recipe) {
    return <div className="container"><p>Recipe not found</p></div>;
  }

  if (!user || user.id !== recipe.userId) {
    return <div className="container"><p>You can only edit your own recipes</p></div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(updateRecipe({
      ...recipe,
      name,
      description,
      image
    }));
    
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Edit Recipe</h2>
      
      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-group">
          <label>Recipe Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        
        <div className="button-group">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
