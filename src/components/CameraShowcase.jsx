import React, { useState, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const projectsData = [
  {
    id: 1,
    client: 'Bank of Namibia',
    title: 'WayaMe Product Launch Campaign',
    category: 'Banking & Digital Payments',
    summary: 'Motion graphics and 2D animation produced to support the launch of WayaMe, a digital payment solution — simplifying complex concepts and communicating product benefits for digital campaigns while maintaining Bank of Namibia\'s brand standards.',
    previewMedia: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782650430/vertical_landscape_tzw7ua.mp4',
    services: [
      'Motion Graphics Design',
      '2D Animation',
      'Storyboarding',
      'Video Editing',
      'Visual Design for Digital Campaigns'
    ]
  },
  {
    id: 2,
    client: 'NAMPA',
    title: 'NDP6 Public Awareness Animation',
    category: 'Government & Public Communication',
    summary: 'A series of motion graphics and animated content explaining Namibia\'s Sixth National Development Plan (NDP6) for Independence celebrations — turning policy information into clear, accessible visuals for digital and broadcast.',
    previewMedia: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782651893/7_Priority_Areas_yijldw.mp4',
    mediaFiles: [
      { label: 'Priority Areas', url: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782651893/7_Priority_Areas_yijldw.mp4' },
      { label: 'NDP6 Animation', url: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782654099/Animation_lkd6ln.mp4' },
      { label: 'Meme Netumbo Show', url: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782651306/Meme_Netumbo_Slide_Show_j766r8.mp4' }
    ],
    services: [
      'Motion Graphics Design',
      '2D Animation',
      'Information Design',
      'Storyboarding',
      'Video Editing',
      'Social Media & Broadcast Content'
    ]
  },
  {
    id: 3,
    client: 'CNNC Rössing Uranium',
    title: '50th Anniversary Logo Animation',
    category: 'Mining & Natural Resources',
    summary: 'A premium 50th-anniversary logo animation honoring Rössing Uranium\'s legacy, using cinematic motion design, refined transitions, and polished VFX to create a memorable brand asset for corporate and event media.',
    previewMedia: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782650489/final_rossing_fgbgox.mp4',
    services: [
      'Logo Animation',
      'Motion Graphics',
      'Visual Effects (VFX)',
      'Animation Direction',
      'Video Editing',
      'Brand Animation'
    ]
  },
  {
    id: 4,
    client: 'TN Errands',
    title: 'Promotional Motion Graphics Advertisement',
    category: 'Logistics & Errand Services',
    summary: 'A dynamic motion graphics ad using kinetic typography, custom illustration, and smooth transitions to promote TN Errands\' delivery services, optimized for social media and digital marketing.',
    previewMedia: 'https://res.cloudinary.com/ddsvsarzv/video/upload/v1782651500/main_final_final_website_j17g2t.mp4',
    services: [
      'Motion Graphics',
      'Kinetic Typography',
      'Video Editing',
      'Social Media Content',
      'Visual Effects',
      'Storyboarding'
    ]
  }
];

const CameraShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nampaVideoUrl, setNampaVideoUrl] = useState(projectsData[1].previewMedia);
  const [isMobile, setIsMobile] = useState(false);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);
  const bubbleRefs = useRef([]);
  const prevIndexRef = useRef(0);

  // Background refs
  const greenBlobRef = useRef(null);
  const orangeBlobRef = useRef(null);
  const whiteBlobRef = useRef(null);
  const particleRefs = useRef([]);
  const waveRefs = useRef([]);

  // Detail panel refs for GSAP targeting
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);

  // Check mobile device size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Initial Entrance reveal for first card on load (Cinematic Zoom Reveal)
  useEffect(() => {
    if (isMobile) return;
    
    gsap.fromTo(cardRefs.current[0],
      { scale: 1.08, opacity: 0 },
      { scale: 1.0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.1 }
    );
  }, [isMobile]);

  // GSAP 3D Scroll transition, glass bubble flow, and details staggered reveals
  useEffect(() => {
    if (isMobile) return;

    const prevIndex = prevIndexRef.current;

    // Get active left and right containers
    const activeLeft = leftRefs.current[activeIndex];
    const activeRight = rightRefs.current[activeIndex];

    // 1. Spawning bubble flow animation (Intros bubble flow)
    const bubbles = bubbleRefs.current;
    if (prevIndex !== activeIndex && bubbles.length > 0) {
      gsap.fromTo(bubbles,
        {
          x: () => gsap.utils.random(-250, 250), // Spawns across full viewport width
          y: 350,
          scale: 0,
          opacity: 0
        },
        {
          y: -450,
          scale: () => gsap.utils.random(0.4, 2.0),
          opacity: [0, 0.75, 0.75, 0], // Fade in then fade out at top
          duration: 1.3,
          stagger: {
            each: 0.04,
            from: "random"
          },
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    }

    // 2. Animate Out previous card (Cinematic Zoom Fade Out)
    const cards = cardRefs.current;
    const prevCard = cards[prevIndex];
    if (prevIndex !== activeIndex && prevCard) {
      gsap.to(prevCard, {
        scale: 1.05,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        overwrite: 'auto'
      });
    }

    // 3. Animate In new card (Cinematic Zoom-In Fade In)
    const activeCard = cards[activeIndex];
    if (prevIndex !== activeIndex && activeCard) {
      gsap.fromTo(activeCard,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1.0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    }

    // 4. GSAP Details Staggered reveals
    const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });

    if (activeLeft) {
      const indexLabel = activeLeft.querySelector('.project-index-label');
      const clientWords = activeLeft.querySelectorAll('.client-word');
      const categoryLabel = activeLeft.querySelector('.project-category-label');

      if (indexLabel) tl.fromTo(indexLabel, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0);
      if (clientWords.length > 0) tl.fromTo(clientWords, { y: '100%' }, { y: '0%', duration: 0.7, stagger: 0.05, ease: 'power3.out' }, 0.08);
      if (categoryLabel) tl.fromTo(categoryLabel, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.22);
    }

    if (activeRight) {
      const summaryTitle = activeRight.querySelector('.summary-title');
      const summaryText = activeRight.querySelector('.project-summary-text');
      const servicesTitle = activeRight.querySelector('.services-title');
      const badges = activeRight.querySelectorAll('.service-badge');
      const switcher = activeRight.querySelector('.nampa-switcher-wrap');

      if (summaryTitle) tl.fromTo(summaryTitle, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.12);
      if (summaryText) tl.fromTo(summaryText, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.18);
      if (servicesTitle) tl.fromTo(servicesTitle, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.26);
      if (badges.length > 0) tl.fromTo(badges, { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(1.5)' }, 0.32);

      if (switcher) {
        tl.fromTo(switcher, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.42);
      }
    }

    // 5. Reset outgoing details coordinates to prepare for next animation loop
    if (prevIndex !== activeIndex) {
      const oldLeft = leftRefs.current[prevIndex];
      const oldRight = rightRefs.current[prevIndex];
      if (oldLeft) {
        const clientWords = oldLeft.querySelectorAll('.client-word');
        if (clientWords.length > 0) gsap.set(clientWords, { y: '100%' });
        
        const resetLeft = [
          oldLeft.querySelector('.project-index-label'),
          oldLeft.querySelector('.project-category-label')
        ].filter(Boolean);
        if (resetLeft.length > 0) gsap.set(resetLeft, { opacity: 0, y: 15 });
      }
      if (oldRight) {
        const resetRight = [
          oldRight.querySelector('.summary-title'),
          oldRight.querySelector('.project-summary-text'),
          oldRight.querySelector('.services-title'),
          oldRight.querySelector('.nampa-switcher-wrap')
        ].filter(Boolean);
        if (resetRight.length > 0) gsap.set(resetRight, { opacity: 0, y: 15 });
        
        const badges = oldRight.querySelectorAll('.service-badge');
        if (badges.length > 0) gsap.set(badges, { scale: 0 });
      }
    }

    prevIndexRef.current = activeIndex;
  }, [activeIndex, isMobile, nampaVideoUrl]);

  // Connect GSAP ScrollTrigger to track active project and background animations
  useEffect(() => {
    if (isMobile) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: 'top top',
      end: '+=300%', // Pinned scroll track
      pin: viewportRef.current,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // 1. Calculate active index based on scroll position
        let idx = Math.floor(progress * projectsData.length);
        if (idx >= projectsData.length) idx = projectsData.length - 1;
        setActiveIndex(idx);

        // 2. Parallax scroll background particles
        const particles = particleRefs.current;
        particles.forEach((p, pIdx) => {
          if (!p) return;
          const speed = ((pIdx % 3) + 1.2) * 90; // coefficients of 108px, 198px, 288px Y-offset
          gsap.set(p, { y: -progress * speed });
        });

        // 3. Dynamic ambient background color blob transitions
        const greenBlob = greenBlobRef.current;
        const orangeBlob = orangeBlobRef.current;
        const whiteBlob = whiteBlobRef.current;

        if (greenBlob && orangeBlob && whiteBlob) {
          // Green blob moves and fades down as we scroll
          gsap.set(greenBlob, {
            x: progress * 160,
            y: progress * -120,
            opacity: 0.28 - progress * 0.20, /* bright at project 1 (Bank of Namibia), fades to 0.08 */
            scale: 1 + progress * 0.25
          });
          // Orange blob shifts and grows brighter as we scroll down to projects 2/3/4
          gsap.set(orangeBlob, {
            x: -progress * 220,
            y: progress * -180,
            opacity: 0.10 + progress * 0.25, /* start at 0.10, rises to 0.35 */
            scale: 0.8 + progress * 0.45
          });
          // White centered ambient backlight scales and shifts slightly
          gsap.set(whiteBlob, {
            x: -progress * 50,
            y: progress * 50,
            scale: 1.0 + Math.sin(progress * Math.PI) * 0.15
          });
        }

        // 4. Flowing background lines (stroke offset and dual axis parallax)
        const waves = waveRefs.current;
        waves.forEach((w, wIdx) => {
          if (!w) return;
          const speedX = (wIdx % 2 === 0 ? -1 : 1) * (wIdx + 1) * 75; // horizontal parallax drift
          const speedY = -(wIdx + 1.2) * 45;                           // vertical parallax drift
          const flowSpeed = (wIdx + 1) * 350;                           // stroke offset velocity

          gsap.set(w, {
            x: progress * speedX,
            y: progress * speedY,
            strokeDashoffset: progress * flowSpeed
          });
        });
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [isMobile]);

  // Parallax Spatial UI cursor-tracking tilt on the full-screen background video cards
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const container = cardsContainerRef.current;
      if (!container) return;

      const xNorm = (e.clientX / window.innerWidth) - 0.5; // -0.5 to 0.5
      const yNorm = (e.clientY / window.innerHeight) - 0.5;

      // Subtle shifting of full-bleed backdrop container for 3D parallax depth
      gsap.to(container, {
        x: xNorm * 15,
        y: yNorm * 15,
        duration: 1.0,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Manage video plays & pauses based on active state
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (isMobile) {
        video.play().catch(() => {});
      } else {
        if (idx === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex, isMobile, nampaVideoUrl]);

  const handleNampaVideoSelect = (url) => {
    setNampaVideoUrl(url);
  };

  const progressPercent = ((activeIndex + 1) / projectsData.length) * 100;

  // Responsive Layout for Mobile Touch screens
  if (isMobile) {
    return (
      <section id="work" className="work-section">
        <style>{`
          .mobile-camera-row {
            border-bottom: 1px solid var(--color-border);
            padding: 48px 20px;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .mobile-camera-media {
            width: 100%;
            aspect-ratio: 16/9;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--color-border);
            background-color: #000;
          }
          .mobile-camera-media video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>
        <div className="work-title-wrap">
          <h2 className="work-section-title">Selected Projects</h2>
        </div>
        <div className="work-list-container">
          {projectsData.map((project) => {
            const isNampa = project.id === 2;
            const videoSrc = isNampa ? nampaVideoUrl : project.previewMedia;

            return (
              <div key={project.id} className="mobile-camera-row">
                <span className="project-index-label">Project 0{project.id}</span>
                <h3 className="project-client-name">{project.client}</h3>
                <span className="project-category-label">{project.category}</span>
                
                <div className="mobile-camera-media">
                  <video
                    src={videoSrc}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                </div>

                <div className="frosted-glass-card">
                  <p className="project-summary-text">{project.summary}</p>
                </div>
                
                <div className="drawer-body">
                  <h4 className="info-section-title">Services</h4>
                  <div className="project-services-tags">
                    {project.services.map((service, sIdx) => (
                      <span key={sIdx} className="service-badge">{service}</span>
                    ))}
                  </div>
                </div>

                {isNampa && project.mediaFiles && (
                  <div className="nampa-switcher-wrap">
                    {project.mediaFiles.map((file, fIdx) => (
                      <button
                        key={fIdx}
                        className={`switcher-btn ${nampaVideoUrl === file.url ? 'active' : ''}`}
                        onClick={() => handleNampaVideoSelect(file.url)}
                      >
                        {file.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Desktop View: 3-column constrained flex grid deck showcase with full-bleed background video
  return (
    <div ref={trackRef} className="camera-showcase-track">
      <section ref={viewportRef} id="work" className="camera-showcase-viewport">
        
        {/* Full-Screen Background Video Cards Container */}
        <div ref={cardsContainerRef} className="showcase-cards-container">
          {projectsData.map((project, idx) => {
            const isActive = idx === activeIndex;
            const isNampa = project.id === 2;
            const videoSrc = isNampa ? nampaVideoUrl : project.previewMedia;

            return (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`showcase-video-card ${isActive ? 'active' : ''}`}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'scale(1.0)' : 'scale(1.05)',
                  pointerEvents: 'none'
                }}
              >
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={videoSrc}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="showcase-video"
                />
                <div className="showcase-shine" />
              </div>
            );
          })}

          {/* Dark radial vignette overlay for legibility */}
          <div className="showcase-bg-vignette" />

          {/* Premium glass bubble flow overlay (full viewport width) */}
          <div className="bubble-flow-overlay">
            {[...Array(16)].map((_, i) => {
              const colorClass = i % 3 === 1 ? 'accent-orange' : i % 3 === 2 ? 'accent-green' : '';
              return (
                <div
                  key={i}
                  ref={(el) => (bubbleRefs.current[i] = el)}
                  className={`glass-bubble ${colorClass}`}
                  style={{
                    width: `${25 + (i * 3) % 40}px`,
                    aspectRatio: '1',
                    left: `${10 + (i * 7) % 80}%`,
                    bottom: '-80px'
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Ambient Background Elements */}
        <div className="showcase-bg-elements">
          <div ref={greenBlobRef} className="bg-glow-blob blob-green" />
          <div ref={orangeBlobRef} className="bg-glow-blob blob-orange" />
          <div ref={whiteBlobRef} className="bg-glow-blob blob-white" />
          
          {/* Flowing background bezier line curves */}
          <svg className="bg-wave-svg" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              ref={(el) => (waveRefs.current[0] = el)}
              d="M -100,200 C 300,100 600,400 1000,200 C 1200,100 1400,300 1600,200"
              stroke="rgba(33, 75, 65, 0.22)"
              strokeWidth="2.0"
              strokeDasharray="1200"
            />
            <path
              ref={(el) => (waveRefs.current[1] = el)}
              d="M -100,500 C 400,600 700,200 1100,500 C 1300,600 1500,400 1600,550"
              stroke="rgba(235, 134, 13, 0.16)"
              strokeWidth="1.5"
              strokeDasharray="1200"
            />
            <path
              ref={(el) => (waveRefs.current[2] = el)}
              d="M -100,350 C 350,250 650,450 950,250 C 1250,150 1450,350 1600,300"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.0"
              strokeDasharray="1200"
            />
          </svg>
          
          {/* Parallax background micro-particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (particleRefs.current[i] = el)}
              className="bg-particle"
              style={{
                width: `${3 + i % 4}px`,
                aspectRatio: '1',
                top: `${15 + (i * 13) % 70}%`,
                left: `${5 + (i * 23) % 90}%`
              }}
            />
          ))}
        </div>

        <div className="camera-container">
          
          {/* Left Column: Left details mapped */}
          <div className="project-detail-column-left">
            {projectsData.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={project.id}
                  ref={(el) => (leftRefs.current[idx] = el)}
                  className={`project-detail-left ${isActive ? 'active' : ''}`}
                >
                  <span className="project-index-label" style={{ opacity: idx === 0 ? 1 : 0 }}>
                    Project 0{project.id}
                  </span>
                  <h3 className="project-client-name">
                    {project.client.split(' ').map((word, wIdx) => (
                      <span key={wIdx} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                        <span className="client-word" style={{ display: 'inline-block', transform: idx === 0 ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)' }}>
                          {word}&nbsp;
                        </span>
                      </span>
                    ))}
                  </h3>
                  <span className="project-category-label" style={{ opacity: idx === 0 ? 1 : 0 }}>
                    {project.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Column: Empty space so full-bleed video is showcased cleanly */}
          <div className="showcase-center-column-gap" style={{ width: '100%', height: '1px' }} />

          {/* Right Column: Right details mapped */}
          <div className="project-detail-column-right">
            {projectsData.map((project, idx) => {
              const isActive = idx === activeIndex;
              const isNampa = project.id === 2;

              return (
                <div
                  key={project.id}
                  ref={(el) => (rightRefs.current[idx] = el)}
                  className={`project-detail-right ${isActive ? 'active' : ''}`}
                >
                  {/* Frosted Liquid Glass Card for Summary */}
                  <div className="frosted-glass-card">
                    <h4 className="info-section-title summary-title" style={{ opacity: idx === 0 ? 1 : 0 }}>Summary</h4>
                    <p className="project-summary-text" style={{ opacity: idx === 0 ? 1 : 0 }}>{project.summary}</p>
                  </div>
                  
                  <div>
                    <h4 className="info-section-title services-title" style={{ opacity: idx === 0 ? 1 : 0 }}>Services</h4>
                    <div className="project-services-tags">
                      {project.services.map((service, sIdx) => (
                        <span
                          key={sIdx}
                          className="service-badge"
                          style={{ transform: idx === 0 ? 'scale(1)' : 'scale(0)' }}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Multi-video Playlist Selector for NAMPA */}
                  {isNampa && project.mediaFiles && (
                    <div className="nampa-switcher-wrap" style={{ opacity: idx === 0 ? 1 : 0 }}>
                      <h4 className="info-section-title">Campaign Media Playlist</h4>
                      {projectsData[1].mediaFiles.map((file, fIdx) => (
                        <button
                          key={fIdx}
                          className={`switcher-btn hover-target ${nampaVideoUrl === file.url ? 'active' : ''}`}
                          onClick={() => handleNampaVideoSelect(file.url)}
                        >
                          {file.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Progress Tracker */}
        <div className="showcase-footer">
          <div className="showcase-counter">
            <span>0{activeIndex + 1}</span> / 0{projectsData.length}
          </div>
          <div className="showcase-progressbar-track">
            <div
              className="showcase-progressbar-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Scroll Cue to About section */}
        <div
          className="showcase-scroll-cue hover-target"
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span>Scroll to About</span>
          <span>↓</span>
        </div>
      </section>
    </div>
  );
};

export default CameraShowcase;
