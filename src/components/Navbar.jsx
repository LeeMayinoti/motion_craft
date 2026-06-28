import React from 'react';

const Navbar = ({ onNavClick }) => {
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick('#top');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(target);
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="nav-container">
      <style>{`
        .nav-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(8, 18, 16, 0.75); /* Match brand bg dark green */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(234, 229, 217, 0.05);
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .nav-inner {
            padding: 16px 20px;
          }
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-text-primary);
          opacity: 0; /* Animated on load */
          transform: translateY(-10px);
          transition: color 0.3s;
        }

        .nav-logo:hover {
          color: var(--color-accent);
        }

        .nav-logo-img {
          height: 24px;
          width: auto;
          object-fit: contain;
          transition: transform 0.5s ease;
        }

        .nav-logo:hover .nav-logo-img {
          transform: rotate(360deg);
        }

        .nav-links {
          display: flex;
          gap: 40px;
          opacity: 0; /* Animated on load */
          transform: translateY(-10px);
        }

        @media (max-width: 768px) {
          .nav-links {
            gap: 24px;
          }
        }

        .nav-link-item {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--color-text-muted);
          transition: color 0.3s ease;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .nav-link-item:hover {
          color: var(--color-text-primary);
        }
      `}</style>

      <div className="nav-inner">
        <a href="#top" onClick={handleLogoClick} className="nav-logo hover-target">
          <img src="/assets/MC_logo.png" alt="MC Logo" className="nav-logo-img" />
          <span>MotionCraft</span>
        </a>
        <div className="nav-links">
          <a
            href="#work"
            onClick={(e) => handleLinkClick(e, '#work')}
            className="nav-link-item magnetic-link hover-target"
          >
            Work
            <span className="animated-underline"></span>
          </a>
          <a
            href="#about"
            onClick={(e) => handleLinkClick(e, '#about')}
            className="nav-link-item magnetic-link hover-target"
          >
            About
            <span className="animated-underline"></span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
