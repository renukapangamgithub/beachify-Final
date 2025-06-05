import React, { useState } from "react";
import axios from "axios";
import "./search-bar.css"; // your existing CSS

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHandler = async () => {
    if (!location.trim() || !distance.trim() || !maxGroupSize.trim()) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      // Call your backend API with `state` = location
      const response = await axios.get(
  "https://beachify-final-backend.onrender.com/api/indianbeaches/search",
  {
    params: {
      state: location.trim(),
      q: "",
    },
  }
);
      setBeaches(response.data);
    } catch (error) {
      console.error("Error fetching beaches:", error);
      alert("Failed to fetch beaches. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search__bar">
        <form
          className="search__form d-flex align-items-center"
          onSubmit={(e) => {
            e.preventDefault();
            searchHandler();
          }}
        >
          {/* Location */}
          <div className="form__group">
            <span className="icon">
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Distance */}
          <div className="form__group">
            <span className="icon">
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance km"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
          </div>

          {/* Max People */}
          <div className="form__group">
            <span className="icon">
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input
                type="number"
                placeholder="0"
                value={maxGroupSize}
                onChange={(e) => setMaxGroupSize(e.target.value)}
              />
            </div>
          </div>

          {/* Search Button */}
          <button type="submit" className="search__icon">
            <i className="ri-search-line"></i>
          </button>
        </form>
      </div>

      {/* Display loading */}
      {loading && <p>Loading beaches...</p>}

      {/* Display beaches results */}
      {/* ... */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {beaches.length === 0 && !loading && <p>No beaches found yet.</p>}
        {beaches.slice(0, 2).map((beach) => (
          <div
            key={beach.id}
            style={{
              flex: "0 1 45%", // take up about 45% width, shrink and grow disabled
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          >
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              {beach.name}
            </h3>
            <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              Latitude: {beach.lat}, Longitude: {beach.lon}
            </p>
            {beach.image && (
              <img
                src={beach.image}
                alt={beach.name}
                style={{
                  width: "90%",
                  borderRadius: "8px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
