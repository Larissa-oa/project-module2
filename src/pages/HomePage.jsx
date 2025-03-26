import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

import RadioPlayer from "../components/RadioPlayer";
import ProverbCube from "../components/ProverbCube";
import NewsSlider from "../components/NewsSlider";
import CustomsCube from "../components/CustomsCube";
import WorldCalendar from "../components/WorldCalendar";
import Welcome from "../components/Welcome";

const HomePage = () => {
  return (
    <>
      <main className="homepage">
        <div className="content-brand">
          <h1>App Name</h1>
          <div className="welcome">
            <Welcome />
          </div>
        </div>
        {/* DIV1 */}
        <div className="div1">
          <WorldCalendar />
        </div>

        {/* DIV2 */}
        <div className="div2 news-slider">
          <NewsSlider />
        </div>

        {/* DIV3 */}
        <div className="div3 customs-and-proverbs">
          <CustomsCube />
          <ProverbCube />
        </div>

        {/* DIV4 */}
        <div className="div4 radio-player">
          <RadioPlayer />
        </div>

        {/* DIV5 */}
        <div className="div5">
          <div className="social-links">
            <Link to="/socialpage" className="social-page-link">
              Social Page
            </Link>
            <Link to="/allevents" className="all-events-link">
              All Events Page
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
