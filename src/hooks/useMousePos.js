import { useRef, useEffect } from "react";

export default function useMousePos() {
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return pos;
}
