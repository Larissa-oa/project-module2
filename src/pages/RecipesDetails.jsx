import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config.js";
import UpdateRecipeForm from "../components/UpdateRecipeForm";

import "./RecipesDetails.css";

const RecipesDetails = ({ handleDelete }) => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  // Fetch recipe data
  const fetchRecipe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/recipes/${recipeId}`);
      setRecipe(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setIsLoading(false);
      navigate("/recipes"); // Redirect if recipe not found
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const handleDeleteAndRedirect = () => {
    handleDelete(recipe.id);
    navigate("/recipes");
  };

  if (isLoading) {
    return (
      <div className="recipe-detail-page loading">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-detail-page error">
        <p>Recipe not found</p>
        <Link to="/recipes">
          <button>Go back to recipes</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <div className="overlay-recipe-detail-page"></div>
      <div className="outter-card">
        <div className="recipe-card-info">
          <div className="image-recipe-card-info">
            <img
              src={recipe.image || "/placeholder-image.png"}
              alt={recipe.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.png";
              }}
            />
          </div>
          <div className="recipe-card-text-main">
            <h2>{recipe.name}</h2>
            <h3>{recipe.country}</h3>
            <div className="recipe-information-instructions">
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div>
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}
              {recipe.instructions && recipe.instructions.length > 0 && (
                <div>
                  <h4>Instructions:</h4>
                  <ol>
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
          <div className="update-recipe-btn-section">
            <button
              onClick={() => setIsUpdateFormOpen(true)}
              className="update-recipe-button"
            >
              Edit Recipe
            </button>

            {isUpdateFormOpen && (
              <UpdateRecipeForm
                onClose={() => setIsUpdateFormOpen(false)}
                initialRecipe={recipe}
                onUpdateSuccess={() => {
                  fetchRecipe();
                  setIsUpdateFormOpen(false);
                }}
              />
            )}
            <button onClick={handleDeleteAndRedirect}>Delete</button>
          </div>
        </div>
        <Link to="/recipes">
          <button>Go back and continue exploring!</button>
        </Link>
      </div>
    </div>
  );
};

export default RecipesDetails;
