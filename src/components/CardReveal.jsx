"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Envelope } from "./Stationery";

const OPENING_DURATION = 800;

export function CardReveal({ name, children }) {
  const [stage, setStage] = useState("sealed");
  const reduceMotion = useReducedMotion();
  const revealHeading = useRef(null);
  const timer = useRef(null);
  const opened = stage === "opened";

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (opened) revealHeading.current?.focus();
  }, [opened]);

  function openCard() {
    if (stage !== "sealed") return;
    if (reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("opened");
      return;
    }

    setStage("opening");
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        particleCount: 58,
        spread: 75,
        startVelocity: 27,
        scalar: 0.8,
        origin: { y: 0.57 },
        colors: ["#ac7934", "#dec287", "#f0b99c", "#20344a", "#fff0c9"],
        disableForReducedMotion: true,
      });
    }).catch(() => {});
    timer.current = window.setTimeout(() => setStage("opened"), OPENING_DURATION);
  }

  return (
    <main className="card-main">
      {!opened && (
        <section className="cover" aria-labelledby="cover-title">
          <h1 id="cover-title">Happy Graduation,<br /><em>{name}!</em> <span className="cap" role="img" aria-label="graduation cap">🎓</span></h1>
          <Envelope name={name} opening={stage === "opening"} />
          <button className="open-button" type="button" aria-controls="opened-card" aria-disabled={stage === "opening"} onClick={openCard}>
            <span className="button-ornament" aria-hidden="true">✦</span>
            Tap to Open Your Card
          </button>
        </section>
      )}
      <motion.section
        className="opened-card"
        id="opened-card"
        aria-labelledby="opened-title"
        hidden={!opened}
        initial={false}
        animate={opened && !reduceMotion ? { opacity: [0, 1], y: [12, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
      >
        <header className="opened-header">
          <span className="opened-ornament" aria-hidden="true">✧</span>
          <h1 tabIndex={-1} id="opened-title">For <em>{name}</em></h1>
          <p>Messages from the people cheering you on.</p>
        </header>
        {children}
      </motion.section>
    </main>
  );
}
