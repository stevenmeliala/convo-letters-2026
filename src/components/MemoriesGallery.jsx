"use client";

import { useEffect, useRef, useState } from "react";
import { CrossFiligree } from "./Stationery";

export function MemoriesGallery({ photos, videos = [], driveLinks = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const dialogRef = useRef(null);
  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleClose() {
      dialog.returnValue = "";
      setActiveIndex(null);
    }

    dialog.addEventListener("close", handleClose);

    // Safari fallback for closedby="any" light dismiss
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      let pressedOutside = false;
      const isOutside = (event) => {
        const rect = dialog.getBoundingClientRect();
        return (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        );
      };
      const onPointerDown = (event) => {
        pressedOutside = isOutside(event);
      };
      const onPointerUp = (event) => {
        if (pressedOutside && isOutside(event)) {
          dialog.close();
        }
      };

      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);

      return () => {
        dialog.removeEventListener("close", handleClose);
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }

    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  function openPhoto(index) {
    setActiveIndex(index);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }

  function showPrevious() {
    setActiveIndex((current) => (current === null ? 0 : (current - 1 + photos.length) % photos.length));
  }

  function showNext() {
    setActiveIndex((current) => (current === null ? 0 : (current + 1) % photos.length));
  }

  return (
    <section className="memories-gallery" aria-labelledby="memories-heading">
      <header className="memories-gallery-header">
        <CrossFiligree className="memories-ornament" />
        <h2 id="memories-heading">Shared PKA Memories</h2>
        <p>Cherished snapshots &amp; moments together at Universiti Sains Malaysia.</p>
      </header>

      <div className="photo-mosaic">
        {photos.map((photo, index) => (
          <figure className="photo-card" key={photo.src}>
            <button
              type="button"
              className="photo-trigger"
              onClick={() => openPhoto(index)}
              aria-label={`View photo ${index + 1} of ${photos.length} shared by ${photo.sender} larger`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="photo-image"
              />
            </button>
            <figcaption className="photo-caption">Shared by {photo.sender}</figcaption>
          </figure>
        ))}
      </div>

      {videos.length > 0 && (
        <div className="video-memories">
          {videos.map((video) => (
            <figure className="video-card" key={video.src}>
              <video
                className="memory-video"
                controls
                playsInline
                preload="metadata"
                width={video.width}
                height={video.height}
                aria-label={video.label}
                {...{ loading: "lazy" }}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support embedded video playback.
              </video>
              <figcaption className="photo-caption">Video shared by {video.sender}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {driveLinks.length > 0 && (
        <details className="memories">
          <summary>Original Google Drive Links</summary>
          <ul>
            {driveLinks.map(({ sender, url }, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noreferrer">
                  Open original upload from {sender}{" "}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}

      <dialog
        ref={dialogRef}
        className="photo-lightbox"
        aria-labelledby="lightbox-caption"
        {...{ closedby: "any" }}
      >
        {activePhoto && (
          <div className="lightbox-inner">
            <div className="lightbox-bar">
              <h1 id="lightbox-caption" className="lightbox-title">
                Shared by {activePhoto.sender}{" "}
                <span className="lightbox-count">
                  ({activeIndex + 1} / {photos.length})
                </span>
              </h1>
              <form method="dialog">
                <button type="submit" className="lightbox-close" autoFocus>
                  Close
                </button>
              </form>
            </div>

            <div className="lightbox-stage">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                width={activePhoto.width}
                height={activePhoto.height}
                className="lightbox-image"
              />
            </div>

            {photos.length > 1 && (
              <div className="lightbox-nav">
                <button type="button" className="lightbox-nav-btn" onClick={showPrevious}>
                  ← Previous
                </button>
                <button type="button" className="lightbox-nav-btn" onClick={showNext}>
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
