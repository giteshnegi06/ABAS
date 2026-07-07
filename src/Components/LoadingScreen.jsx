import { useState, useEffect, useMemo, useRef, useCallback } from "react";

const GREETINGS = [
  { lang: "English",  text: "Hello",        translit: "Hello",      font: "'Fraunces', serif",                     weight: 600 },
  { lang: "Hindi",    text: "नमस्ते",       translit: "Namaste",    font: "'Noto Sans Devanagari', sans-serif",    weight: 700 },
  // { lang: "Bengali",  text: "নমস্কার",      translit: "Nômoshkar",  font: "'Noto Sans Bengali', sans-serif",       weight: 700 },
  { lang: "Punjabi",  text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", translit: "Sat Sri Akal", font: "'Noto Sans Gurmukhi', sans-serif",   weight: 700 },
  { lang: "Gujarati", text: "નમસ્તે",       translit: "Namaste",    font: "'Noto Sans Gujarati', sans-serif",      weight: 700 },
  { lang: "Marathi",  text: "नमस्कार",      translit: "Namaskar",   font: "'Noto Sans Devanagari', sans-serif",    weight: 700 },
  // { lang: "Tamil",    text: "வணக்கம்",       translit: "Vanakkam",   font: "'Noto Sans Tamil', sans-serif",         weight: 700 },
  // { lang: "Telugu",   text: "నమస్కారం",     translit: "Namaskaram", font: "'Noto Sans Telugu', sans-serif",        weight: 700 },
  // { lang: "Kannada",  text: "ನಮಸ್ಕಾರ",      translit: "Namaskara",  font: "'Noto Sans Kannada', sans-serif",       weight: 700 },
  // { lang: "Malayalam",text: "നമസ്കാരം",     translit: "Namaskaram", font: "'Noto Sans Malayalam', sans-serif",     weight: 700 },
  // { lang: "Urdu",     text: "آداب",          translit: "Aadaab",     font: "'Noto Nastaliq Urdu', serif",           weight: 700 },
];

// ── Network-adaptive timing ─────────────────────────────────────────────────
// Uses the Network Information API (Chrome/Android). Falls back to 1100ms.
// Faster connection → shorter hold so the screen doesn't feel sluggish.
// Slower connection → longer hold so fonts have time to load before switching.
function getAdaptiveTiming() {
  const conn =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  if (!conn) return { holdMs: 1100, exitMs: 280, charDelay: 0.030 };

  // effectiveType: "slow-2g" | "2g" | "3g" | "4g"
  switch (conn.effectiveType) {
    case "4g":
      return { holdMs: 800,  exitMs: 220, charDelay: 0.024 };
    case "3g":
      return { holdMs: 1200, exitMs: 280, charDelay: 0.030 };
    case "2g":
      return { holdMs: 1600, exitMs: 320, charDelay: 0.036 };
    case "slow-2g":
      return { holdMs: 2200, exitMs: 380, charDelay: 0.040 };
    default:
      return { holdMs: 1000, exitMs: 260, charDelay: 0.028 };
  }
}

const SCREEN_EXIT_MS = 200;

// ── Grapheme splitter ────────────────────────────────────────────────────────
function splitGraphemes(str) {
  try {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(str), (s) => s.segment);
  } catch {
    return Array.from(str);
  }
}

