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
import UpcomingEventsPage from "./pages/UpcomingEventsPage.jsx";
import axios from "axios";
import RecipesDetails from "./pages/RecipesDetails";
import PastEventsPage from "./pages/PastEventsPage";
import { API_URL } from "./config/config.js";

function App() {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [favEvents, setFavEvents] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  // Sort events into upcoming and past
  const sortEvents = (eventsList) => {
    const currentDate = new Date();

    const sorted = eventsList.reduce(
      (acc, event) => {
        // Combine date and time to create a full date object
        const eventDateTime = new Date(`${event.date} ${event.time}`);

        if (eventDateTime > currentDate) {
          acc.upcoming.push(event);
        } else {
          acc.past.push(event);
        }

        return acc;
      },
      { upcoming: [], past: [] }
    );

    // Sort upcoming events by date (earliest first)
    sorted.upcoming.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    // Sort past events by date (most recent first)
    sorted.past.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA;
    });

    return sorted;
  };

  //API Call for the events
  useEffect(() => {
    axios
      .get(`${API_URL}/events`)
      .then((res) => {
        const sortedEvents = sortEvents(res.data);
        setEvents(res.data);
        setUpcomingEvents(sortedEvents.upcoming);
        setPastEvents(sortedEvents.past);
      })
      .catch((error) => {
        console.log("error with get", error);
      });
  }, []);

  const handleAddEvent = (newEvent) => {
    // When adding a new event, also update the sorted events
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      const sortedEvents = sortEvents(updatedEvents);
      setUpcomingEvents(sortedEvents.upcoming);
      setPastEvents(sortedEvents.past);
      return updatedEvents;
    });

    axios
      .post(`${API_URL}/events`, newEvent)
      .then((res) => {
        console.log("event add", res.data);
      })
      .catch((error) => {
        console.log("error with post", error);
      });
  };

  // Rest of the code remains the same as in the original App.jsx
  //API Call for the recipes
  useEffect(() => {
    axios
      .get(`${API_URL}/recipes`)
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
      .post(`${API_URL}/recipes`, newRecipe)
      .then((res) => {
        console.log("recipe add", res.data);
      })
      .catch((error) => {
        console.log("error with post", error);
      });
  };

  // Favourite (Countmein!) button at UpcomingEventsPage
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

  // Favourite (IWantToTry!) button at FoodPage
  const addToFavouritesRecipes = (id) => {
    const isAlreadyFavorite = favRecipes.some((e) => e.id === id);

    if (isAlreadyFavorite) {
      setFavRecipes((prevRecipes) => prevRecipes.filter((e) => e.id !== id));
    } else {
      const favouriteRecipe = recipes.find((e) => e.id === id);
      if (favouriteRecipe) {
        setFavRecipes((prevRecipes) => [...prevRecipes, favouriteRecipe]);
      }
    }
  };

  const removeFavouriteRecipe = (id) => {
    setFavRecipes((prevRecipes) => prevRecipes.filter((e) => e.id !== id));
  };

  // Delete on CRUD - on FoodPage and detailsPage
  function handleDelete(id) {
    axios
      .delete(`${API_URL}/recipes/${id}`)
      .then((res) => {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== id)
        );
        setFavRecipes((prevFavRecipes) =>
          prevFavRecipes.filter((favRecipe) => favRecipe.id !== id)
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage upcomingEvents={upcomingEvents} />}
        />
        <Route
          path="/recipes"
          element={
            <FoodPage
              recipes={recipes}
              favRecipes={favRecipes}
              addToFavouritesRecipes={addToFavouritesRecipes}
              removeFavouriteRecipe={removeFavouriteRecipe}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="/socialpage"
          element={<SocialPage addEvent={handleAddEvent} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/upcomingevents"
          element={
            <UpcomingEventsPage
              events={events}
              upcomingEvents={upcomingEvents}
              pastEvents={pastEvents}
              favEvents={favEvents}
              addToFavourites={addToFavourites}
              removeFavourite={removeFavourite}
            />
          }
        />
        <Route
          path="/pastevents"
          element={
            <PastEventsPage
              events={events}
              upcomingEvents={upcomingEvents}
              pastEvents={pastEvents}
              favEvents={favEvents}
              addToFavourites={addToFavourites}
              removeFavourite={removeFavourite}
            />
          }
        />

        <Route
          path="/recipes/:recipeId"
          element={<RecipesDetails handleDelete={handleDelete} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
