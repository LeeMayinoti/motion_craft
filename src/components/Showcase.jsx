import React, { useEffect, useRef, useState, useCallback } from 'react';
import { animate, stagger } from 'animejs';

const projects = [
  {
    id: 1,
    title: 'Vertical Landscape',
    category: 'Motion Design',
    video: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782650430/vertical_landscape_tzw7ua.mp4',
  },
  {
    id: 2,
    title: 'Final Crossing',
    category: 'Visual Effects',
    video: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782650489/final_rossing_fgbgox.mp4',
  },
  {
    id: 3,
    title: 'Netumbo Slide Show',
    category: 'Commercial Production',
    video: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782651306/Meme_Netumbo_Slide_Show_j766r8.mp4',
  },
  {
    id: 4,
    title: 'Main Website Reel',
    category: '3D CGI / Interaction',
    video: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782651500/main_final_final_website_j17g2t.mp4',
  },
];

/* ───────────────────── Lightbox ───────────────────── */
function Lightbox({ project, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animate open
    animate(overlayRef.current, { opacity: [0, 1] }, { duration: 350, ease: 'outQuad' });
    animate(
      contentRef.current,
      { scale: [0.9, 1], opacity: [0, 1] },
      { duration: 450, ease: 'outBack(1.4)' },
    );
  }, []);

  const handleClose = useCallback(() => {
    animate(contentRef.current, { scale: 0.92, opacity: 0 }, { duration: 280, ease: 'inQuad' });
    animate(overlayRef.current, { opacity: 0 }, { duration: 320, ease: 'inQuad' }).then(() =>
      onClose(),
    );
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        cursor: 'pointer',
      }}
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '88vw',
          maxWidth: 1100,
          borderRadius: 16,
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
          opacity: 0,
          cursor: 'default',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close lightbox"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(6px)',
            color: '#fff',
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background .25s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <video
          src={project.video}
          controls
          autoPlay
          style={{ display: 'block', width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

/* ───────────────── Project Card ───────────────── */
function ProjectCard({ project, index, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="showcase-card"
      data-reveal
      data-index={index}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        aspectRatio: '16/9',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform .45s cubic-bezier(.22,1,.36,1)',
        boxShadow: hovered
          ? '0 20px 50px rgba(33,75,65,0.18)'
          : '0 8px 30px rgba(0,0,0,0.08)',
      }}
    >
      {/* Background video */}
      <video
        src={project.video}
        muted
        loop
        autoPlay
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
          transition: 'background .4s',
        }}
      />

      {/* Bottom info */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: 1.8,
              textTransform: 'uppercase',
              color: '#F49B30',
            }}
          >
            {project.category}
          </p>
          <h3 style={{ margin: '6px 0 0', fontSize: 26, fontWeight: 700, color: '#fff' }}>
            {project.title}
          </h3>
        </div>

        {/* View button */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: '#214B41',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'transform .3s, background .3s',
            transform: hovered ? 'scale(1.12)' : 'scale(1)',
          }}
        >
          <i className="fa-solid fa-arrow-right" style={{ color: '#fff', fontSize: 18 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Showcase Section ───────────────── */
export default function Showcase() {
  const sectionRef = useRef(null);
  const [lightboxProject, setLightboxProject] = useState(null);

  /* Reveal animation via IntersectionObserver */
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-reveal]');
    if (!cards?.length) return;

    // Set initial hidden state
    cards.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(80px)';
      el.style.filter = 'blur(4px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            observer.unobserve(el);

            animate(
              el,
              {
                translateY: [80, 0],
                opacity: [0, 1],
                filter: ['blur(4px)', 'blur(0px)'],
              },
              {
                duration: 950,
                ease: 'outCubic',
              }
            );
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          background: '#fff',
          padding: '100px 5vw 120px',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        {/* ── Header ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            {/* Pulse dot */}
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#214B41',
                display: 'inline-block',
                animation: 'showcasePulse 1.8s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                color: '#214B41',
              }}
            >
              Our Works
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: 52, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1 }}>
            Projects
          </h2>
        </div>

        {/* ── Cards (stacked) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setLightboxProject} />
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxProject && (
        <Lightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
      )}

      {/* Pulse keyframe */}
      <style>{`
        @keyframes showcasePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.45); opacity: .55; }
        }
      `}</style>
    </>
  );
}
