import { useState, useEffect, useRef } from "react";
import { WORDS } from "../data";
import useScrollY from "../hooks/useScrollY";
import useMousePos from "../hooks/useMousePos";
import me from "../assets/me-opt.webp";
export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [on, setOn] = useState(false);
  const scrollY = useScrollY();
  const mousePos = useMousePos();
  const frameRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Disable parallax on touch/mobile — no mouse to track
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    let raf;
    const tick = () => {
      const { x, y } = mousePos.current;
      const nx = (x / window.innerWidth - 0.5) * 2;
      const ny = (y / window.innerHeight - 0.5) * 2;
      if (svgRef.current) {
        const turb = svgRef.current.querySelector("feTurbulence");
        if (turb) {
          turb.setAttribute("baseFrequency", `${0.015 + Math.abs(nx) * 0.012} ${0.015 + Math.abs(ny) * 0.012}`);
        }
      }
      if (frameRef.current) {
        frameRef.current.style.transform = `translate(${nx * 14}px, ${ny * 10}px) rotate(${nx * 1.5}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mousePos]);

  const parallax = -scrollY * 0.38;

  return (
    <section id="s-hero" className="s-hero" aria-label="Mohammed Waleed — Front-End Developer">
      <svg width="0" height="0" className="svg-defs" aria-hidden="true" ref={svgRef}>
        <defs>
          <filter id="liquid">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="3" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="noise-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <div className="hero-split-left" style={{ transform: `translateY(${parallax * 0.5}px)` }} />
      <div className="hero-split-right" />

      <div className="hero-grid" aria-hidden="true">
        {[...Array(8)].map((_, i) => <span key={i} className="hg-col" />)}
        {[...Array(6)].map((_, i) => <span key={i} className="hg-row" />)}
      </div>

      <div className="hero-content" style={{ transform: `translateY(${parallax}px)` }}>
        <div className={"hero-left" + (on ? " on" : "")}>
          <p className="hero-edition">PORTFOLIO EDITION — VOL.03 — 2025</p>

          <h1 className="hero-name">
            <span className="hn-line hn-l1">MOHAMMED</span>
            <span className="hn-line hn-l2" style={{ filter: "url(#liquid)" }}>WALEED</span>
          </h1>

          <div className="hero-verb-wrap">
            <span className="hero-verb-pre">HE</span>
            <div className="hero-verb-slot">
              {WORDS.map((w, i) => (
                <span
                  key={w}
                  className={
                    "hero-verb" +
                    (i === wordIdx ? " active" : i === (wordIdx - 1 + WORDS.length) % WORDS.length ? " prev" : "")
                  }
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          <p className="hero-sub">
            Front-End Developer · Egypt · Since 2022
            <br />14 years old · Unlimited ambition
          </p>

          <div className="hero-actions">
            <button
              className="btn-ink"
              onClick={() => document.getElementById("s-work")?.scrollIntoView({ behavior: "smooth" })}
              data-cursor="WORK →"
            >
              <span className="btn-ink-fill" />
              <span className="btn-ink-text">SEE WORK</span>
            </button>
            <a href="https://wa.me/+201282758797" target="_blank" rel="noreferrer" className="btn-outline" data-cursor="CHAT →">
              LET'S TALK
            </a>
          </div>
        </div>

        <div className="hero-parallax-wrap" ref={frameRef}>
        <div className={"hero-right" + (on ? " on" : "")}>
          <div className="hero-photo-clip">
            <img
              src={me}
              alt="Mohammed Waleed — Front-End Developer from Egypt"
              className="hero-photo"   loading="eager"
  fetchPriority="high"
  decoding="async"
            />
            <div className="hero-photo-noise" />
            <div className="hero-photo-scan" />
          </div>
          <div className="hero-photo-caption">
            <span className="hpc-status">● AVAILABLE</span>
            <span className="hpc-loc">OBOUR CITY, EGYPT</span>
          </div>
          <div className="hero-stat-pill stat-1">
            <strong>35+</strong><span>PROJECTS</span>
          </div>
          <div className="hero-stat-pill stat-2">
            <strong>3+</strong><span>YEARS</span>
          </div>
        </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="hs-line" />
        <span className="hs-txt">SCROLL</span>
        <div className="hs-num" id="scroll-pct">000</div>
      </div>

      <div className="hero-bg-text" aria-hidden="true" style={{ transform: `translateY(${-scrollY * 0.15}px)` }}>
        CREATIVE
      </div>
    </section>
  );
}