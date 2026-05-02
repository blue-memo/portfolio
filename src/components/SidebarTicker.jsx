export default function SidebarTicker() {
  const words = ["FRONT-END", "◆", "2025", "◆", "EGYPT", "◆", "REACT", "◆", "UI", "◆", "CSS", "◆", "HTML", "◆"];

  return (
    <div className="sidebar-ticker" aria-hidden="true">
      <div className="st-track">
        {[...Array(3)].map((_, r) =>
          words.map((w, i) => (
            <span key={`${r}-${i}`} className="st-word">{w}</span>
          ))
        )}
      </div>
    </div>
  );
}
