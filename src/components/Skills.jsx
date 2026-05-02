import { useState } from "react";
import { SKILLS } from "../data";
import useInView from "../hooks/useInView";
import OrbitVisual from "./OrbitVisual";

const manifestoWords = [
  "CODE IS CRAFT", "◆", "PIXEL-PERFECT", "◆", "PERFORMANCE IS RESPECT",
  "◆", "BUILD WITH PURPOSE", "◆", "14 YEARS OLD", "◆", "UNLIMITED AMBITION", "◆",
];

export default function Skills() {
  const [ref, v] = useInView(0.08);
  const [active, setActive] = useState(null);

  return (
    <section id="s-skills" className="s-skills s-section" ref={ref} aria-label="Skills and Technologies">
      <div className="section-label">
        <span className="sl-n">03</span>
        <span className="sl-bar" />
        <span className="sl-t">TECHNOLOGIES</span>
      </div>

      <div className={"section-head" + (v ? " in" : "")}>
        <h2 className="sh-title">
          <span className="sh-t1">TECH</span>
          <span className="sh-t2">STACK</span>
        </h2>
      </div>

      <div className="skills-layout">
        <div className={"skill-bars" + (v ? " in" : "")}>
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              className="sb-item"
              style={{ "--c": s.color, "--lvl": s.level + "%", transitionDelay: `${i * 0.07}s` }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="sbi-head">
                <span className="sbi-glyph" style={{ color: s.color }}>{s.glyph}</span>
                <span className="sbi-name">{s.name}</span>
                <span className="sbi-pct">{active === i ? s.level + "%" : ""}</span>
              </div>
              <div className="sbi-track">
                <div
                  className={"sbi-fill" + (v ? " filled" : "")}
                  style={{ width: v ? s.level + "%" : "0%", background: s.color, transitionDelay: `${0.3 + i * 0.1}s` }}
                />
                <div
                  className="sbi-glow"
                  style={{ background: s.color, width: v ? s.level + "%" : "0%", transitionDelay: `${0.3 + i * 0.1}s` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={"skill-orbit" + (v ? " in" : "")} aria-hidden="true">
          <OrbitVisual skills={SKILLS} active={active} />
        </div>
      </div>

      <div className="manifesto-tape">
        <div className="mt-track">
          {[...Array(3)].map((_, r) =>
            manifestoWords.map((w, i) => (
              <span key={`${r}-${i}`} className="mt-word">{w}</span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
