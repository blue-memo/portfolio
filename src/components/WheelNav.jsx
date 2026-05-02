export default function WheelNav({ sections, activeIdx }) {
  return (
    <nav className="wheel-nav" aria-label="Section navigation">
      {sections.map((s, i) => (
        <button
          key={s.id}
          className={"wn-item" + (i === activeIdx ? " active" : "")}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
          aria-current={i === activeIdx ? "true" : undefined}
          aria-label={`Go to ${s.label} section`}
        >
          <span className="wn-num" aria-hidden="true">{String(i).padStart(2, "0")}</span>
          <span className="wn-dot" aria-hidden="true" />
          <span className="wn-label" aria-hidden="true">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}