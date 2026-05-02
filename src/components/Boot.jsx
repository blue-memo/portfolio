import { useState, useEffect, useMemo } from "react";

export default function Boot({ onDone }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  const sequence = useMemo(() => [
    "INITIALIZING MW.OS v2026.1 ...",
    "▓▓▓▓▓▓▓▓▓▓▓▓░░░░ 75%",
    "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%",
    "LOADING: front-end.exe ......... OK",
    "LOADING: creativity.dll ........ OK",
    "LOADING: portfolio_assets ...... OK",
    "SYSTEM READY.",
    "",
    "  ███╗   ███╗██╗    ██╗",
    "  ████╗ ████║██║    ██║",
    "  ██╔████╔██║██║ █╗ ██║",
    "  ██║╚██╔╝██║██║███╗██║",
    "  ██║ ╚═╝ ██║╚███╔███╔╝",
    "  ╚═╝     ╚═╝ ╚══╝╚══╝ ",
    "",
    "MOHAMMED WALEED — FRONT-END DEVELOPER",
    "[ PRESS ANY KEY OR WAIT ]",
  ], []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLines((l) => [...l, sequence[i]]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => { setDone(true); setTimeout(onDone, 600); }, 700);
      }
    }, 90);

    const skip = () => { clearInterval(interval); setDone(true); setTimeout(onDone, 300); };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("click", skip, { once: true });

    return () => clearInterval(interval);
  }, [sequence, onDone]);

  return (
    <div className={"boot-screen" + (done ? " boot-exit" : "")} aria-label="Loading">
      <div className="boot-inner">
        {lines.map((l, i) => <div key={i} className="boot-line">{l || "\u00A0"}</div>)}
        <span className="boot-caret">█</span>
      </div>
    </div>
  );
}
