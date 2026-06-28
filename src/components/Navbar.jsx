import { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);

  // Scroll detection for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Anime.js entrance animation on mount
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Set initial state
    nav.style.opacity = '0';
    nav.style.transform = 'translateY(-30px)';

    // Animate navbar slide down + fade in
    animate(nav, {
      opacity: [0, 1],
      translateY: [-30, 0],
      duration: 800,
      easing: 'easeOutCubic',
      delay: 200,
    });

    // Stagger animate the nav links
    const linkItems = linksRef.current?.querySelectorAll('.fw-nav-link');
    if (linkItems && linkItems.length > 0) {
      animate(linkItems, {
        opacity: [0, 1],
        translateY: [-15, 0],
        delay: stagger(80, { start: 600 }),
        duration: 500,
        easing: 'easeOutCubic',
      });
    }

    // Animate the CTA button
    if (ctaRef.current) {
      animate(ctaRef.current, {
        opacity: [0, 1],
        scale: [0.85, 1],
        duration: 600,
        easing: 'easeOutBack',
        delay: 1000,
      });
    }
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'hero' },
    { label: 'Showcase', target: 'showcase' },
    { label: 'Prowess', target: 'prowess' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fw-navbar ${isScrolled ? 'fw-navbar--scrolled' : ''}`}
    >
      <div className="fw-navbar__inner">
        {/* Left: Logo + Brand */}
        <div
          ref={logoRef}
          className="fw-navbar__logo"
          onClick={(e) => handleLinkClick(e, 'hero')}
        >
          <img
            src="/assets/MC logo.png"
            alt="Motion Craft Logo"
            className="fw-navbar__logo-img"
          />
          <span className="fw-navbar__brand">Motion Graphics</span>
        </div>

        {/* Center: Nav Links */}
        <ul ref={linksRef} className="fw-navbar__links">
          {navLinks.map((link) => (
            <li key={link.label} className="fw-nav-link" style={{ opacity: 0 }}>
              <a
                href={`#${link.target}`}
                onClick={(e) => handleLinkClick(e, link.target)}
                className="fw-navbar__link"
              >
                {link.label}
                <span className="fw-navbar__link-underline"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right: CTA Button */}
        <a
          ref={ctaRef}
          href="#contact"
          className="fw-navbar__cta"
          onClick={(e) => handleLinkClick(e, 'contact')}
          style={{ opacity: 0 }}
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
