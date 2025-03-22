import React from 'react';
import { Link } from 'react-router-dom';
import './SocialPage.css';
import event from '../images/social.png';

const SocialPage = () => {
  return (
    <div className="social-page">
      <div className="container">
        {/* Page Introduction */}
        <div className="intro-section">
          <h1>Let's go Social!</h1>
          <p>
            Ready to make the world a little smaller (and way cooler)?
            Create and join events with awesome people from everywhere – because who says we can't connect over a virtual book club, a cup of coffee, or a language exchange? Let's make the world better, one meetUp at a time!
          </p>
        </div>

        {/* Event Creation Section */}
        <div className="event-options">
          <div className="event-card online">
            <h2>Online Meetings</h2>
            <p>blablabla</p>
            <button className="event-btn">Create Online Event</button>
          </div>

          <div className="event-card in-person">
            <h2>In-Person Meetups</h2>
            <p>blablabla</p>
            <button className="event-btn">Create In-Person Event</button>
          </div>
        </div>

        {/* Button to Open Events Page */}
        <div className="explore-events">
          <h2>Ready to Join?</h2>
          <Link to="/open-events" className="explore-btn">Explore Open Events</Link>
        </div>

        {/* Image Section */}
        <div className="image-section">
          <img src={event} alt="Social Event" className="rotating-image" />
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
