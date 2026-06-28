import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

const ProjectRow = ({ project, isExpanded, onToggle, reducedMotion }) => {
  const detailsRef = useRef(null);
  const videoRef = useRef(null);
  const orbWrapperRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(project.previewMedia);

  useEffect(() => {
    if (project.mediaFiles) {
      setSelectedVideo(project.mediaFiles[0].url);
    } else {
      setSelectedVideo(project.previewMedia);
    }
  }, [project]);

  // GSAP ScrollTrigger for revealing the orb and controlling video playback
  useEffect(() => {
    const orbWrapper = orbWrapperRef.current;
    const video = videoRef.current;

    if (!orbWrapper || !video) return;

    // 1. Reveal Animation on Scroll
    let revealTween = null;
    if (!reducedMotion) {
      revealTween = gsap.fromTo(
        orbWrapper,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: orbWrapper,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    } else {
      gsap.set(orbWrapper, { opacity: 1, scale: 1 });
    }

    // 2. Playback Control on Scroll
    const playTrigger = ScrollTrigger.create({
      trigger: orbWrapper,
      start: 'top 92%',
      end: 'bottom 8%',
      onEnter: () => {
        video.play().catch(() => {});
      },
      onLeave: () => {
        video.pause();
      },
      onEnterBack: () => {
        video.play().catch(() => {});
      },
      onLeaveBack: () => {
        video.pause();
      },
    });

    return () => {
      if (revealTween) revealTween.kill();
      playTrigger.kill();
    };
  }, [reducedMotion]);

  // Accordion details toggle handler
  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    if (isExpanded) {
      gsap.fromTo(
        details,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          onUpdate: () => {
            ScrollTrigger.refresh();
          },
          onComplete: () => {
            ScrollTrigger.refresh();
          }
        }
      );
    } else {
      gsap.to(details, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onUpdate: () => {
          ScrollTrigger.refresh();
        },
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      });
    }
  }, [isExpanded]);

  const handleVideoSelect = (url) => {
    setSelectedVideo(url);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className={`project-row-wrapper ${isExpanded ? 'row-expanded' : ''}`}>
      <div className="project-row" onClick={onToggle}>
        {/* Left column details */}
        <div className="project-row-left hover-target">
          <div className="project-category">{project.category}</div>
          <div className="project-title-container">
            <span className="project-client">{project.client}</span>
            <span className="title-divider">—</span>
            <span className="project-title serif-display italic">{project.title}</span>
          </div>
          <div className="project-arrow-box">
            <span className="project-arrow">→</span>
          </div>
        </div>

        {/* Right column: inline liquid glass video orb */}
        <div ref={orbWrapperRef} className="inline-orb-wrapper">
          {/* Spinning SVG text badge */}
          <svg viewBox="0 0 100 100" className="inline-rotating-text">
            <path id={`textPath-${project.id}`} d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
            <text>
              <textPath href={`#textPath-${project.id}`} fill="#eae5d9" fontSize="5.0" letterSpacing="1.2">
                MOTIONCRAFT STUDIOS • PLAY PREVIEW • MOTIONCRAFT STUDIOS • PLAY PREVIEW •
              </textPath>
            </text>
          </svg>

          {/* Liquid Glass Mask containing the Autoplaying/Scroll Video */}
          <div className="inline-liquid-glass-orb-inner">
            <video
              ref={videoRef}
              src={selectedVideo}
              muted
              loop
              playsInline
              preload="auto"
              className="orb-video"
            />
            <div className="glass-shine" />
          </div>
        </div>
      </div>

      {/* Accordion panel detail content */}
      <div ref={detailsRef} className="project-details-panel" style={{ height: 0, overflow: 'hidden' }}>
        <div className="project-details-inner">
          <div className="project-info-grid">
            <div className="info-left">
              <h4 className="info-section-title">Summary</h4>
              <p className="project-summary-text">{project.summary}</p>
            </div>
            
            <div className="info-right">
              <h4 className="info-section-title">Services</h4>
              <ul className="project-services-list">
                {project.services.map((service, index) => (
                  <li key={index} className="service-tag">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Playlist buttons for multi-video items (NAMPA) */}
          {project.mediaFiles && (
            <div className="video-playlist">
              {project.mediaFiles.map((file, idx) => (
                <button
                  key={idx}
                  className={`playlist-btn ${selectedVideo === file.url ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Stop row toggle collapse
                    handleVideoSelect(file.url);
                  }}
                >
                  {file.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WorkList = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => {
      setReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <section id="work" className="work-section">
      <div className="work-title-wrap">
        <h2 className="work-section-title reveal-up">Selected Projects</h2>
      </div>

      <div className="work-list-container">
        {projectsData.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            isExpanded={expandedRow === project.id}
            onToggle={() => toggleRow(project.id)}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkList;
