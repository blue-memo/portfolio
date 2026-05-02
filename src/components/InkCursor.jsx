import { useState, useRef, useEffect } from "react";

export default function InkCursor() {
  const [trail, setTrail] = useState([]);
  const [label, setLabel] = useState("");
  const count = useRef(0);
  const main = useRef(null);
  const tgt = useRef({ x: -200, y: -200 });
  const cur = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      cur.current.x = lerp(cur.current.x, tgt.current.x, 0.13);
      cur.current.y = lerp(cur.current.y, tgt.current.y, 0.13);
      if (main.current)
        main.current.style.transform = `translate(${cur.current.x - 12}px,${cur.current.y - 12}px)`;
      raf.current = requestAnimationFrame(tick);
    };

    const mv = (e) => {
      tgt.current = { x: e.clientX, y: e.clientY };
      count.current++;
      if (count.current % 4 === 0) {
        const id = Date.now();
        setTrail((t) => [...t.slice(-18), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => setTrail((t) => t.filter((d) => d.id !== id)), 900);
      }
      const el = e.target.closest("[data-cursor]");
      setLabel(el ? el.dataset.cursor : "");
    };

    window.addEventListener("mousemove", mv, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", mv);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {trail.map((d, i) => (
        <span
          key={d.id}
          className="ink-dot"
          style={{
            left: d.x,
            top: d.y,
            opacity: (i / trail.length) * 0.5,
            transform: `translate(-50%,-50%) scale(${0.3 + (i / trail.length) * 0.7})`,
          }}
        />
      ))}
      <div ref={main} className={"cursor-main" + (label ? " has-label" : "")}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}
