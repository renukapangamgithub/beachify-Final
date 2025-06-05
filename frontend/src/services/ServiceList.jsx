import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import ReviewList from './ReviewList';
import { Row, Col } from "reactstrap";

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import reviewsImg from '../assets/images/customization.png';

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Here are some best tours offer by Beachify.",
  }
];

const ServiceList = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Blur background when modal is open */}
      <div className={`service__section${showModal ? ' blurred' : ''}`}>
        <div className="service__title-container">
          <h5 className="services__subtitle">What we serve</h5>
          <h2 className="services__title">We offer our best <br /> services</h2>
        </div>

        <Row className="service__list">
  {servicesData.map((item, index) => (
    <Col lg="4" md="4" sm="12" key={index}>
      <div className="service__item-wrapper">
        <ServiceCard item={item} />
      </div>
    </Col>
  ))}

  <Col lg="4" md="4" sm="12">
    <div className="service__item-wrapper">
      <div className="service__item">
        <div className="service__img">
          <img src={reviewsImg} alt="Reviews" />
        </div>
        <h5>Live Reviews</h5>
        <ReviewList
          serviceType="Tour Guide"
          limit={1}
          onCommentClick={() => setShowModal(true)}
        />
      </div>
    </div>
  </Col>
</Row>

      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>All Reviews</h3>
            {/* Show all comments here */}
            <ReviewList serviceType="Tour Guide" />
            <button onClick={() => setShowModal(false)} className="modal-close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add styles here or in your CSS file */}
      <style>{`
        .blurred {
          filter: blur(5px);
          pointer-events: none;
          user-select: none;
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal-content {
          background: white;
          padding: 100px;
          border-radius: 8px;
          max-width: 700px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 0 10px rgba(0,0,0,0.25);
        }
        .modal-close-btn {
          margin-top: 15px;
          padding: 8px 16px;
          background-color: #ff4d4d;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ServiceList;
