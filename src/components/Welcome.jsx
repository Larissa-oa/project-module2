import React, { useState, useEffect } from "react";
import "./Welcome.css";
import translationsData from "../assets/welcome-list.json";

// Helper function to shuffle the array (creates a copy)
const shuffleArray = (array) => {
  const newArray = [...array]; // Create a copy of the array
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray; // Return the shuffled copy
};

const Welcome = () => {
  const [translations, setTranslations] = useState([]);
  const [currentTranslation, setCurrentTranslation] = useState(0);

  // Initialize translations on component mount
  useEffect(() => {
    const shuffledTranslations = shuffleArray(translationsData);
    setTranslations(shuffledTranslations);
  }, []);

  // Set up the interval for rotating translations
  useEffect(() => {
    // Only set up the interval if we have translations
    if (translations.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTranslation((prev) => (prev + 1) % translations.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [translations]);

  if (translations.length === 0 || !translations[currentTranslation]) {
    return <div>Loading...</div>; // Display loading message until data is fetched
  }

  return (
    <div className="welcome-container">
      <div className="welcome-word">
        {translations[currentTranslation].word}
      </div>
      <div className="welcome-language">
        {translations[currentTranslation].language}
      </div>
    </div>
  );
};

export default Welcome;
