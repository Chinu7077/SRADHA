"use client";

import { FaGift } from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import {
  Sparkles,
  Gift,
  Music,
  VolumeX,
  PartyPopper,
  Heart,
  Stars,
  Smile,
} from "lucide-react";
import FlipCard from "./app/party";

const jokes = [
  "You know you're getting old when the candles cost more than the cake! 🎂😂",
  "At least you're not as old as you will be next year! 🎉",
  "Growing old is mandatory, but growing up is optional! 🤪",
  "Birthdays are like software updates. You may not notice the change, but things start lagging!",
  "Age is just a number… and in your case, a really big one now!🎈",

  "Birthdays are nature's way of telling us to eat more cake! 🍰",
];

// Birthday wishes that will appear when clicking on photos
const birthdayWishes = [
  {
    title: "Happy Birthday Sradha!",
    message:
      "May your day be as bright as your smile and as beautiful as you are!",
    emoji: "🎁",
  },
  {
    title: "Wishing You Joy!",
    message: "Another year of laughter, joy, and making beautiful memories!",
    emoji: "🎊",
  },
  {
    title: "Celebrate Good Times!",
    message:
      "Today is your special day! Enjoy every moment of your celebration!",
    emoji: "🥂",
  },
  {
    title: "Birthday Blessings!",
    message:
      "May this year bring you endless opportunities and beautiful moments!",
    emoji: "✨",
  },
  {
    title: "Shine On!",
    message:
      "You're amazing in every way. Have a fantastic birthday celebration!",
    emoji: "🌟",
  },
];

// Photo URLs for the floating photos (using placeholder images)
const photoUrls = [
  "/1.jpg?height=150&width=150",
  "/2.jpg?height=150&width=150",
  "/3.jpg?height=150&width=150",
  "/4.jpg?height=150&width=150",
  "/5.jpg?height=150&width=150",
];

