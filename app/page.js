
"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Menu,
  Music2,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

/* =====================================================
   WEDDING CONFIGURATION
===================================================== */

const guest = {
  name: "Rohit Kumar",
  location: "Sasaram, Bihar",
};

const wedding = {
  groom: "हिमांशु",
  bride: "स्तुति",
  groomFull: "हृदयांश हिमांशु",
  brideFull: "हृदयकर्णिका स्तुति",
  date: "01 December 2026",
  dateShort: "01 · 12 · 2026",
  countdownDate: "2026-12-01T18:00:00+05:30",
  venue: "सैनी आश्रम",
  address: "निकट ज्वालापुर तहसील, ज्वालापुर, जिला – हरिद्वार",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Saini+Ashram+near+Jwalapur+Tehsil+Haridwar",
};

const ganeshaImage =
  "https://png.pngtree.com/png-clipart/20250601/original/pngtree-elegant-hindu-wedding-card-design-with-ganesha-aum-symbol-diwali-theme-png-image_21107600.png";

const events = [
  {
    date: "29",
    month: "NOV",
    day: "Sunday",
    title: "हल्दी रस्म",
    time: "सुबह 11:00 बजे",
    description: "हल्दी की खुशियों और अपनों के स्नेह से सजा शुभ अवसर।",
    icon: "🌼",
  },
  {
    date: "30",
    month: "NOV",
    day: "Monday",
    title: "मंडप पूजन",
    time: "सुबह 11:00 बजे",
    description: "मंगलमय वैवाहिक जीवन के लिए पूजा एवं शुभ अनुष्ठान।",
    icon: "🪔",
  },
  {
    date: "01",
    month: "DEC",
    day: "Tuesday",
    title: "घुड़चढ़ी",
    time: "शाम 4:00 बजे",
    description: "शुभ विवाह की मंगल यात्रा का शुभारंभ।",
    icon: "🐎",
  },
  {
    date: "01",
    month: "DEC",
    day: "Tuesday",
    title: "बारात प्रस्थान",
    time: "शाम 6:00 बजे",
    description: "ढोल, नगाड़े और शहनाई के साथ बारात प्रस्थान।",
    icon: "🥁",
  },
  {
    date: "01",
    month: "DEC",
    day: "Tuesday",
    title: "प्रीतिभोज",
    time: "रात्रि 7:30 बजे",
    description: "आपकी उपस्थिति से यह उत्सव और भी यादगार बनेगा।",
    icon: "✨",
  },
];

const familyNames = [
  "श्रीमती गीता वर्मा – श्री अनिल वर्मा",
  "श्रीमती रेखा वर्मा – श्री अजय वर्मा",
  "हरित वर्मा, करिश्मा वर्मा (ओम)",
  "आर्यन वर्मा, नवनीत वर्मा, कन्या वर्मा",
  "एवं समस्त वर्मा परिवार व मित्रगण",
];

const navItems = [
  ["निमंत्रण", "#invitation"],
  ["कार्यक्रम", "#events"],
  ["विवाह स्थल", "#venue"],
  ["परिवार", "#family"],
];

/* =====================================================
   REUSABLE COMPONENTS
===================================================== */

function Ornament({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c49a50] sm:w-20" />
      <span className="text-xl text-[#c49a50]">✧</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c49a50] sm:w-20" />
    </div>
  );
}

/* FIX: Divider is now properly defined */
function Divider() {
  return (
    <div className="my-8 flex items-center justify-center gap-4">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c49a50] sm:w-20" />
      <span className="text-xl text-[#c49a50]">✧</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c49a50] sm:w-20" />
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-1000 ease-out ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-10 scale-[0.98] opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Petals({ count = 18 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="absolute animate-bounce text-[#e8c98e]/40"
          style={{
            left: `${(index * 37 + 8) % 100}%`,
            top: `${(index * 23 + 4) % 95}%`,
            animationDuration: `${4 + (index % 5)}s`,
            animationDelay: `${-(index % 6)}s`,
            fontSize: `${12 + (index % 4) * 5}px`,
          }}
        >
          {index % 2 === 0 ? "✿" : "❀"}
        </span>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="mb-3 text-[10px] font-semibold tracking-[0.35em] text-[#a77b3e] sm:text-xs">
        {eyebrow}
      </p>

      <h2 className="font-serif text-3xl leading-tight text-[#5c1b2c] sm:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#876c68]">
          {subtitle}
        </p>
      )}

      <Ornament className="mt-6" />
    </Reveal>
  );
}

