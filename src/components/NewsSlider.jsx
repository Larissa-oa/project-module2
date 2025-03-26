import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Thumbs,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "./NewsSlider.css";
const API_KEY = "pub_75710b5ef7e686c9b6786101ab4c994ba845d";
// Replace with your actual newsdata.io API key
const SUPPORTED_COUNTRIES = [
  { name: "Afghanistan", code: "af" },
  { name: "Albania", code: "al" },
  { name: "Algeria", code: "dz" },
  { name: "Angola", code: "ao" },
  { name: "Argentina", code: "ar" },
  { name: "Australia", code: "au" },
  { name: "Austria", code: "at" },
  { name: "Azerbaijan", code: "az" },
  { name: "Bahrain", code: "bh" },
  { name: "Bangladesh", code: "bd" },
  { name: "Barbados", code: "bb" },
  { name: "Belarus", code: "by" },
  { name: "Belgium", code: "be" },
  { name: "Bermuda", code: "bm" },
  { name: "Bhutan", code: "bt" },
  { name: "Bolivia", code: "bo" },
  { name: "Bosnia And Herzegovina", code: "ba" },
  { name: "Brazil", code: "br" },
  { name: "Brunei", code: "bn" },
  { name: "Bulgaria", code: "bg" },
  { name: "Burkina Faso", code: "bf" },
  { name: "Cambodia", code: "kh" },
  { name: "Cameroon", code: "cm" },
  { name: "Canada", code: "ca" },
  { name: "Cape Verde", code: "cv" },
  { name: "Cayman Islands", code: "ky" },
  { name: "Chile", code: "cl" },
  { name: "China", code: "cn" },
  { name: "Colombia", code: "co" },
  { name: "Comoros", code: "km" },
  { name: "Costa Rica", code: "cr" },
  { name: "Côte d'Ivoire", code: "ci" },
  { name: "Croatia", code: "hr" },
  { name: "Cuba", code: "cu" },
  { name: "Cyprus", code: "cy" },
  { name: "Czech Republic", code: "cz" },
  { name: "Denmark", code: "dk" },
  { name: "Djibouti", code: "dj" },
  { name: "Dominica", code: "dm" },
  { name: "Dominican Republic", code: "do" },
  { name: "DR Congo", code: "cd" },
  { name: "Ecuador", code: "ec" },
  { name: "Egypt", code: "eg" },
  { name: "El Salvador", code: "sv" },
  { name: "Estonia", code: "ee" },
  { name: "Ethiopia", code: "et" },
  { name: "Fiji", code: "fj" },
  { name: "Finland", code: "fi" },
  { name: "France", code: "fr" },
  { name: "French Polynesia", code: "pf" },
  { name: "Gabon", code: "ga" },
  { name: "Gambia", code: "gm" },
  { name: "Georgia", code: "ge" },
  { name: "Germany", code: "de" },
  { name: "Ghana", code: "gh" },
  { name: "Greece", code: "gr" },
  { name: "Guatemala", code: "gt" },
  { name: "Guinea", code: "gn" },
  { name: "Haiti", code: "ht" },
  { name: "Honduras", code: "hn" },
  { name: "Hong Kong", code: "hk" },
  { name: "Hungary", code: "hu" },
  { name: "Iceland", code: "is" },
  { name: "India", code: "in" },
  { name: "Indonesia", code: "id" },
  { name: "Iraq", code: "iq" },
  { name: "Ireland", code: "ie" },
  { name: "Israel", code: "il" },
  { name: "Italy", code: "it" },
  { name: "Jamaica", code: "jm" },
  { name: "Japan", code: "jp" },
  { name: "Jordan", code: "jo" },
  { name: "Kazakhstan", code: "kz" },
  { name: "Kenya", code: "ke" },
  { name: "Kuwait", code: "kw" },
  { name: "Kyrgyzstan", code: "kg" },
  { name: "Latvia", code: "lv" },
  { name: "Lebanon", code: "lb" },
  { name: "Libya", code: "ly" },
  { name: "Lithuania", code: "lt" },
  { name: "Luxembourg", code: "lu" },
  { name: "Macau", code: "mo" },
  { name: "Macedonia", code: "mk" },
  { name: "Madagascar", code: "mg" },
  { name: "Malawi", code: "mw" },
  { name: "Malaysia", code: "my" },
  { name: "Maldives", code: "mv" },
  { name: "Mali", code: "ml" },
  { name: "Malta", code: "mt" },
  { name: "Mauritania", code: "mr" },
  { name: "Mauritius", code: "mu" },
  { name: "Mexico", code: "mx" },
  { name: "Moldova", code: "md" },
  { name: "Mongolia", code: "mn" },
  { name: "Montenegro", code: "me" },
  { name: "Morocco", code: "ma" },
  { name: "Mozambique", code: "mz" },
  { name: "Myanmar", code: "mm" },
  { name: "Namibia", code: "na" },
  { name: "Nepal", code: "np" },
  { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" },
  { name: "Nicaragua", code: "ni" },
  { name: "Niger", code: "ne" },
  { name: "Nigeria", code: "ng" },
  { name: "North Korea", code: "kp" },
  { name: "Norway", code: "no" },
  { name: "Oman", code: "om" },
  { name: "Pakistan", code: "pk" },
  { name: "Panama", code: "pa" },
  { name: "Papua New Guinea", code: "pg" },
  { name: "Paraguay", code: "py" },
  { name: "Peru", code: "pe" },
  { name: "Philippines", code: "ph" },
  { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" },
  { name: "Puerto Rico", code: "pr" },
  { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" },
  { name: "Russia", code: "ru" },
  { name: "Rwanda", code: "rw" },
  { name: "Samoa", code: "ws" },
  { name: "San Marino", code: "sm" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Senegal", code: "sn" },
  { name: "Serbia", code: "rs" },
  { name: "Singapore", code: "sg" },
  { name: "Slovakia", code: "sk" },
  { name: "Slovenia", code: "si" },
  { name: "Solomon Islands", code: "sb" },
  { name: "Somalia", code: "so" },
  { name: "South Africa", code: "za" },
  { name: "South Korea", code: "kr" },
  { name: "Spain", code: "es" },
  { name: "Sri Lanka", code: "lk" },
  { name: "Sudan", code: "sd" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "Syria", code: "sy" },
  { name: "Taiwan", code: "tw" },
  { name: "Tajikistan", code: "tj" },
  { name: "Tanzania", code: "tz" },
  { name: "Thailand", code: "th" },
  { name: "Tonga", code: "to" },
  { name: "Tunisia", code: "tn" },
  { name: "Turkey", code: "tr" },
  { name: "Turkmenistan", code: "tm" },
  { name: "Uganda", code: "ug" },
  { name: "Ukraine", code: "ua" },
  { name: "United Arab Emirates", code: "ae" },
  { name: "United Kingdom", code: "gb" },
  { name: "United States", code: "us" },
  { name: "Uruguay", code: "uy" },
  { name: "Uzbekistan", code: "uz" },
  { name: "Venezuela", code: "ve" },
  { name: "Vietnam", code: "vn" },
  { name: "Yemen", code: "ye" },
  { name: "Zambia", code: "zm" },
  { name: "Zimbabwe", code: "zw" },
];
const NewsSlider = () => {
  const [news, setNews] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showCountryPopup, setShowCountryPopup] = useState(false); // State to control the country popup
  const searchRef = useRef(null);
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${selectedCountry}&size=10`
        );
        if (response.data.status === "success" && response.data.results) {
          setNews(response.data.results);
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [selectedCountry]);
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const filteredCountries = SUPPORTED_COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchTerm)
  );
  // Function to get country flag emoji
  const getCountryFlagEmoji = (countryCode) => {
    if (!countryCode || countryCode.length !== 2) return "";
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };
  const toggleCountryPopup = () => {
    setShowCountryPopup(!showCountryPopup);
  };
  return (
    <div className="news-container">
      <div className="news-slider-container">
        <div className="country-selection">
          <button
            className="country-select-button"
            onClick={toggleCountryPopup}
          >
            {SUPPORTED_COUNTRIES.find((c) => c.code === selectedCountry)?.name}
          </button>
          {showCountryPopup && (
            <div className="country-list-popup" ref={searchRef}>
              <div className="search-header">
                <h3>Select a Country</h3>
                <button className="close-button" onClick={toggleCountryPopup}>
                  ✕
                </button>
              </div>
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="country-search"
                  autoFocus
                />
              </div>
              <div className="countries-list">
                {filteredCountries.length === 0 ? (
                  <div className="no-results">No countries found</div>
                ) : (
                  filteredCountries.map((country) => (
                    <div
                      key={country.code}
                      className="country-item"
                      onClick={() => {
                        setSelectedCountry(country.code);
                        toggleCountryPopup();
                      }}
                    >
                      <span className="country-flag">
                        {getCountryFlagEmoji(country.code)}
                      </span>
                      {country.name}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        {loading ? (
          <div className="loading">Loading news...</div>
        ) : news.length === 0 ? (
          <div className="no-news">No articles available.</div>
        ) : (
          <div className="swiper-container-wrapper">
            <Swiper
              modules={[Autoplay, Navigation, Pagination, Thumbs]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              className="main-swiper"
            >
              {news.map((article, index) => (
                <SwiperSlide key={index}>
                  <div className="news-item">
                    <div className="news-image-container">
                      <img
                        src={
                          article.image_url || "https://via.placeholder.com/300"
                        }
                        alt={article.title}
                        className="news-image"
                      />
                    </div>
                    <div className="news-content">
                      <h3 className="news-title">{article.title}</h3>
                      <p className="news-description">{article.description}</p>
                      <div className="news-meta">
                        <span className="news-source">{article.source_id}</span>
                        <span className="news-date">
                          {new Date(article.pubDate).toLocaleDateString()}
                        </span>
                      </div>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-more"
                      >
                        Read more
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Navigation, Thumbs]}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              className="thumbs-swiper"
            >
              {news.map((article, index) => (
                <SwiperSlide key={index}>
                  <div className="thumb-item">
                    <img
                      src={
                        article.image_url || "https://via.placeholder.com/150"
                      }
                      alt={article.title}
                      className="thumb-image"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};
export default NewsSlider;
