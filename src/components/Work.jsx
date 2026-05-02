import { useState, useRef, useEffect } from "react";
import { PROJECTS } from "../data";
import useInView from "../hooks/useInView";
import useMousePos from "../hooks/useMousePos";

function MagneticCard({ p, i, isActive, onClick }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${p.color}33 0%, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={cardRef}
      className={"pw-card" + (isActive ? " active" : "")}
      style={{ "--c": p.color, animationDelay: `${i * 0.08}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={isActive ? "CLOSE" : "OPEN"}
    >
      <div ref={glowRef} className="pw-card-glow" />

      <div className="pw-card-num">{p.n}</div>

      <div className="pw-card-img-wrap">
        <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="pw-card-img" />
        <div className="pw-card-img-tint" />
        <div className="pw-card-year-stamp">{p.year}</div>
      </div>

      <div className="pw-card-body">
        <div className="pw-card-tags">
          {p.tags.map((t) => (
            <span key={t} className="pw-card-tag">{t}</span>
          ))}
        </div>
        <h3 className="pw-card-title">{p.title}</h3>
        <p className="pw-card-role">{p.role}</p>
      </div>

      <div className="pw-card-corner" />
      <div className="pw-card-line" style={{ background: p.color }} />
    </div>
  );
}

function ProjectModal({ p, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    setTimeout(() => ref.current?.classList.add("open"), 10);
  }, []);

  const handleClose = () => {
    ref.current?.classList.remove("open");
    setTimeout(onClose, 400);
  };

  return (
    <div className="pm-backdrop" onClick={handleClose}>
      <div
        ref={ref}
        className="pm-modal"
        style={{ "--c": p.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="pm-close" onClick={handleClose} data-cursor="CLOSE">✕</button>

        <div className="pm-left">
          <div className="pm-img-wrap">
            <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="pm-img" />
            <div className="pm-img-overlay" style={{ background: p.color + "22" }} />
            <div className="pm-scan" />
          </div>
          <div className="pm-meta">
            <div className="pm-meta-item">
              <span className="pm-meta-k">YEAR</span>
              <span className="pm-meta-v">{p.year}</span>
            </div>
            <div className="pm-meta-item">
              <span className="pm-meta-k">ROLE</span>
              <span className="pm-meta-v">{p.role}</span>
            </div>
            <div className="pm-meta-item">
              <span className="pm-meta-k">STACK</span>
              <span className="pm-meta-v">{p.tags.join(" · ")}</span>
            </div>
          </div>
        </div>

        <div className="pm-right">
          <div className="pm-header">
            <span className="pm-num">{p.n}</span>
            <div className="pm-title-wrap">
              <h2 className="pm-title">{p.title}</h2>
              <div className="pm-rule" style={{ background: p.color }} />
            </div>
          </div>

          <p className="pm-desc">{p.desc}</p>

          <div className="pm-tags">
            {p.tags.map((t) => (
              <span key={t} className="pm-tag" style={{ borderColor: p.color + "66", color: p.color }}>{t}</span>
            ))}
          </div>

          {p.url && p.url !== "#" && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="pm-cta"
              style={{ background: p.color, color: p.dark ? "#000" : "#fff" }}
              data-cursor="VISIT"
            >
              <span>VISIT LIVE</span>
              <span className="pm-cta-arrow">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [ref, v] = useInView(0.04);
  const [active, setActive] = useState(null);

  return (
    <section id="s-work" className="s-work s-section" ref={ref} aria-label="Selected Work">
      <div className="section-label">
        <span className="sl-n">01</span>
        <span className="sl-bar" />
        <span className="sl-t">SELECTED WORK</span>
      </div>

      <div className={"section-head" + (v ? " in" : "")}>
        <h2 className="sh-title">
          <span className="sh-t1">WORK</span>
          <span className="sh-t2">& PROJECTS</span>
        </h2>
        <a href="https://github.com/muhamed-walid" target="_blank" rel="noreferrer" className="sh-link" data-cursor="GITHUB">
          ALL REPOS ↗
        </a>
      </div>

      <div className={"pw-grid" + (v ? " in" : "")}>
        {PROJECTS.map((p, i) => (
          <MagneticCard
            key={p.n}
            p={p}
            i={i}
            isActive={active === i}
            onClick={() => setActive(active === i ? null : i)}
          />
        ))}
      </div>

      {active !== null && (
        <ProjectModal p={PROJECTS[active]} onClose={() => setActive(null)} />
      )}
    </section>
  );
}