// ── Animated greeting word ───────────────────────────────────────────────────
// Separate component so changing `key` triggers a true remount,
// guaranteeing fresh animations every time — no class-toggle jank.
function GreetingWord({ greeting, charDelay }) {
  const graphemes = useMemo(() => splitGraphemes(greeting.text), [greeting.text]);
  return (
    <h1
      className="leading-none text-center whitespace-nowrap"
      style={{
        fontFamily: greeting.font,
        fontWeight: greeting.weight,
        fontSize: "clamp(3rem, 12vw, 10rem)",
        letterSpacing: "-0.02em",
      }}
    >
      {graphemes.map((ch, i) => (
        <span
          key={i}
          className="g-char"
          style={{
            animationDelay: `${i * charDelay}s`,
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >
          {ch}
        </span>
      ))}
    </h1>
  );
}

// ── Meta label (lang / translit) ─────────────────────────────────────────────
// Also uses key-based remount so it always starts fresh.
function MetaLabel({ children, className, style }) {
  return (
    <div className={`meta-label ${className}`} style={style}>
      {children}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────
export default function LoadingScreen({ onDone }) {
  const [index, setIndex]           = useState(0);
  const [phase, setPhase]           = useState("enter");
  const [screenExit, setScreenExit] = useState(false);

  // ── Keep onDone in a ref so the exit effect never re-triggers just because
  //    App re-rendered and produced a new handleLoadingDone function reference.
  //    This is the fix for the "loading screen appears twice" bug.
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  // Track the doneTimer so it can be properly cleaned up
  const doneTimerRef = useRef(null);

  // Read network timing once on mount
  const timing = useRef(getAdaptiveTiming());
  const { holdMs, exitMs, charDelay } = timing.current;

  const total   = GREETINGS.length;
  const current = GREETINGS[index];

  // Phase machine: enter → exit (after holdMs)
  useEffect(() => {
    setPhase("enter");
    const holdTimer = setTimeout(() => setPhase("exit"), holdMs);
    return () => clearTimeout(holdTimer);
  }, [index, holdMs]);

  // Exit phase: advance to next greeting, or fire onDone after screen exit anim
  useEffect(() => {
    if (phase !== "exit") return;

    const exitTimer = setTimeout(() => {
      const next = index + 1;
      if (next >= total) {
        // All greetings done → play the screen-exit animation, then call onDone
        setScreenExit(true);
        // Store the timer in a ref so it gets properly cleaned up on unmount
        doneTimerRef.current = setTimeout(() => onDoneRef.current?.(), SCREEN_EXIT_MS);
      } else {
        setIndex(next);
      }
    }, exitMs);

    // Only clean up the exitTimer — doneTimer is tracked separately via ref
    return () => clearTimeout(exitTimer);
  // onDone is intentionally NOT in deps — we read it via onDoneRef
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, index, total, exitMs]);

  // Clean up doneTimer if the component ever unmounts early
  useEffect(() => {
    return () => {
      if (doneTimerRef.current) clearTimeout(doneTimerRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-ink text-[#F4F0E8] flex flex-col items-center justify-center overflow-hidden select-none"
      style={
        screenExit
          ? { animation: `loadingScreenExit ${SCREEN_EXIT_MS}ms cubic-bezier(0.4,0,0.2,1) forwards` }
          : undefined
      }
    >
      {/* ── All keyframes in one place ─────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Instrument+Serif:ital@0;1&family=Noto+Sans+Devanagari:wght@700&family=Noto+Sans+Bengali:wght@700&family=Noto+Sans+Gujarati:wght@700&family=Noto+Sans+Gurmukhi:wght@700&family=Noto+Sans+Tamil:wght@700&family=Noto+Sans+Telugu:wght@700&family=Noto+Sans+Kannada:wght@700&family=Noto+Sans+Malayalam:wght@700&family=Noto+Nastaliq+Urdu:wght@700&display=swap');

        /* Character rise-in — pure opacity + translateY, no blur (60fps) */
        .g-char {
          display: inline-block;
          opacity: 0;
          will-change: transform, opacity;
          animation: charRise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes charRise {
          0%   { opacity: 0; transform: translateY(0.35em) scale(0.86); }
          60%  { opacity: 1; }
          78%  { transform: translateY(-0.03em) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Character drop-out (phase=exit) — sibling to charRise via .exiting wrapper */
        .exiting .g-char {
          animation: charDrop 0.26s cubic-bezier(0.55, 0, 1, 0.45) both !important;
          animation-delay: 0s !important;
        }
        @keyframes charDrop {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-0.20em) scale(0.90); }
        }

        /* Meta label enter */
        .meta-label {
          opacity: 0;
          animation: metaRise 0.38s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
        }
        @keyframes metaRise {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Meta label exit — applied via .exiting wrapper */
        .exiting .meta-label {
          animation: metaDrop 0.20s ease-in both !important;
        }
        @keyframes metaDrop {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-6px); }
        }

        /* Full-screen exit */
        @keyframes loadingScreenExit {
          0%   { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(1.03) translateY(-16px); }
        }
      `}</style>

      {/* Wrapper: adding .exiting class switches ALL children to exit animations */}
      <div
        key={index}
        className={`flex flex-col items-center justify-center gap-0 ${phase === "exit" ? "exiting" : ""}`}
      >
        {/* Language eyebrow */}
        <MetaLabel
          key={`eyebrow-${index}`}
          className="mb-10 text-[11px] sm:text-xs font-medium uppercase text-[#8B8B8B]"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", letterSpacing: "0.35em" }}
        >
          {current.lang}
        </MetaLabel>

        {/* Greeting */}
        <div className="px-6">
          <GreetingWord key={`word-${index}`} greeting={current} charDelay={charDelay} />
        </div>

        {/* Transliteration */}
        <MetaLabel
          key={`translit-${index}`}
          className="mt-6 text-sm md:text-md uppercase text-[#B98A4A]"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", letterSpacing: "0.28em" }}
        >
          {current.translit}
        </MetaLabel>
      </div>

      {/* Corner marks */}
      <div className="absolute top-7 left-7 text-[10px] tracking-[0.15em] text-[#8B8B8B] font-mono">
        ABAS IN &middot; {total} languages
      </div>
      <div className="absolute bottom-7 right-7 text-[10px] tracking-[0.15em] text-[#8B8B8B] font-mono text-right">
        Ek Parivar, Ek Mission<br />Ek Bharat, Shreshtha Bharat
      </div>
    </div>
  );
}
