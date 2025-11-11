import React, { useEffect, useRef } from 'react';
import heroVideo from "../assets/video2.mp4"; // your 9-second video

function Backgound({ heroCount }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log("Video play failed:", error);
          // Retry once after small delay (for autoplay restrictions)
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(e => console.log("Retry failed:", e));
            }
          }, 1000);
        }
      }
    };

    playVideo();

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", () => {
        videoElement.currentTime = 0;
        videoElement.play().catch(e => console.log("Loop play failed:", e));
      });
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", () => {});
      }
    };
  }, [heroCount]);

  return (
    <div className="w-full h-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-contain md:object-cover bg-black"
        onError={(e) => console.log("Video error:", e)}
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional clean overlay to give a fashion-style depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 pointer-events-none"></div>
    </div>
  );
}

export default Backgound;
