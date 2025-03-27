import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import RadioPlayer from "../components/RadioPlayer";
import ProverbCube from "../components/ProverbCube";
import CustomsCube from "../components/CustomsCube";
import WorldCalendar from "../components/WorldCalendar";
import Welcome from "../components/Welcome";
import RecipeForm from "../components/RecipeForm";
import RecipeCardsCarousel from "../components/RecipeCardsCarousel";
import homepagevideo from "../images/homepage.mp4";
import multicultural from "../images/multicultural.jpg.avif";
import EventSlider from "../components/EventSlider";

const HomePage = ({ upcomingEvents = [] }) => {
  const [isRecipeFormOpen, setIsRecipeFormOpen] = useState(false);

  return (
    <>
      <main className="homepage">
        <div className="video-section">
          <video className="homepage-video" autoPlay loop muted>
            <source src={homepagevideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
          <div className="video-content">
            <h1 className="homepage-title">
              <span className="comm">Comm</span>
              <span className="unity">Unity</span>
            </h1>
            <div className="welcome">
              <Welcome />
            </div>
          </div>
        </div>

        <div className="homepage-web-intro">
          <p>
            Welcome to <b>CommUnity</b> – Here you can explore a collection of
            recipes that anyone can personalize to their taste, discover
            exciting events happening near and far, and dive into the beats that
            bring us all together through music. We’re on a mission to make the
            world feel a little smaller, friendlier, and full of vibrant
            cultures from every corner of the globe. Join us, share your flavor,
            your story, and your rhythm.
          </p>
          <hr />
        </div>

        {/* Content Section */}
        <div className="content">
          {/* Featured Section with Background Image */}
          <div
            className="div1 featured-section"
            style={{
              backgroundImage: "url('/images/featured-background.jpg')",
            }}
          >
            <div className="text-content">
              <h2>Explore the World</h2>
              <p>
                From recipes to customs, and the latest news, dive deep into
                cultures around the world.
              </p>
            </div>
          </div>

          {/* Recipe Section */}
          <div className="div2 recipe-section">
            <div className="recipe-intro-text">
              <h2 className="section-title">Recipes from Around the World</h2>
              <p>
                {" "}
                "Nothing brings people together like food! Dive into our global
                recipe collection and share your own secret dish with the world.
                Let's cook up some connections!"
              </p>

              <div className="add-recipe-section">
                <button
                  onClick={() => setIsRecipeFormOpen(true)}
                  id="add-recipe-button"
                >
                  Add you own recipe!
                </button>
                <Link to="/recipespage">
                  <button id="add-recipe-button">Check our recipe page</button>
                </Link>
              </div>
            </div>
            {isRecipeFormOpen && (
              <RecipeForm onClose={() => setIsRecipeFormOpen(false)} />
            )}
            <RecipeCardsCarousel />
          </div>

          <div className="div3 fun-section">
            <div className="fun-content">
              <WorldCalendar />
            </div>
          </div>

          {/* Customs and Proverbs Section with Background */}
          <div
            className="div4 customs-and-proverbs"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/people-collage-design_23-2148888277.jpg?t=st=1743081862~exp=1743085462~hmac=d3f7e7fe154be790b859986511bf9fa6f1bc7678b76ca1945c2f3b3230096af1&w=1380')",
            }}
          >
            <div className="vide-overlay"></div>
            <h3 id="text-diversity">We are better together!</h3>
          </div>
          <div className="cubes-container">
            <CustomsCube />
            <ProverbCube />
          </div>
          <EventSlider upcomingEvents={upcomingEvents} />
          {/* Radio Player Section */}
          <div className="div5 radio-player-container">
            <div className="radio-text">
              <h3>Tune In</h3>
              <p>
                Very few things cure nostalgia and bring back fond memories more
                than music. Whether it's to hear some favorite tunes from home
                or discover new sounds from other cultures, here you can listen
                to stations from all around the world.
              </p>
            </div>
            <RadioPlayer />
          </div>

          {/* Social Links */}
          <div className="div6 social-links">
            <div className="links-container">
              <Link to="/socialpage" className="social-page-link">
                Social Page
              </Link>
              <Link to="/upcomingevents" className="all-events-link">
                Upcoming Events Page
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
