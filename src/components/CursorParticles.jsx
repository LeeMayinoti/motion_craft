import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const POOL_SIZE = 25;
const SHAPES = ['circle', 'triangle', 'square', 'cross', 'plus'];
const COLORS = ['#214B41', '#F49B30', '#EBEBEB'];

export default function CursorParticles() {
  const containerRef = useRef(null);
  const poolRef = useRef([]);
  const indexRef = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const threshold = 15; // Min distance moved to spawn a particle

  useEffect(() => {
    // Only enable on desktop/hover devices
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    // Create particles DOM elements inside the container
    const container = containerRef.current;
    if (!container) return;

    const elements = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const el = document.createElement('div');
      el.className = 'cursor-particle';
      el.style.position = 'absolute';
      el.style.pointerEvents = 'none';
      el.style.opacity = '0';
      el.style.zIndex = '99999';
      container.appendChild(el);
      elements.push(el);
    }
    poolRef.current = elements;

    const onMouseMove = (e) => {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < threshold) return;

      lastMousePos.current = { x: e.clientX, y: e.clientY };

      const el = poolRef.current[indexRef.current];
      indexRef.current = (indexRef.current + 1) % POOL_SIZE;

      // Randomize shape and color
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = 8 + Math.random() * 12;

      // Clear old content/classes
      el.className = `cursor-particle ${shape}`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.borderColor = color;
      el.style.backgroundColor = shape === 'circle' || shape === 'square' ? 'transparent' : color;
      
      if (shape === 'triangle') {
        el.style.borderLeftColor = 'transparent';
        el.style.borderRightColor = 'transparent';
        el.style.borderBottomColor = color;
      }

      // Random path trajectory
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 30; // Float upwards slightly

      // Animate using anime.js
      animate(el, {
        translateX: [0, tx],
        translateY: [0, ty],
        rotate: [0, (Math.random() - 0.5) * 360],
        scale: [0.6, 1.2, 0],
        opacity: [0.8, 0],
        duration: 800 + Math.random() * 600,
        ease: 'outQuart'
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden'
      }}
    >
      <style>{`
        .cursor-particle {
          box-sizing: border-box;
          transform-origin: center;
        }

        .cursor-particle.circle {
          border: 1.5px solid;
          border-radius: 50%;
        }

        .cursor-particle.square {
          border: 1.5px solid;
          border-radius: 2px;
        }

        .cursor-particle.triangle {
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
          border-style: solid;
          border-width: 0 8px 14px 8px;
          border-left-color: transparent !important;
          border-right-color: transparent !important;
        }

        .cursor-particle.cross {
          position: absolute;
          background: none !important;
        }
        .cursor-particle.cross::before,
        .cursor-particle.cross::after {
          content: '';
          position: absolute;
          background: currentColor;
          top: 0; left: 50%;
          width: 2px; height: 100%;
          transform: translateX(-50%);
        }
        .cursor-particle.cross::after {
          transform: translateX(-50%) rotate(90deg);
        }

        .cursor-particle.plus {
          position: absolute;
          background: none !important;
        }
        .cursor-particle.plus::before,
        .cursor-particle.plus::after {
          content: '';
          position: absolute;
          background: currentColor;
          top: 0; left: 50%;
          width: 1.5px; height: 100%;
          transform: translateX(-50%);
        }
        .cursor-particle.plus::after {
          transform: translateX(-50%) rotate(90deg);
        }
      `}</style>
    </div>
  );
}
