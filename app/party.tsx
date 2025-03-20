"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // 🎉 Flip & Play Video with Sound
  const handleFlip = async (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setFlipped(true);

    if (videoRef.current) {
      videoRef.current.muted = false; // Unmute
      setIsMuted(false);

      try {
        await videoRef.current.play();
      } catch (error) {
        console.log("Video Play Blocked:", error);
      }
    }
  };

  // 🔇 Toggle Mute
  const toggleMute = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (videoRef.current) {
      const newMuteState = !videoRef.current.muted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  return (
    <div className="relative w-90 h-80 perspective-1000">
      <motion.div
        className="relative w-full h-full transition-transform duration-700"
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 🎆 Front Side (Photo) */}
        <div
          className="absolute w-full h-full cursor-pointer"
          style={{ backfaceVisibility: "hidden" }}
          onClick={handleFlip} // Flip & Play Video on Tap
        >
          <img
            src="/hb.jpg"
            alt="Celebration"
            className="w-full h-full object-cover rounded-lg"
          />
          <motion.div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent flex items-end">
            <motion.div className="p-4 w-full flex flex-col justify-center">
              <div className="relative">
                <PartyPopper className="text-[#FEC400] text-4xl animate-bounce" />
              </div>
              <div className="mt-2 text-center text-white text-lg font-bold">
                Tap to Reveal 🎉
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* 🎥 Back Side (Video) */}
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <video
            ref={videoRef}
            src="/0311.mp4"
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* 🔊 Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg"
          >
            {isMuted ? "🔇 Mute" : "🔊 Unmute"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
