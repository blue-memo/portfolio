import { useState, useEffect } from "react";
import { SECTIONS } from "./data";
import useScrollY from "./hooks/useScrollY";
import {
  Boot,
  InkCursor,
  SidebarTicker,
  WheelNav,
  Hero,
  Work,
  About,
  Skills,
  Contact,
} from "./components";
import "./styles/index.css";
import SignalBar from "./components/SignalBar";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollY = useScrollY();

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const updateActive = () => {
      const current = ids.findLastIndex((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        return el.getBoundingClientRect().top <= window.innerHeight * 0.4;
      });
      setActiveIdx(Math.max(0, current));
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  useEffect(() => {
    const el = document.getElementById("scroll-pct");
    if (!el) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    el.textContent = String(Math.round((scrollY / max) * 100)).padStart(3, "0");
  }, [scrollY]);

  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}

      <InkCursor />
      <SidebarTicker />
      <WheelNav sections={SECTIONS} activeIdx={activeIdx} />

      <div className={"site-wrap" + (booted ? " revealed" : "")}>
        <main>
          <SignalBar />
          <Hero />
          <Work />
          <About />
          <Skills />
          <Contact />
        </main>

        <footer className="site-footer">
          <span className="sf-logo">MW.</span>
          <span className="sf-copy">MOHAMMED WALEED · FRONT-END DEVELOPER · EGYPT · 2025</span>
          <div className="sf-links">
            <a href="https://github.com/muhamed-walid" target="_blank" rel="noreferrer" data-cursor="GH">GH</a>
            <a href="https://wa.me/+201282758797" target="_blank" rel="noreferrer" data-cursor="WA">WA</a>
          </div>
        </footer>
      </div>
    </>
  );
}
