// import React, { useRef, useState, useEffect } from 'react';
// import Link from 'next/link';

// const VideoBanner = ({ videoss = [] }) => {
//   // State for device detection
//   const [isMobile, setIsMobile] = useState(false);
//   // Video references
//   const videoRefs = [useRef(null), useRef(null)];
//   // Component state
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [nextIndex, setNextIndex] = useState(1);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [requiresInteraction, setRequiresInteraction] = useState(false);

//   // Get appropriate video sources based on device
//   const videos = React.useMemo(() => {
//     return videoss.map(video => 
//       isMobile ? video.mobileMedia : video.desktopMedia
//     );
//   }, [videoss, isMobile]);

//   // Handle device size changes
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       if (mobile !== isMobile) {
//         setIsMobile(mobile);
//       }
//     };

//     handleResize(); // Initial check
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isMobile]);

//   // Preload videos
//   useEffect(() => {
//     if (videos.length === 0) return;

//     let isMounted = true;
//     let loadedCount = 0;

//     const handleLoad = () => {
//       loadedCount++;
//       if (loadedCount >= videos.length && isMounted) {
//         setIsLoading(false);
//       }
//     };

//     const preloadPromises = videos.map(src => {
//       return new Promise(resolve => {
//         const video = document.createElement('video');
//         video.src = src;
//         video.preload = 'auto';
//         video.onloadeddata = () => {
//           handleLoad();
//           resolve();
//         };
//         video.onerror = () => {
//           console.warn(`Failed to load video: ${src}`);
//           handleLoad();
//           resolve();
//         };
//       });
//     });

//     Promise.all(preloadPromises).catch(err => {
//       console.error('Video preload error:', err);
//       if (isMounted) setIsLoading(false);
//     });

//     return () => {
//       isMounted = false;
//     };
//   }, [videos]);

//   // Handle video transitions
//   useEffect(() => {
//     if (isLoading || videos.length === 0) return;

//     const currentVideo = videoRefs[activeIndex]?.current;
//     if (!currentVideo) return;

//     const handleEnded = () => {
//       setIsTransitioning(true);
//       const nextVideoIndex = (activeIndex + 1) % videos.length;
//       setNextIndex(nextVideoIndex);

//       setTimeout(() => {
//         setActiveIndex(nextVideoIndex);
//         setIsTransitioning(false);
//       }, 500);
//     };

//     currentVideo.addEventListener('ended', handleEnded);
//     return () => currentVideo.removeEventListener('ended', handleEnded);
//   }, [activeIndex, isLoading, videos]);

//   // Handle video playback
//   useEffect(() => {
//     if (isLoading || videos.length === 0) return;

//     const playVideo = async (video) => {
//       if (!video) return;

//       try {
//         await video.play();
//         setRequiresInteraction(false);
//       } catch (err) {
//         console.debug('Autoplay prevented, waiting for interaction');
//         setRequiresInteraction(true);
//       }
//     };

//     const currentVideo = videoRefs[activeIndex]?.current;
//     if (currentVideo) {
//       playVideo(currentVideo);
//     }
//   }, [activeIndex, isLoading, videos]);

//   // Handle user interaction for autoplay
//   useEffect(() => {
//     if (!requiresInteraction) return;

//     const handleInteraction = () => {
//       videoRefs.forEach(ref => {
//         if (ref.current) {
//           ref.current.play().catch(e => console.debug('Playback error:', e));
//         }
//       });
//       setRequiresInteraction(false);
//     };

//     document.addEventListener('click', handleInteraction);
//     return () => document.removeEventListener('click', handleInteraction);
//   }, [requiresInteraction]);

//   // Show loading state if no videos
//   if (videos.length === 0) {
//     return (
//       <div className="banner-container">
//         <div className="loader-container">
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="banner-container">
//       {/* Loading overlay */}
//       {isLoading && (
//         <div className="loader-container">
//           <span className="loader"></span>
//         </div>
//       )}

