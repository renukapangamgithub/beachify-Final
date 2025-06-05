import React from "react";
import "./Home.css";
import { Container, Row, Col } from "reactstrap";

import heroImg from "../../assets/images/hero-img01.jpg";
import heroImg02 from "../../assets/images/hero-img02.jpg";
import heroVideo from "../../assets/images/hero-video.mp4";
import worldImg from "../../assets/images/world.png";
import indiaBeachVideo from "../../assets/images/india-beach.mp4";


import SearchBar from "../../shared/SearchBar";
import ServiceList from "../../services/ServiceList";
import MasonryImagesGallery from "../../components/Image-gallery/MasonryImagesGallery";
import Discover from "../../discover/Discover";

const Home = () => {
  return (
    <>
      {/* =============== Full-Screen Video Section =============== */}
      <section className="video-section">
        <video autoPlay muted loop className="background-video">
          <source src={indiaBeachVideo} type="video/mp4" />
        </video>
        <div className="video-overlay">
          <h1 className="video-title">
            Welcome to India's Most Breathtaking Beaches
          </h1>
          <p className="video-subtitle">Explore, Experience, and Enjoy</p>
        </div>
      </section>

      {/* =============== Hero Section =============== */}
      <section className="hero">
        {/* Left Side - Hero Text */}
        <div className="hero__text">
          <span className="hero__subtitle">
            Explore the Best Beaches
            <img src={worldImg} alt="World Icon" className="hero__world-icon" />
          </span>

          <h1>
            Discover <span className="highlight">Beautiful Beaches</span> in
            India
          </h1>
          <p>
            Plan your perfect beach vacation with detailed insights, guides, and
            recommendations.
          </p>
        </div>

        {/* Right Side - Image & Video Grid */}
        <div className="hero__grid">
          <img src={heroImg} alt="Beach 1" className="grid-item img1" />
          <div className="grid-item video-item">
            <video autoPlay loop muted className="background-video">
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
          <img src={heroImg02} alt="Beach 2" className="grid-item img2" />
        </div>
      </section>
      <SearchBar />

      {/* =============== Services Section =============== */}
      <section>
        <Container>
          <Row>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* =============== Featured Tours Section =============== */}
      <section>
        <Container>
          <Row>
            <Discover />
          </Row>
        </Container>
      </section>

      {/* =============== Gallery Section =============== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
