import React, { useEffect, useRef, useState, useCallback } from "react";
import heroImg from "../assets/hero-abas.jpg";

/**
 * StaggeredZoomGallery
 * ---------------------
 * A 3-column photo grid where the middle column sits denser/offset from the
 * left & right columns. On mount:
 *
 *   1. All three columns start aligned (no offset).
 *   2. Left & right columns ease DOWNWARD into their resting offset,
 *      middle column eases UPWARD into its resting offset — this is what
 *      creates the staggered "brick" layout.
 *   3. Once settled, the gallery zooms into one target image (by default,
 *      the 3rd image in the middle column) until it fills the screen.
 *   4. Optional overlay content (e.g. a headline) fades in once zoomed.
 *
 * Usage:
 *   <div style={{ width: "100vw", height: "100vh" }}>
 *     <StaggeredZoomGallery
 *       leftImages={[...2 urls]}
 *       middleImages={[...4 urls]}
 *       rightImages={[...2 urls]}
 *       overlay={<h1>Genocide Education and Human Rights Initiative</h1>}
 *     />
 *   </div>
 *
 * The parent MUST give this component an explicit width/height.
 *
 * Props:
 *   leftImages       string[]  images for the left column     (default 2 placeholders)
 *   middleImages     string[]  images for the middle column    (default 4 placeholders)
 *   rightImages      string[]  images for the right column     (default 2 placeholders)
 *   zoomTargetIndex  number    which middleImages index to zoom into (default 2 -> "3rd image")
 *   gap              number    px gap between images in a column     (default 14)
 *   staggerPct       number    how far columns travel, % of height   (default 8)
 *   settleDelayMs    number    pause before the settle animation starts (default 250)
 *   settleMs         number    duration of the settle (stagger) animation (default 1200)
 *   holdMs           number    pause after settling, before zooming     (default 500)
 *   zoomMs           number    duration of the zoom-to-fullscreen        (default 2200)
 *   overlay          ReactNode content shown (fades in) once fully zoomed
 *   overlayDelayMs   number    delay after zoom before overlay fades in  (default 200)
 *   loop             boolean   if true, resets and replays after finishing (default false)
 *   loopPauseMs      number    pause at full zoom before looping back    (default 2500)
 */

const ph = (seed, w = 700, h = 700) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const DEFAULT_LEFT = [ph("szg-left-1"), ph("szg-left-2"), ph("szg-left-3")];
const DEFAULT_MIDDLE = [ph("szg-mid-1"), ph("szg-mid-2"), heroImg, ph("szg-mid-4")];
const DEFAULT_RIGHT = [ph("szg-right-1"), ph("szg-right-2"), ph("szg-right-3")];

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

