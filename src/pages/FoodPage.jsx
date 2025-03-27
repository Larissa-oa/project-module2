import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FoodPage.css";
import like from "../images/iwillgo.png";
import peoplefood from "../images/foodpage.avif"

const FoodPage = ({
  recipes,
  favRecipes,  
  addToFavouritesRecipes,
  removeFavouriteRecipe,
  handleDelete, 
}) => {

  //search with country and name only :) 
  const [searchTerm, setSearchTerm] = useState("");

 
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Check if it makes sense I but I want to send to a new array in the same page of the events, thats why the different function
  const handleFavouriteToggle = (recipeId) => {
    const isFavourite = favRecipes.some((favRecipe) => favRecipe.id === recipeId);
    if (isFavourite) {
      removeFavouriteRecipe(recipeId);
    } else {
      addToFavouritesRecipes(recipeId);
    }
  };

  return (
    <div className="recipes-food-page-container">
    <h1>Nothing brings people together like food</h1>
    <div className="image-people-dinning">
      <img src={peoplefood} alt="People dining" />
    </div>
    <div className="food-page-subhead">
      <p>
        We've gathered a tasty collection of recipes from all over the world for you to try, enjoy,
        and share. Feel free to tweak them to match your taste (or your grandma's secret recipe) —
        the most important part is to have fun and explore new flavors! Let's get cooking and connect
        through food!
      </p>
    </div>
  
      <div className="search-bar-recipe-page">
        <label>
          Search the perfect recipe for you:
          <input
            type="text"
            placeholder="Search recipes"
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
          />
        </label>
      </div>
      <div className="recipes-food-recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipes-food-card">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-image-food-card"
            />
            <div className="recipe-card-country-info">
              <h2>{recipe.name}</h2>
              <h3>{recipe.country}</h3>
            </div>
            <div className="recipe-buttons">
              <Link to={`/recipes/${recipe.id}`} className="recipe-detail-link">
                <button>Details</button>
              </Link>
              <button className="delete-btn" onClick={() => handleDelete(recipe.id)}>Delete</button>
              <button
                id="like-btn"
                className={favRecipes.some((fav) => fav.id === recipe.id) ? "liked" : ""}
                onClick={() => handleFavouriteToggle(recipe.id)}
              ><p> I wanna try!</p>
                <img src={like} alt="Like" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
