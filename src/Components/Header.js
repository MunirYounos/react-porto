import React from "react";
import TypeWriter from "react-typewriter";




const Header = ({ data }) => {
  if (data) {
    var name = data.name;
    var logo = "images/" + data.logo;
    var occupation = data.occupation;
    var description = data.description;
    var city = data.address.city;
    var networks = data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a href={network.url}>
            <i className={network.className}></i>
          </a>
        </li>
      );
    });
  }

  return (
    <header id="home">
      <nav id="nav-wrap">
       
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>
        <div className="row navbar">
        <div className="menu-wrapper">
          <div className="brand">
          <img src={logo} alt={name} width="40"/>
          </div>
          <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#resume">
              Resume
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#portfolio">
              Works
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#testimonials">
              Testimonials
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#contact">
              Contact
            </a>
          </li>
        </ul>
        </div>
        </div>

      </nav>

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">
            <TypeWriter typing={0.5}>{name ? `Hello, my name is ${name}.` : null}</TypeWriter>
          </h1>
          <h3>
            Based in {city}. <span>{occupation}</span>. {description}.
          </h3>

          <ul className="social">{networks}</ul>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
        <i class="fas fa-mouse"></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
