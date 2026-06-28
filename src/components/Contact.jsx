import React, { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import gsap from 'gsap';

const contactItems = [
  {
    icon: 'fa-solid fa-envelope',
    label: 'Email',
    value: 'hello@motioncraft.studio',
  },
  {
    icon: 'fa-solid fa-phone',
    label: 'Phone',
    value: '+1 (555) 234-5678',
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: 'Studio',
    value: 'Los Angeles, CA',
  },
];

const socialLinks = [
  { icon: 'fa-brands fa-vimeo-v', label: 'Vimeo', href: '#' },
  { icon: 'fa-brands fa-youtube', label: 'YouTube', href: '#' },
  { icon: 'fa-brands fa-artstation', label: 'ArtStation', href: '#' },
  { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', href: '#' },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const submitBtnRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState({});
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Anime.js stagger entrance for form fields
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fields = section.querySelectorAll('.contact-animate-item');
            animate(fields, {
              opacity: [0, 1],
              translateY: [40, 0],
              delay: stagger(80),
              duration: 800,
              easing: 'easeOutCubic',
            });
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // GSAP magnetic hover effect on submit button
  useEffect(() => {
    const btn = submitBtnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [submitted]);

  const handleFocus = (field) => setFocused((p) => ({ ...p, [field]: true }));
  const handleBlur = (field) => setFocused((p) => ({ ...p, [field]: false }));
  const handleChange = (field, val) => setValues((p) => ({ ...p, [field]: val }));

  const isLabelUp = (field) => focused[field] || values[field]?.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Animate the checkmark
    setTimeout(() => {
      const circle = document.querySelector('.success-circle');
      const check = document.querySelector('.success-check');
      if (circle) {
        animate(circle, {
          scale: [0, 1],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutBack',
        });
      }
      if (check) {
        animate(check, {
          strokeDashoffset: [100, 0],
          duration: 600,
          delay: 400,
          easing: 'easeOutCubic',
        });
      }
    }, 50);
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <style>{`
        .contact-section {
          background: #fff;
          padding: 120px 0;
          position: relative;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .contact-section .section-header {
          margin-bottom: 70px;
        }

        .contact-section .section-subtitle {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #F49B30;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .contact-section .pulse-dot {
          width: 8px;
          height: 8px;
          background: #F49B30;
          border-radius: 50%;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        .contact-section .section-heading {
          font-size: 3.2rem;
          font-weight: 700;
          color: #1A1A1A;
          line-height: 1.15;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* Left column */
        .contact-info-description {
          color: #666;
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 40px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
          opacity: 0;
        }

        .contact-item-icon {
          width: 52px;
          height: 52px;
          border: 1.5px solid #214B41;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #214B41;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .contact-item-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #999;
          margin-bottom: 4px;
        }

        .contact-item-value {
          font-size: 1.05rem;
          color: #1A1A1A;
          font-weight: 500;
        }

        .social-links {
          display: flex;
          gap: 14px;
          margin-top: 44px;
          opacity: 0;
        }

        .social-link {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1.5px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1A1A;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.35s ease;
        }

        .social-link:hover {
          background: #214B41;
          border-color: #214B41;
          color: #fff;
          transform: translateY(-3px);
        }

        /* Right column – Form card */
        .contact-form-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          padding: 48px 44px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
        }

        .form-group {
          position: relative;
          margin-bottom: 36px;
          opacity: 0;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid #ddd;
          padding: 14px 0 10px;
          font-size: 1rem;
          color: #1A1A1A;
          background: transparent;
          outline: none;
          transition: border-color 0.3s ease;
          font-family: inherit;
          resize: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-bottom-color: #214B41;
        }

        .form-group textarea {
          min-height: 100px;
        }

        .floating-label {
          position: absolute;
          left: 0;
          top: 14px;
          font-size: 1rem;
          color: #999;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .floating-label.up {
          top: -8px;
          font-size: 0.72rem;
          color: #214B41;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .submit-btn-wrap {
          text-align: right;
          margin-top: 10px;
          opacity: 0;
        }

        .submit-btn {
          background: #214B41;
          color: #fff;
          border: none;
          padding: 16px 48px;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          display: inline-block;
        }

        .submit-btn:hover {
          background: #1a3d34;
          box-shadow: 0 8px 30px rgba(33, 75, 65, 0.3);
        }

        /* Success state */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 340px;
          text-align: center;
        }

        .success-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #214B41;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
          opacity: 0;
        }

        .success-check {
          stroke: #fff;
          stroke-width: 3;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }

        .success-heading {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 10px;
        }

        .success-text {
          color: #888;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .contact-section .section-heading {
            font-size: 2.2rem;
          }

          .contact-form-card {
            padding: 32px 28px;
          }
        }
      `}</style>

      <div className="contact-container">
        <div className="section-header reveal-up">
          <p className="section-subtitle">
            <span className="pulse-dot"></span>
            Get in Touch
          </p>
          <h2 className="section-heading">Let's Create Together</h2>
        </div>

        <div className="contact-grid">
          {/* Left column */}
          <div className="contact-info">
            <p className="contact-info-description contact-animate-item" style={{ opacity: 0 }}>
              Have a project in mind or want to discuss how motion design can
              elevate your brand? We'd love to hear from you. Reach out and
              let's start creating something extraordinary.
            </p>

            {contactItems.map((item, i) => (
              <div className="contact-item contact-animate-item" key={i}>
                <div className="contact-item-icon">
                  <i className={item.icon}></i>
                </div>
                <div>
                  <div className="contact-item-label">{item.label}</div>
                  <div className="contact-item-value">{item.value}</div>
                </div>
              </div>
            ))}

            <div className="social-links contact-animate-item">
              {socialLinks.map((link, i) => (
                <a
                  className="social-link"
                  href={link.href}
                  key={i}
                  aria-label={link.label}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="contact-form-card contact-animate-item" style={{ opacity: 0 }}>
            {submitted ? (
              <div className="success-state">
                <div className="success-circle">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <polyline
                      className="success-check"
                      points="8,18 15,26 28,10"
                    />
                  </svg>
                </div>
                <h3 className="success-heading">Message Sent!</h3>
                <p className="success-text">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                {['name', 'email', 'subject'].map((field) => (
                  <div className="form-group contact-animate-item" key={field}>
                    <label
                      className={`floating-label ${isLabelUp(field) ? 'up' : ''}`}
                      htmlFor={`contact-${field}`}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={`contact-${field}`}
                      type={field === 'email' ? 'email' : 'text'}
                      value={values[field]}
                      onFocus={() => handleFocus(field)}
                      onBlur={() => handleBlur(field)}
                      onChange={(e) => handleChange(field, e.target.value)}
                      required
                    />
                  </div>
                ))}

                <div className="form-group contact-animate-item">
                  <label
                    className={`floating-label ${isLabelUp('message') ? 'up' : ''}`}
                    htmlFor="contact-message"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={values.message}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="submit-btn-wrap contact-animate-item">
                  <button
                    className="submit-btn"
                    type="submit"
                    ref={submitBtnRef}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
