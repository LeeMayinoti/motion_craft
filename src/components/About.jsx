import React from 'react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <style>{`
        .about-section {
          padding: 160px 40px;
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          border-top: 1px solid var(--color-border);
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 100px 20px;
          }
        }

        .about-header {
          margin-bottom: 80px;
        }

        @media (max-width: 768px) {
          .about-header {
            margin-bottom: 40px;
          }
        }

        .about-section-label {
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-text-muted);
        }

        .about-paragraphs {
          max-width: 1000px;
          margin-bottom: 120px;
        }

        @media (max-width: 768px) {
          .about-paragraphs {
            margin-bottom: 80px;
          }
        }

        .about-p {
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          line-height: 1.55;
          color: var(--color-text-primary);
          font-weight: 300;
          margin-bottom: 48px;
        }

        .about-p:last-child {
          margin-bottom: 0;
        }

        /* Mission & Vision Grid */
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 140px;
        }

        @media (max-width: 768px) {
          .mv-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            margin-bottom: 80px;
          }
        }

        .mv-block {
          border-left: 2px solid var(--color-accent);
          padding-left: 32px;
        }

        .mv-title {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-text-muted);
          margin-bottom: 20px;
        }

        .mv-text {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 3.2vw, 2.4rem);
          line-height: 1.3;
          font-style: italic;
          color: var(--color-text-primary);
          font-weight: 400;
        }

        /* Lists Grid: What We Do & Why Choose Us */
        .lists-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 120px;
          margin-bottom: 160px;
        }

        @media (max-width: 992px) {
          .lists-grid {
            gap: 60px;
          }
        }

        @media (max-width: 768px) {
          .lists-grid {
            grid-template-columns: 1fr;
            gap: 50px;
            margin-bottom: 100px;
          }
        }

        .list-section-title {
          font-size: 1.4rem;
          font-weight: 500;
          color: var(--color-text-primary);
          margin-bottom: 32px;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 16px;
        }

        .about-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .about-list-item {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .about-list-item:hover {
          color: var(--color-text-primary);
          transform: translateX(4px);
        }

        .list-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-accent);
          display: inline-block;
          flex-shrink: 0;
        }

        /* Closing Tagline Section */
        .tagline-container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
          padding: 80px 0 0;
          border-top: 1px solid var(--color-border);
        }

        .closing-tagline {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5.2vw, 4.4rem);
          line-height: 1.15;
          color: var(--color-text-primary);
          font-style: italic;
          font-weight: 400;
        }

        .closing-tagline span {
          color: var(--color-accent);
        }
      `}</style>

      <div className="about-header reveal-up">
        <h2 className="about-section-label">About Us</h2>
      </div>

      {/* Main paragraphs */}
      <div className="about-paragraphs">
        <p className="about-p reveal-up">
          At MotionCraft Studios, we transform ideas into powerful visual experiences that inform, inspire, and leave a lasting impression. We are a creative media studio specializing in high-quality video production, motion graphics, animation, visual effects, and graphic design.
        </p>
        <p className="about-p reveal-up">
          Our passion lies in helping brands, businesses, government organizations, and NGOs communicate their stories through compelling visuals. From corporate videos and promotional campaigns to documentaries, event coverage, social media content, and digital branding, we combine creativity with technical expertise to deliver content that captivates audiences and drives results.
        </p>
        <p className="about-p reveal-up">
          Every project is approached with innovation, attention to detail, and a commitment to excellence. Whether you're launching a new product, raising awareness for a cause, or building your brand, MotionCraft Studios is your creative partner from concept to final delivery.
        </p>
      </div>

      {/* Mission / Vision Grid */}
      <div className="mv-grid">
        <div className="mv-block reveal-up">
          <h3 className="mv-title">Our Mission</h3>
          <p className="mv-text">
            "To empower brands and organizations through exceptional visual storytelling that inspires, educates, and creates meaningful connections."
          </p>
        </div>

        <div className="mv-block reveal-up">
          <h3 className="mv-title">Our Vision</h3>
          <p className="mv-text">
            "To become Africa's leading creative studio, recognized for producing world-class visual content that makes a lasting impact."
          </p>
        </div>
      </div>

      {/* Lists Grid */}
      <div className="lists-grid">
        <div className="list-col reveal-up">
          <h3 className="list-section-title">What We Do</h3>
          <ul className="about-list">
            <li className="about-list-item"><span className="list-bullet"></span>Video Production</li>
            <li className="about-list-item"><span className="list-bullet"></span>Motion Graphics & Animation</li>
            <li className="about-list-item"><span className="list-bullet"></span>Visual Effects (VFX)</li>
            <li className="about-list-item"><span className="list-bullet"></span>Video Editing & Color Grading</li>
            <li className="about-list-item"><span className="list-bullet"></span>Graphic Design & Branding</li>
            <li className="about-list-item"><span className="list-bullet"></span>Corporate & Promotional Videos</li>
            <li className="about-list-item"><span className="list-bullet"></span>Social Media Content Creation</li>
            <li className="about-list-item"><span className="list-bullet"></span>Photography & Creative Campaigns</li>
          </ul>
        </div>

        <div className="list-col reveal-up">
          <h3 className="list-section-title">Why Choose MotionCraft Studios?</h3>
          <ul className="about-list">
            <li className="about-list-item"><span className="list-bullet"></span>Creative storytelling with purpose</li>
            <li className="about-list-item"><span className="list-bullet"></span>High-quality production standards</li>
            <li className="about-list-item"><span className="list-bullet"></span>Experienced and passionate creatives</li>
            <li className="about-list-item"><span className="list-bullet"></span>Tailored solutions for every client</li>
            <li className="about-list-item"><span className="list-bullet"></span>Reliable delivery and professional service</li>
          </ul>
        </div>
      </div>

      {/* Tagline */}
      <div className="tagline-container reveal-up">
        <p className="closing-tagline">
          MotionCraft Studios <span>brings creativity to motion</span> and transforms ideas into unforgettable visual experiences.
        </p>
      </div>
    </section>
  );
};

export default About;
