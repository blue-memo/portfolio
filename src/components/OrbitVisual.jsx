import { useState, useEffect, useRef } from "react";

export default function OrbitVisual({ skills, active }) {
  const [angle, setAngle] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    let a = 0;
    const tick = () => {
      a += 0.003;
      setAngle(a);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const cx = 150, cy = 150, r = 100;

  return (
    <svg viewBox="0 0 300 300" className="orbit-svg">
      {[40, 70, 100].map((radius) => (
        <circle
          key={radius}
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray={radius < 100 ? "3 6" : "1 4"}
        />
      ))}

      <text x={cx} y={cy + 6} textAnchor="middle" className="orbit-center-text">MW</text>

      {skills.map((s, i) => {
        const a = (i / skills.length) * Math.PI * 2 + angle;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        const isActive = active === i;
        return (
          <g key={s.name} className="orbit-node" style={{ "--c": s.color }}>
            <circle
              cx={x} cy={y}
              r={isActive ? 14 : 10}
              fill={isActive ? s.color : "rgba(255,255,255,0.08)"}
              stroke={s.color}
              strokeWidth={isActive ? 0 : 1}
              style={{ transition: "r .3s, fill .3s" }}
            />
            {isActive && (
              <text x={x} y={y + 4} textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">
                {s.name.slice(0, 3)}
              </text>
            )}
          </g>
        );
      })}

      <line
        x1={cx} y1={cy}
        x2={cx + Math.cos(angle) * r}
        y2={cy + Math.sin(angle) * r}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      />
    </svg>
  );
}