//       {/* Interaction prompt */}
//       {requiresInteraction && (
//         <div className="interaction-prompt">
//           <p>Click anywhere to play videos</p>
//         </div>
//       )}

//       {/* Video elements */}
//       {videos.map((src, index) => (
//         <video
//           key={`video-${index}`}
//           ref={videoRefs[index]}
//           muted
//           playsInline
//           autoPlay={index === activeIndex}
//           className={`video-layer ${
//             index === activeIndex ? 'active' :
//             (index === nextIndex && isTransitioning) ? 'next' : 'hidden'
//           }`}
//           src={src}
//           onError={(e) => console.error(`Video ${index} error`, e)}
//         />
//       ))}

//       {/* Content overlay (optional) */}
//       {/* <div className="banner-content">
//         <h1>Modern Living Room</h1>
//         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
//         <Link href="/collection">
//           <button className="shop-button">SHOP NOW</button>
//         </Link>
//       </div> */}

//       {/* Styles */}
//       <style jsx>{`
//         .banner-container {
//           position: relative;
//           width: 100%;
//           height: 100vh;
//           overflow: hidden;
//           background-color: transparent;
//         }

//         .loader-container {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background-color: transparent;
//           z-index: 10;
//         }

//         .loader {
//           display: inline-block;
//           width: 50px;
//           height: 50px;
//           border: 5px solid rgba(255, 255, 255, 0.3);
//           border-radius: 50%;
//           border-top-color: #fff;
//           animation: spin 1s ease-in-out infinite;
//         }

//         .interaction-prompt {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           background: rgba(0, 0, 0, 0.7);
//           color: white;
//           padding: 20px;
//           border-radius: 8px;
//           z-index: 5;
//           text-align: center;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         .video-layer {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: opacity 0.5s ease-in-out;
//         }

//         .video-layer.active {
//           opacity: 1;
//           z-index: 1;
//         }

//         .video-layer.next {
//           opacity: 1;
//           z-index: 2;
//         }

//         .video-layer.hidden {
//           opacity: 0;
//           z-index: 0;
//         }

//         .banner-content {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           text-align: center;
//           color: white;
//           z-index: 3;
//           width: 100%;
//           max-width: 800px;
//           padding: 20px;
//         }

//         .shop-button {
//           margin-top: 20px;
//           padding: 12px 24px;
//           background: transparent;
//           color: white;
//           border: 2px solid white;
//           border-radius: 4px;
//           cursor: pointer;
//           font-size: 16px;
//           transition: all 0.3s ease;
//         }

