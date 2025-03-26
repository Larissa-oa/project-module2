import React, { useState } from "react";
import "./AllEventsPage.css";
import onlineevent from "../images/on.jpg";
import inpersonevent from "../images/person.jpg"

const AllEventsPage = ({ events }) => {

  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
  event.city.toLowerCase().includes(searchTerm.toLowerCase())
  
  );

  return (
    <div className="all-events-container">
      <h1>See What's Going On!</h1>

      
      <label>
        Search the perfect event for you:
        <input
          type="text"
          placeholder="Search events"
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
        />
      </label>

     
      <div className="all-events-page-events-list">
        {filteredEvents.length === 0 ? (
          <p>No events available matching your search. Create one! Let's get together!</p>
        ) : (
          filteredEvents.map((event) => {
            const eventTypeClass =
              event.location === "Online" ? "option1" : "option2";

            return (
              <div key={event.id} className={`event-card ${eventTypeClass}`}>
                <img
                  src={event.location === "Online" ? onlineevent : inpersonevent}
                  alt={event.title}
                />
                <h3>{event.title}</h3>
                <div className="event-when">
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  
                </div>
                <div className="event-where">
                  {event.location !== "Online" && (
                    <p>
                      Location: {event.city}, {event.address}
                    </p>
                  )}
                  <p>Type: {event.location}</p>
                  <p className="timezone-event">Timezone: {event.timezone}</p>
                </div>
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
                <div className="description-event">
                <p>{event.description}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

   
      <div className="btn-container-all-events">
        <button className="go-back-events">
          Go back to Creating more events.
        </button>
        <button className="past-events-btn">
          Get inspired! See past events
        </button>
      </div>
    </div>
  );
};

export default AllEventsPage;

