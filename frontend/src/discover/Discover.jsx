import React from "react";
import { useNavigate } from "react-router-dom";
import "./Discover.css";
import heroImage from "../assets/images/dicover.jpg";

const Discover = () => {
  const navigate = useNavigate();

  return (
    <section className="discover" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="discover__overlay">
        <div className="discover__content">
          <p className="discover__subtitle">Discover</p>
          <h1 className="discover__title">The Beachify Islands</h1>
          <button className="discover__button" onClick={() => navigate("/more-info")}>
            More Information
          </button>
        </div>
      </div>
    </section>
  );
};

export default Discover;