//         .shop-button:hover {
//           background: white;
//           color: black;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VideoBanner;

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const VideoBanner = ({ videoss = [] }) => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = [useRef(null), useRef(null)];
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [requiresInteraction, setRequiresInteraction] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Responsive video sources
  const videos = React.useMemo(() => {
    if (!videoss.length) return [];

    // Determine appropriate video source based on screen size
    return videoss.map(video => {
      if (dimensions.width <= 640) { // Mobile
        return video.mobileMedia || video.desktopMedia;
      } else if (dimensions.width <= 1024) { // Tablet
        return video.tabletMedia || video.desktopMedia;
      } else { // Desktop
        return video.desktopMedia;
      }
    });
  }, [videoss, dimensions]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload videos
  useEffect(() => {
    if (videos.length === 0) return;

    let isMounted = true;
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount >= videos.length && isMounted) {
        setIsLoading(false);
      }
    };

    const preloadPromises = videos.map(src => {
      return new Promise(resolve => {
        const video = document.createElement('video');
        video.src = src;
        video.preload = 'auto';
        video.onloadeddata = () => {
          handleLoad();
          resolve();
        };
        video.onerror = () => {
          console.warn(`Failed to load video: ${src}`);
          handleLoad();
          resolve();
        };
      });
    });

    Promise.all(preloadPromises).catch(err => {
      console.error('Video preload error:', err);
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [videos]);

  // Handle video transitions
  useEffect(() => {
    if (isLoading || videos.length === 0) return;

    const currentVideo = videoRefs[activeIndex]?.current;
    if (!currentVideo) return;

    const handleEnded = () => {
      setIsTransitioning(true);
      const nextVideoIndex = (activeIndex + 1) % videos.length;
      setNextIndex(nextVideoIndex);

      setTimeout(() => {
        setActiveIndex(nextVideoIndex);
        setIsTransitioning(false);
      }, 500);
    };

    currentVideo.addEventListener('ended', handleEnded);
    return () => currentVideo.removeEventListener('ended', handleEnded);
  }, [activeIndex, isLoading, videos]);

  // Handle video playback
  useEffect(() => {
    if (isLoading || videos.length === 0) return;

    const playVideo = async (video) => {
      if (!video) return;

      try {
        await video.play();
        setRequiresInteraction(false);
      } catch (err) {
        console.debug('Autoplay prevented, waiting for interaction');
        setRequiresInteraction(true);
      }
    };

    const currentVideo = videoRefs[activeIndex]?.current;
    if (currentVideo) {
      playVideo(currentVideo);
    }
  }, [activeIndex, isLoading, videos]);

  // Handle user interaction for autoplay
  useEffect(() => {
    if (!requiresInteraction) return;

    const handleInteraction = () => {
      videoRefs.forEach(ref => {
        if (ref.current) {
          ref.current.play().catch(e => console.debug('Playback error:', e));
        }
      });
      setRequiresInteraction(false);
    };

    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, [requiresInteraction]);

  if (videos.length === 0) {
    return (
      <div className="banner-container">
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="banner-container">
      {isLoading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}

      {requiresInteraction && (
        <div className="interaction-prompt">
          <p>Click anywhere to play videos</p>
        </div>
      )}

      {videos.map((src, index) => (
        // <video
        //   key={`video-${index}`}
        //   ref={videoRefs[index]}
        //   muted
        //   playsInline
        //   autoPlay={index === activeIndex}
        //   className={`video-layer ${
        //     index === activeIndex ? 'active' :
        //     (index === nextIndex && isTransitioning) ? 'next' : 'hidden'
        //   }`}
        //   src={src}
        //   onError={(e) => console.error(`Video ${index} error`, e)}
        // />
        <video
          key={`video-${index}`}
          ref={videoRefs[index]}
          src={src}
          autoPlay
          muted
          playsInline
          className={`video-layer ${index === activeIndex ? 'active' :
              (index === nextIndex && isTransitioning) ? 'next' : 'hidden'
            }`}
          onError={(e) => console.error(`Video ${index} error`, e)}
        />

      ))}

      <style jsx>{`
        .banner-container {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 400px; /* Minimum height for very small screens */
          max-height: 1200px; /* Maximum height for very large screens */
          overflow: hidden;
          background-color: #000; /* Fallback background */
        }

        .loader-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          z-index: 10;
        }

        .loader {
          display: inline-block;
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }

        .interaction-prompt {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 15px 25px;
          border-radius: 8px;
          z-index: 5;
          text-align: center;
          font-size: clamp(14px, 2vw, 18px);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .video-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease-in-out;
        }

        /* Adjust object-position for different aspect ratios */
        @media (max-aspect-ratio: 16/9) {
          .video-layer {
            object-fit: cover;
            width: auto;
            height: 100%;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @media (min-aspect-ratio: 16/9) {
          .video-layer {
            object-fit: cover;
            width: 100%;
            height: auto;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        .video-layer.active {
          opacity: 1;
          z-index: 1;
        }

        .video-layer.next {
          opacity: 1;
          z-index: 2;
        }

        .video-layer.hidden {
          opacity: 0;
          z-index: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .banner-container {
            height: 60vh;
          }
        }

        @media (max-width: 480px) {
          .banner-container {
            height: 10vh;
          }
          
          .interaction-prompt {
            padding: 10px 15px;
            width: 80%;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoBanner;