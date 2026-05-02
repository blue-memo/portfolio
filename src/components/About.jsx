import useInView from "../hooks/useInView";
import me from "../assets/me-opt.webp";

const facts = [
  ["LOCATION", "Obour City, Egypt"],
  ["SINCE", "2022"],
  ["PROJECTS", "35+"],
  ["STATUS", "Available · 2026"],
];

const timeline = [
  { y: "2022", h: "The Beginning", b: "First HTML page. First CSS rule. First spark of obsession." },
  { y: "2023", h: "First Client", b: "Moraweg, ElSherif Safari — real products, real users." },
  { y: "2025 - 2026", h: "Leveling Up", b: "Entered React. Built Sahab-Tech, Pushed UI cloning further, Worked in Smart Center Website." },
];

export default function About() {
  const [ref, v] = useInView(0.06);

  return (
    <section id="s-about" className="s-about s-section" ref={ref} aria-label="About Mohammed Waleed">
      <div className={"about-masthead" + (v ? " in" : "")}>
        <div className="am-rule" />
        <h2 className="am-title">THE DEVELOPER</h2>
        <div className="am-rule" />
        <div className="am-meta">
          <span>VOL. III · 2026</span>
          <span>OBOUR CITY, EGYPT</span>
          <span>FRONT-END EDITION</span>
        </div>
        <div className="am-rule am-rule-thick" />
      </div>

      <div className={"about-columns" + (v ? " in" : "")}>
        <div className="ac-photo-col">
          <div className="ac-photo-wrap">
            <img src={me} alt="Mohammed Waleed" className="ac-photo" loading="lazy" decoding="async" />
            <div className="ac-photo-caption">FIG. 1 — MOHAMMED WALEED<br />FRONT-END DEVELOPER, EGYPT</div>
          </div>
          <div className="ac-pull-quote">"Where design meets logic, I create."</div>
        </div>

        <div className="ac-story-col">
<p className="ac-drop">
  <span className="drop-cap">MW.</span> At just 14 years old, Mohammed Waleed
  has already delivered real-world projects — corporate sites, e-learning
  platforms, Islamic portals, and React apps with live API integration. Started
  from scratch in 2022. Never stopped shipping.
</p>
<p className="ac-body">
  Every project is a different problem. Every line of code is a deliberate
  choice. Working independently from Obour City, Egypt — handling design,
  development, and deployment end-to-end, with performance as the standard.
</p>
<p className="ac-body">
  Currently deepening his React expertise, sharpening his design systems, and
  open to freelance work worldwide. Available now — fast delivery, full
  support, zero compromises on quality.
</p>
          <div className="ac-facts">
            {facts.map(([k, val]) => (
              <div key={k} className="ac-fact">
                <span className="acf-k">{k}</span>
                <span className="acf-v">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ac-timeline-col">
          <h3 className="act-head">CHRONOLOGY</h3>
          {timeline.map((t, i) => (
            <div key={i} className={"act-item" + (v ? " in" : "")} style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
              <span className="act-year">{t.y}</span>
              <div className="act-content">
                <strong className="act-head2">{t.h}</strong>
                <p className="act-body">{t.b}</p>
              </div>
            </div>
          ))}
          <div className="ac-links">
            <a href="https://github.com/muhamed-walid" target="_blank" rel="noreferrer" className="acl" data-cursor="→">github/muhamed-walid</a>
            <a href="https://github.com/blue-memo" target="_blank" rel="noreferrer" className="acl" data-cursor="→">github/blue-memo</a>
          </div>
        </div>
      </div>
    </section>
  );
}
