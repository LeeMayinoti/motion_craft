import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import AnimeGrid from './AnimeGrid';

const VERTICAL_LANDSCAPE_URL =
  'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782650430/vertical_landscape_tzw7ua.mp4';

const SERVICE_LINKS = [
  { name: 'After Effects', icon: 'fa-solid fa-wand-magic-sparkles' },
  { name: 'Blender', icon: 'fa-solid fa-cube' },
  { name: 'DaVinci', icon: 'fa-solid fa-film' },
  { name: 'Photoshop', icon: 'fa-solid fa-pen-nib' },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const dotBadgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const servicesRef = useRef(null);
  const videoContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Split text and orchestrate entrance timeline
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    // Split heading text into letter spans wrapped in word spans
    const text = heading.innerText;
    heading.innerHTML = '';

    text.split(' ').forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      wordSpan.style.marginRight = '0.3em';

      word.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        charSpan.className = 'fw-hero-letter';
        charSpan.style.display = 'inline-block';
        charSpan.style.opacity = '0';
        charSpan.style.transform = 'translateY(60px)';
        charSpan.style.filter = 'blur(8px)';
        wordSpan.appendChild(charSpan);
      });
      heading.appendChild(wordSpan);
    });

    const letters = heading.querySelectorAll('.fw-hero-letter');

    // Build the entrance timeline
    const tl = createTimeline({
      defaults: {
        easing: 'easeOutCubic',
      },
    });

    // 1. Pulsing dot badge
    tl.add(dotBadgeRef.current, {
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 600,
    }, 0);

    // 2. Heading letters stagger
    tl.add(letters, {
      opacity: [0, 1],
      translateY: [60, 0],
      filter: ['blur(8px)', 'blur(0px)'],
      duration: 700,
      delay: stagger(30),
      easing: 'easeOutCubic',
    }, 300);

    // 3. Description text
    tl.add(descRef.current, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700,
    }, 800);

    // 4. CTA button
    tl.add(ctaRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.9, 1],
      duration: 600,
      easing: 'easeOutBack',
    }, 1000);

    // 5. Service links stagger
    const serviceItems = servicesRef.current?.querySelectorAll('.fw-hero-service');
    if (serviceItems && serviceItems.length > 0) {
      tl.add(serviceItems, {
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 500,
        delay: stagger(100),
      }, 1100);
    }

    // 6. Video container
    tl.add(videoContainerRef.current, {
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.95, 1],
      duration: 900,
      easing: 'easeOutCubic',
    }, 1400);

    // 7. Scroll indicator
    tl.add(scrollIndicatorRef.current, {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 500,
    }, 1800);

    // Bounce animation for scroll indicator arrow
    animate('.fw-scroll-arrow', {
      translateY: [0, -8, 0],
      duration: 1500,
      loop: true,
      easing: 'easeInOutSine',
      delay: 2200,
    });
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('showcase');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" ref={sectionRef} className="fw-hero">
      {/* Two-column layout */}
      <div className="fw-hero__grid">
        {/* LEFT COLUMN (60%) */}
        <div className="fw-hero__left">
          {/* Pulsing dot badge */}
          <div ref={dotBadgeRef} className="fw-hero__badge" style={{ opacity: 0 }}>
            <span className="pulse-dot"></span>
            <span className="fw-hero__badge-text">Available for projects</span>
          </div>

          {/* Large heading */}
          <h1 ref={headingRef} className="fw-hero__heading">
            Motion Graphics helps you turn ideas into visual masterpieces.
          </h1>

          {/* CTA Button */}
          <a
            ref={ctaRef}
            href="#showcase"
            className="fw-hero__cta"
            onClick={handleCtaClick}
            style={{ opacity: 0 }}
          >
            Get Started
            <i className="fa-solid fa-arrow-right" style={{ marginLeft: '10px' }}></i>
          </a>
        </div>

        {/* RIGHT COLUMN (40%) */}
        <div className="fw-hero__right">
          {/* Description */}
          <p ref={descRef} className="fw-hero__desc" style={{ opacity: 0 }}>
            We provide motion design, 3D animation, and visual effects services as
            well as commercial production.
          </p>

          {/* Stagger wave grid */}
          <AnimeGrid />

          {/* Service links */}
          <div ref={servicesRef} className="fw-hero__services">
            {SERVICE_LINKS.map((service, index) => (
              <div
                key={service.name}
                className="fw-hero-service"
                style={{ opacity: 0 }}
              >
                {index > 0 && <div className="fw-hero-service__divider"></div>}
                <div className="fw-hero-service__content">
                  <span className="fw-hero-service__name">
                    <i className={service.icon} style={{ marginRight: '10px', color: '#214B41' }}></i>
                    {service.name}
                  </span>
                  <i className="fa-solid fa-arrow-right fw-hero-service__arrow"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width video teaser */}
      <div
        ref={videoContainerRef}
        className="fw-hero__video-container"
        style={{ opacity: 0 }}
      >
        <video
          className="fw-hero__video"
          src={VERTICAL_LANDSCAPE_URL}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="fw-hero__video-overlay">
          <span className="fw-hero__video-label">
            <i className="fa-solid fa-play" style={{ marginRight: '8px' }}></i>
            Featured Reel
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="fw-hero__scroll-indicator"
        style={{ opacity: 0 }}
      >
        <span>Scroll to explore</span>
        <i className="fa-solid fa-chevron-down fw-scroll-arrow"></i>
      </div>
    </section>
  );
}
