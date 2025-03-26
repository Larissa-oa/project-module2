import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FoodPage from "./pages/FoodPage";
import SocialPage from "./pages/SocialPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import AllEventsPage from "./pages/AllEventsPage";
import axios from "axios";
import RecipesDetails from "./pages/RecipesDetails";

function App() {
  const [events, setEvents] = useState([]);
  const [favEvents, setFavEvents] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.log("error with get", error);
      });
  }, []);

  const handleAddEvent = (newEvent) => {
    console.log("Event Added: ", newEvent);
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    axios
      .post("http://localhost:4000/events", newEvent)
      .then((res) => {
        console.log("event add", res.data);
      })
      .catch((error) => {
        console.log("error with post", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((error) => {
        console.log("error with get", error);
      });
  }, []);

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);

    axios
      .post("http://localhost:4000/recipes", newRecipe)
      .then((res) => {
        console.log("recipe add", res.data);
      })
      .catch((error) => {
        console.log("error with post", error);
      });
  };

  //Favourite(Countmein!) button at AllEventsPage
  const addToFavourites = (id) => {
    const isAlreadyFavorite = favEvents.some((e) => e.id === id);

    if (isAlreadyFavorite) {
      setFavEvents((prevFavourites) =>
        prevFavourites.filter((e) => e.id !== id)
      );
    } else {
      const favouriteEvent = events.find((e) => e.id === id);
      if (favouriteEvent) {
        setFavEvents((prevFavourites) => [...prevFavourites, favouriteEvent]);
      }
    }
  };
  const removeFavourite = (id) => {
    setFavEvents((prevFavourites) => prevFavourites.filter((e) => e.id !== id));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/recipes"
          element={<FoodPage addRecipe={handleAddRecipe} recipes={recipes} />}
        />
        <Route
          path="/socialpage"
          element={<SocialPage addEvent={handleAddEvent} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/recipes" element={<FoodPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/allevents"
          element={
            <AllEventsPage
              events={events}
              favEvents={favEvents}
              addToFavourites={addToFavourites}
              removeFavourite={removeFavourite}
            />
          }
        />
        <Route path="/recipes/:recipeId" element={<RecipesDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