export default function StaggeredZoomGallery({
  leftImages = DEFAULT_LEFT,
  middleImages = DEFAULT_MIDDLE,
  rightImages = DEFAULT_RIGHT,
  zoomTargetIndex = 2,
  Ygap = 14,
  Xgap = 80,
  staggerPct = 8,
  settleDelayMs = 250,
  settleMs = 1500,
  leftRightMs = 1000,
  holdMs = 200,
  zoomMs = 2200,
  overlay = null,
  overlayDelayMs = 200,
  loop = false,
  loopPauseMs = 2500,
}) {
  const containerRef = useRef(null);
  const middleCellRefs = useRef([]);

  // phase: 'initial' -> 'settled' -> 'zoomed'
  const [phase, setPhase] = useState("initial");
  const [zoomStyle, setZoomStyle] = useState({
    transform: "scale(1)",
    transformOrigin: "50% 50%",
    transition: `transform ${zoomMs}ms ${EASE}`,
  });
  const [showOverlay, setShowOverlay] = useState(false);

  const runZoom = useCallback(() => {
    const cell = middleCellRefs.current[zoomTargetIndex];
    const container = containerRef.current;
    if (!cell || !container) return;

    const cellRect = cell.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const originX =
      ((cellRect.left - containerRect.left + cellRect.width / 2) / containerRect.width) * 100;
    const originY =
      ((cellRect.top - containerRect.top + cellRect.height / 2) / containerRect.height) * 100;

    const scaleX = containerRect.width / cellRect.width;
    const scaleY = containerRect.height / cellRect.height;
    const scale = Math.max(scaleX, scaleY) * 1.03;

    setZoomStyle({
      transform: `scale(${scale})`,
      transformOrigin: `${originX}% ${originY}%`,
      transition: `transform ${zoomMs}ms ${EASE}`,
    });
    setPhase("zoomed");
  }, [zoomTargetIndex, zoomMs]);

  const resetAll = useCallback(() => {
    setShowOverlay(false);
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "50% 50%",
      transition: `transform 0ms linear`,
    });
    setPhase("initial");
  }, []);

  useEffect(() => {
    let timers = [];
    let cancelled = false;

    const sequence = () => {
      // Step 1: hold at "initial" (unstaggered) briefly, then settle.
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setPhase("settled");
        }, settleDelayMs)
      );

      // Step 2: after settle animation finishes + hold, zoom in.
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          runZoom();
        }, settleDelayMs + settleMs + holdMs)
      );

      // Step 3: after zoom finishes, fade in overlay (if any).
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setShowOverlay(true);
        }, settleDelayMs + settleMs + holdMs + zoomMs + overlayDelayMs)
      );

      // Step 4: optionally loop back to the start.
      if (loop) {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            resetAll();
            timers.push(setTimeout(() => !cancelled && sequence(), 50));
          }, settleDelayMs + settleMs + holdMs + zoomMs + overlayDelayMs + loopPauseMs)
        );
      }
    };

    sequence();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop]);

  const settled = phase === "settled" || phase === "zoomed";

  const outerColStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
     gap: `200px`,
    height: "1000px",
    transform: `translateY(${settled ? staggerPct : -150}%)`,
    transition: `transform ${leftRightMs}ms ${EASE}`,
  };

  const middleColStyle = {
    flex: 1.15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: `${Xgap}px`,
    height: "158%",
    transform: `translateY(${settled ? -staggerPct - 29 : 100}%)`,
    transition: `transform ${settleMs}ms ${EASE}`,
  };

  const imgCellBase = {
    overflow: "hidden",
    flexShrink: 0,
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "row",
          gap: `${Xgap}px`,
          padding: "0 1%",
          ...zoomStyle,
          willChange: "transform",
        }}
      >
        {/* Left column */}
        <div style={outerColStyle}>
          {leftImages.map((src, i) => (
            <div key={i} style={{ ...imgCellBase, height: "34%" }}>
              <img src={src} alt="" draggable={false} style={imgStyle} />
            </div>
          ))}
        </div>

        {/* Middle column (denser, offset) */}
        <div style={middleColStyle}>
          {middleImages.map((src, i) => (
            <div
              key={i}
              ref={(el) => (middleCellRefs.current[i] = el)}
              style={{ ...imgCellBase, height: "38%" }}
            >
              <img src={src} alt="" draggable={false} style={imgStyle} />
            </div>
          ))}
        </div>

        {/* Right column */}
        <div style={outerColStyle}>
          {rightImages.map((src, i) => (
            <div key={i} style={{ ...imgCellBase, height: "34%" }}>
              <img src={src} alt="" draggable={false} style={imgStyle} />
            </div>
          ))}
        </div>
      </div>

      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            padding: "0 5%",
            background: "rgba(0,0,0,0.25)",
            opacity: showOverlay ? 1 : 0,
            transition: "opacity 900ms ease",
            pointerEvents: showOverlay ? "auto" : "none",
          }}
        >
          {overlay}
        </div>
      )}
    </div>
  );
}

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  userSelect: "none",
};
