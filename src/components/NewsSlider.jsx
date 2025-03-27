import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./NewsSlider.css";

const NewsCarousel = () => {
  const [articles, setArticles] = useState([]);
  const [regions, setRegions] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showRegionSearch, setShowRegionSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Fetch available regions
  const fetchAvailableRegions = async () => {
    try {
      const response = await fetch(
        "https://api.currentsapi.services/v1/available/regions"
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Sort regions alphabetically
      const sortedRegions = Object.entries(data.regions)
        .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
        .reduce((acc, [name, code]) => {
          acc[name] = code;
          return acc;
        }, {});

      setRegions(sortedRegions);
    } catch (err) {
      console.error("Error fetching regions:", err);
    }
  };

  // Fetch news articles for a specific region
  const fetchNews = async (regionCode) => {
    try {
      const apiKey = "PvFmKfWR0i_wfIJ8O_4LY2cKZuamouCsk3rwbxUYMqjNOWlX"; // Replace with your actual API key
      const response = await fetch(
        `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&category=regional&country=${regionCode}&page_size=20`
      );

      const data = await response.json();

      // Limit to 30 articles and filter out articles without images
      const validArticles = data.news
        .filter((article) => article.image !== "None")
        .slice(0, 20);

      setArticles(validArticles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Convert country code to regional indicator symbols (flag emoji)
  const getCountryFlagEmoji = (countryCode) => {
    if (!countryCode || countryCode.length !== 2) return "";

    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());

    return String.fromCodePoint(...codePoints);
  };

  // Handle region selection
  const handleRegionSelect = (regionName) => {
    const regionCode = regions[regionName];
    setSelectedRegion({ name: regionName, code: regionCode });
    fetchNews(regionCode);
    setShowRegionSearch(false);
    setSearchTerm("");
  };

  // Toggle region search popup
  const toggleRegionSearch = () => {
    setShowRegionSearch(!showRegionSearch);
    setSearchTerm("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowRegionSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch regions on component mount
  useEffect(() => {
    fetchAvailableRegions();
  }, []);

  // Select a random region on regions load
  useEffect(() => {
    if (Object.keys(regions).length > 0) {
      const regionNames = Object.keys(regions);
      const randomRegionName =
        regionNames[Math.floor(Math.random() * regionNames.length)];
      handleRegionSelect(randomRegionName);
    }
  }, [regions]);

  // Filter regions based on search term
  const filteredRegions = Object.keys(regions).filter((regionName) =>
    regionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="news-carousel-container">
      {/* Region Search Container */}
      <div className="country-search-container" ref={searchRef}>
        <button className="search-button" onClick={toggleRegionSearch}>
          {selectedRegion
            ? `${getCountryFlagEmoji(selectedRegion.code)} ${
                selectedRegion.name
              }`
            : "Select Region"}
        </button>

        {/* Region Search Popup */}
        {showRegionSearch && (
          <div className="search-popup">
            {/* ... (rest of the search popup code remains the same) */}
            <div className="search-header">
              <h3>Select a Region</h3>
              <button className="close-button" onClick={toggleRegionSearch}>
                ✕
              </button>
            </div>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="country-search"
                autoFocus
              />
            </div>
            <div className="countries-list">
              {Object.keys(regions).length === 0 ? (
                <div className="loading">Loading regions...</div>
              ) : filteredRegions.length === 0 ? (
                <div className="no-results">No regions found</div>
              ) : (
                filteredRegions.map((regionName) => (
                  <div
                    key={regionName}
                    className="country-item"
                    onClick={() => handleRegionSelect(regionName)}
                  >
                    <span className="country-flag">
                      {getCountryFlagEmoji(regions[regionName])}
                    </span>
                    {regionName}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* News Carousel */}
      {articles.length > 0 && (
        <>
          <Swiper
            modules={[Navigation, Thumbs, Autoplay]}
            spaceBetween={10}
            navigation
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={articles.length > 1}
            className="mySwiper2"
          >
            {articles.map((article, index) => (
              <SwiperSlide
                key={index}
                onClick={() => window.open(article.url, "_blank")}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="slide-image"
                />
                <div className="slide-content">
                  <div className="slide-title">{article.title}</div>
                  <div className="slide-description">
                    {article.description || "No description available"}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="mySwiper"
          >
            {articles.map((article, index) => (
              <SwiperSlide key={index}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="thumb-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default NewsCarousel;
