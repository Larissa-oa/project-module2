import React from "react";
import "./HomePage.css";
import RadioPlayer from "../components/RadioPlayer";
import ProverbCube from "../components/ProverbCube";

const HomePage = () => {
  return (
    <>
      <main className="homepage">
        <div className="content-brand">
          <h1>App Name</h1>
        </div>
        {/* DIV1 */}
        <div className="div1"></div>

        {/* DIV2 */}
        <div className="div2"></div>

        {/* DIV3 */}
        <div className="div3"></div>

        {/* DIV4 */}
        <div className="div4 radioplayer">
          <RadioPlayer />
        </div>

        {/* DIV5 */}
        <div className="div5 proverb-cube">
          <ProverbCube />
        </div>
      </main>
    </>
  );
};

export default HomePage;
