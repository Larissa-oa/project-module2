import React from "react";
import "./HomePage.css";
import community from "../images/community.png";
import RadioPlayer from "../components/RadioPlayer";
import ProverbCube from "../components/ProverbCube";
import NewsSlider from "../components/NewsSlider";
import CustomsCube from "../components/CustomsCube";
import WorldCalendar from "../components/WorldCalendar";

const HomePage = () => {
  return (
    <>
      <main className="homepage">
        <div className="content-brand">
          <h1>App Name</h1>
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
          <h2 className="customs-header">Local Customs</h2>
          <CustomsCube />
          <h2 className="proverbs-header">Proverbs</h2>
          <ProverbCube />
        </div>

        {/* DIV4 */}
        <div className="div4 radio-player">
          <RadioPlayer />
        </div>

        {/* DIV5 */}
        <div className="div5"></div>
      </main>
    </>
  );
};

export default HomePage;
