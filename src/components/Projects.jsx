import React, { useState, useEffect, useRef } from "react"

import tastyKingVideo from "../assets/tastyking/1226.mp4"
import tastyKingMain from "../assets/tastyking/tastykingmain.png"
import tastyKing1 from "../assets/tastyking/screenshot1.png"
import tastyKing2 from "../assets/tastyking/screenshot2.png"
import tastyKing3 from "../assets/tastyking/screenshot3.png"
import tastyKing4 from "../assets/tastyking/screenshot4.png"
import tastyKing5 from "../assets/tastyking/screenshot5.png"
import tastyKing6 from "../assets/tastyking/screenshot6.png"
import tastyKing7 from "../assets/tastyking/screenshot7.png"
import tastyKing8 from "../assets/tastyking/screenshot8.png"
import tastyKing9 from "../assets/tastyking/screenshot9.png"

import tricolMain from "../assets/tricol/tricol-main-image.png"
import tricol1 from "../assets/tricol/tricol-screenshot-1.png"
import tricol2 from "../assets/tricol/tricol-screenshot-2.png"
import tricol3 from "../assets/tricol/tricol-screenshot-3.png"
import tricol4 from "../assets/tricol/tricol-screenshot-4.png"
import tricol5 from "../assets/tricol/tricol-screenshot-5.png"
import tricol6 from "../assets/tricol/tricol-screenshot-6.png"
import tricol7 from "../assets/tricol/tricol-screenshot-7.png"

import moneyMindMain from "../assets/moneymind/moneymind-img.png"
import moneyMindVideo from "../assets/moneymind/moneymind1.mp4"

import jobFinderVideo from "../assets/jobfinder/0219.mp4"
import jobFinderMain from "../assets/jobfinder/main.png"
import jobFinderJobs from "../assets/jobfinder/jobs.png"
import jobFinderApplication from "../assets/jobfinder/application.png"
import jobFinderLogin from "../assets/jobfinder/login.png"
import jobFinderAlert from "../assets/jobfinder/alert.png"
import jobFinderDelete from "../assets/jobfinder/deleteacc.png"
import jobFinderLogo from "../assets/jobfinder/logo.png"

const projects = [
  {
    title: "MoneyMind - Personal Finance Management",
    description: "A comprehensive personal finance management application that helps users track their expenses, manage budgets, and gain insights into their spending habits.",
    features: [
      "Expense tracking and categorization",
      "Budget creation and monitoring",
      "Financial reports and insights",
      "Spending pattern analysis",
      "Goal setting and progress tracking",
      "Multi-currency support"
    ],
    technologies: ["Laravel","Blade","HTML","CSS","JavaScript","MySQL"],
    mainImage: moneyMindMain,
    video: moneyMindVideo
  },
  {
    title: "Tricol - Supplier Order and Stock Management System",
    description: "Supplier Order and Stock Management built in Java/Spring Boot. Manages supplier orders, receptions and lot-based FIFO stock valuation.",
    features: [
      "Supplier management (CRUD, search, contact & company details, ICE)",
      "Product management (CRUD, stock view, low-stock alerts, reorder point)",
      "Supplier orders lifecycle and reception (PENDING  VALIDATED  DELIVERED)",
      "Exit slips and FIFO consumption (draft/validate/cancel, automatic FIFO outflows)"
    ],
    technologies: ["Maven","Spring Boot","JPA / Hibernate","Liquibase","MapStruct","Jakarta Validation","MySQL"],
    mainImage: tricolMain,
    images: [tricolMain,tricol1,tricol2,tricol3,tricol4,tricol5,tricol6,tricol7]
  },
  {
    title: "TastyKing - Food Ordering Platform",
    description: "A food ordering platform connecting customers with meals and restaurants. Streamlines browsing menus, placing orders, and managing user accounts.",
    features: [
      "User registration, authentication, and profile management",
      "Browsing and searching for meals by category",
      "Shopping cart and order placement system",
      "Order history and review functionality",
      "Administrative tools for managing meals, categories, and orders",
      "Secure payment and session management"
    ],
    technologies: ["Laravel","MySQL","Vite","HTML","CSS","JavaScript"],
    mainImage: tastyKingMain,
    video: tastyKingVideo,
    images: [tastyKing1,tastyKing2,tastyKing3,tastyKing4,tastyKing5,tastyKing6,tastyKing7,tastyKing8,tastyKing9]
  },
  {
    title: "Job Finder - Job Search Platform",
    description: "A modern, full-featured job search application built with Angular 20 that helps users discover job opportunities from the USA Jobs API.",
    features: [
      "Authentication & user management",
      "Job search with USA Jobs API and advanced filters",
      "Favorites management and persistent storage",
      "Application tracking with status and notes",
      "Responsive UI with TailwindCSS and skeleton loaders"
    ],
    technologies: ["Angular 20","NgRx (Store & Effects)","TailwindCSS","Angular HttpClient","JSON Server (mock API)","USA Jobs API"],
    mainImage: jobFinderMain,
    video: jobFinderVideo,
    images: [jobFinderJobs,jobFinderApplication,jobFinderLogin,jobFinderAlert,jobFinderDelete,jobFinderLogo]
  }
]

