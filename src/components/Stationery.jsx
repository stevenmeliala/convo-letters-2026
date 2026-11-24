export function Masthead() {
  return (
    <header className="masthead">
      <span className="masthead-rule" aria-hidden="true" />
      <span className="imprint">Class of 2026</span>
      <span className="masthead-rule" aria-hidden="true" />
    </header>
  );
}

export function KeepsakeFooter() {
  return (
    <footer className="keepsake-footer">
      <span className="footer-ornament" aria-hidden="true">✧</span>
      <p>With love, for the Class of 2026.</p>
    </footer>
  );
}

export function Envelope({ name, opening = false }) {
  return (
    <div className="envelope-scene" aria-hidden="true">
      <span className="envelope-sparkle sparkle-top">✧</span>
      <span className="envelope-sparkle sparkle-left">✦</span>
      <span className="envelope-sparkle sparkle-right">✧</span>
      <span className="envelope-sparkle sparkle-bottom">✦</span>
      <div className="envelope" data-opening={opening}>
        <div className="envelope-back" />
        <div className="envelope-letter">
          <span>✦</span>
          <span>{name ? `For ${name}` : "Class of 2026"}</span>
        </div>
        <div className="envelope-pocket" />
        <div className="envelope-flap">
          <div className="envelope-flap-paper" />
          <div className="envelope-seal"><span>✦</span></div>
        </div>
      </div>
    </div>
  );
}
