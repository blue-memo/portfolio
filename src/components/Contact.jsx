import useInView from "../hooks/useInView";

const contactLinks = [
  { label: "WHATSAPP", val: "+20 128 275 8797", href: "https://wa.me/+201282758797" },
  { label: "GITHUB",   val: "github/muhamed-walid", href: "https://github.com/muhamed-walid" },
  { label: "GITHUB",   val: "github/blue-memo", href: "https://github.com/blue-memo" },
  { label: "EMAIL",    val: "mowalid119@gmail.com", href: "#" },
];

export default function Contact() {
  const [ref, v] = useInView(0.1);

  return (
    <section id="s-contact" className="s-contact s-section" ref={ref} aria-label="Contact Mohammed Waleed">
      <div className="section-label">
        <span className="sl-n">04</span>
        <span className="sl-bar" />
        <span className="sl-t">CONTACT</span>
      </div>

      <div className={"contact-grid" + (v ? " in" : "")}>
        <div className="cg-left">
          <h2 className="contact-title">
            <span className="ct-1">LET'S</span>
            <span className="ct-2">BUILD</span>
            <span className="ct-3">GREAT.</span>
          </h2>
          <p className="contact-sub">
            Professional designs · Affordable prices<br />
            Full support until 100% satisfied
          </p>

          <div className="status-card">
            <div className="sc-pulse">
              <span className="sc-dot" />
              <span className="sc-ring" />
            </div>
            <div className="sc-text">
              <strong>OPEN FOR WORK</strong>
              <span>Response within 24 hours · GMT+2</span>
            </div>
          </div>

          <div className="contact-btns">
            <a href="https://wa.me/+201282758797" target="_blank" rel="noreferrer" className="cb-primary" data-cursor="START →">
              <span className="cbp-fill" />
              <span className="cbp-text">START A PROJECT</span>
            </a>
            <a
              href="https://docs.google.com/document/d/1fZ3Q2qIlMlInrOfyT3QaWeeV1xD9c72A-h9MmhFqeJQ/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="cb-ghost"
              data-cursor="RESUME"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>

        <div className="cg-right">
          <div className="press-credits">
            <div className="pc-rule" />
            <h3 className="pc-head">REACH OUT</h3>
            <div className="pc-rule" />
            {contactLinks.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href !== "#" ? "_blank" : undefined}
                rel="noreferrer"
                className="pc-item"
                data-cursor="→"
              >
                <span className="pci-label">{c.label}</span>
                <span className="pci-val">{c.val}</span>
                <span className="pci-arrow">↗</span>
              </a>
            ))}
            <div className="pc-rule" />
            <p className="pc-foot">© 2026 Mohammed Waleed. All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="contact-deco" aria-hidden="true">CONTACT</div>
    </section>
  );
}
