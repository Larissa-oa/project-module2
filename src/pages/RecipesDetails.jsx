import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../config/config.js";
import UpdateRecipeForm from "../components/UpdateRecipeForm";

import "./RecipesDetails.css";

const RecipesDetails = ({ handleDelete }) => {
  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/recipes/${recipeId}`);
    fetch(`${API_URL}/recipes/${recipeId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => console.log(error));
  }, [recipeId]);

  return (
    <div className="recipe-detail-page">
      <div className="overlay-recipe-detail-page"></div>
      <div className="outter-card">
        <div className="recipe-card-info">
          <div className="image-recipe-card-info">
            <img src={recipe.image} alt={recipe.name} />
          </div>
          <div className="recipe-card-text-main">
            <h2>{recipe.name}</h2>
            <h3>{recipe.country}</h3>
            <div className="recipe-information-instructions">
              {recipe.ingredients && (
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
              {recipe.instructions && (
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
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
              <UpdateRecipeForm onClose={() => setIsUpdateFormOpen(false)} />
            )}
            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
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
