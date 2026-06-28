import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import CameraShowcase from './components/CameraShowcase';
import About from './components/About';
import Footer from './components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Check for prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Page Load Animations (GSAP Timeline targeting Navbar & Camera Wrapper)
    if (!reducedMotion) {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.0 }
      });

      // Animate Navbar Wordmark
      tl.to('.nav-logo', {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, 0.2);

      // Animate Navbar Links
      tl.to('.nav-links', {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, 0.4);

      // Animate Backdrop Entrance
      tl.fromTo('.showcase-cards-container',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' },
        0.5
      );

      // Animate Showcase Footer Counter and Progress Bar
      tl.fromTo('.showcase-footer',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.9
      );

      // Animate Scroll Cue
      tl.fromTo('.showcase-scroll-cue',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.0
      );
    } else {
      // Reduced motion: immediately display elements
      gsap.set('.nav-logo, .nav-links', { opacity: 1, y: 0 });
      gsap.set('.camera-wrapper, .showcase-footer, .showcase-scroll-cue', {
        opacity: 1,
        scale: 1,
        y: 0
      });
    }

    // 3. Scroll Reveals for About Section (Paragraphs & Blocks)
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => {
      if (!reducedMotion) {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      } else {
        gsap.set(el, { y: 0, opacity: 1 });
      }
    });

    // Cleanup listeners and triggers on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle smooth scroll navigation
  const handleNavClick = (target) => {
    if (!lenisRef.current) return;
    
    if (target === '#top') {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      const element = document.querySelector(target);
      if (element) {
        // Offset for the navbar height
        lenisRef.current.scrollTo(element, { duration: 1.2, offset: -80 });
      }
    }
  };

  return (
    <>
      <CustomCursor />
      <Navbar onNavClick={handleNavClick} />
      <main>
        <CameraShowcase />
        <About />
      </main>
      <Footer />
    </>
  );
};

export default App;
