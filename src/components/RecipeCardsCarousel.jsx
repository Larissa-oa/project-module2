import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "./RecipeCardsCarousel.css";

const RecipeCardsCarousel = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:4000/recipes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Shuffle the recipes array to display in random order
        const shuffledRecipes = data.sort(() => 0.5 - Math.random());
        setRecipes(shuffledRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipeUuid) => {
    navigate(`/foodpagedetails/${recipeUuid}`);
  };

  return (
    <div className="recipe-carousel-container">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        className="recipe-swiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {recipes.map((recipe) => (
          <SwiperSlide
            key={recipe.uuid}
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe.uuid)}
          >
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.name}
                className="recipe-card-image"
                onError={(e) => {
                  e.target.style.display = "none";
                  console.error(`Failed to load image for ${recipe.name}`);
                }}
              />
            ) : (
              <div className="recipe-card-image placeholder">No Image</div>
            )}
            <div className="recipe-card-name">{recipe.name}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecipeCardsCarousel;
