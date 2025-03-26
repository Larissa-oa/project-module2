import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import RadioPlayer from "../components/RadioPlayer";
import ProverbCube from "../components/ProverbCube";
import NewsSlider from "../components/NewsSlider";
import CustomsCube from "../components/CustomsCube";
import WorldCalendar from "../components/WorldCalendar";
import Welcome from "../components/Welcome";
import RecipeForm from "../components/RecipeForm";
import RecipeCardsCarousel from "../components/RecipeCardsCarousel";

const HomePage = () => {
  const [isRecipeFormOpen, setIsRecipeFormOpen] = useState(false);

  return (
    <>
      <main className="homepage">
        <div className="content-brand">
          <h1>App Name</h1>
          <div className="welcome">
            <Welcome />
          </div>
        </div>
        {/* DIV1 */}
        <div className="div1">
          <WorldCalendar />

          {/* Add a Recipe Button */}
          <div className="add-recipe-section">
            <button
              onClick={() => setIsRecipeFormOpen(true)}
              className="add-recipe-button"
            >
              Add a Recipe
            </button>
          </div>

          {/* Render the RecipeForm as a popup when isRecipeFormOpen is true */}
          {isRecipeFormOpen && (
            <RecipeForm onClose={() => setIsRecipeFormOpen(false)} />
          )}

          <RecipeCardsCarousel />
        </div>

        {/* DIV2 */}
        <div className="div2 news-slider">
          <NewsSlider />
        </div>

        {/* DIV3 */}
        <div className="div3 customs-and-proverbs">
          <CustomsCube />
          <ProverbCube />
        </div>

        {/* DIV4 */}
        <div className="div4 radio-player">
          <RadioPlayer />
        </div>

        {/* DIV5 */}
        <div className="div5">
          <div className="social-links">
            <Link to="/socialpage" className="social-page-link">
              Social Page
            </Link>
            <Link to="/allevents" className="all-events-link">
              All Events Page
            </Link>
            <Link to="/recipes">Recipes</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
