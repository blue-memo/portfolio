import { useRef, useEffect } from "react";
import useMousePos from "../hooks/useMousePos";

export default function FloatingPreview({ projects, hovered }) {
  const ref = useRef(null);
  const mouse = useMousePos();
  const raf = useRef(null);
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      cur.current.x = lerp(cur.current.x, mouse.current.x, 0.1);
      cur.current.y = lerp(cur.current.y, mouse.current.y, 0.1);
      if (ref.current)
        ref.current.style.transform = `translate(${cur.current.x + 24}px,${cur.current.y - 80}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [mouse]);

  const p = hovered !== null ? projects[hovered] : null;

  return (
    <div ref={ref} className={"float-preview" + (p ? " visible" : "")} aria-hidden="true">
      {p && <img src={p.img} alt="" className="fp-img" />}
      {p && <div className="fp-bar" style={{ background: p.color }} />}
    </div>
  );
}
