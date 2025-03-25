import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SocialPage.css";
import event from "../images/social.png";
import EventForm from "../components/EventForm"; 

const SocialPage = ({addEvent }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventType, setEventType] = useState(""); 
  
  const openModal = (type) => {
    setEventType(type); 
    setIsModalOpen(true); 
  };

  
  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="social-page">
      <div className="container">
       
        <div className="intro-section">
          <h1>Let's go Social!</h1>
          <p>
            Ready to make the world a little smaller (and way cooler)? Create
            and join events with awesome people from everywhere – because who
            says we can't connect over a virtual book club, a cup of coffee, or
            a language exchange? Let's make the world better, one meetUp at a
            time!
          </p>
        </div>

       
        <div className="event-options">
          <div className="event-card-online">
            <h2>Online Meetings</h2>
            <button className="event-btn" onClick={() => openModal("Online")}>
              Create Online Event
            </button>
          </div>

          <div className="event-card-in-person">
            <h2>In-Person Meetups</h2>
            <button className="event-btn" onClick={() => openModal("In-Person")}>
              Create In-Person Event
            </button>
          </div>
        </div>

       
        <div className="explore-events">
          <h2>Ready to Join?</h2>
          <Link to="/allevents" className="explore-btn">
            Explore Open Events
          </Link>
        </div>

       
        <div className="image-section">
          <img src={event} alt="Social Event" className="rotating-image" />
        </div>

      
        {isModalOpen && (
          <div className="overlay">
            <div className="form-content">
             
              <button className="close-btn" onClick={closeModal}>
                X
              </button>

             
              <EventForm 
                eventType={eventType} 
                addEvent={addEvent} 
                closeForm={closeModal} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialPage;
