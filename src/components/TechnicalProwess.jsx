import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const skills = [
  {
    name: 'After Effects',
    icon: 'fa-solid fa-wand-magic-sparkles',
    pct: 98,
    desc: 'Advanced compositing, expressions & motion systems.',
  },
  {
    name: 'Blender',
    icon: 'fa-solid fa-cube',
    pct: 95,
    desc: '3D modeling, rigging, simulation & rendering.',
  },
  {
    name: 'DaVinci Resolve',
    icon: 'fa-solid fa-sliders',
    pct: 90,
    desc: 'Color grading, editing & Fusion VFX.',
  },
  {
    name: 'Photoshop',
    icon: 'fa-solid fa-bezier-curve',
    pct: 92,
    desc: 'Digital painting, photo manipulation & texturing.',
  },
];

const DIAL_SIZE = 120;
const STROKE_WIDTH = 8;
const RADIUS = (DIAL_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* ────────────── Skill Card ────────────── */
function SkillCard({ skill, index }) {
  const dialRef = useRef(null);
  const pctRef = useRef(null);

  return (
    <div
      className="tp-card"
      data-tp-reveal
      data-pct={skill.pct}
      style={{
        background: '#fff',
        border: '1px solid #EBEBEB',
        borderRadius: 20,
        padding: '40px 28px 36px',
        textAlign: 'center',
        transition: 'transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s, border-color .35s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.borderColor = '#214B41';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(33,75,65,0.13)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#EBEBEB';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Icon */}
      <i
        className={skill.icon}
        style={{ fontSize: 30, color: '#214B41', marginBottom: 18, display: 'inline-block' }}
      />

      {/* Skill name */}
      <h3 style={{ margin: '0 0 22px', fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>
        {skill.name}
      </h3>

      {/* SVG Dial */}
      <div style={{ position: 'relative', width: DIAL_SIZE, height: DIAL_SIZE, margin: '0 auto 18px' }}>
        <svg width={DIAL_SIZE} height={DIAL_SIZE} viewBox={`0 0 ${DIAL_SIZE} ${DIAL_SIZE}`}>
          {/* Track */}
          <circle
            cx={DIAL_SIZE / 2}
            cy={DIAL_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#EBEBEB"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Fill */}
          <circle
            ref={dialRef}
            className="tp-dial-fill"
            cx={DIAL_SIZE / 2}
            cy={DIAL_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#214B41"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
            }}
          />
        </svg>

        {/* Percentage text */}
        <span
          ref={pctRef}
          className="tp-pct"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 800,
            color: '#214B41',
          }}
        >
          0%
        </span>
      </div>

      {/* Description */}
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#777' }}>{skill.desc}</p>
    </div>
  );
}

/* ────────────── Technical Prowess Section ────────────── */
export default function TechnicalProwess() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-tp-reveal]');
    if (!cards?.length) return;

    // Set initial hidden state
    cards.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.filter = 'blur(2px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        if (!visible.length) return;

        visible.forEach((el) => observer.unobserve(el));

        /* 1) Card reveal animation */
        animate(
          visible,
          {
            translateY: [50, 0],
            opacity: [0, 1],
            filter: ['blur(2px)', 'blur(0px)'],
          },
          {
            duration: 850,
            ease: 'outExpo',
            delay: stagger(140),
          },
        );

        /* 2) Dial fill + counter for each visible card */
        visible.forEach((card, i) => {
          const pct = parseInt(card.dataset.pct, 10);
          const fillCircle = card.querySelector('.tp-dial-fill');
          const pctText = card.querySelector('.tp-pct');
          const targetOffset = CIRCUMFERENCE - (CIRCUMFERENCE * pct) / 100;

          // Animate stroke-dashoffset
          animate(
            fillCircle,
            { strokeDashoffset: [CIRCUMFERENCE, targetOffset] },
            {
              duration: 1200,
              ease: 'outCubic',
              delay: 300 + i * 140,
            },
          );

          // Animate counter text
          const counter = { val: 0 };
          animate(
            counter,
            { val: [0, pct] },
            {
              duration: 1200,
              ease: 'outCubic',
              delay: 300 + i * 140,
              onUpdate: () => {
                pctText.textContent = `${Math.round(counter.val)}%`;
              },
            },
          );
        });
      },
      { threshold: 0.18 },
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
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
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#214B41',
              display: 'inline-block',
              animation: 'tpPulse 1.8s ease-in-out infinite',
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
            Expertise
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 52, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1 }}>
          Technical Prowess
        </h2>
      </div>

      {/* ── Grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 28,
        }}
        className="tp-grid"
      >
        {skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} index={i} />
        ))}
      </div>

      {/* Responsive + pulse styles */}
      <style>{`
        @keyframes tpPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.45); opacity: .55; }
        }
        @media (max-width: 1024px) {
          .tp-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .tp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
