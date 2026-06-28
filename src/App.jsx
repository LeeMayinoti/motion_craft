import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import CursorParticles from './components/CursorParticles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import TechnicalProwess from './components/TechnicalProwess';
import Marquee from './components/Marquee';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    // Reveal-up animation for all sections
    const revealElements = document.querySelectorAll('.reveal-up');

    revealElements.forEach((el) => {
      // Check for stagger children
      const staggerItems = el.querySelectorAll('.stagger-item');

      if (staggerItems.length > 0) {
        gsap.fromTo(
          staggerItems,
          {
            y: 60,
            opacity: 0,
            filter: 'blur(6px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          {
            y: 60,
            opacity: 0,
            filter: 'blur(6px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // Also animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header) => {
      // Skip if already handled as a .reveal-up element
      if (header.classList.contains('reveal-up')) return;

      gsap.fromTo(
        header,
        {
          y: 50,
          opacity: 0,
          filter: 'blur(4px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <CursorParticles />
      <Navbar />
      <Hero />
      <Showcase />
      <TechnicalProwess />
      <Marquee />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
