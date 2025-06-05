import React, { useState, useEffect } from "react";
import "./Events.css";

const BeachEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "fGwbZCd2ArAK0L5A0YPcKn4aCds9AIHF";
  const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&countryCode=IN`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data._embedded && data._embedded.events) {
          const filteredEvents = data._embedded.events.filter(event =>
            event.name.toLowerCase().includes("beach") ||
            event.classifications.some(c => c.segment.name.toLowerCase().includes("music") || c.segment.name.toLowerCase().includes("festival"))
          );
          setEvents(filteredEvents);
        } else {
          setEvents([]); // No events found
        }
      })
      .catch((error) => console.error("Error fetching events:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="events-container">
      <h2>🏖️ Upcoming Beach Events in India</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.images?.[0]?.url} alt={event.name} className="event-img" />
            <h3>{event.name}</h3>
            <p>📍 Location: {event._embedded.venues?.[0]?.name}, {event._embedded.venues?.[0]?.city?.name}</p>
            <p>📅 Date: {new Date(event.dates.start.localDate).toDateString()}</p>
            <a href={event.url} target="_blank" rel="noopener noreferrer" className="event-link">View Details</a>
          </div>
        ))
      ) : (
        <p>No upcoming beach events found. Try a different category.</p>
      )}
    </div>
  );
};

export default BeachEvents;
