import React, { useState } from "react";
import "./Contact.css";
import contactImage from "../../assets/images/contactdog.png"; // Import Dog Surfing Image

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // Success or error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://beachify-final-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Something went wrong!");
      }
    } catch (err) {
      setStatus("Error connecting to server.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        {/* Surfing Dog Image on Left */}
        <div className="contact-image">
          <img src={contactImage} alt="Surfing Dog" />
        </div>

        {/* Contact Form on Right */}
        <div className="contact-form">
          <h2 className="contact-title">
            Get in Touch with <span>Beachify</span>
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message Input */}
            <div className="input-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Send Message Button */}
            <button type="submit" className="contact-button">
              Send Message
            </button>

            {/* Status Message */}
            {status && <p className="form-status">{status}</p>}

            {/* Contact Info */}
            <div className="form-footer">
              <p>📧 Email: contact@beachify.com</p>
              <p>📍 Location: Mumbai, India</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
