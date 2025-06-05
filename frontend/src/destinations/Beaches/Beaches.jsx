import React, { useState, useEffect } from "react";

const API_BASE = "https://beachify-final-backend.onrender.com/api/indianbeaches/search";

function Beaches() {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("Goa");
  const [beaches, setBeaches] = useState([]);
  const [filteredBeaches, setFilteredBeaches] = useState([]);
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBeaches = async () => {
      if (!selectedState) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${API_BASE}?q=${encodeURIComponent(query)}&state=${encodeURIComponent(selectedState)}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setBeaches(data);
        setFilteredBeaches(data);
      } catch (err) {
        console.error("Error fetching beaches:", err);
        setError("Failed to load beaches. Please try again.");
        setBeaches([]);
        setFilteredBeaches([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBeaches();
  }, [query, selectedState]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        () => {
          alert("Could not get your location.");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedBeach && userLocation) {
      const dist = getDistanceFromLatLonInKm(
        userLocation.lat,
        userLocation.lon,
        selectedBeach.lat,
        selectedBeach.lon
      );
      setDistance(dist.toFixed(2));
    } else {
      setDistance(null);
    }
  }, [selectedBeach, userLocation]);

  return (
    <main style={{ maxWidth: 900, margin: "100px auto 20px", padding: 20, fontFamily: "Arial" }}>
      <header>
        <h1 style={{ textAlign: "center", color: "#007BFF" }}>Indian Beaches Explorer</h1>
      </header>

      {/* --- Search Filters --- */}
      <section>
        <h2>Search Beaches</h2>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 10,
          }}
        >
          {[
            "Goa",
            "Kerala",
            "Maharashtra",
            "Tamil Nadu",
            "Andhra Pradesh",
            "Odisha",
            "Gujarat",
            "West Bengal",
          ].map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Search beaches..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 20,
          }}
        />
      </section>

      {/* --- Beaches Grid --- */}
      <section>
        {loading && <p style={{ color: "#007BFF" }}>Loading beaches...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && filteredBeaches.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {filteredBeaches.map((beach) => (
              <article
                key={beach.id}
                onClick={() => setSelectedBeach(beach)}
                style={{
                  cursor: "pointer",
                  border: selectedBeach?.id === beach.id ? "2px solid #007BFF" : "1px solid #ccc",
                  borderRadius: 6,
                  padding: 10,
                  width: 200,
                  textAlign: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                }}
              >
                <img
                  src={beach.image || "https://via.placeholder.com/200x120?text=No+Image"}
                  alt={beach.name || "Unnamed Beach"}
                  style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 4 }}
                />
                <h3 style={{ marginTop: 8 }}>{beach.name || "Unnamed Beach"}</h3>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && filteredBeaches.length === 0 && (
          <p>
            No beaches found for "<strong>{query}</strong>" in <strong>{selectedState}</strong>.
          </p>
        )}
      </section>

      {/* --- Beach Details --- */}
      {selectedBeach && (
        <section style={{ marginTop: 40 }}>
          <h2>{selectedBeach.name || "Unnamed Beach"}</h2>
          <img
            src={selectedBeach.image || "https://via.placeholder.com/800x400?text=No+Image"}
            alt={selectedBeach.name || "Unnamed Beach"}
            style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 6 }}
          />
          <p style={{ marginTop: 12 }}>{selectedBeach.description || "No description available."}</p>
          <p>
            <strong>Location:</strong> Latitude {selectedBeach.lat}, Longitude {selectedBeach.lon}
          </p>
          {distance && (
            <p>
              <strong>Distance from your location:</strong> {distance} km
            </p>
          )}
          <MapComponent beachLocation={{ lat: selectedBeach.lat, lon: selectedBeach.lon }} />
        </section>
      )}
    </main>
  );
}

// --- Utility Components ---
function MapComponent({ beachLocation }) {
  const { lat, lon } = beachLocation;
  const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;
  return (
    <div style={{ marginTop: 10 }}>
      <a
        href={osmUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#007BFF", textDecoration: "underline" }}
      >
        View on OpenStreetMap
      </a>
    </div>
  );
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default Beaches;
