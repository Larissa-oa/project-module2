import React, { useState, useEffect, useRef } from "react";
import "./WorldCalendar.css";

const WorldCalendar = () => {
  const [weeklyHolidays, setWeeklyHolidays] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countriesMap, setCountriesMap] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryHolidays, setCountryHolidays] = useState([]);
  const [showCountryPopup, setShowCountryPopup] = useState(false);
  const [showCountrySearch, setShowCountrySearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    fetchAvailableCountries().then(() => {
      fetchWeeklyHolidays();
    });

    // Close search popup when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowCountrySearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchCountryHolidays(selectedCountry.countryCode);
    }
  }, [selectedCountry]);

  const fetchWeeklyHolidays = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://date.nager.at/api/v3/NextPublicHolidaysWorldwide"
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Filter holidays for the current week only
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const thisWeekHolidays = data.filter((holiday) => {
        const holidayDate = new Date(holiday.date);
        holidayDate.setHours(0, 0, 0, 0);
        return holidayDate >= today && holidayDate < nextWeek;
      });

      setWeeklyHolidays(thisWeekHolidays);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weekly holidays:", err);
      setError("Failed to fetch weekly holidays. Please try again later.");
      setLoading(false);
    }
  };

  const fetchAvailableCountries = async () => {
    try {
      const response = await fetch(
        "https://date.nager.at/api/v3/AvailableCountries"
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      const sortedCountries = data.sort((a, b) => a.name.localeCompare(b.name));

      const countryCodeMap = {};
      sortedCountries.forEach((country) => {
        countryCodeMap[country.countryCode] = country.name;
      });

      setCountries(sortedCountries);
      setCountriesMap(countryCodeMap);
    } catch (err) {
      console.error("Error fetching countries:", err);
      setError("Failed to fetch available countries. Please try again later.");
    }
  };

  const fetchCountryHolidays = async (countryCode) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setCountryHolidays(data);
      setShowCountryPopup(true);
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching holidays for ${countryCode}:`, err);
      setError(
        `Failed to fetch holidays for the selected country. Please try again later.`
      );
      setLoading(false);
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountrySearch(false);
  };

  const closeCountryPopup = () => {
    setShowCountryPopup(false);
    setSelectedCountry(null);
  };

  const toggleCountrySearch = () => {
    setShowCountrySearch(!showCountrySearch);
    setSearchTerm("");
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCountryFlagEmoji = (countryCode) => {
    // Convert country code to regional indicator symbols
    // Each letter is represented by a regional indicator symbol emoji, which is 127397 emoji points after the ASCII value
    if (!countryCode || countryCode.length !== 2) return "";

    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());

    return String.fromCodePoint(...codePoints);
  };

  const getCountryNameFromCode = (countryCode) => {
    return countriesMap[countryCode] || countryCode;
  };

  const groupHolidaysByDate = (holidays) => {
    const grouped = {};

    holidays.forEach((holiday) => {
      const date = holiday.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(holiday);
    });

    // Sort dates
    return Object.entries(grouped)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .map(([date, holidays]) => ({
        date,
        holidays,
      }));
  };

  // Group and sort holidays to ensure today's holidays come first
  const getGroupedHolidays = () => {
    const grouped = groupHolidaysByDate(weeklyHolidays);

    // Find today's date in ISO format
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString().split("T")[0];

    // Move today's holidays to the top if they exist
    const todayGroup = grouped.find((group) => group.date === todayISO);

    if (todayGroup) {
      const otherGroups = grouped.filter((group) => group.date !== todayISO);
      return [todayGroup, ...otherGroups];
    }

    return grouped;
  };

  return (
    <>
      <div className="world-calendar-container">
        <h1 className="main-title">World Holiday Calendar</h1>

        {/* Weekly Calendar */}
        <div className="weekly-calendar">
          <h2>The Wold Calendar</h2>
          <div className="weekly-holidays-scrollable">
            {loading && weeklyHolidays.length === 0 ? (
              <div className="loading">Loading weekly holidays...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : weeklyHolidays.length === 0 ? (
              <div className="no-holidays">No holidays found this week</div>
            ) : (
              <div className="holiday-list">
                {getGroupedHolidays().map((group, groupIndex) => (
                  <div key={groupIndex} className="holiday-group">
                    <h3>{formatDate(group.date)}</h3>
                    <ul>
                      {group.holidays.map((holiday, holidayIndex) => (
                        <li key={holidayIndex}>
                          <div className="holiday-name">{holiday.name}</div>
                          <div className="holiday-local-name">
                            {holiday.localName &&
                              holiday.localName !== holiday.name &&
                              `${holiday.localName}`}
                          </div>
                          <div className="holiday-country">
                            <span className="country-flag">
                              {getCountryFlagEmoji(holiday.countryCode)}
                            </span>
                            {getCountryNameFromCode(holiday.countryCode)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Country Search Button */}
        <div className="country-search-container">
          <button className="search-button" onClick={toggleCountrySearch}>
            Search Holidays by Country
          </button>

          {/* Country Search Popup */}
          {showCountrySearch && (
            <div className="search-popup" ref={searchRef}>
              <div className="search-header">
                <h3>Select a Country</h3>
                <button className="close-button" onClick={toggleCountrySearch}>
                  ✕
                </button>
              </div>
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="country-search"
                  autoFocus
                />
              </div>
              <div className="countries-list">
                {countries.length === 0 ? (
                  <div className="loading">Loading countries...</div>
                ) : filteredCountries.length === 0 ? (
                  <div className="no-results">No countries found</div>
                ) : (
                  filteredCountries.map((country) => (
                    <div
                      key={country.countryCode}
                      className="country-item"
                      onClick={() => handleCountrySelect(country)}
                    >
                      <span className="country-flag">
                        {getCountryFlagEmoji(country.countryCode)}
                      </span>
                      {country.name}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Country Holidays Popup */}
      {showCountryPopup && selectedCountry && (
        <div className="country-popup-overlay" onClick={closeCountryPopup}>
          <div className="country-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>
                <span className="country-flag">
                  {getCountryFlagEmoji(selectedCountry.countryCode)}
                </span>
                Holidays in {selectedCountry.name}
              </h2>
              <button className="close-button" onClick={closeCountryPopup}>
                ✕
              </button>
            </div>

            <div className="popup-content">
              {loading ? (
                <div className="loading">
                  Loading holidays for {selectedCountry.name}...
                </div>
              ) : countryHolidays.length === 0 ? (
                <div className="no-holidays">
                  No upcoming holidays found for {selectedCountry.name}
                </div>
              ) : (
                <div className="country-holiday-list">
                  {groupHolidaysByDate(countryHolidays).map(
                    (group, groupIndex) => (
                      <div key={groupIndex} className="holiday-group">
                        <h3>{formatDate(group.date)}</h3>
                        <ul>
                          {group.holidays.map((holiday, holidayIndex) => (
                            <li key={holidayIndex}>
                              <div className="holiday-name">{holiday.name}</div>
                              {holiday.localName &&
                                holiday.localName !== holiday.name && (
                                  <div className="holiday-local-name">
                                    {holiday.localName}
                                  </div>
                                )}
                              <div className="holiday-type">
                                {holiday.types && holiday.types.join(", ")}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorldCalendar;
