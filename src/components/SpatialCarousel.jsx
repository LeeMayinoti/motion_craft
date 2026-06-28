import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const projects = [
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

const SpatialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [nampaVideoUrl, setNampaVideoUrl] = useState(projects[1].previewMedia);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const contentRefs = useRef([]);
  const backgroundRefs = useRef([]);

  // Check device capabilities (touch / motion settings)
  useEffect(() => {
    const checkCapabilities = () => {
      const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 992;
      setIsMobile(isTouch);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => {
      setReducedMotion(e.matches);
    };

    checkCapabilities();
    window.addEventListener('resize', checkCapabilities);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkCapabilities);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Parallax Spatial UI effect: Tilt active slide relative to cursor position
  useEffect(() => {
    if (isMobile || reducedMotion || isDrawerOpen) return;

    const handleMouseMove = (e) => {
      const activeContent = contentRefs.current[activeIndex];
      const activeBackground = backgroundRefs.current[activeIndex];

      if (!activeContent || !activeBackground) return;

      const xNorm = (e.clientX / window.innerWidth) - 0.5; // -0.5 to 0.5
      const yNorm = (e.clientY / window.innerHeight) - 0.5;

      // Gentle rotation for the active slide content
      gsap.to(activeContent, {
        rotateY: xNorm * 18,
        rotateX: -yNorm * 18,
        x: xNorm * 30,
        y: yNorm * 30,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Opposite parallax translation for the background media layer
      gsap.to(activeBackground, {
        x: -xNorm * 40,
        y: -yNorm * 40,
        scale: 1.15,
        duration: 1.0,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeIndex, isMobile, reducedMotion, isDrawerOpen]);

  // Handle slide transitions with 3D folding animations
  const goToNextSlide = () => {
    if (isAnimating) return;
    const nextIndex = (activeIndex + 1) % projects.length;
    perform3DTransition(nextIndex);
  };

  const perform3DTransition = (targetIndex) => {
    if (isAnimating || targetIndex === activeIndex) return;
    setIsAnimating(true);

    const currentSlide = slideRefs.current[activeIndex];
    const nextSlide = slideRefs.current[targetIndex];
    const currentContent = contentRefs.current[activeIndex];
    const nextContent = contentRefs.current[targetIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(targetIndex);
        setIsAnimating(false);
      }
    });

    if (!reducedMotion) {
      // 1. Reset any mouse parallax on current slide elements
      gsap.set([currentContent, nextContent], { transformPerspective: 1000 });

      // 2. Animate out current slide (rotate 3D away and scale back)
      tl.to(currentSlide, {
        rotateY: 90, // Fold clockwise
        z: -300,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut'
      }, 0);

      // 3. Set starting configuration of the next slide (folded from the left)
      gsap.set(nextSlide, {
        rotateY: -90,
        z: -300,
        opacity: 0,
        pointerEvents: 'none'
      });

      // 4. Animate in next slide (rotate into flat view)
      tl.to(nextSlide, {
        rotateY: 0,
        z: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.inOut'
      }, 0);
    } else {
      // Simple immediate fade for reduced motion users
      tl.to(currentSlide, { opacity: 0, duration: 0.4 }, 0);
      tl.to(nextSlide, { opacity: 1, duration: 0.4 }, 0);
    }
  };

  const handlePlaylistSelect = (url) => {
    setNampaVideoUrl(url);
  };

  const activeProject = projects[activeIndex];
  const progressPercent = ((activeIndex + 1) / projects.length) * 100;

  return (
    <section id="work" className="carousel-viewport">
      <div ref={containerRef} className="carousel-container">
        {projects.map((project, idx) => {
          const isActive = idx === activeIndex;
          const isNampa = project.id === 2;
          const videoSrc = isNampa ? nampaVideoUrl : project.previewMedia;

          return (
            <div
              key={project.id}
              ref={(el) => (slideRefs.current[idx] = el)}
              className={`carousel-slide ${isActive ? 'active' : ''}`}
              style={{
                display: isActive ? 'flex' : 'none',
                opacity: isActive ? 1 : 0
              }}
            >
              {/* Cinematic Background Layer */}
              <div
                ref={(el) => (backgroundRefs.current[idx] = el)}
                className="slide-bg-media"
              >
                <video
                  key={videoSrc}
                  src={videoSrc}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                />
                <div className="slide-bg-overlay"></div>
              </div>

              {/* 3D Spaced Content Layer */}
              <div
                ref={(el) => (contentRefs.current[idx] = el)}
                className="slide-content"
              >
                <div className="slide-sub-header">{project.category}</div>
                <h2 className="slide-title">
                  <span>{project.client}</span>
                  {project.title}
                </h2>
                
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="detail-toggle-btn hover-target"
                >
                  View Details
                </button>

                {/* Primary circular navigation button */}
                <button
                  onClick={goToNextSlide}
                  className="nav-arrow-button hover-target"
                  aria-label="Next Project"
                >
                  <span className="nav-arrow-icon">→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Counter & Progress Indicators */}
      <div className="carousel-footer">
        <div className="counter-display">
          <span>0{activeIndex + 1}</span> / 0{projects.length}
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Scroll indicator/cue to explore About section */}
      <div
        className="carousel-scroll-cue hover-target"
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

      {/* Spatial Details Drawer Overlay */}
      <div
        className={`project-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className={`project-drawer ${isDrawerOpen ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="drawer-close hover-target"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close details"
          >
            ✕
          </button>

          <div className="drawer-content">
            <div className="drawer-header">
              <span className="drawer-client">{activeProject.client}</span>
              <h3 className="drawer-title">{activeProject.title}</h3>
            </div>

            <div className="drawer-body">
              <h4 className="drawer-section-title">Summary</h4>
              <p className="drawer-summary">{activeProject.summary}</p>
            </div>

            <div className="drawer-body">
              <h4 className="drawer-section-title">Services</h4>
              <div className="drawer-services">
                {activeProject.services.map((service, idx) => (
                  <span key={idx} className="drawer-service-tag">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Campaign Playlist for NAMPA */}
            {activeProject.id === 2 && activeProject.mediaFiles && (
              <div className="drawer-body">
                <h4 className="drawer-section-title">Campaign Media Playlist</h4>
                <div className="drawer-video-playlist">
                  {activeProject.mediaFiles.map((file, idx) => (
                    <button
                      key={idx}
                      className={`drawer-playlist-btn hover-target ${nampaVideoUrl === file.url ? 'active' : ''}`}
                      onClick={() => handlePlaylistSelect(file.url)}
                    >
                      {file.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="drawer-footer">
            <span className="drawer-client">MotionCraft Studios</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpatialCarousel;
