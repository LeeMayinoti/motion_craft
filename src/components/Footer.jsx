import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <style>{`
        .footer-container {
          background-color: var(--color-bg);
          border-top: 1px solid var(--color-border);
          padding: 80px 40px;
          color: var(--color-text-muted);
          font-size: 0.88rem;
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 60px 20px;
          }
        }

        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 40px;
        }

        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            gap: 32px;
          }
        }

        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-brand {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-text-primary);
        }

        .footer-tagline {
          font-size: 0.9rem;
          font-style: italic;
          color: var(--color-text-muted);
        }

        .footer-right {
          display: flex;
          gap: 80px;
        }

        @media (max-width: 576px) {
          .footer-right {
            flex-direction: column;
            gap: 24px;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-col-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .footer-link {
          color: var(--color-text-muted);
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: var(--color-text-primary);
        }

        .footer-bottom {
          max-width: 1280px;
          margin: 60px auto 0;
          padding-top: 32px;
          border-top: 1px solid rgba(234, 229, 217, 0.03);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .footer-bottom {
            margin-top: 40px;
          }
        }
      `}</style>

      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-brand">MotionCraft Studios</div>
          <div className="footer-tagline">Bringing creativity to motion.</div>
        </div>

        <div className="footer-right">
          <div className="footer-col">
            <h4 className="footer-col-title">Inquiries</h4>
            <a href="mailto:hello@motioncraftstudios.com" className="footer-link hover-target">
              hello@motioncraftstudios.com
            </a>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Location</h4>
            <span className="footer-text">Windhoek, Namibia</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; {currentYear} MotionCraft Studios. All rights reserved.</div>
        <div>
          Designed &amp; Developed with Care
        </div>
      </div>
    </footer>
  );
};

export default Footer;
