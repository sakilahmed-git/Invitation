import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "./App.css";

export default function App() {
  const [scene, setScene] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const audio = new Audio("/music.mp3");

  // 3D tilt
  useEffect(() => {
    const move = (e) => {
      const w = window.innerWidth / 2;
      const h = window.innerHeight / 2;

      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;

      x.set((cx - w) / 30);
      y.set((cy - h) / 30);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
    };
  }, [x, y]);

  const rotateX = useTransform(y, [-10, 10], [8, -8]);
  const rotateY = useTransform(x, [-10, 10], [-8, 8]);

  const next = () => {
    if (scene === 0) audio.play();
    setScene((s) => s + 1);
  };

  const prev = () => setScene((s) => Math.max(0, s - 1));

  const handleDragEnd = (e, info) => {
    if (info.offset.y < -80) next();
    if (info.offset.y > 80) prev();
  };

  const scenes = [
    <Ganesh />,
    <MainTitle />,
    <Names />,
    <Events />,
    <Couple />,
    <Invite />,
    <Final />,
  ];

  return (
    <div
      className="app"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          className="scene"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, scale: 1.3, filter: "blur(12px)" }}
animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
exit={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
          transition={{ duration: 0.8 }}
        >
          {scenes[scene]}

          {/* PETALS */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}

          {/* Swipe hint */}
          {scene === 0 && (
            <motion.div
              className="swipe-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⬆ Swipe Up
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

//////////////////////////////////////////////////
// SCENES
//////////////////////////////////////////////////

const Ganesh = () => (
  <div className="center">
    <motion.img
      src="/ganesh.png"
      className="ganesh"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    />
    <p className="hindi tiny">Shri Ganeshaya Namah</p>
  </div>
);

//////////////////////////////////////////////////

const MainTitle = () => (
  <div className="center">
    <motion.h1 className="title">SAGUN KE SUNEHRE PAL</motion.h1>
    <p className="hindi subtitle">सगुन के सुनहरे पल</p>
  </div>
);

//////////////////////////////////////////////////

const Names = () => (
  
  <div className="center names-scene">
    <img src="/wed_bg.png" className="bg-couple" alt="" />
    

    {/* TOP NAME (from above) */}
  <motion.h1
    className="names"
  >
    GAUTAM KUMAR
  </motion.h1>

  {/* WEDS */}
  <motion.div
    className="heart"
  >
    WEDS
  </motion.div>

  {/* BOTTOM NAME (from below) */}
  <motion.h1
    className="names"
  >
    SIMPI KUMARI
  </motion.h1>

    {/* GOLDEN ASH PARTICLES */}
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="ash"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${8 + Math.random() * 6}s`
        }}
      />
    ))}

  </div>
);

//////////////////////////////////////////////////

const Events = () => (
  <div className="center">
    <div className="card">
      <p>26 APRIL 2026</p>
      <p className="hindi">शुभ लग्नोत्सव</p>
    </div>

    <div className="card">
      <p>27 APRIL 2026</p>
      <p className="hindi">मंडप एवं पूजन</p>
    </div>

    <div className="card highlight">
      <p>28 APRIL 2026</p>
      <p>विवाह समारोह</p>
    </div>
  </div>
);

//////////////////////////////////////////////////

const Couple = () => (
  <div className="photo-container">

    {/* Fire */}

    {/* Groom */}
    <motion.img
      src="/groom.png"
      className="groom"
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -500, opacity: 0 }}
      transition={{ duration: 1 }}
    />

    {/* Bride */}
    <motion.img
      src="/bride.png"
      className="bride"
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 500, opacity: 0 }}
      transition={{ duration: 1 }}
    />

    {/* CENTER INFO */}
    <motion.div
      className="center-info"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <h1>गौतम ❤️ सिंपी</h1>
      <p className="sub">Wedding Ceremony</p>
    </motion.div>

    {/* GROOM DETAILS */}
    <motion.div
      className="details groom-details"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <h3>चि० गौतम कुमार</h3>
      <p>सुपुत्र - श्रीमती यशोदा देवी एवं श्री राजेश साव</p>
    </motion.div>

    {/* BRIDE DETAILS */}
    <motion.div
      className="details bride-details"
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <h3>आयु० कुमारी सिंपी</h3>
      <p>सुपुत्री - श्रीमती किरण देवी एवं श्री हरी प्रसाद साव</p>
    </motion.div>

  </div>
);

//////////////////////////////////////////////////

const Invite = () => (
  <div className="invite-container">

    {/* Dark overlay */}
    <div className="overlay"></div>

    {/* Groom */}
    <img src="/groom.png" className="person groom-blend" alt="" />

    {/* Bride */}
    <img src="/bride.png" className="person bride-blend" alt="" />

    {/* Text */}
    <div className="content">
      <h1>आपका सादर आमंत्रण है</h1>
      <h2>You Are Cordially Invited</h2>

      <h3>विवाह समारोह</h3>
      <h4>Wedding Ceremony</h4>

      <p>
        हमें हर्ष हो रहा है आपको हमारे विवाह समारोह में आमंत्रित करने में।
        कृपया पधारकर इस शुभ अवसर को अपनी उपस्थिति से गौरवान्वित करें।
      </p>

      <p>
        It is our pleasure to invite you to our wedding ceremony.
        Please join us and bless us with your presence.
      </p>
    </div>

  </div>
);
//////////////////////////////////////////////////

const Final = () => (
  <div className="center">
    <h2 className="glow">See you there ✨</h2>
  </div>
);