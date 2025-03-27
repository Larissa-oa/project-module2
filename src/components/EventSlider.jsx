import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./EventSlider.css";
import onlineevent from "../images/on.jpg";
import inpersonevent from "../images/person.jpg";
import noEventsPlaceholder from "../images/no-events-placeholder.png";

const EventSlider = ({ upcomingEvents = [] }) => {
  // If no events, create a placeholder event
  const displayEvents =
    upcomingEvents && upcomingEvents.length > 0
      ? upcomingEvents
      : [
          {
            id: "no-events",
            title: "No Upcoming Events Currently",
            description: "Check back later for exciting new events!",
            image: noEventsPlaceholder,
          },
        ];

  return (
    <div className="event-slider">
      <Swiper
        modules={[Autoplay, A11y]}
        direction="vertical"
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        grabCursor={true}
      >
        {displayEvents.map((event) => (
          <SwiperSlide key={event.id}>
            <div
              className={`slider-slide ${
                event.id === "no-events" ? "no-events" : ""
              }`}
            >
              {event.id === "no-events" ? (
                <img
                  src={noEventsPlaceholder}
                  alt="No upcoming events"
                  className="no-events-image"
                />
              ) : (
                <div className="slider-content">
                  <div className="slider-image-container">
                    <img
                      src={
                        event.image
                          ? event.image
                          : event.location === "Online"
                          ? onlineevent
                          : inpersonevent
                      }
                      alt={event.title}
                      className="slider-image"
                    />
                  </div>
                  <div className="slider-text-container">
                    <h2>{event.title}</h2>
                    <p className="slider-description">{event.description}</p>
                    <div className="event-details">
                      <div className="event-detail-item">
                        <strong>Date:</strong> {event.date}
                      </div>
                      <div className="event-detail-item">
                        <strong>Time:</strong> {event.time}
                      </div>
                      {event.location !== "Online" && (
                        <div className="event-detail-item">
                          <strong>Location:</strong> {event.city},{" "}
                          {event.address}
                        </div>
                      )}
                      {event.location === "Online" && event.link && (
                        <div className="event-detail-item">
                          <strong>Event Link:</strong>
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join Event
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;
