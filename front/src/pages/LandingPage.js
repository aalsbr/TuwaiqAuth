import React, { useEffect, Fragment } from "react";
import AOS from "aos";
import $ from "jquery";

import Header from "../components/Header";
import Home from "../components/Home";
import Contact from "../components/Contact";

import "aos/dist/aos.css";
import "../assets/styles/main.scss"
import Aboutus from "src/components/Aboutus";
import Features from "../components/Fetures";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ once: true });

    let navElement = $("nav");

    $(function() {
      $(window).scrollTop() > navElement.innerHeight()
        ? navElement.addClass("sticky")
        : navElement.removeClass("sticky");
    });
    $(window).on("scroll", function() {
      $(window).scrollTop() > navElement.innerHeight()
        ? navElement.addClass("sticky")
        : navElement.removeClass("sticky");
    });
  });

  return (
    <Fragment>
      <Header />
      <main>
        <Home />
        <Features />
        <Aboutus/>
        <Contact />
  
      </main>
    </Fragment>
  );
};

export default LandingPage;
