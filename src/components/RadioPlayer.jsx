import React, { useState, useEffect, useRef } from "react";
import "./RadioPlayer.css";

const RadioPlayer = () => {
  const [countries, setCountries] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStationsPopup, setShowStationsPopup] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentServer, setCurrentServer] = useState(null);
  const [availableServers, setAvailableServers] = useState([]);
  const [serverRetryCount, setServerRetryCount] = useState(0);
  const searchRef = useRef(null);
  const audioRef = React.useRef(null);

  // Server discovery and rotation functions (previous implementation)
  const getRadioBrowserBaseUrls = async () => {
    try {
      const response = await fetch(
        "http://all.api.radio-browser.info/json/servers"
      );
      const servers = await response.json();
      return servers.map((x) => `https://${x.name}`);
    } catch (error) {
      console.error("Failed to fetch server list:", error);
      return [];
    }
  };

  const getRadioBrowserServerConfig = async (baseUrl) => {
    try {
      const response = await fetch(`${baseUrl}/json/config`);
      return await response.json();
    } catch (error) {
      console.error(`Failed to get config for ${baseUrl}:`, error);
      return null;
    }
  };

  // Country flag emoji helper function
  const getCountryFlagEmoji = (countryCode) => {
    if (!countryCode || countryCode.length !== 2) return "";

    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());

    return String.fromCodePoint(...codePoints);
  };

  // Initial setup
  useEffect(() => {
    const setupRadioPlayer = async () => {
      const servers = await getRadioBrowserBaseUrls();
      setAvailableServers(servers);

      // Try to find a working server
      for (const server of servers) {
        const config = await getRadioBrowserServerConfig(server);
        if (config) {
          setCurrentServer(server);

          // Fetch countries
          try {
            const response = await fetch(`${server}/json/countries`);
            const data = await response.json();
            const sortedCountries = data
              .map((c) => ({ code: c.iso_3166_1, name: c.name }))
              .sort((a, b) => a.name.localeCompare(b.name));
            setCountries(sortedCountries);
            break;
          } catch (error) {
            console.error("Failed to fetch countries:", error);
          }
        }
      }
    };

    setupRadioPlayer();

    // Close search popup when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load stations for a specific country
  const loadStations = async (countryCode) => {
    if (!currentServer) return;

    try {
      const response = await fetch(
        `${currentServer}/json/stations/bycountrycodeexact/${countryCode}?limit=10&order=clickcount&reverse=true`
      );
      const data = await response.json();
      setStations(data);
      setShowStationsPopup(true);
      setSelectedCountry(countries.find((c) => c.code === countryCode));
      setIsExpanded(false);
    } catch (error) {
      console.error("Failed to load stations:", error);
    }
  };

  // Play station functionality
  const playStation = (station) => {
    setSelectedStation(station);
    setShowStationsPopup(false);
    if (station && station.url_resolved) {
      audioRef.current.src = station.url_resolved;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Autoplay blocked:", err));
    }
  };

  // Toggle play/pause
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

  // Volume control
  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Load random station
  const loadRandomStation = async () => {
    if (countries.length > 0 && currentServer) {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)].code;
      try {
        const response = await fetch(
          `${currentServer}/json/stations/bycountrycodeexact/${randomCountry}?limit=10&order=clickcount&reverse=true`
        );
        const data = await response.json();
        if (data.length > 0) {
          playStation(data[Math.floor(Math.random() * data.length)]);
          setSelectedCountry(countries.find((c) => c.code === randomCountry));
        }
      } catch (error) {
        console.error("Failed to load random station:", error);
      }
    }
  };

  return (
    <div className="radio-container">
      {/* Radio Player Default View */}
      <div className="radio-default">
        <h2>World Radio</h2>
        <p className="station-info">
          🌍{" "}
          {selectedCountry
            ? `${getCountryFlagEmoji(selectedCountry.code)} ${
                selectedCountry.name
              }`
            : "No country selected"}{" "}
          - 🎵 {selectedStation ? selectedStation.name : "No station selected"}
        </p>

        {/* Play/Pause Button */}
        <button className="play-button" onClick={togglePlayPause}>
          {isPlaying ? "⏸️" : "▶️"}
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

      {/* Country Search Popup */}
      {isExpanded && (
        <div className="search-popup" ref={searchRef}>
          <div className="search-header">
            <h3>Select a Country</h3>
            <button
              className="close-button"
              onClick={() => setIsExpanded(false)}
            >
              ✕
            </button>
          </div>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="country-search"
              autoFocus
            />
          </div>
          <div className="countries-list">
            {countries.length === 0 ? (
              <div className="loading">Loading countries...</div>
            ) : countries.filter((country) =>
                country.name.toLowerCase().includes(search.toLowerCase())
              ).length === 0 ? (
              <div className="no-results">No countries found</div>
            ) : (
              countries
                .filter((country) =>
                  country.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((country) => (
                  <div
                    key={country.code}
                    className="country-item"
                    onClick={() => loadStations(country.code)}
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

      {/* Station Selection Popup */}
      {showStationsPopup && (
        <div
          className="country-popup-overlay"
          onClick={() => setShowStationsPopup(false)}
        >
          <div className="country-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>
                <span className="country-flag">
                  {getCountryFlagEmoji(selectedCountry.code)}
                </span>
                Stations in {selectedCountry.name}
              </h2>
              <button
                className="close-button"
                onClick={() => setShowStationsPopup(false)}
              >
                ✕
              </button>
            </div>

            <div className="popup-content">
              {stations.length === 0 ? (
                <div className="no-stations">No stations found</div>
              ) : (
                <div className="station-list">
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
                            : "https://placehold.co/60x60?text=🎵"
                        }
                        alt={station.name}
                        className="station-logo"
                      />
                      <div className="station-details">
                        <p className="station-name">{station.name}</p>
                        {station.tags && (
                          <p className="station-tags">{station.tags}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef}></audio>
    </div>
  );
};

export default RadioPlayer;
