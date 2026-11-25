"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CrossHeartMark, Envelope } from "./Stationery";

const OPENING_DURATION = 820;

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
    import("canvas-confetti")
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 64,
          spread: 78,
          startVelocity: 28,
          scalar: 0.85,
          origin: { y: 0.56 },
          colors: ["#D0191A", "#A61214", "#181618", "#C89F59", "#FAF7F3"],
          disableForReducedMotion: true,
        });
      })
      .catch(() => {});
    timer.current = window.setTimeout(() => setStage("opened"), OPENING_DURATION);
  }

  return (
    <main className="card-main">
      {!opened && (
        <section className="cover" aria-labelledby="cover-title">
          <p className="cover-eyebrow">A Fellowship Keepsake from PKA USM</p>
          <h1 id="cover-title">
            Happy Graduation,
            <br />
            <em>{name}!</em>{" "}
            <span className="cap" role="img" aria-label="graduation cap">
              🎓
            </span>
          </h1>
          <Envelope name={name} opening={stage === "opening"} />
          <button
            className="open-button"
            type="button"
            aria-controls="opened-card"
            aria-disabled={stage === "opening"}
            onClick={openCard}
          >
            <span className="button-ornament" aria-hidden="true">
              ✦
            </span>
            Tap to Open Your Letter
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
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      >
        <header className="opened-header">
          <div className="opened-emblem" aria-hidden="true">
            <CrossHeartMark className="opened-emblem-mark" size={38} />
          </div>
          <h1 ref={revealHeading} tabIndex={-1} id="opened-title">
            For <em>{name}</em>
          </h1>
          <p className="opened-subtitle">
            Prayers, gratitude, and warm wishes from your{" "}
            <span lang="ms">Persaudaraan Kristian Agape</span> family at USM.
          </p>
          <figure className="blessing-verse">
            <blockquote>
              “Trust in the Lord with all your heart, and do not lean on your own understanding. In
              all your ways acknowledge him, and he will make straight your paths.”
            </blockquote>
            <figcaption>Proverbs 3:5–6 (ESV)</figcaption>
          </figure>
        </header>
        {children}
      </motion.section>
    </main>
  );
}
