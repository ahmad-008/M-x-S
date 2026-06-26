import { useState, useRef, useEffect, useCallback } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

import MouseStealing from './MouseStealer.jsx';
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import WordMareque from './MarqueeProposal.jsx';
import purposerose from './assets/GifData/RoseCute.gif';
import swalbg from './assets/Lovingbg2_main.jpg';
import loveu from './assets/GifData/cutieSwal4.gif';

import photo1 from "./assets/1st.jpeg";
import photo2 from "./assets/2nd.jpeg";

import yesgif0 from "./assets/GifData/Yes/lovecutie0.gif";
import yesgif1 from "./assets/GifData/Yes/love2.gif";
import yesgif2 from "./assets/GifData/Yes/love3.gif";
import yesgif3 from "./assets/GifData/Yes/love1.gif";
import yesgif4 from "./assets/GifData/Yes/lovecutie1.gif";
import yesgif5 from "./assets/GifData/Yes/lovecutie5.gif";
import yesgif6 from "./assets/GifData/Yes/lovecutie7.gif";
import yesgif7 from "./assets/GifData/Yes/lovecutie8.gif";
import yesgif8 from "./assets/GifData/Yes/lovecutie3.gif";
import yesgif9 from "./assets/GifData/Yes/lovecutie9.gif";
import yesgif10 from "./assets/GifData/Yes/lovecutie6.gif";
import yesgif11 from "./assets/GifData/Yes/lovecutie4.gif";
import nogif0 from "./assets/GifData/No/breakRej0.gif";
import nogif0_1 from "./assets/GifData/No/breakRej0_1.gif";
import nogif1 from "./assets/GifData/No/breakRej1.gif";
import nogif2 from "./assets/GifData/No/breakRej2.gif";
import nogif3 from "./assets/GifData/No/breakRej3.gif";
import nogif4 from "./assets/GifData/No/breakRej4.gif";
import nogif5 from "./assets/GifData/No/breakRej5.gif";
import nogif6 from "./assets/GifData/No/breakRej6.gif";
import nogif7 from "./assets/GifData/No/RejectNo.gif";
import nogif8 from "./assets/GifData/No/breakRej7.gif";

import yesmusic1 from "./assets/AudioTracks/Love_LoveMeLikeYouDo.mp3";
import yesmusic2 from "./assets/AudioTracks/Love_EDPerfect.mp3";
import yesmusic3 from "./assets/AudioTracks/Love_Nadaaniyan.mp3";
import yesmusic4 from "./assets/AudioTracks/Love_JoTumMereHo.mp3";
import nomusic1 from "./assets/AudioTracks/Rejection_WeDontTalkAnyMore.mp3";
import nomusic2 from "./assets/AudioTracks/Rejection_LoseYouToLoveMe.mp3";
import nomusic3 from "./assets/AudioTracks/Reject_withoutMe.mp3";
import nomusic4 from "./assets/AudioTracks/Neutral_Base_IHateU.mp3";
import nomusic5 from "./assets/AudioTracks/Reject1_TooGood.mp3";

const YesGifs = [yesgif0, yesgif1, yesgif2, yesgif3, yesgif4, yesgif5, yesgif6, yesgif7, yesgif8, yesgif9, yesgif10, yesgif11];
const NoGifs = [nogif0, nogif0_1, nogif1, nogif2, nogif3, nogif4, nogif5, nogif6, nogif7, nogif8];
const YesMusic = [yesmusic1, yesmusic3, yesmusic4, yesmusic2];
const NoMusic = [nomusic1, nomusic2, nomusic3, nomusic4, nomusic5];

