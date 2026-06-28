import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <style>{`
        .footer {
          background: #214B41;
          color: rgba(255, 255, 255, 0.7);
          padding: 48px 40px;
          text-align: center;
        }

        .footer-tagline {
          font-size: 0.85rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
          margin-bottom: 12px;
        }

        .footer-copyright {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.55);
        }

        .footer-copyright span {
          color: #F49B30;
        }
      `}</style>

      <p className="footer-tagline">Crafting Motion, Defining Brands</p>
      <p className="footer-copyright">
        © {currentYear} <span>MotionCraft</span> Studio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
