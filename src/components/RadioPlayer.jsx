import React, { useState, useEffect } from "react";
import "./RadioPlayer.css";

const RadioPlayer = () => {
  const [countries, setCountries] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStation, setSelectedStation] = useState(null);
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStationsPopup, setShowStationsPopup] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    fetch("https://nl1.api.radio-browser.info/json/countries")
      .then((res) => res.json())
      .then((data) => {
        const sortedCountries = data
          .map((c) => ({ code: c.iso_3166_1, name: c.name }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sortedCountries);
      });
  }, []);

  const loadStations = (countryCode) => {
    setSelectedCountry(countryCode);
    fetch(
      `https://nl1.api.radio-browser.info/json/stations/bycountrycodeexact/${countryCode}?limit=10&order=clickcount&reverse=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        setShowStationsPopup(true);
      });
  };

  const playStation = (station) => {
    setSelectedStation(station);
    setShowStationsPopup(false);
    setIsExpanded(false); // Close the country popup when a station is selected
    if (station && station.url_resolved) {
      audioRef.current.src = station.url_resolved;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Autoplay blocked:", err));
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current.src && selectedStation) {
      playStation(selectedStation);
    } else if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const loadRandomStation = () => {
    if (countries.length > 0) {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)].code;
      fetch(
        `https://nl1.api.radio-browser.info/json/stations/bycountrycodeexact/${randomCountry}?limit=10&order=clickcount&reverse=true`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            playStation(data[Math.floor(Math.random() * data.length)]);
            setSelectedCountry(randomCountry);
          }
        });
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", loadRandomStation, { once: true });
    document.addEventListener("click", loadRandomStation, { once: true });

    return () => {
      document.removeEventListener("mousemove", loadRandomStation);
      document.removeEventListener("click", loadRandomStation);
    };
  }, [countries]);

  return (
    <div className="radio-container">
      {!isExpanded ? (
        <div className="radio-default">
          <h2>World Radio</h2>
          <p className="station-info">
            🌍{" "}
            {selectedCountry
              ? countries.find((c) => c.code === selectedCountry).name
              : "No country selected"}{" "}
            - 🎵{" "}
            {selectedStation ? selectedStation.name : "No station selected"}
          </p>

          {/* Play/Pause Button */}
          <button className="play-button" onClick={togglePlayPause}>
            {isPlaying ? "⏸" : "▶️"}
          </button>

          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={changeVolume}
            className="volume-slider"
          />

          {/* Expand Country Selector */}
          <button className="expand-button" onClick={() => setIsExpanded(true)}>
            🌍 Click to listen to the world!
          </button>

          {/* Random Station Button */}
          <button className="random-button" onClick={loadRandomStation}>
            🎲 Random Station
          </button>
        </div>
      ) : (
        <div className="radio-expanded">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search country..."
            className="search-box"
          />
          <select
            className="country-list"
            onChange={(e) => loadStations(e.target.value)}
            size={10}
          >
            {countries
              .filter((c) =>
                c.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
          </select>
          <button className="close-button" onClick={() => setIsExpanded(false)}>
            ❌
          </button>
        </div>
      )}

      {/* Station Selection Popup */}
      {showStationsPopup && (
        <div className="station-popup">
          <h3>Select a station</h3>
          <button
            className="close-popup-button"
            onClick={() => setShowStationsPopup(false)}
          >
            ❌
          </button>
          {stations.map((station) => (
            <div
              key={station.stationuuid}
              className="station-item"
              onClick={() => playStation(station)}
            >
              <img
                src={
                  station.favicon
                    ? station.favicon
                    : "https://via.placeholder.com/60x60?text=🎵"
                }
                alt={station.name}
                className="station-logo"
              />
              <p>{station.name}</p>
            </div>
          ))}
        </div>
      )}

      <audio ref={audioRef}></audio>
    </div>
  );
};

export default RadioPlayer;