const NO_PHRASES = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "U Have a heart!💕",
  "Don't be so cold!",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
  "But... why? 😢",
  "Please, pretty please? 💖",
  "I can't take this! 😫",
  "Are you sure you want to do this to me? 😢",
  "You're gonna hurt my feelings! 😥",
  "I need you to reconsider, like now! 😓",
  "I believe in you, don't disappoint me! 💔",
  "My heart says yes, what about yours? ❤️",
  "Don't leave me hanging! 😬",
  "Plsss? :( You're breaking my heart 💔",
];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [yespopupShown, setYesPopupShown] = useState(false);
  const [floatingGifs, setFloatingGifs] = useState([]);

  const gifRef = useRef(null);
  const currentAudioRef = useRef(null);
  const isMutedRef = useRef(false);

  const yesButtonSize = Math.min(noCount * 16 + 16, 180);

  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.onended = null;
      }
    };
  }, []);

  const playMusic = useCallback((url, musicArray) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current.onended = null;
    }
    const audio = new Audio(url);
    audio.muted = isMutedRef.current;
    currentAudioRef.current = audio;
    audio.onended = () => {
      const nextIndex = (musicArray.indexOf(url) + 1) % musicArray.length;
      playMusic(musicArray[nextIndex], musicArray);
    };
    audio.play().catch(() => {});
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !isMutedRef.current;
    isMutedRef.current = newMuted;
    setIsMuted(newMuted);
    if (currentAudioRef.current) {
      currentAudioRef.current.muted = newMuted;
    }
  }, []);

  const generateRandomPositionWithSpacing = useCallback((existingPositions) => {
    const minDistance = 15;
    let position;
    let attempts = 0;
    do {
      position = {
        top: `${Math.random() * 80}vh`,
        left: `${Math.random() * 80}vw`,
      };
      const tooClose = existingPositions.some((p) => {
        const dx = Math.abs(parseFloat(p.left) - parseFloat(position.left));
        const dy = Math.abs(parseFloat(p.top) - parseFloat(position.top));
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
      if (!tooClose) break;
    } while (++attempts < 20);
    return position;
  }, []);

  const handleMouseEnterYes = useCallback(() => {
    const count = window.innerWidth < 768 ? 4 : 10;
    const positions = [];
    setFloatingGifs(
      Array.from({ length: count }, (_, i) => {
        const pos = generateRandomPositionWithSpacing(positions);
        positions.push(pos);
        return { id: `heart-${i}`, src: heartGif, style: { ...pos, animationDuration: `${Math.random() * 2 + 1}s` } };
      })
    );
  }, [generateRandomPositionWithSpacing]);

  const handleMouseEnterNo = useCallback(() => {
    const count = window.innerWidth < 768 ? 4 : 10;
    const positions = [];
    setFloatingGifs(
      Array.from({ length: count }, (_, i) => {
        const pos = generateRandomPositionWithSpacing(positions);
        positions.push(pos);
        return { id: `sad-${i}`, src: sadGif, style: { ...pos, animationDuration: `${Math.random() * 2 + 1}s` } };
      })
    );
  }, [generateRandomPositionWithSpacing]);

  const handleMouseLeave = useCallback(() => setFloatingGifs([]), []);

  useEffect(() => {
    if (gifRef.current && yesPressed && noCount > 3) {
      gifRef.current.src = YesGifs[currentGifIndex];
    }
  }, [yesPressed, currentGifIndex, noCount]);

  useEffect(() => {
    if (yesPressed && noCount > 3) {
      const intervalId = setInterval(() => {
        setCurrentGifIndex((prev) => (prev + 1) % YesGifs.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [yesPressed, noCount]);

  useEffect(() => {
    if (gifRef.current) {
      const src = gifRef.current.getAttribute('src');
      gifRef.current.src = src;
    }
  }, [noCount]);

  const handleNoClick = useCallback(() => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 4 && gifRef.current) {
      gifRef.current.src = NoGifs[(nextCount - 4) % NoGifs.length];
    }

    if (nextCount === 1 || (nextCount - 1) % 7 === 0) {
      const nextSongIndex = Math.floor(nextCount / 7) % NoMusic.length;
      playMusic(NoMusic[nextSongIndex], NoMusic);
    }
  }, [noCount, playMusic]);

  const handleYesClick = useCallback(() => {
    if (!popupShown) {
      setYesPressed(true);
    }
    if (noCount > 3) {
      setYesPressed(true);
      playMusic(YesMusic[0], YesMusic);
    }
  }, [popupShown, noCount, playMusic]);

  useEffect(() => {
    if (yesPressed && noCount < 4 && !popupShown) {
      Swal.fire({
        title: "I love you sooo Much!!!❤️, You've stolen my heart completely!!! 🥰💖 But itni pyaari ladki aur itni jaldi haan? Thoda aur nakhre karke mujhe tarpaao na! 🥰✨",
        showClass: { popup: "animate__animated animate__fadeInUp animate__faster" },
        width: "min(700px, 90vw)",
        padding: "1.5em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `rgba(0,0,123,0.2) url(${loveu}) right no-repeat`,
      });
      setPopupShown(true);
      setYesPressed(false);
    }
  }, [yesPressed, noCount, popupShown]);

  useEffect(() => {
    if (yesPressed && noCount > 3 && !yespopupShown) {
      Swal.fire({
        title: "I love you so much!! ❤️ You are my everything, my joy, my forever. Every moment with you is a memory I'll cherish forever, and my heart beats only for you.</br> Will you be the love of my life forever?",
        width: "min(800px, 90vw)",
        padding: "1.5em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `rgba(0,0,123,0.7) url(${purposerose}) right no-repeat`,
      });
      setYesPopupShown(true);
      setYesPressed(true);
    }
  }, [yesPressed, noCount, yespopupShown]);

  useEffect(() => {
    if (noCount === 25) {
      Swal.fire({
        title: "My love for you is endless, like the stars in the sky—shining for you every night, even if you don't always notice. 🌟 I'll wait patiently, proving every day that you're my everything. ❤️ Please press 'Yes' and let's make this a forever story. 🥰✨<br/>'True love never gives up; it grows stronger with time.'",
        width: "min(850px, 90vw)",
        padding: "1.5em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `rgba(0, 104, 123, 0.7) url(${nogif1}) right no-repeat`,
      });
    }
  }, [noCount]);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen -z-10">
        <Spline scene="https://prod.spline.design/oSxVDduGPlsuUIvT/scene.splinecode" />
      </div>

      {noCount > 16 && noCount < 25 && !yesPressed && <MouseStealing />}

      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-8 sm:-mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
        {yesPressed && noCount > 3 ? (
          <>
            <img
              ref={gifRef}
              className="h-[160px] sm:h-[200px] md:h-[230px] rounded-lg"
              src={YesGifs[currentGifIndex]}
              alt="Yes Response"
            />
            <div
              className="text-3xl sm:text-4xl md:text-6xl font-bold my-2 text-center px-4"
              style={{ fontFamily: "Charm, serif", fontWeight: 700 }}
            >
              I Love You !!!
            </div>
            <div
              className="text-xl sm:text-2xl md:text-4xl font-bold my-1 text-center px-4"
              style={{ fontFamily: "Beau Rivage, serif", fontWeight: 500 }}
            >
              You&apos;re the love of my life.
            </div>
            <WordMareque />
          </>
        ) : (
          <>
            <img
              src={lovesvg}
              className="fixed animate-pulse top-6 left-3 md:left-15 w-16 sm:w-24 md:w-40"
              alt="Love SVG"
            />
            <img
              ref={gifRef}
              className="h-[160px] sm:h-[200px] md:h-[230px] rounded-lg"
              src={Lovegif}
              alt="Love Animation"
            />
            <h1 className="text-2xl sm:text-4xl md:text-6xl my-4 text-center px-4 leading-tight">
              Will you be my Valentine?
            </h1>
            <div className="flex flex-wrap justify-center gap-3 items-center px-4">
              <button
                onMouseEnter={handleMouseEnterYes}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnterYes}
                onTouchEnd={handleMouseLeave}
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                onMouseEnter={handleMouseEnterNo}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnterNo}
                onTouchEnd={handleMouseLeave}
                onClick={handleNoClick}
                className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 rounded-lg text-white font-bold py-2 px-4 transition-colors text-base sm:text-lg"
              >
                {NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)]}
              </button>
            </div>
            {floatingGifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.src}
                alt=""
                aria-hidden="true"
                className="absolute w-8 h-8 sm:w-12 sm:h-12 animate-bounce pointer-events-none"
                style={gif.style}
              />
            ))}
          </>
        )}
        <button
          className="fixed bottom-10 right-10 bg-gray-200 p-1 mb-2 rounded-full hover:bg-gray-300 active:bg-gray-400 transition-colors"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <BsVolumeMuteFill size={26} /> : <BsVolumeUpFill size={26} />}
        </button>
        <Footer />
      </div>
    </>
  );
}

const Footer = () => (
  <span className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 border p-1 rounded border-rose-300 text-xs sm:text-sm pointer-events-none select-none bg-transparent">
    Made with <span role="img" aria-label="heart">❤️</span> by Shamoeil Khan For Malaika Shamoeil ❤️
  </span>
);
