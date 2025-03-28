import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import notFoundImage from "../images/not-found-page.jpeg";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <img
          src={notFoundImage}
          alt="404 Error Illustration"
          className="not-found-image"
        />
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-text">
          We have the whole world on here and you still managed to get lost! Try
          another page!
        </p>

        <Link to="/" className="home-button">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
