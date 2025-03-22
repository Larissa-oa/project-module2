import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import gitlogo from "../images/github.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; 2025 GatherUP - bringing people together. All rights
            reserved.
          </p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a> | <a href="#">Contact Us</a>
            <a href="#">
              <img src={gitlogo} id="github-logo" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
