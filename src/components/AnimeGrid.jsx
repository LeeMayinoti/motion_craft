import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export default function AnimeGrid() {
  const containerRef = useRef(null);
  const cols = 15;
  const rows = 8;
  const total = cols * rows;

  // Initial load animation
  useEffect(() => {
    // Run an initial ripple wave from center on mount
    const centerIndex = Math.floor(total / 2) + Math.floor(cols / 2);
    triggerRipple(centerIndex);
  }, []);

  const triggerRipple = (index) => {
    animate('.anime-grid-dot', {
      scale: [
        { value: 0.3, easing: 'easeOutSine', duration: 250 },
        { value: 1.4, easing: 'easeInOutQuad', duration: 400 },
        { value: 1.0, easing: 'easeInOutQuad', duration: 350 }
      ],
      rotate: [
        { value: 90, easing: 'easeOutSine', duration: 250 },
        { value: -90, easing: 'easeInOutQuad', duration: 400 },
        { value: 0, easing: 'easeInOutQuad', duration: 350 }
      ],
      backgroundColor: [
        { value: '#F49B30', easing: 'easeOutSine', duration: 250 }, // Gold
        { value: '#214B41', easing: 'easeInOutQuad', duration: 400 }, // Green
        { value: '#EBEBEB', easing: 'easeInOutQuad', duration: 350 }  // Back to neutral
      ],
      borderRadius: [
        { value: '20%', easing: 'easeOutSine', duration: 250 },
        { value: '50%', easing: 'easeInOutQuad', duration: 400 }
      ],
      delay: stagger(35, {
        grid: [cols, rows],
        from: index
      })
    });
  };

  const handleDotClick = (index) => {
    triggerRipple(index);
  };

  return (
    <div style={{ marginTop: '24px', marginBottom: '32px' }} className="contact-animate-item">
      <style>{`
        .anime-grid-wrapper {
          background: #fff;
          border: 1px solid #EBEBEB;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .anime-grid-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .anime-grid-title {
          font-family: 'Syncopate', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #214B41;
        }

        .anime-grid-subtitle {
          font-size: 0.75rem;
          color: #F49B30;
          font-weight: 500;
        }

        .anime-grid-container {
          display: grid;
          grid-template-columns: repeat(${cols}, 1fr);
          gap: 8px;
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
        }

        .anime-grid-dot {
          aspect-ratio: 1;
          background: #EBEBEB;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .anime-grid-dot:hover {
          background: #F49B30;
        }
      `}</style>
      
      <div className="anime-grid-wrapper">
        <div className="anime-grid-header">
          <span className="anime-grid-title">Interactive Wave</span>
          <span className="anime-grid-subtitle">Click to ripple</span>
        </div>
        <div ref={containerRef} className="anime-grid-container">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="anime-grid-dot"
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
