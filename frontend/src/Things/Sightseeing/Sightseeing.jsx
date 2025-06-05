import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Sightseeing.css";

// Import images
import sunset1 from "../../assets/images/sunset1.jpg";
import sunset2 from "../../assets/images/sunset2.jpg";
import sunset3 from "../../assets/images/sunset3.jpg";
import sunset4 from "../../assets/images/sunset4.jpg";

import walk1 from "../../assets/images/walk1.jpg";
import walk2 from "../../assets/images/walk2.jpg";
import walk3 from "../../assets/images/walk3.jpg";
import walk4 from "../../assets/images/walk4.jpg";

import marineDrive from "../../assets/images/marine-drive.jpg";
import kovalamBeach from "../../assets/images/kovalam-beach.jpg";
import vagatorCliff from "../../assets/images/vagator-cliff.jpg";

import palolemBeach from "../../assets/images/palolem-beach.jpg";
import varkalaCliff from "../../assets/images/varkala-cliff.jpg";
import radhanagarBeach from "../../assets/images/radhanagar-beach.jpg";

import beachVideo from "../../assets/images/beachwalk.mp4";

const Sightseeing = () => {
  const imagesRow1 = [sunset1, sunset2, sunset3, sunset4];
  const imagesRow2 = [walk1, walk2, walk3, walk4];

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  const nextImage1 = () =>
    setIndex1((prev) => (prev + 1) % imagesRow1.length);
  const prevImage1 = () =>
    setIndex1((prev) => (prev - 1 + imagesRow1.length) % imagesRow1.length);

  const nextImage2 = () =>
    setIndex2((prev) => (prev + 1) % imagesRow2.length);
  const prevImage2 = () =>
    setIndex2((prev) => (prev - 1 + imagesRow2.length) % imagesRow2.length);

  // Featured sightseeing spots with more details
  const featuredSpots = [
    {
      name: "Marine Drive - Sunset Point",
      location: "Mumbai, Maharashtra",
      description:
        "A 3.6 km-long boulevard along the Arabian Sea, perfect for an evening stroll while enjoying the skyline. The sea breeze and dazzling city lights make it an unforgettable experience.",
      bestTime: "Best time to visit: 5:30 PM - 7:00 PM (Sunset views)",
      image: marineDrive,
    },
    {
      name: "Kovalam Beach Walk",
      location: "Kerala",
      description:
        "Known for its iconic lighthouse, Kovalam Beach is a paradise for walkers. The coastal stretch offers breathtaking views, vibrant cafes, and a tranquil atmosphere.",
      bestTime: "Best time to visit: 6:00 AM - 9:00 AM & 4:30 PM - 6:30 PM",
      image: kovalamBeach,
    },
    {
      name: "Vagator Cliff Point",
      location: "Goa",
      description:
        "A short trek to Vagator Cliff rewards you with panoramic views of Goa's coastline, swaying palm trees, and a peaceful escape from the crowd.",
      bestTime: "Best time to visit: 5:00 PM - 6:30 PM (Sunset spot)",
      image: vagatorCliff,
    },
  ];

  // Famous Beaches for Walks & Hikes with more details
  const famousBeaches = [
    {
      name: "Palolem Beach Walk",
      location: "Goa",
      description:
        "A picturesque crescent-shaped beach, ideal for a peaceful stroll. The shallow waters and soft golden sands make it a perfect spot to unwind.",
      bestTime: "Best time to visit: 6:00 AM - 8:00 AM & 5:00 PM - 7:00 PM",
      image: palolemBeach,
    },
    {
      name: "Varkala Cliff Hike",
      location: "Kerala",
      description:
        "A mesmerizing walk along Varkala’s red sandstone cliffs with panoramic views of the Arabian Sea. The sunset from here is magical.",
      bestTime: "Best time to visit: 5:00 PM - 6:30 PM",
      image: varkalaCliff,
    },
    {
      name: "Radhanagar Beach Trail",
      location: "Andaman & Nicobar Islands",
      description:
        "One of Asia’s most stunning beaches with powdery white sand and crystal-clear waters, perfect for a rejuvenating walk along the shoreline.",
      bestTime: "Best time to visit: 6:30 AM - 9:00 AM & 4:30 PM - 6:00 PM",
      image: radhanagarBeach,
    },
  ];

  return (
    <section className="sightseeing">
      {/* Video Header */}
      <div className="video-header">
        <video autoPlay loop muted>
          <source src={beachVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1>🌅 Best Sightseeing & Walks by the Beach</h1>
      </div>

      {/* Sunset View Section */}
      <div className="sunset-view">
        <img src={sunset1} alt="Sunset View" />
        <div className="sunset-text">
          <h2>Best Sunset View</h2>
          <p>
            Experience the magic of the golden hour at India's most beautiful beach spots, where the sky turns into a breathtaking canvas of colors.
          </p>
        </div>
      </div>

      {/* Image Slider Row 1 */}
      <div className="image-slider">
        <FaArrowLeft className="arrow left" onClick={prevImage1} />
        <div className="image-container">
          {[...imagesRow1, ...imagesRow1].slice(index1, index1 + 3).map((image, i) => (
            <img key={i} src={image} alt="Beach View" />
          ))}
        </div>
        <FaArrowRight className="arrow right" onClick={nextImage1} />
      </div>

      {/* Featured Sightseeing Spots */}
      <div className="featured-spots">
        {featuredSpots.map((spot, index) => (
          <div key={index} className={`spot-card ${index % 2 === 1 ? "reverse" : ""}`}>
            <div className="spot-info">
              <h3>{spot.name}</h3>
              <p className="location">{spot.location}</p>
              <p className="description">{spot.description}</p>
              <p className="best-time">{spot.bestTime}</p>
            </div>
            <img src={spot.image} alt={spot.name} />
          </div>
        ))}
      </div>

      {/* Image Slider Row 2 */}
      <div className="image-slider">
        <FaArrowLeft className="arrow left" onClick={prevImage2} />
        <div className="image-container">
          {[...imagesRow2, ...imagesRow2].slice(index2, index2 + 3).map((image, i) => (
            <img key={i} src={image} alt="Beach Walk" />
          ))}
        </div>
        <FaArrowRight className="arrow right" onClick={nextImage2} />
      </div>

      {/* Famous Beaches for Walks & Hikes */}
      <div className="featured-spots">
        {famousBeaches.map((spot, index) => (
          <div key={index} className={`spot-card ${index % 2 === 1 ? "reverse" : ""}`}>
            <div className="spot-info">
              <h3>{spot.name}</h3>
              <p className="location">{spot.location}</p>
              <p className="description">{spot.description}</p>
              <p className="best-time">{spot.bestTime}</p>
            </div>
            <img src={spot.image} alt={spot.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sightseeing;
