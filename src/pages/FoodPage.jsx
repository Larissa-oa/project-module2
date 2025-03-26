import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './FoodPage.css'
import like from "../images/iwillgo.png"

const FoodPage = ({recipes}) => {
  return (
    <div className="recipes-food-page-container">
     <h1>Nothing brings people togheter like food</h1>
     <div className="food-page-subhead">
     <p> "Nothing brings people together like food! We've gathered a tasty collection of recipes from all over the world for you to try, enjoy, and share. Feel free to tweak them to match your taste (or your grandma's secret recipe) — the most important part is to have fun and explore new flavors! Let's get cooking and connect through food!"</p>
     </div>
     <div className="recipes-food-recipe-list">
      {recipes.map((recipe) => 
      <div key={recipe.id} className="recipes-food-card">
        <img src={recipe.image} alt={recipe.name} className="recipe-image-food-card" />

        <div className="recipe-card-country-info">
          <h2>{recipe.name}</h2>
          <h3>{recipe.country}</h3>
        </div>
        <div className="recipe-buttons">
        <Link to={`/recipes/${recipe.id}`} className="recipe-detail-link">
          <button>
            Details
          </button>
          </Link>
          <button className="delete-btn">Delete</button>
          <button id="like-btn"> <img src={like} /></button>
        </div>
         </div>
      )}

     </div>
    </div>
  )
}

export default FoodPage
