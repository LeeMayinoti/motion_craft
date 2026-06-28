import React, { useRef } from 'react';

const Hero = () => {
  const containerRef = useRef(null);

  // Splits a string into words, wrapping each word in double spans for an overflow-hidden mask reveal
  const renderSplitText = (text, className = '') => {
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        className="split-word-mask"
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          verticalAlign: 'bottom',
          lineHeight: '1.1'
        }}
      >
        <span
          className={`split-word-content ${className}`}
          style={{
            display: 'inline-block',
            transform: 'translateY(100%)',
            opacity: 0,
            whiteSpace: 'pre'
          }}
        >
          {word === '' ? ' ' : word}&nbsp;
        </span>
      </span>
    ));
  };

  return (
    <section ref={containerRef} id="top" className="hero-section">
      <style>{`
        .hero-section {
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 160px 40px 80px;
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 80vh;
            padding: 120px 20px 60px;
          }
        }

        .hero-label {
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-text-muted);
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(15px);
        }

        .hero-title {
          font-size: clamp(2.8rem, 7.5vw, 6.8rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          max-width: 1100px;
          margin-bottom: 40px;
        }

        .hero-title .serif-accent {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          color: var(--color-accent);
        }

        .hero-description-container {
          max-width: 600px;
          margin-left: auto;
          margin-bottom: 80px;
        }

        @media (max-width: 768px) {
          .hero-description-container {
            margin-left: 0;
            margin-bottom: 40px;
          }
        }

        .hero-description {
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          line-height: 1.6;
          color: var(--color-text-muted);
        }

        .hero-scroll-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--color-text-muted);
          align-self: flex-start;
          cursor: pointer;
          opacity: 0;
          transform: translateY(15px);
          transition: color 0.3s ease;
        }

        .hero-scroll-indicator:hover {
          color: var(--color-text-primary);
        }

        .hero-scroll-arrow {
          display: inline-block;
          font-size: 1.1rem;
        }
      `}</style>

      <div className="hero-label hero-animate-fade">Creative Media Studio</div>

      <h1 className="hero-title">
        {renderSplitText('We transform', 'title-word')}
        <span className="serif-display italic serif-accent hero-animate-direct-word" style={{ display: 'inline-block', opacity: 0, transform: 'translateY(20px)' }}>ideas</span>
        {renderSplitText(' into powerful', 'title-word')}
        <br />
        <span className="serif-display italic serif-accent hero-animate-direct-word" style={{ display: 'inline-block', opacity: 0, transform: 'translateY(20px)' }}>visual</span>
        {renderSplitText(' experiences.', 'title-word')}
      </h1>

      <div className="hero-description-container">
        <p className="hero-description hero-animate-fade">
          MotionCraft Studios is your partner for high-end video production, motion graphics, animation, and digital branding.
        </p>
      </div>

      <div
        className="hero-scroll-indicator hover-target"
        onClick={() => {
          const workSection = document.getElementById('work');
          if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span>Scroll to Explore</span>
        <span className="hero-scroll-arrow">↓</span>
      </div>
    </section>
  );
};

export default Hero;
