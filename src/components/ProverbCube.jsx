import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "./ProverbCube.css";

const ProverbCube = () => {
  const [shuffledProverbs, setShuffledProverbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Array of background colors for each slide
  const backgroundColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFB6C1",
    "#D9B72E",
    "#6B5B95",
    "#88B04B",
    "#92A8D1",
    "#955251",
  ];

  // Function to shuffle and limit the proverbs array
  const shuffleArray = (array) => {
    if (!Array.isArray(array)) return [];

    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Load proverbs on component mount
  useEffect(() => {
    const loadProverbs = async () => {
      try {
        setIsLoading(true);
        // Using dynamic import to load the JSON file
        const proverbsModule = await import("../assets/proverbs.json");
        const proverbsData = proverbsModule.default || [];

        // Set shuffled proverbs
        setShuffledProverbs(shuffleArray(proverbsData));
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load proverbs:", err);
        setError(
          "Failed to load proverbs. Please check the console for details."
        );
        setIsLoading(false);
      }
    };

    loadProverbs();
  }, []);

  if (isLoading) {
    return <div className="proverb-cube-loading">Loading proverbs...</div>;
  }

  if (error) {
    return <div className="proverb-cube-error">{error}</div>;
  }

  if (shuffledProverbs.length === 0) {
    return <div className="proverb-cube-error">No proverbs found.</div>;
  }

  return (
    <div className="proverb-cube-container">
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={3000} // Set the speed here (1500ms for a slower rotation)
        modules={[EffectCube, Autoplay]}
        className="mySwiper"
      >
        {shuffledProverbs.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            <div
              className="proverb-slide"
              style={{
                backgroundColor:
                  backgroundColors[index % backgroundColors.length],
              }}
            >
              <div className="proverb-content">
                <p className="proverb-text">
                  {item.proverb || "Unknown proverb"}
                </p>
                <p className="proverb-country">
                  {item.country || "Unknown origin"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProverbCube;
