export function CrossHeartMark({ className = "", size = 28 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      {/* Cross emerging from the heart — inspired by the PKA logo */}
      <path
        d="M26.5 6.5L23.2 19.5M20 11.2L30.2 13"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
      <path
        d="M23.6 20.2C21.2 14.2 11.5 14.5 11.5 22.8C11.5 31.2 19.5 34.6 22.8 40.5C26.5 34.4 36.8 31 36.8 23.2C36.8 16.4 29 15.6 26 19.8"
        stroke="var(--mark-heart, currentColor)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrossFiligree({ className = "" }) {
  return (
    <svg
      className={className}
      width="44"
      height="20"
      viewBox="0 0 44 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 10H15" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
      <path d="M29 10H42" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
      <path d="M22 3V17M17.5 7.5H26.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Masthead() {
  return (
    <header className="masthead">
      <span className="masthead-rule" aria-hidden="true" />
      <div className="masthead-brand">
        <img
          src="/pka-logo.png"
          alt="PKA — Persaudaraan Kristian Agape"
          className="masthead-logo"
          width={556}
          height={387}
          fetchPriority="high"
        />
        <span className="imprint">Universiti Sains Malaysia · Class of 2026</span>
      </div>
      <span className="masthead-rule" aria-hidden="true" />
    </header>
  );
}

export function KeepsakeFooter() {
  return (
    <footer className="keepsake-footer">
      <CrossFiligree className="footer-ornament" />
      <p className="footer-verse">
        “In all your ways submit to him, and he will make your paths straight.” — Proverbs 3:6
      </p>
      <p className="footer-credit">
        With Agape love &amp; prayers · <span lang="ms">Persaudaraan Kristian Agape</span> (PKA), USM · Class of 2026
      </p>
    </footer>
  );
}

export function Envelope({ name, opening = false }) {
  return (
    <div className="envelope-scene" aria-hidden="true">
      <span className="envelope-sparkle sparkle-top">✦</span>
      <span className="envelope-sparkle sparkle-left">✧</span>
      <span className="envelope-sparkle sparkle-right">✦</span>
      <span className="envelope-sparkle sparkle-bottom">✧</span>
      <div className="envelope" data-opening={opening}>
        <div className="envelope-back" />
        <div className="envelope-letter">
          <span className="envelope-letter-cross">✝</span>
          <span className="envelope-letter-label">{name ? `For ${name}` : "PKA · Class of 2026"}</span>
        </div>
        <div className="envelope-pocket" />
        <div className="envelope-flap">
          <div className="envelope-flap-paper" />
          <div className="envelope-seal">
            <span className="envelope-seal-ring">
              <CrossHeartMark className="envelope-seal-mark" size={26} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
