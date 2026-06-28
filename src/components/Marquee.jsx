import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const clients = [
  'Warner Bros.',
  'Epic Games',
  'Netflix',
  'Nike',
  'Sony Pictures',
  'Marvel Studios',
  'Adobe',
  'Disney',
];

const Marquee = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(section, {
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 1000,
              easing: 'easeOutCubic',
            });
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Duplicate items 4x for seamless infinite scroll
  const repeatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="marquee-section" ref={sectionRef} style={{ opacity: 0 }}>
      <style>{`
        .marquee-section {
          background: #F8F8F8;
          padding: 60px 0;
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .marquee-title {
          text-align: center;
          font-variant: small-caps;
          color: #F49B30;
          font-size: 0.85rem;
          letter-spacing: 3px;
          margin-bottom: 40px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .marquee-track-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .marquee-track-wrapper::before,
        .marquee-track-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 150px;
          z-index: 2;
          pointer-events: none;
        }

        .marquee-track-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #F8F8F8 0%, transparent 100%);
        }

        .marquee-track-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #F8F8F8 0%, transparent 100%);
        }

        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee-scroll 40s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-item {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          cursor: default;
        }

        .marquee-item-text {
          font-family: 'Syncopate', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          text-transform: uppercase;
          color: rgba(26, 26, 26, 0.08);
          white-space: nowrap;
          transition: color 0.4s ease;
          padding: 0 10px;
        }

        .marquee-item:hover .marquee-item-text {
          color: #214B41;
        }

        .marquee-separator {
          color: rgba(26, 26, 26, 0.12);
          font-size: 0.6rem;
          margin: 0 28px;
          flex-shrink: 0;
        }
      `}</style>

      <p className="marquee-title">Trusted By Global Brands</p>

      <div className="marquee-track-wrapper">
        <div className="marquee-track">
          {repeatedClients.map((client, index) => (
            <div className="marquee-item" key={index}>
              <span className="marquee-item-text">{client}</span>
              <span className="marquee-separator">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
