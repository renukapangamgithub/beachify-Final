import React, { useEffect, useState } from "react";
import { Container, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const navLinks = [
  {
    path: "/destinations",
    display: "Destinations",
    dropdown: [
      { name: "Beaches", path: "/destinations/beaches" },
      
    ],
  },
  {
    path: "/accommodation",
    display: "Accommodation",
    dropdown: [
      { name: "Hotels", path: "/accommodation/hotels" },
     
    ],
  },
  {
    path: "/things-to-do",
    display: "Things to do",
    dropdown: [
      { name: "Water Sports", path: "/things/watersports" },
      { name: "Events", path: "/things/events" },
      { name: "Sightseeing", path: "/things/sightseeing" },
    ],
  },
  {
    path: "/plan-trip",
    display: "Plan your trip",
    dropdown: [
      { name: "Tours", path: "/plan-trip/tours" },
     
    ],
  },
];

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // new toggle state
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const videoSection = document.getElementById("video-section");
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        const isOverVideo = rect.top <= 0 && rect.bottom >= 50;
        setIsTransparent(isOverVideo);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking a link (optional)
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isTransparent ? "transparent" : "solid"}`}>
      <Container className="nav-container">
        {/* Brand Name */}
        <div className="brand-name">
          <Link to="/">Beachify</Link>
        </div>

        {/* Hamburger for small screens */}
        <div className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>

        {/* Navigation Menu */}
{/* Navigation Menu */}
<ul className={`menu ${menuOpen ? "menu-open" : ""}`}>
  {navLinks.map((item, index) => (
    <li className="nav-item" key={index} onClick={closeMenu}>
      {item.dropdown ? (
        <div className="nav-dropdown">
          <NavLink to={item.path} className="nav-link">
            {item.display}
          </NavLink>
          <ul className="dropdown-menu">
            {item.dropdown.map((subItem, subIndex) => (
              <li
                key={subIndex}
                className="dropdown-item"
                onClick={closeMenu}
              >
                <Link to={subItem.path}>{subItem.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NavLink to={item.path} className="nav-link">
          {item.display}
        </NavLink>
      )}
    </li>
  ))}

  {/* LOGIN/LOGOUT only shown on MOBILE inside menu */}
  <li className="nav-item right-section-mobile" onClick={closeMenu}>
    {user ? (
      <>
        <span className="welcome-text">Welcome, {user.name}</span>
        <Button
          color="danger"
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </Button>
      </>
    ) : (
      <Button className="login-btn">
        <Link to="/login">Login</Link>
      </Button>
    )}
  </li>
</ul>

{/* Right Section for desktop only */}
<div className="right-section right-section-desktop">
  {user ? (
    <>
      <span className="welcome-text">Welcome, {user.name}</span>
      <Button color="danger" onClick={handleLogout} className="logout-btn">
        Logout
      </Button>
    </>
  ) : (
    <Button className="login-btn">
      <Link to="/login">Login</Link>
    </Button>
  )}
</div>

      </Container>
    </nav>
  );
};

export default Navbar;