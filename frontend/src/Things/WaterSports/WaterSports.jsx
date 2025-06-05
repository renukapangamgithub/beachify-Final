import React, { useState } from "react";
import SportDetail from "./SportDetail";
import "./WaterSports.css";

// ✅ Import local images and videos
import jetSkiing from "../../assets/images/jetskiing.jpg";
import parasailing from "../../assets/images/parasailing.jpg";
import scubaDiving from "../../assets/images/scubadiving.jpg";
import kayaking from "../../assets/images/kayaking.jpg";
import surfing from "../../assets/images/surfing.jpeg";
import waterSportsVideo from "../../assets/images/watersports.mp4";

// FAQ Data
const faqData = [
  {
    question: "What are the best months for water sports in India?",
    answer: "The best months are from October to March, as the weather is pleasant and the sea conditions are stable.",
  },
  {
    question: "Do I need prior experience for activities like scuba diving?",
    answer: "No, beginner-friendly options with professional guidance are available. However, a basic swimming ability helps.",
  },
  {
    question: "Is there an age limit for water sports?",
    answer: "Yes, the age limit varies by activity. For example, jet skiing usually requires participants to be at least 10-12 years old.",
  },
  {
    question: "What should I wear for water sports?",
    answer: "Wear comfortable swimwear, a life jacket, and water shoes for safety.",
  },
];

const sportsData = [
  {
    id: 1,
    name: "Jet Skiing",
    icon: "🚤",
    description: "Enjoy the thrill of high-speed jet skiing over the waves.",
    location: "🏝️ Famous At: Baga Beach (Goa), Kovalam Beach (Kerala), Marina Beach (Chennai)",
    image: jetSkiing,
    tips: [
      "Wear a life jacket at all times",
      "Follow the safety instructions given by the instructor",
      "Avoid sharp turns to prevent falling",
    ],
  },
  {
    id: 2,
    name: "Parasailing",
    icon: "🪂",
    description: "Fly high over the ocean and witness breathtaking views.",
    location: "🏝️ Famous At: Candolim Beach (Goa), Juhu Beach (Mumbai), Tarkarli Beach (Maharashtra)",
    image: parasailing,
    tips: [
      "Ensure the harness is properly fitted",
      "Choose a professional instructor",
      "Check weather conditions before parasailing",
    ],
  },
  {
    id: 3,
    name: "Scuba Diving",
    icon: "🤿",
    description: "Explore the vibrant marine life and stunning coral reefs underwater.",
    location: "🏝️ Famous At: Havelock Island (Andaman & Nicobar), Grand Island (Goa), Netrani Island (Karnataka)",
    image: scubaDiving,
    tips: [
      "Equalize your ears to prevent pressure build-up",
      "Breathe slowly and calmly",
      "Never hold your breath while diving",
    ],
  },
  {
    id: 4,
    name: "Kayaking",
    icon: "🛶",
    description: "Paddle through calm waters and discover hidden beachside locations.",
    location: "🏝️ Famous At: Alleppey Backwaters (Kerala), Mandovi River (Goa), Andaman Islands",
    image: kayaking,
    tips: [
      "Wear a personal flotation device",
      "Hold the paddle correctly for better control",
      "Plan your route before kayaking",
    ],
  },
  {
    id: 5,
    name: "Surfing",
    icon: "🏄",
    description: "Ride the ocean waves and experience the thrill of surfing.",
    location: "🏝️ Famous At: Varkala Beach (Kerala), Covelong Beach (Tamil Nadu), Gokarna Beach (Karnataka)",
    image: surfing,
    tips: [
      "Choose the right surfboard for your skill level",
      "Practice paddling and balancing",
      "Respect other surfers and follow surf etiquette",
    ],
  },
];

const WaterSports = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="watersports-container">
      {/* Hero Video Section */}
      <div className="hero-video-container">
        <video className="hero-video" autoPlay muted loop>
          <source src={waterSportsVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <h1>🌊 Water Sports Adventure 🏄‍♂️</h1>
          <p>Experience the thrill of jet skiing, scuba diving, parasailing, and more!</p>
        </div>
      </div>

      {/* Display SportDetail if a sport is selected */}
      {selectedSport ? (
        <SportDetail sport={selectedSport} onBack={() => setSelectedSport(null)} />
      ) : (
        <>
          <h2 className="section-heading">🌟 Top Water Sports to Try!</h2>
          <div className="sports-list">
            {sportsData.map((sport) => (
              <div key={sport.id} className="sport-card" onClick={() => setSelectedSport(sport)}>
                <img src={sport.image} alt={sport.name} />
                <h3>
                  {sport.icon} {sport.name}
                </h3>
                <p>{sport.description}</p>
                <p>
                  <strong>{sport.location}</strong>
                </p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2>❓ Frequently Asked Questions</h2>
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item" onClick={() => toggleFaq(index)}>
                <h3>
                  {faq.question}
                  <span className={`icon ${openFaqIndex === index ? "open" : ""}`}>▼</span>
                </h3>
                {openFaqIndex === index && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WaterSports;