const githubLinks = {
  "MoneyMind - Personal Finance Management": "https://github.com/FARAJI-Omar/MoneyMind",
  "TastyKing - Food Ordering Platform": "https://github.com/FARAJI-Omar/Tasty-King",
  "Tricol Supplier Order and Stock Management System": "https://github.com/FARAJI-Omar/Tricol-API-V2",
  "Job Finder - Job Search Platform": "https://github.com/FARAJI-Omar/Job-Finder",
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showVideo, setShowVideo] = useState(true)
  const [imageFullscreen, setImageFullscreen] = useState(false)
  const [trackIndex, setTrackIndex] = useState(1)
  const [animated, setAnimated] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef(null)
  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)

  const extendedSlides = [projects[projects.length - 1], ...projects, projects[0]]
  const dotIndex = (trackIndex - 1 + projects.length) % projects.length

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [selectedProject])

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setIsPlaying(false)
    setIsMuted(true)
    setShowVideo(true)
  }

  const handleClose = () => {
    setSelectedProject(null)
    if (videoRef.current) { videoRef.current.pause(); setIsPlaying(false) }
  }

  const handlePrevImage = () => {
    if (showVideo) {
      setCurrentImageIndex((selectedProject?.images?.length || 1) - 1)
      setShowVideo(false)
    } else if (currentImageIndex === 0 && selectedProject?.video) {
      setShowVideo(true)
    } else {
      setCurrentImageIndex(prev => prev - 1)
      setShowVideo(false)
    }
  }

  const handleNextImage = () => {
    if (showVideo) {
      setCurrentImageIndex(0); setShowVideo(false)
    } else {
      const maxIndex = selectedProject?.images?.length || 0
      if (currentImageIndex === maxIndex - 1 && selectedProject?.video) {
        setShowVideo(true)
      } else if (currentImageIndex === maxIndex - 1) {
        setCurrentImageIndex(0)
      } else {
        setCurrentImageIndex(prev => prev + 1)
      }
    }
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    isPlaying ? videoRef.current.pause() : videoRef.current.play()
    setIsPlaying(!isPlaying)
  }
  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted; setIsMuted(!isMuted)
  }
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen(); setIsFullscreen(true)
    } else {
      document.exitFullscreen(); setIsFullscreen(false)
    }
  }

  const goPrev = () => {
    if (transitioning) return
    setTransitioning(true); setAnimated(true)
    const newIdx = trackIndex - 1; setTrackIndex(newIdx)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (newIdx === 0) {
        setAnimated(false); setTrackIndex(projects.length)
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
      }
      setTransitioning(false)
    }, 560)
  }

  const goNext = () => {
    if (transitioning) return
    setTransitioning(true); setAnimated(true)
    const newIdx = trackIndex + 1; setTrackIndex(newIdx)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (newIdx === projects.length + 1) {
        setAnimated(false); setTrackIndex(1)
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
      }
      setTransitioning(false)
    }, 560)
  }

  const goToSlide = (idx) => {
    if (transitioning) return
    setTransitioning(true); setAnimated(true); setTrackIndex(idx + 1)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setTransitioning(false), 560)
  }

  return (
    <section id="projects" className="bg-bg overflow-hidden min-h-screen flex items-center justify-center py-8">
      <div className="relative w-full flex flex-col items-center gap-6 pt-8">

        {/* 3D Carousel */}
        <div className="carousel-clip">
          <div className="carousel-stage">
            {extendedSlides.map((project, idx) => {
              let offset = idx - trackIndex
              const len = extendedSlides.length
              if (offset === -(len - 1)) offset = 1
              if (offset === len - 1) offset = -1
              let cls = "cs-hidden"
              if (offset === 0)  cls = "cs-active"
              else if (offset === -1) cls = "cs-prev"
              else if (offset === 1)  cls = "cs-next"
              return (
                <div
                  key={idx}
                  className={`cs-slide ${cls}${!animated ? " cs-no-anim" : ""}`}
                  onClick={offset === -1 ? goPrev : offset === 1 ? goNext : undefined}
                >
                  <div className="cs-bg" style={{ backgroundImage: `url(${project.mainImage})` }} />
                  {offset === 0 && (
                    <div className="cs-info">
                      <h3 className="carousel-title">{project.title}</h3>
                      <button className="carousel-cta" onClick={() => handleProjectClick(project)}>
                        Explore Project
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <button className="carousel-arrow carousel-arrow-prev" onClick={goPrev} aria-label="Previous project">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="carousel-arrow carousel-arrow-next" onClick={goNext} aria-label="Next project">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {projects.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot${idx === dotIndex ? " active" : ""}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <>
          <div className="fixed inset-0 bg-black/85 z-[2000] backdrop-blur-sm" onClick={handleClose} />
          <div
            className="fixed inset-0 bg-bg-card z-[2001] overflow-y-auto px-4 sm:px-8 md:px-24 pt-20 pb-12"
            style={{ animation: "slideInFromRight 0.4s ease" }}
          >
            <button
              className="absolute top-9 left-6 bg-transparent border-none text-white cursor-pointer p-1.5 w-11 h-11 flex items-center justify-center transition-transform duration-200 hover:-translate-x-1"
              onClick={handleClose}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <h2 className="absolute top-[2.45rem] left-[4.5rem] text-xl md:text-2xl font-bold text-white m-0 leading-snug">
              {selectedProject.title}
            </h2>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-4">
              {/* Gallery */}
              <div className="w-full md:max-w-[48%]">
                <div className="mb-4">
                  {selectedProject.video && showVideo ? (
                    <div className="video-container" ref={videoContainerRef}>
                      <video
                        ref={videoRef}
                        src={selectedProject.video}
                        className="project-video"
                        muted={isMuted}
                        onClick={togglePlay}
                      />
                      <div className="video-controls">
                        <button className="video-control-btn" onClick={togglePlay}>
                          {isPlaying
                            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                            : <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                          }
                        </button>
                        <button className="video-control-btn" onClick={toggleMute}>
                          {isMuted
                            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                            : <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                          }
                        </button>
                        <button className="video-control-btn" onClick={toggleFullscreen}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full h-[320px] sm:h-[380px] bg-[#c4c4c4] rounded-xl cursor-pointer"
                      style={{
                        backgroundImage: selectedProject.images ? `url(${selectedProject.images[currentImageIndex]})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                      onClick={() => setImageFullscreen(true)}
                    />
                  )}
                </div>

                {selectedProject.images && (
                  <div className="gallery-thumbnails">
                    <button className="gallery-nav-small gallery-nav-left" onClick={handlePrevImage}></button>
                    {selectedProject.video && (
                      <div
                        className={`gallery-thumbnail ${showVideo ? "active" : ""}`}
                        onClick={() => setShowVideo(true)}
                        style={{ backgroundImage: `url(${selectedProject.mainImage})`, position: "relative" }}
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                    {selectedProject.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`gallery-thumbnail ${currentImageIndex === idx && !showVideo ? "active" : ""}`}
                        onClick={() => { setCurrentImageIndex(idx); setShowVideo(false) }}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    ))}
                    <button className="gallery-nav-small gallery-nav-right" onClick={handleNextImage}></button>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Project Overview</h3>
                  <p className="text-sm leading-loose text-[#e0e0e0]">{selectedProject.description}</p>
                  <h4 className="text-base font-semibold text-white mt-6 mb-3">Key features</h4>
                  <ul className="list-none p-0 m-0">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="text-sm leading-loose text-[#d0d0d0] pl-5 relative mb-1 before:content-[''] before:absolute before:left-0 before:text-accent before:text-xl">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-white mb-3">Technologies</h4>
                  <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                    {selectedProject.technologies.map((tech, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-bg-deeper bg-white px-3.5 py-1 rounded-full font-medium transition-all duration-200 hover:bg-accent hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(249,168,37,0.3)] cursor-default"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {githubLinks[selectedProject.title] && (
                    <a
                      href={githubLinks[selectedProject.title]}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-block mt-4 text-[#4078c0] font-bold no-underline hover:underline"
                    >
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Fullscreen Image Gallery */}
      {imageFullscreen && selectedProject && (
        <>
          <div className="fullscreen-overlay" onClick={() => setImageFullscreen(false)} />
          <div className="fullscreen-gallery">
            <button className="fullscreen-close" onClick={() => setImageFullscreen(false)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <button className="fullscreen-nav" onClick={(e) => { e.stopPropagation(); handlePrevImage() }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <div
              className="fullscreen-image"
              style={{ backgroundImage: selectedProject.images ? `url(${selectedProject.images[currentImageIndex]})` : "none" }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="fullscreen-nav" onClick={(e) => { e.stopPropagation(); handleNextImage() }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        </>
      )}
    </section>
  )
}
