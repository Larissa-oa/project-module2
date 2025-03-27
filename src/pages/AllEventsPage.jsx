import React, { useState } from "react";
import "./AllEventsPage.css";
import onlineevent from "../images/on.jpg";
import inpersonevent from "../images/person.jpg"
import share from "../images/share.png"
import countmein from "../images/iwillgo.png"
import eventsintroimg from "../images/eventvideo2.mp4"

const AllEventsPage = ({ events, favEvents, addToFavourites, removeFavourite }) => {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavouriteToggle = (eventId) => {
    const isFavourite = favEvents.some((e) => e.id === eventId);
    if (isFavourite) {
      removeFavourite(eventId); 
    } else {
      addToFavourites(eventId); 
    }
  };

  return (
    <div className="all-events-container">
      <div className="header-container">
    <h1 className="h1-all-events-page">See What's Going On!</h1>
    <h3 className="p-all-events">We are here to make the world a little smaller. <br />Find your next <b>online</b> or <b>in-person</b> event.</h3>
    </div>
    <div className="event-intro-video" >
        <video autoPlay muted loop width="100%">
          <source src={eventsintroimg} type="video/mp4" />
         Your browser does not support the video tag.
        </video>
      </div>
<div className="video-overlay"></div>
<hr />
<div>
      <label>
      <p className="p-label-all-events">Search the perfect event for you:</p>
      <input
        type="text"
        placeholder="Search events"
        onChange={(event) => setSearchTerm(event.target.value)}
        value={searchTerm}
      />
    </label>
      </div>
<div className="all-events-page-events-list">
  {filteredEvents.length === 0 ? (
    <p>No events available matching your search. Create one! Let's get together!</p>
  ) : (
    filteredEvents.map((event) => {
      const eventTypeClass =
        event.location === "Online" ? "option1" : "option2";
      const isFavourite = favEvents.some((e) => e.id === event.id);

      return (
        <div key={event.id} className={`event-card ${eventTypeClass}`}>
          <img
            src={event.image ? event.image : (event.location === "Online" ? onlineevent : inpersonevent)}
            alt={event.title} className="card-image-event"
          />
          <div>
            <h3>{event.title}</h3>
          </div>
          <div className="event-when">
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p className="timezone-event">Timezone: {event.timezone}</p>
          </div>
          <div className="event-where">
            {event.location !== "Online" && (
              <p>
                Location: {event.city}, {event.address}
              </p>
            )}
            <p>Type: {event.location}</p>
          </div>
          <div>
            {event.location === "Online" && event.link && (
              <p>
                Event Link:{" "}
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join here
                </a>
              </p>
            )}
          </div>
          <div className="description-event">
            <p>{event.description}</p>
          </div>
          <div className="button-events-like-share">
            <button
              className={`countmein-event-btn ${isFavourite ? 'favourited' : ''}`}
              onClick={() => handleFavouriteToggle(event.id)}
            >
              <img src={countmein} alt="Count me in" />
              {isFavourite ? 'Count me in!' : ''}
            </button>
            <button className="share-event-btn">
              <img src={share} alt="Share event" />
            </button>
          </div>
        </div>
      );
    })
  )}
</div>
</div>

  );
};

export default AllEventsPage;

