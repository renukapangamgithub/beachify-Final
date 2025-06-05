import React from "react";
import "./SportDetail.css";

const SportDetail = ({ sport, onBack }) => {
  return (
    <div className="sport-detail-container">
      
      {/* Left Side - Text Content */}
      <div className="sport-content">
        <h2 className="sport-title">{sport.icon} {sport.name}</h2>
        <p className="sport-description">{sport.description}</p>
        <p className="sport-location"><strong>📍 Location:</strong> {sport.location}</p>

        <h3 className="sport-tips-title">💡 Tips for {sport.name}</h3>
        <ul className="sport-tips-list">
          {sport.tips.map((tip, index) => (
            <li key={index} className="sport-tip">✅ {tip}</li>
          ))}
        </ul>

        {/* Back Button */}
        <button className="back-button" onClick={onBack}>⬅ Go Back</button>
      </div>

      {/* Right Side - Image */}
      <div className="sport-image-container">
        <img src={sport.image} alt={sport.name} className="sport-detail-image" />
      </div>

    </div>
  );
};

export default SportDetail;
