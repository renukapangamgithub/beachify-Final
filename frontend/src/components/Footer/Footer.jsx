import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="beachify-footer">
      <div className="footer-container">
        {/* Logo & Description */}
        <div className="footer-section">
          <h2 className="footer-logo">Beachify 🌊</h2>
          <p>Discover the best beaches, hidden gems, and breathtaking coastal experiences with Beachify.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Beaches</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@beachify.com</p>
          <p>Phone: +91 73040 38496</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 Beachify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
