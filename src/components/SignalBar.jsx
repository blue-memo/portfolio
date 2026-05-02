import { useState, useEffect, useRef } from "react";
import { SECTIONS } from "../data";
import '../styles/nav.css'

function GlitchText({ text }) {
  const [glitched, setGlitched] = useState(false);
  const [ghost, setGhost] = useState(text);

  useEffect(() => {
    const chars = "▓█▒░";
    let timer;
    const scramble = () => {
      setGlitched(true);
      let steps = 0;
      const max = 5;
      const id = setInterval(() => {
        setGhost(
          text
            .split("")
            .map((c, i) =>
              Math.random() < (max - steps) / max
                ? chars[Math.floor(Math.random() * chars.length)]
                : c
            )
            .join("")
        );
        steps++;
        if (steps > max) {
          clearInterval(id);
          setGhost(text);
          setGlitched(false);
        }
      }, 60);
    };
    const loop = () => {
      timer = setTimeout(() => { scramble(); loop(); }, 3000 + Math.random() * 4000);
    };
    loop();
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span className={`sb-logo-text${glitched ? " glitching" : ""}`} aria-label={text}>
      {ghost}
    </span>
  );
}
export default function SignalBar({ activeIdx = 0 }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef(null);

  const activeSection = SECTIONS[activeIdx] ?? SECTIONS[0];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape" && open) handleClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 500);
  };

  const navigate = (id) => {
    handleClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 520);
  };

  return (
    <>
      <header className={`signal-bar${scrolled ? " scrolled" : ""}`} role="banner">

        <div className="sb-left">
          <span className="sb-ping" aria-hidden="true" />
          <button
            className="sb-logo"
            onClick={() => navigate("s-hero")}
            aria-label="Back to top"
            data-cursor="HOME"
          >
            <GlitchText text="SHADE" />
          </button>
        </div>

        <div className="sb-center" aria-live="polite" aria-atomic="true">
          <span className="sb-tuner-label" aria-hidden="true">Let's build something</span>
          <span className="sb-tuner-sep" aria-hidden="true">▸</span>
          <span className="sb-tuner-val">DIFFERENT</span>
        </div>

        <div className="sb-right">
         
          <button
            className={`sb-menu-btn${open ? " active" : ""}`}
            onClick={() => open ? handleClose() : setOpen(true)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            data-cursor={open ? "CLOSE" : "MENU"}
          >
            <span className="sb-mb-line sb-mb-l1" />
            <span className="sb-mb-line sb-mb-l2" />
            <span className="sb-mb-line sb-mb-l3" />
          </button>
        </div>

        <div className="sb-scanline" aria-hidden="true" />
      </header>

      {(open || closing) && (
        <div
          className={`sb-overlay${closing ? " closing" : " open"}`}
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="sb-ov-noise" aria-hidden="true" />
          <div className="sb-ov-lines" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="sb-ov-line" style={{ "--i": i }} />
            ))}
          </div>

          {/* corner brackets */}
          <div className="sb-ov-bracket sb-ov-br-tl" aria-hidden="true" />
          <div className="sb-ov-bracket sb-ov-br-tr" aria-hidden="true" />
          <div className="sb-ov-bracket sb-ov-br-bl" aria-hidden="true" />
          <div className="sb-ov-bracket sb-ov-br-br" aria-hidden="true" />

          {/* content */}
          <nav className="sb-ov-nav" aria-label="Main navigation">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                className="sb-ov-item"
                style={{ "--i": i }}
                onClick={() => navigate(s.id)}
                data-cursor="GO →"
              >
                <span className="sb-ovi-num" aria-hidden="true">
                  {String(i).padStart(2, "0")}
                </span>
                <span className="sb-ovi-label">{s.label}</span>
                <span className="sb-ovi-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </nav>

          <div className="sb-ov-footer" aria-hidden="true">
            <span>SHADE · MW · PORTFOLIO</span>
            <span>FRONT-END DEV · EGYPT</span>
          </div>
        </div>
      )}
    </>
  );
}