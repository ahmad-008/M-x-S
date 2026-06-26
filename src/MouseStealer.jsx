import { useState, useEffect, useRef } from "react";
import "./MouseStealer.css";

const ASSET_BASE = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/184729";

const ASSETS = {
  head: `${ASSET_BASE}/head.svg`,
  waiting: `${ASSET_BASE}/hand.svg`,
  grabbed: `${ASSET_BASE}/hand-with-cursor.svg`,
};

Object.values(ASSETS).forEach((src) => {
  const img = new Image();
  img.src = src;
});

const GrabZone = ({ cursorGrabbed, onCursorGrabbed }) => {
  const [nearZone, setNearZone] = useState(false);
  const [inZone, setInZone] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const isNear =
        e.clientX > window.innerWidth * 0.6 &&
        e.clientX < window.innerWidth * 0.7 &&
        e.clientY > window.innerHeight - 400;
      const isIn = e.clientX >= window.innerWidth * 0.7 && e.clientY > window.innerHeight - 400;
      setNearZone(isNear);
      setInZone(isIn);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`grab-zone ${inZone ? "grab-zone--active" : nearZone ? "grab-zone--peek" : ""}`}>
      <Grabber
        cursorGrabbed={cursorGrabbed}
        onCursorGrabbed={onCursorGrabbed}
        active={inZone}
        near={nearZone}
      />
    </div>
  );
};

const Grabber = ({ cursorGrabbed, onCursorGrabbed, active, near }) => {
  const ref = useRef(null);
  const [stealing, setStealing] = useState(false);

  const handleMouseEnter = () => {
    if (!cursorGrabbed && active) {
      onCursorGrabbed();
      setStealing(true);
    }
  };

  useEffect(() => {
    if (stealing) {
      const timer = setTimeout(() => setStealing(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [stealing]);

  return (
    <div
      className={`grabber ${
        stealing ? "grabber--stealing" : cursorGrabbed ? "grabber--grabbed" : near ? "grabber--near" : "grabber--waiting"
      }`}
      ref={ref}
      onMouseEnter={handleMouseEnter}
    >
      <div className="grabber__eyes">
        <div className="grabber__eye grabber__eye--left" />
        <div className="grabber__eye grabber__eye--right" />
      </div>
      <img className="grabber__face" src={ASSETS.head} alt="" aria-hidden="true" />
      <img
        className="grabber__hand"
        src={cursorGrabbed ? ASSETS.grabbed : ASSETS.waiting}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
};

const MouseStealing = () => {
  const [cursorGrabbed, setCursorGrabbed] = useState(false);

  const handleCursorGrabbed = () => {
    setCursorGrabbed(true);
    document.body.style.cursor = "none";

    setTimeout(() => {
      setCursorGrabbed(false);
      document.body.style.cursor = "";
    }, 8000);
  };

  return (
    <div>
      <GrabZone cursorGrabbed={cursorGrabbed} onCursorGrabbed={handleCursorGrabbed} />
    </div>
  );
};

export default MouseStealing;
