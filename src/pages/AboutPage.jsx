import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';
import aboutusimage from "../images/image-aboutus.png"

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header Section with Profile Images */}
      <header className="about-header">
        <h1>Welcome to Our Community!</h1>
        <p>Join us in creating a better world, one event at a time.</p>
        <div className="profile-images">
          <img src={aboutusimage} alt="Vassilis and Larissa" className="profile-img" />
        </div>
      </header>

      {/* About Section */}
      <section className="about">
        <h2>About Our App</h2>
        <p>
          Our community-driven social hub is designed to bring people from all around the world together. 
          We host exciting events, discussions, and experiences that aim to create positive change. 
          Join us and connect with like-minded individuals who share the vision of making the world a better place, 
          one interaction at a time.
        </p>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="team-member">
          <h3>Vassilis</h3>
          <p>
            A creative visionary from Greece, Vassilis brings a wealth of experience in building impactful 
            digital solutions. He’s passionate about harnessing technology to create meaningful connections and 
            positive social change. Vassilis believes in the power of creativity to inspire and drive innovation.
          </p>
        </div>
        <div className="team-member">
          <h3>LARISSA</h3>
          <p>
            Originally from Brazil, Larissa is a dynamic and driven entrepreneur with a flair for design and 
            community-building. Having lived abroad as an expat, she understands the power of diverse perspectives 
            and strives to create platforms where everyone can feel seen and heard. Larissa is all about inclusivity 
            and bringing people together.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
