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

function App() {
  const [events, setEvents] = useState([]);
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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="food" element={<FoodPage />} />
        <Route
          path="/socialpage"
          element={<SocialPage addEvent={handleAddEvent} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/allevents" element={<AllEventsPage events={events} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
