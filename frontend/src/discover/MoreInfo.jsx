import React, { useState } from "react";
import "./MoreInfo.css";
import beachVideo from "../assets/images/moreinfo.mp4";
import beach1 from "../assets/images/scubadiving.jpg";
import beach2 from "../assets/images/sunset4.jpg";
import beach3 from "../assets/images/kovalam-beach.jpg";
import beach4 from "../assets/images/walk1.jpg";
import beach5 from "../assets/images/sunset3.jpg";
import beach6 from "../assets/images/walk2.jpg";

const images = [beach1, beach2, beach3, beach4, beach5, beach6];

const MoreInfo = () => {
  const [currentFact, setCurrentFact] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const visibleImages = images.slice(startIndex, startIndex + 3);

  const funFacts = [
    "India has a coastline of over 7,500 km! 🌊",
    "Goa’s Palolem Beach has silent discos where you listen to music via headphones! 🎧",
    "Radhanagar Beach in Andaman was once named the 'Best Beach in Asia'! 🏖️",
    "Kovalam Beach in Kerala is known for Ayurvedic treatments by the sea! 🧘",
  ];

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % funFacts.length);
  };

  const nextImage = () => {
    setStartIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setStartIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="moreinfo-container">
      {/* Video Section */}
      <section className="moreinfo-hero">
        <video autoPlay loop muted className="moreinfo-video">
          <source src={beachVideo} type="video/mp4" />
        </video>
        <div className="moreinfo-overlay">
          <h1>Discover the Beauty of Indian Beaches</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="moreinfo-intro">
        <h2>
          In the Heart of the Indian Ocean, you will discover Stunning Indian Beaches.{" "}
          <span className="heart">❤️</span>
        </h2>
      </section>

      {/* Moments to Discover */}
      <section className="moreinfo-moments">
        <h2 className="moments1">Moments to Discover</h2>
        <div className="moreinfo-gallery">
          <button className="prev-btn" onClick={prevImage}>←</button>
          <div className="image-container">
            {visibleImages.map((image, index) => (
              <img key={index} src={image} alt={`Beach ${index}`} className="gallery-image" />
            ))}
          </div>
          <button className="next-btn" onClick={nextImage}>→</button>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="moreinfo-funfacts">
        <h2>Did You Know? 🤔</h2>
        <p>{funFacts[currentFact]}</p>
        <button onClick={nextFact}>Next Fun Fact →</button>
      </section>

      {/* Accommodations Section */}
      <section className="moreinfo-accommodations">
        <div className="moreinfo-text">
          <h2>Island Accommodations</h2>
          <p>
            Experience the best beach resorts in India, from the luxury resorts in Goa and Kerala
            to the peaceful escapes of the Andaman & Nicobar Islands.
          </p>
          <button>Find More Accommodation</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="moreinfo-testimonials">
        <h2>What Travelers Say 🗣️</h2>
        <div className="testimonial">
          <p>“Goa's beaches are a dream! The sunsets are breathtaking.” – Priya M.</p>
        </div>
        <div className="testimonial">
          <p>“Snorkeling in Andaman was the best experience of my life!” – Rahul K.</p>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="moreinfo-map">
        <h2>Explore Indian Beaches 🗺️</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983167.5679248437!2d74.03313498738536!3d11.407001939707665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b070c3a0e8ea5bb%3A0x74a418389aa489d7!2sGoa!5e0!3m2!1sen!2sin!4v1707900051009"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Indian Beach Map"
        ></iframe>
      </section>

      {/* About Section */}
      <section className="moreinfo-about">
        <div className="moreinfo-about-text">
          <h2>About Indian Beaches</h2>
          <p>
            Indian beaches are a paradise for travelers, offering pristine waters, golden sands,
            and vibrant culture. Explore Goa's nightlife, Kerala's backwaters, and the untouched
            beauty of Lakshadweep.
          </p>
        </div>
        <div className="moreinfo-features">
          <h3>Key Features</h3>
          <ul>
            <li>🏝️ Attractions</li>
            <li>👨‍👩‍👧‍👦 Family Friendly</li>
            <li>🍽️ Food & Drink</li>
            <li>⛺ Island Camping</li>
            <li>🏛️ Landmarks</li>
            <li>🤿 Snorkeling</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MoreInfo;
