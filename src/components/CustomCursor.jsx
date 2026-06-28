import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Check if device supports hover (desktop)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isHoverable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.video-card') ||
        target.closest('.social-btn') ||
        target.closest('.primary-btn') ||
        target.closest('.hero-service-link') ||
        target.closest('.skill-card') ||
        target.classList.contains('hover-target');

      if (isHoverable) {
        dot.classList.add('hovered');
        ring.classList.add('hovered');
      } else {
        dot.classList.remove('hovered');
        ring.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
