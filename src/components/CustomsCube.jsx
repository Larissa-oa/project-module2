import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "./CustomsCube.css";

const CustomsCube = () => {
  const [shuffledCustoms, setShuffledCustoms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Array of background colors for each slide
  const backgroundColors = [
    "#333333",
    "#2E8B57",
    "#D45D00",
    "#1D1B2F",
    "#800080",
    "#1E90FF",
    "#B22222",
    "#A52A2A",
  ];

  // Function to shuffle the proverbs array
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
    const loadCustoms = async () => {
      try {
        setIsLoading(true);
        // Using dynamic import to load the JSON file
        const customsModule = await import("../assets/customs.json");
        const customsData = customsModule.default || [];

        // Set shuffled proverbs
        setShuffledCustoms(shuffleArray(customsData));
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load proverbs:", err);
        setError(
          "Failed to load proverbs. Please check the console for details."
        );
        setIsLoading(false);
      }
    };

    loadCustoms();
  }, []);

  if (isLoading) {
    return <div className="customs-cube-loading">Loading customs...</div>;
  }

  if (error) {
    return <div className="customs-cube-error">{error}</div>;
  }

  if (shuffledCustoms.length === 0) {
    return <div className="customs-cube-error">No customs found.</div>;
  }

  return (
    <div className="customs-cube-container">
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
        {shuffledCustoms.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            <div
              className="custom-slide"
              style={{
                backgroundColor:
                  backgroundColors[index % backgroundColors.length],
              }}
            >
              <div className="custom-content">
                <p className="custom-text">{item.custom || "Unknown custom"}</p>
                <p className="custom-country">
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

export default CustomsCube;
