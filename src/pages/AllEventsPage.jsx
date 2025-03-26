import React from "react";
import "./AllEventsPage.css";
import onlineevent from "../images/onlineevent.png";
import inpersonevent from "../images/inperson.png";

const AllEventsPage = ({ events }) => {
  return (
    <div className="all-events-container">
      <h1>See What's Going On!</h1>
      <div className="all-events-page-events-list">
        {events.length === 0 ? (
          <p>No events available yet. Create one! Let's get together!</p>
        ) : (
          events.map((event) => {
            const eventTypeClass =
              event.location === "Online" ? "option1" : "option2";

            return (
              <div key={event.id} className={`event-card ${eventTypeClass}`}>
                <img
                  src={
                    event.location === "Online" ? onlineevent : inpersonevent
                  }
                  alt={event.title}
                />
                <h3>{event.title}</h3>
                <div className="event-when">
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  <p>Timezone: {event.timezone}</p>
                </div>
                <div className="event-where">
                  {event.location !== "Online" && (
                    <p>
                      Location: {event.city}, {event.address}
                    </p>
                  )}
                  <p>Type: {event.location}</p>
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
                <p>{event.description}</p>
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
