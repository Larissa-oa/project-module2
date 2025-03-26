import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UpdateRecipeForm from "../components/UpdateRecipeForm";

import "./RecipesDetails.css";

const RecipesDetails = ({ handleDelete }) => {
  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/recipes/${recipeId}`)
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
            <img src={recipe.image} />
          </div>
          <div className="recipe-card-text-main">
            <h2>{recipe.name}</h2>
            <h3>{recipe.country}</h3>
            <div className="recipe-information-instructions">
              <ul>
                <p>{recipe.ingredients}</p>
              </ul>
              <p>{recipe.instructions}</p>
            </div>
          </div>
          <div className="update-recipe-btn-section">
            <button>Update</button>
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