export default function BirthdayPage() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [joke, setJoke] = useState(jokes[0]);
  const [playMusic, setPlayMusic] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [selectedWish, setSelectedWish] = useState(null);
  const controls = useAnimationControls();
  const textControls = useAnimationControls();
  const canvasRef = useRef(null);
  const [hasStartedCelebration, setHasStartedCelebration] = useState(false);

  // For the floating elements
  const balloonColors = ["#FF5E78", "#FFBD12", "#4CD5FF", "#9D65FF", "#FF9A3C"];

  useEffect(() => {
    // Animate the title with a bounce effect
    controls.start({
      y: [0, -20, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });

    // Text reveal animation
    textControls.start({
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    });

    // Initialize the canvas animation
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const particles = [];

      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Create particles
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color:
            balloonColors[Math.floor(Math.random() * balloonColors.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle =
            particle.color +
            Math.floor(particle.opacity * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();

          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width)
            particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height)
            particle.speedY *= -1;

          // Random movement
          if (Math.random() < 0.01) {
            particle.speedX = Math.random() * 2 - 1;
            particle.speedY = Math.random() * 2 - 1;
          }
        });

        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, [controls, textControls]);

  const getRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setJoke(jokes[randomIndex]);

    // Add a little bounce animation when joke changes
    const jokeElement = document.getElementById("joke-container");
    if (jokeElement) {
      jokeElement.animate(
        [
          { transform: "scale(0.95)", opacity: 0.7 },
          { transform: "scale(1.05)", opacity: 0.9 },
          { transform: "scale(1)", opacity: 1 },
        ],
        { duration: 500, easing: "ease-out" }
      );
    }
  };

  const toggleGift = () => {
    setShowGift(!showGift);
  };

  const startCelebration = () => {
    setShowConfetti(true);
    setHasStartedCelebration(true);

    // Optional: start music when celebration starts
    if (!playMusic) {
      setPlayMusic(true);
    }
  };

  const showWish = (index) => {
    setSelectedWish(birthdayWishes[index]);
  };

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Split text into letters for animation
  const SplitText = ({ text, className }) => {
    return (
      <motion.div className={className} initial="hidden" animate="visible">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            transition={{ duration: 0.4, delay: index * 0.04 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  const playClickSound = () => {
    const audio = new Audio("/yh.mp3"); // Replace with your actual sound file
    audio.play();
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white p-4 text-center">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-1] w-full h-full bg-gradient-to-br from-purple-800 via-pink-700 to-indigo-800"
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: balloonColors[i % balloonColors.length],
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              left: `${Math.random() * 100}%`,
              opacity: 0.4,
              filter: "blur(1px)",
            }}
            animate={{
              y: [height, -100],
              x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Floating photos */}
      {hasStartedCelebration && (
        <div className="absolute inset-0 overflow-hidden z-20">
          {photoUrls.map((url, i) => {
            const size = Math.floor(Math.random() * 81) + 50; // Size between 50-130px
            return (
              <motion.div
                key={`photo-${i}`}
                className="absolute cursor-pointer rounded-lg overflow-hidden shadow-lg"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 90}%`, // Covers full width
                  top: `${Math.random() * 90}%`, // Covers full height
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                  zIndex: 20,
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  x: [0, Math.random() * 50 - 25, 0], // More movement range
                  y: [0, Math.random() * 50 - 25, 0],
                  rotate: [
                    Math.random() * 10 - 5,
                    Math.random() * 10 - 5,
                    Math.random() * 10 - 5,
                  ],
                }}
                transition={{
                  scale: { duration: 0.5, delay: i * 0.1 },
                  x: {
                    duration: Math.random() * 8 + 4, // Slower, natural floating
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  y: {
                    duration: Math.random() * 8 + 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 2,
                  },
                  rotate: {
                    duration: Math.random() * 8 + 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                whileHover={{ scale: 1.2, zIndex: 50 }} // Keeps it above others
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents accidental event issues
                  playClickSound();
                  showWish(i);
                }}
              >
                <img
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                balloonColors[i % balloonColors.length]
              }88 0%, ${balloonColors[i % balloonColors.length]}00 70%)`,
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6,
              filter: "blur(20px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={200}
        />
      )}

      <motion.div
        className="relative z-20 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md text-purple-700 border-4 border-purple-300 mx-auto"
        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.2, type: "spring" }}
      >
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
          animate={controls}
        >
          <motion.div
            className="text-6xl md:text-6xl"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 5,
            }}
          ></motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-sm mt-4 mb-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
        >
          <SplitText
            text="Happy Birthday!"
            className="flex flex-wrap justify-center"
          />
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl font-bold text-pink-500 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="relative">
            Sradha
            <motion.span
              className="absolute -top-1 -right-4 text-yellow-500"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              ✨
            </motion.span>
          </span>
        </motion.h2>

        <FlipCard />

        <motion.p
          className="text-lg md:text-xl mt-4 text-purple-700 font-medium"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          May your day be filled with happiness, laughter, and endless joy!
        </motion.p>

        <motion.div
          className="mt-6 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {["joy", "vibe", "fun", "gifts", "cake"].map((word, index) => (
            <motion.span
              key={word}
              className="inline-block px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: balloonColors[index % balloonColors.length],
                color: "white",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5 + index * 0.2 }}
              whileHover={{
                scale: 1.1,
                rotate: [-5, 5, 0],
                transition: { duration: 0.3 },
              }}
            >
              #{word}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {!hasStartedCelebration && (
        <motion.button
          className="mt-8 relative overflow-hidden flex items-center gap-2 p-4 px-8 rounded-full shadow-lg z-30 text-lg font-bold"
          style={{
            background:
              "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #a855f7 100%)",
          }}
          onClick={startCelebration}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, scale: [1, 1.05, 1] }}
          transition={{
            delay: 2,
            duration: 0.8,
            scale: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 2,
            },
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-white opacity-20"
            animate={{
              x: ["0%", "100%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <PartyPopper className="text-yellow-300" size={24} />
          <span className="text-white">Let's Celebrate Birthday!</span>
        </motion.button>
      )}

      {hasStartedCelebration && (
        <div className="mt-8 flex flex-wrap justify-center gap-4 px-4 z-20">
          <motion.button
            className="relative overflow-hidden flex items-center gap-2 p-3 px-6 rounded-full shadow-lg"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            }}
            onClick={() => setShowConfetti((prev) => !prev)}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-20"
              animate={{
                x: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
            <Sparkles className="text-yellow-300" size={20} />
            <span className="font-medium text-white">
              {showConfetti ? "Stop Confetti" : "More Confetti!"}
            </span>
          </motion.button>

          <motion.button
            className="relative overflow-hidden flex items-center gap-2 p-3 px-6 rounded-full shadow-lg"
            style={{
              background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
            }}
            onClick={() => setPlayMusic(!playMusic)}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-20"
              animate={{
                x: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            {playMusic ? (
              <VolumeX size={20} className="text-white" />
            ) : (
              <Music size={20} className="text-white" />
            )}
            <span className="font-medium text-white">
              {playMusic ? "Stop Music" : "Play Music"}
            </span>
          </motion.button>

          <motion.button
            className="relative overflow-hidden flex items-center gap-2 p-3 px-6 rounded-full shadow-lg"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
            }}
            onClick={toggleGift}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-20"
              animate={{
                x: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <Gift size={20} className="text-white" />
            <span className="font-medium text-white">Special Gift</span>
          </motion.button>
        </div>
      )}

      {hasStartedCelebration && (
        <motion.button
          className="relative mt-8 p-4 rounded-xl shadow-lg z-20 overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          }}
          onClick={getRandomJoke}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
            animate={{
              x: ["0%", "100%"],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <span className="font-medium text-white flex items-center gap-2">
            <Stars size={20} />
            Click for a Birthday Joke 🎭
          </span>
        </motion.button>
      )}

      {hasStartedCelebration && (
        <motion.div
          id="joke-container"
          className="mt-6 p-4 bg-white/90 backdrop-blur-sm text-purple-700 rounded-lg shadow-lg max-w-md z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={joke} // This forces re-render when joke changes
          >
            {joke}
          </motion.div>
        </motion.div>
      )}

      {/* Special gift animation */}
      <AnimatePresence>
        {showGift && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleGift}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-2xl max-w-md text-center w-full"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", bounce: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gift Icon Animation */}
              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="text-white z-10"
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 30, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaGift size={60} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h2
                className="text-2xl font-bold text-sky-700 mt-4 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                So, the gift found its way to you! 🎁
              </motion.h2>

              {/* Message */}
              <motion.p
                className="text-sky-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Oh wow! So, you got the gift! <br />
                Scanned the QR code too — that’s how you ended up here, right?
                😉 <br />
                Welcome to your special surprise zone! <br />
                Enjoy it… it’s all made just for <strong>you</strong>. <br />
                <span className="block mt-2">– Chinu</span>
              </motion.p>

              {/* Button */}
              <motion.div
                className="flex justify-center gap-4 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-sky-500 to-blue-500 text-white py-2 px-6 rounded-full relative overflow-hidden"
                  onClick={toggleGift}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-white opacity-20"
                    animate={{
                      x: ["0%", "100%"],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  />
                  Thank you!
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Birthday wish popup when clicking on photos */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWish(null)}
          >
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-2xl max-w-md text-center w-full"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 50 }}
              transition={{ type: "spring", bounce: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-5xl mb-4"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedWish.emoji}
              </motion.div>

              <motion.h2
                className="text-2xl font-bold text-purple-700 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {selectedWish.title}
              </motion.h2>

              <motion.p
                className="text-purple-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {selectedWish.message}
              </motion.p>

              <motion.button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-full relative overflow-hidden"
                onClick={() => setSelectedWish(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white opacity-20"
                  animate={{
                    x: ["0%", "100%"],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
                Thank you!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio player (hidden) */}
      {playMusic && <audio src="/h.mp3" autoPlay loop className="hidden" />}
    </div>
  );
}