/* Personalized guest card */
function GuestCard({ compact = false }) {
  return (
    <div
      className={`relative mx-auto w-full overflow-hidden rounded-2xl border border-[#d8b46b]/60 bg-gradient-to-br from-[#fffdf8] via-[#fff8e9] to-[#f7ecd8] text-center shadow-[0_15px_50px_rgba(30,8,16,0.15)] ${
        compact ? "max-w-sm px-5 py-5" : "max-w-lg px-6 py-8 sm:px-10"
      }`}
    >
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-[#c49a50]/25" />

      <div className="relative">
        <div className="mb-2 text-[10px] font-semibold tracking-[0.3em] text-[#a77b3e]">
          {compact ? "A SPECIAL INVITATION FOR" : "YOU ARE CORDIALLY INVITED"}
        </div>

        <div className="mx-auto my-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#c49a50]/50 text-[#a77b3e]">
          <Heart size={16} fill="currentColor" />
        </div>

        <p className="font-serif text-2xl text-[#67283b] sm:text-3xl">
          {guest.name}
        </p>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#80665a] sm:text-sm">
          <MapPin size={15} className="text-[#b58a4b]" />
          <span>{guest.location}</span>
        </div>

        {!compact && (
          <p className="mt-5 text-xs leading-6 text-[#8c7165]">
            आपकी स्नेहिल उपस्थिति एवं शुभाशीर्वाद की प्रतीक्षा में
            <br />
            हिमांशु ♥ स्तुति एवं समस्त वर्मा परिवार
          </p>
        )}
      </div>
    </div>
  );
}

function GaneshaWelcome() {
  return (
    <div className="relative mx-auto mb-7 flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
      <div className="absolute inset-0 animate-pulse rounded-full bg-[#d8b46b]/10 blur-2xl" />

      <div className="absolute inset-1 rounded-full border border-[#d8b46b]/60 shadow-[0_0_35px_rgba(216,180,107,0.18)]" />

      <div className="absolute inset-3 rounded-full border border-dashed border-[#e7c783]/40" />

      <img
        src={ganeshaImage}
        alt="Lord Ganesha - Wedding Blessings"
        loading="eager"
        referrerPolicy="no-referrer"
        className="relative z-10 h-24 w-24 object-contain drop-shadow-[0_0_18px_rgba(231,199,131,0.55)] sm:h-28 sm:w-28"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      <span className="absolute z-0 text-5xl text-[#e9c77e]">ॐ</span>
    </div>
  );
}

function WeddingBand() {
  const instruments = ["🥁", "🎺", "🪘", "🎷"];

  return (
    <div className="mx-auto mt-8 flex max-w-lg flex-col items-center">
      <div className="flex items-center justify-center gap-4 sm:gap-7">
        {instruments.map((icon, index) => (
          <div
            key={icon}
            className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full border border-[#d8b46b]/50 bg-white/5 text-xl shadow-[0_0_25px_rgba(216,180,107,0.12)] sm:h-14 sm:w-14 sm:text-2xl"
            style={{ animationDelay: `${index * 250}ms` }}
          >
            {icon}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 text-[10px] tracking-[0.2em] text-[#e6c98d] sm:text-xs">
        <span>✦</span>
        <span>शुभ मंगलमय विवाह</span>
        <span>✦</span>
      </div>

      <div className="mt-4 flex h-7 items-center justify-center gap-1">
        {Array.from({ length: 21 }).map((_, index) => (
          <span
            key={index}
            className="w-1 animate-pulse rounded-full bg-[#d8b46b]/80"
            style={{
              height: `${7 + ((index * 13) % 19)}px`,
              animationDelay: `${index * 55}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const target = new Date(wedding.countdownDate).getTime();
      const difference = Math.max(0, target - Date.now());

      setTime({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    update();
    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const units = [
    ["दिन", time.days],
    ["घंटे", time.hours],
    ["मिनट", time.minutes],
    ["सेकंड", time.seconds],
  ];

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-[#d8b46b]/30 bg-[#fffaf1]/5 px-4 py-5 text-center shadow-lg transition duration-500 hover:-translate-y-2 hover:border-[#e8c987] sm:py-7"
        >
          <strong className="block font-serif text-4xl font-light text-[#e7c783] sm:text-5xl">
            {String(value).padStart(2, "0")}
          </strong>

          <span className="mt-2 block text-[10px] tracking-[0.2em] text-[#f4dfb5] sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* =====================================================
   MAIN PAGE
===================================================== */

export default function WeddingPage() {
  const [opened, setOpened] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(
        maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.volume = 0.35;
      await audio.play();
      setPlaying(true);
      return true;
    } catch (error) {
      console.warn("Audio playback could not start:", error);
      setPlaying(false);
      return false;
    }
  };

  const openInvitation = () => {
    if (leaving || opened) return;

    setLeaving(true);

    window.setTimeout(() => {
      setOpened(true);
      setLeaving(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 700);

    playMusic();
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await playMusic();
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf1] font-sans text-[#4a1927] selection:bg-[#d8b46b] selection:text-[#35101c]">

      {/* SCROLL PROGRESS */}
      <div className="fixed left-0 top-0 z-[100] h-[3px] w-full bg-[#d8b46b]/20">
        <div
          className="h-full bg-gradient-to-r from-[#a66a31] via-[#f1d28c] to-[#a66a31] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* BACKGROUND MUSIC */}
      <audio
        ref={audioRef}
        src="/music/ganesh-vandana.mp3"
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      {/* =================================================
          OPENING INVITATION
      ================================================== */}

     
{!opened && (
  <section
    className={`fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-[#260b16] px-3 py-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
      leaving
        ? "scale-110 opacity-0 blur-sm"
        : "scale-100 opacity-100"
    }`}
  >
    {/* Background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(132,65,55,0.38),transparent_70%)]" />

    <div className="pointer-events-none absolute inset-2 rounded-[24px] border border-[#d8b46b]/40 sm:inset-5 sm:rounded-[36px]" />

    <div className="pointer-events-none absolute inset-4 rounded-[20px] border border-[#d8b46b]/20 sm:inset-8 sm:rounded-[30px]" />

    <Petals count={22} />

    {/* Main Invitation Card */}
    <div className="relative z-10 mx-auto my-auto w-full max-w-xl rounded-[22px] border border-[#d8b46b]/60 bg-[#3b1420]/70 px-4 py-6 text-center shadow-[0_0_50px_rgba(216,180,107,0.12)] backdrop-blur-sm sm:rounded-[30px] sm:px-10 sm:py-9">

      {/* Top Mobile / Contact Number */}
      <p className="mb-4 text-[9px] tracking-[0.25em] text-[#e9c77e] sm:text-xs">
        WITH THE BLESSINGS OF LORD GANESHA
      </p>

      {/* Ganesha Image */}
      <div className="mx-auto mb-4 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#d8b46b] bg-[#fff1d7] p-1 shadow-[0_0_25px_rgba(216,180,107,0.3)] sm:h-32 sm:w-32">
          <GaneshaWelcome />
        </div>
      </div>

      {/* Ganesh Mantra */}
      <p className="mb-3 text-sm tracking-[0.2em] text-[#e9c77e] sm:text-lg">
        ॥ श्री गणेशाय नमः ॥
      </p>

      <p className="mx-auto max-w-md text-[11px] leading-7 text-[#f7e7cb] sm:text-sm sm:leading-8">
        वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।
        <br />
        निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
      </p>

      {/* Divider */}
      <div className="my-5 flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8b46b]" />
        <span className="text-[#e5bd72]">✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8b46b]" />
      </div>

{/* Personalized Guest Invitation */}
<div className="mx-auto mt-5 max-w-sm rounded-xl border border-[#d8b46b]/25 bg-[#260b16]/35 px-4 py-3 shadow-inner">

  <p className="text-[9px] font-semibold tracking-[0.3em] text-[#d8b46b] sm:text-[10px]">
    A SPECIAL INVITATION FOR
  </p>

  <h2 className="mt-2 font-serif text-2xl italic tracking-wide text-[#fff1d7] sm:text-3xl">
    Rohit Kumar
  </h2>

  <div className="mt-2 flex items-center justify-center gap-2">
    <span className="h-px w-7 bg-[#d8b46b]/50" />
    <span className="text-[10px] text-[#e5bd72]">✦</span>
    <span className="h-px w-7 bg-[#d8b46b]/50" />
  </div>

  <p className="mt-1 text-[9px] tracking-[0.12em] text-[#e9c77e]/80">
    YOUR PRESENCE WILL MAKE OUR DAY SPECIAL
  </p>
</div>

{/* Divider */}
<div className="my-5 flex items-center justify-center gap-3">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8b46b]" />
  <span className="text-[#e5bd72]">✦</span>
  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8b46b]" />
</div>

      {/* Wedding Heading */}
      <p className="text-[9px] tracking-[0.3em] text-[#d8b46b] sm:text-xs">
        YOU ARE CORDIALLY INVITED
      </p>

      <div className="mt-3 text-center">
  <h1 className="font-serif text-2xl leading-tight text-[#fff1d7] sm:text-4xl">
    A New Journey
    <span className="block italic text-[#e5bd72]">
      of Love Begins
    </span>
  </h1>

  <p className="mt-2 text-[9px] font-medium tracking-[0.25em] text-[#d8b46b] sm:text-xs">
    WEDDING CELEBRATION
  </p>

  <div className="my-3 flex items-center justify-center gap-3">
    <span className="h-px w-8 bg-[#d8b46b]/60" />
    <span className="text-[11px] font-semibold tracking-[0.18em] text-[#fff1d7] sm:text-sm">
      01 DECEMBER 2026
    </span>
    <span className="h-px w-8 bg-[#d8b46b]/60" />
  </div>

  <p className="text-[10px] tracking-[0.25em] text-[#e5bd72] sm:text-xs">
    HARIDWAR
  </p>

  {/* Couple Names */}
  <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 font-serif text-2xl leading-tight text-[#f5dfb2] sm:gap-x-4 sm:text-4xl">
    <span>{wedding.groom}</span>
    <span className="text-lg text-[#d8b46b] sm:text-2xl">♥</span>
    <span>{wedding.bride}</span>
  </div>
</div>

      {/* Wedding Decorative Band */}
      <div className="mt-5">
        <WeddingBand />
      </div>

    

     

      {/* Invitation Button */}
      <button
        onClick={openInvitation}
        disabled={leaving}
        className="group relative mt-6 inline-flex w-full max-w-sm items-center justify-center gap-3 overflow-hidden rounded-full border border-[#e6c47d] bg-gradient-to-r from-[#e4c17c] via-[#f5e2b7] to-[#c9984e] px-5 py-3.5 text-[10px] font-bold tracking-[0.13em] text-[#3c1420] shadow-[0_0_30px_rgba(216,180,107,0.22)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(216,180,107,0.45)] active:scale-95 disabled:cursor-wait sm:text-xs"
      >
        <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 group-hover:translate-x-full" />

        <Sparkles size={15} className="relative" />

        <span className="relative">
          {leaving
            ? "OPENING YOUR INVITATION..."
            : "OPEN WEDDING INVITATION"}
        </span>

        <Sparkles size={15} className="relative" />
      </button>

      {/* Footer */}
      <p className="mt-4 flex items-center justify-center gap-2 text-[9px] tracking-wider text-[#d7bd91] sm:text-[10px]">
        <Music2 size={13} />
        TAP TO ENTER WITH DEVOTIONAL MUSIC
      </p>

      <p className="mt-4 text-[9px] tracking-[0.2em] text-[#d8b46b]/70">
        MADE WITH LOVE & BLESSINGS
      </p>
      <p className="mt-4 text-[9px] tracking-[0.2em] text-[#d8b46b]/70">
   TECH RAKSHAK
      </p>

    </div>
  </section>
)}


      {/* =================================================
          MAIN WEBSITE
      ================================================== */}

      {opened && (
        <div className="animate-[fadeIn_0.8s_ease-out]">

          {/* NAVIGATION */}
          <header className="sticky top-0 z-40 border-b border-[#d7bd91]/30 bg-[#fffaf1]/90 shadow-sm backdrop-blur-xl">
  <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-2 sm:flex-row sm:justify-between sm:gap-0 sm:px-5 sm:py-4">
    
    {/* Top Row on Mobile: Logo & Music */}
    <div className="flex w-full items-center justify-between sm:w-auto">
      <a
        href="#home"
        className="font-serif text-2xl tracking-widest text-[#641d31]"
      >
        H <span className="text-[#c49a50]">♥</span> S
      </a>

      <button
        onClick={toggleMusic}
        className="flex items-center gap-1.5 rounded-full border border-[#c49a50]/50 px-3 py-1.5 text-[10px] text-[#641d31] transition-all hover:bg-[#641d31] hover:text-white sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
      >
        {playing ? <Pause size={12} className="sm:h-[15px] sm:w-[15px]" /> : <Play size={12} className="sm:h-[15px] sm:w-[15px]" />}
        <span className="hidden sm:inline">{playing ? "Pause Music" : "Play Music"}</span>
        <span className="sm:hidden">{playing ? "Pause" : "Play"}</span>
      </button>
    </div>

    {/* Bottom Row on Mobile: Always-Visible Menu Links */}
 
<nav className="no-scrollbar flex w-full items-center justify-center gap-5 overflow-x-auto whitespace-nowrap px-2 pt-2 text-[10px] font-medium tracking-[0.16em] text-[#653344] sm:w-auto sm:gap-8 sm:px-0 sm:pt-0 sm:text-[11px]">
  {navItems.map(([label, href], index) => (
    <a
      key={href}
      href={href}
      className="group relative shrink-0 py-2 uppercase transition-all duration-300 hover:text-[#bd8b3f]"
    >
      <span className="relative z-10">{label}</span>

      <span className="absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#bd8b3f] transition-all duration-300 group-hover:w-full" />
    </a>
  ))}
</nav>

  </div>
</header>

          {/* HERO */}
          <section
            id="home"
            className="relative flex min-h-[88vh] scroll-mt-20 items-center justify-center overflow-hidden bg-[#3a101f] px-5 py-24 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(154,93,64,0.38),transparent_65%)]" />

            <div className="absolute inset-4 rounded-[26px] border border-[#d8b46b]/25 sm:inset-9 sm:rounded-[30px]" />

            <Petals count={20} />

            <div className="relative z-10 mx-auto max-w-4xl">

              <p className="animate-pulse text-xs tracking-[0.35em] text-[#e7c783] sm:text-sm">
                ॥ शुभ विवाह ॥
              </p>

              <div
                className="my-7 animate-spin text-5xl text-[#d8b46b]"
                style={{ animationDuration: "35s" }}
              >
                ✺
              </div>

              <p className="mb-4 text-[10px] tracking-[0.3em] text-[#e7c783] sm:text-xs">
                A CELEBRATION OF LOVE & TOGETHERNESS
              </p>

              <h1 className="font-serif text-5xl leading-relaxed text-[#fff0d6] sm:text-7xl md:text-8xl">
                {wedding.groom}
                <span className="text-[#d8b46b]"> ♥ </span>
                {wedding.bride}
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 tracking-wider text-[#f2dfc1] sm:text-base">
                Two hearts, one beautiful journey, forever together.
              </p>

              <div className="my-9 flex items-center justify-center gap-4 text-[10px] tracking-[0.25em] text-[#e7c783] sm:text-xs">
                <span className="h-px w-10 bg-[#d8b46b] sm:w-12" />
                01 DECEMBER 2026
                <span className="h-px w-10 bg-[#d8b46b] sm:w-12" />
              </div>

              <div className="mx-auto max-w-sm">
                <GuestCard compact />
              </div>

              <a
                href="#invitation"
                className="mt-9 inline-flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#f2dfc1] transition-all hover:gap-5"
              >
                SCROLL TO EXPLORE
                <ArrowDown size={17} className="animate-bounce" />
              </a>

            </div>

            <div className="absolute bottom-7 text-xl tracking-[0.4em] text-[#d8b46b]/70">
              ❧ ❧ ❧
            </div>
          </section>

          {/* INVITATION */}
          <section
            id="invitation"
            className="scroll-mt-20 bg-[#fffaf1] px-5 py-20 sm:py-28"
          >
            <div className="mx-auto max-w-4xl">

              <SectionHeading
                eyebrow="A CELEBRATION OF LOVE"
                title="The Wedding Invitation"
                subtitle="With immense joy, we invite you to bless the beginning of a beautiful new journey."
              />

              <Reveal className="mb-9">
                <GuestCard />
              </Reveal>

              <Reveal>
                <div className="relative overflow-hidden rounded-[26px] border border-[#d4b77e] bg-[#fffdf7] px-5 py-10 text-center shadow-[0_20px_70px_rgba(80,35,35,0.10)] sm:rounded-[30px] sm:px-16 sm:py-16">

                  <div className="pointer-events-none absolute inset-2 rounded-[20px] border border-[#d4b77e]/40 sm:inset-3" />

                  <div className="absolute left-5 top-4 text-3xl text-[#c49a50]/50">
                    ❧
                  </div>

                  <div className="absolute right-5 top-4 rotate-90 text-3xl text-[#c49a50]/50">
                    ❧
                  </div>

                  <div className="relative">

                    <div className="mb-6 text-4xl text-[#bd8b3f]">ॐ</div>

                    <p className="text-base text-[#9b6c2f] sm:text-lg">
                      ॥ श्री गणेशाय नमः ॥
                    </p>

                    <p className="mt-8 text-lg text-[#6c3a43]">
                      परम स्नेही स्वजन,
                    </p>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#73535a]">
                      परमपिता परमेश्वर एवं इष्ट देवी-देवताओं की असीम
                      अनुकम्पा से
                    </p>

                    <p className="mt-5 text-sm font-medium leading-8 text-[#74434c]">
                      स्व. श्रीमती मिथिलेश वर्मा एवं स्व. श्री संतोष कुमार वर्मा
                    </p>

                    <p className="mt-5 text-sm text-[#8b6c65]">
                      अपने सुपुत्र
                    </p>

                    <h3 className="mt-2 font-serif text-3xl text-[#762b40] sm:text-4xl">
                      {wedding.groomFull}
                    </h3>

                    <p className="mt-3 text-sm leading-8 text-[#74434c]">
                      सुपुत्र श्रीमती पूनम वर्मा एवं श्री संजय वर्मा
                    </p>

                    <div className="my-7 text-3xl text-[#bd8b3f]">♥</div>

                    <p className="text-sm text-[#8b6c65]">का परिणय</p>

                    <h3 className="mt-2 font-serif text-3xl text-[#762b40] sm:text-4xl">
                      {wedding.brideFull}
                    </h3>

                    <p className="mt-3 text-sm leading-8 text-[#74434c]">
                      सुपुत्री श्रीमती संगीता वर्मा एवं श्री पवन वर्मा
                    </p>

                    <p className="mt-2 text-sm leading-8 text-[#74434c]">
                      निवासी – बुद्ध विहार, मुरादाबाद (उत्तर प्रदेश)
                    </p>

                    <p className="mt-6 text-sm text-[#8b6c65]">के साथ</p>

                    <h4 className="mt-4 text-xl text-[#a77b3e]">
                      ॥ दाम्पत्य-सूत्र-बन्धन ॥
                    </h4>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#73535a]">
                      की मांगलिक बेला पर आपके स्नेहिल सानिध्य के आकांक्षी हैं।
                    </p>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-[#73535a]">
                      आप नव-दंपति के सुखमय एवं समृद्ध जीवन हेतु आशीर्वाद
                      प्रदान कर अनुगृहीत करें।
                    </p>

                    <Divider />

                    <p className="text-xs tracking-[0.2em] text-[#a77b3e]">
                      WEDDING CELEBRATION
                    </p>

                    <p className="mt-3 font-serif text-2xl text-[#762b40]">
                      {wedding.date}
                    </p>

                    <p className="mt-2 text-sm text-[#80656a]">
                      हरिद्वार, उत्तराखंड
                    </p>

                  </div>
                </div>
              </Reveal>

            </div>
          </section>

          {/* COUPLE */}
          <section className="bg-[#f7eee1] px-5 py-20 sm:py-24">
            <div className="mx-auto max-w-5xl">

              <SectionHeading
                eyebrow="MADE FOR EACH OTHER"
                title="Two Souls, One Destiny"
                subtitle="A new chapter, a new promise, a lifetime of togetherness."
              />

              <Reveal>
                <div className="mx-auto max-w-2xl rounded-[28px] border border-[#d0ad70] bg-[#fffaf1] p-2 shadow-[0_25px_70px_rgba(77,32,38,0.13)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_85px_rgba(77,32,38,0.2)] sm:p-3">

                  <div className="relative flex min-h-[390px] items-end justify-center overflow-hidden rounded-[22px] bg-gradient-to-br from-[#4b1728] via-[#6c293c] to-[#2c101b] sm:min-h-[520px]">

                    <img
                      src="https://png.pngtree.com/png-vector/20250309/ourmid/pngtree-adorable-cartoon-wedding-couple-traditional-indian-marriage-attire-png-image_15745834.png"
                      alt="Himanshu and Stuti"
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.opacity = "0";
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a0d18]/90 via-[#2a0d18]/10 to-transparent" />

                    <div className="relative z-10 w-full p-7 text-center sm:p-10">

                      <p className="font-serif text-3xl text-[#fff1d7] sm:text-4xl">
                        {wedding.groom}
                        <span className="text-[#e4bd77]"> ♥ </span>
                        {wedding.bride}
                      </p>

                      <p className="mt-3 text-[10px] tracking-[0.3em] text-[#f3dcae] sm:text-xs">
                        {wedding.dateShort}
                      </p>

                    </div>
                  </div>
                </div>

                <p className="mt-9 text-center font-serif text-xl italic text-[#865a51]">
                  “Together is a beautiful place to be.”
                </p>
              </Reveal>

            </div>
          </section>

          {/* COUNTDOWN */}
          <section className="relative overflow-hidden bg-[#3a101f] px-5 py-20 text-center sm:py-24">
            <Petals count={12} />

            <Reveal className="relative z-10">

              <p className="mb-3 text-[10px] tracking-[0.35em] text-[#d8b46b] sm:text-xs">
                THE BIG DAY IS APPROACHING
              </p>

              <h2 className="font-serif text-3xl text-[#fff0d6] sm:text-5xl">
                Counting Every Moment
              </h2>

              <Divider />

              <Countdown />

              <p className="mt-8 text-sm text-[#e9d6b8]">
                Until we celebrate a lifetime of togetherness
              </p>

            </Reveal>
          </section>

          {/* EVENTS */}
          <section
            id="events"
            className="scroll-mt-20 bg-[#fffaf1] px-5 py-20 sm:py-24"
          >
            <div className="mx-auto max-w-4xl">

              <SectionHeading
                eyebrow="SAVE THE DATES"
                title="Wedding Celebrations"
                subtitle="हर रस्म में खुशियों के रंग, हर पल में अपनों का संग।"
              />

              <div className="space-y-4 sm:space-y-5">

                {events.map((event, index) => (
                  <Reveal key={`${event.title}-${index}`} delay={index * 80}>

                    <article className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[#d8c29d]/70 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#c49a50] hover:shadow-[0_15px_40px_rgba(80,35,35,0.12)] sm:gap-8 sm:p-7">

                      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#a66a31] to-[#e8c987] transition-all duration-700 group-hover:w-full" />

                      <div className="flex h-[76px] w-[70px] shrink-0 flex-col items-center justify-center rounded-xl border border-[#d8b46b]/50 bg-[#fff8eb] text-[#762b40] sm:h-24 sm:w-24">

                        <strong className="font-serif text-3xl sm:text-4xl">
                          {event.date}
                        </strong>

                        <span className="text-[9px] tracking-widest sm:text-[10px]">
                          {event.month}
                        </span>

                        <small className="mt-1 text-[9px]">
                          {event.day}
                        </small>

                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-xl sm:text-2xl">
                            {event.icon}
                          </span>

                          <h3 className="text-base font-semibold text-[#69253a] sm:text-xl">
                            {event.title}
                          </h3>
                        </div>

                        <p className="mt-2 text-xs leading-6 text-[#80656a] sm:text-sm">
                          {event.description}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-[11px] text-[#a2753e] sm:mt-3 sm:text-xs">
                          <Clock3 size={14} />
                          {event.time}
                        </div>

                      </div>

                      <span className="hidden font-serif text-3xl text-[#d9c8a9] sm:block">
                        0{index + 1}
                      </span>

                    </article>

                  </Reveal>
                ))}

              </div>
            </div>
          </section>

          {/* VENUE */}
          <section
            id="venue"
            className="scroll-mt-20 bg-[#f7eee1] px-5 py-20 sm:py-24"
          >
            <div className="mx-auto max-w-3xl">

              <SectionHeading
                eyebrow="WE LOOK FORWARD TO SEEING YOU"
                title="The Wedding Venue"
                subtitle="आपकी उपस्थिति से हमारा उत्सव पूर्ण होगा।"
              />

              <Reveal>
                <div className="relative overflow-hidden rounded-[26px] border border-[#d8b46b]/60 bg-[#3a101f] px-6 py-12 text-center text-[#fff0d6] shadow-[0_25px_65px_rgba(64,20,34,0.18)] sm:rounded-[30px] sm:px-12">

                  <div className="absolute inset-3 rounded-[20px] border border-[#d8b46b]/20" />

                  <div className="relative">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b46b]/50 text-3xl text-[#e7c783]">
                      <MapPin size={27} />
                    </div>

                    <p className="mt-6 text-[10px] tracking-[0.3em] text-[#d8b46b]">
                      WEDDING CELEBRATION
                    </p>

                    <h3 className="mt-3 font-serif text-3xl text-[#e7c783] sm:text-4xl">
                      {wedding.venue}
                    </h3>

                    <p className="mt-4 text-sm leading-8 text-[#f0dfc6]">
                      निकट ज्वालापुर तहसील,
                      <br />
                      ज्वालापुर, जिला – हरिद्वार
                    </p>

                    <div className="my-7 flex items-center justify-center gap-2 text-sm text-[#e7c783]">
                      <CalendarDays size={17} />
                      {wedding.date}
                    </div>

                    <a
                      href={wedding.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 rounded-full border border-[#e7c783] bg-[#e7c783] px-7 py-3 text-xs font-semibold tracking-wider text-[#3a101f] transition-all duration-500 hover:-translate-y-1 hover:bg-transparent hover:text-[#e7c783]"
                    >
                      <MapPin size={16} />
                      GET DIRECTIONS
                      <ArrowRight size={15} />
                    </a>

                  </div>
                </div>
              </Reveal>

            </div>
          </section>

          {/* FAMILY */}
          <section
            id="family"
            className="scroll-mt-20 bg-[#fffaf1] px-5 py-20 sm:py-24"
          >
            <div className="mx-auto max-w-4xl">

              <SectionHeading
                eyebrow="WITH LOVE AND BLESSINGS"
                title="Our Loving Family"
                subtitle="दो परिवारों के मिलन का यह शुभ अवसर, आप सभी के आशीर्वाद से और भी मंगलमय बने।"
              />

              <Reveal>
                <div className="rounded-[26px] border border-[#d8b46b]/60 bg-[#fffdf7] px-5 py-10 text-center shadow-[0_15px_55px_rgba(80,35,35,0.08)] sm:rounded-[28px] sm:px-14 sm:py-12">

                  <p className="text-xl text-[#a2753e]">
                    दर्शनाभिलाषी
                  </p>

                  <div className="mt-7 space-y-4">
                    {familyNames.map((name) => (
                      <p
                        key={name}
                        className="text-sm leading-7 text-[#704650] transition-colors duration-300 hover:text-[#b18443]"
                      >
                        {name}
                      </p>
                    ))}
                  </div>

                  <Divider />

                  <p className="text-xl text-[#a2753e]">
                    विनीत
                  </p>

                  <h3 className="mt-4 text-lg text-[#69253a]">
                    संजय वर्मा एवं समस्त वर्मा परिवार
                  </h3>

                </div>
              </Reveal>

            </div>
          </section>

          {/* FOOTER */}
          <footer className="relative overflow-hidden bg-[#260b16] px-5 pb-8 pt-20 text-center text-[#fff0d6]">

            <Petals count={15} />

            <div className="relative z-10 mx-auto max-w-3xl">

              <div
                className="mb-5 animate-spin text-5xl text-[#d8b46b]"
                style={{ animationDuration: "40s" }}
              >
                ✺
              </div>

              <p className="text-sm tracking-widest text-[#e7c783]">
                ॥ शुभ विवाह ॥
              </p>

              <h2 className="mt-7 font-serif text-2xl leading-relaxed text-[#fff0d6] sm:text-4xl">
                आप सभी का हार्दिक स्वागत एवं अभिनंदन।
              </h2>

              <p className="mt-5 text-sm leading-8 text-[#e8d5b9]">
                आपकी उपस्थिति और आशीर्वाद हमारे लिए अमूल्य हैं।
              </p>

              <Heart
                className="mx-auto my-8 animate-pulse text-[#d8b46b]"
                fill="currentColor"
              />

              <p className="text-[10px] tracking-[0.3em] text-[#d8b46b]">
                WITH LOVE & BLESSINGS
              </p>

              <h3 className="mt-5 font-serif text-3xl text-[#fff0d6] sm:text-4xl">
                {wedding.groom}
                <span className="text-[#d8b46b]"> ♥ </span>
                {wedding.bride}
              </h3>

              <p className="mt-5 text-[10px] tracking-[0.25em] text-[#d8b46b] sm:text-xs">
                01 DECEMBER 2026 · HARIDWAR
              </p>

              <div className="mx-auto mt-8 max-w-sm">
                <GuestCard compact />
              </div>

            </div>

            <div className="relative z-10 mt-16 border-t border-[#d8b46b]/20 pt-6 text-[9px] tracking-[0.2em] text-[#c8a979]">
              MADE WITH LOVE · शुभ विवाह
            </div>

          </footer>

          {/* FLOATING MUSIC BUTTON */}
          <button
            onClick={toggleMusic}
            aria-label={playing ? "Pause music" : "Play music"}
            className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#f0d38f] bg-[#451526] text-[#f1d28c] shadow-[0_5px_30px_rgba(50,10,20,0.3)] transition-all duration-500 hover:-translate-y-1 hover:scale-110 hover:bg-[#6a263c] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
          >
            {playing ? <Volume2 size={21} /> : <VolumeX size={21} />}
          </button>

        </div>
      )}
    </main>
  );
}
