"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";

const film = "/assets/reels/studio-cover-edit.mp4";
const poster = "/assets/hero/studio-cover-edit-poster.jpg";

export function StudioFilm({ compact = false }: { compact?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const fullscreenVideo = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const container = useRef<HTMLElement>(null);
  const timeline = useRef<HTMLSpanElement>(null);
  const time = useRef<HTMLSpanElement>(null);
  const manualPause = useRef(false);
  const visible = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element || !container.current) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function syncPlayback() {
      if (visible.current && !manualPause.current && !preference.matches && !document.hidden && !document.querySelector("dialog[open], main[inert]")) {
        element!.play().catch(() => { /* A visible play control handles browser autoplay restrictions. */ });
      } else element!.pause();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      syncPlayback();
    }, { threshold: [0, 0.2, 0.5] });
    observer.observe(container.current);
    document.addEventListener("visibilitychange", syncPlayback);
    document.addEventListener("toggle", syncPlayback, true);
    document.addEventListener("greyscale:overlay-change", syncPlayback);
    preference.addEventListener("change", syncPlayback);
    return () => {
      observer.disconnect();
      element.pause();
      document.removeEventListener("visibilitychange", syncPlayback);
      document.removeEventListener("toggle", syncPlayback, true);
      document.removeEventListener("greyscale:overlay-change", syncPlayback);
      preference.removeEventListener("change", syncPlayback);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const element = dialog.current;
    const primaryVideo = video.current;
    const expandedVideo = fullscreenVideo.current;
    const originalFocus = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    primaryVideo?.pause();
    element?.showModal();
    document.body.style.overflow = "hidden";
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) expandedVideo?.play().catch(() => {});
    return () => {
      expandedVideo?.pause();
      element?.close();
      document.body.style.overflow = originalOverflow;
      originalFocus?.focus();
      if (visible.current && !manualPause.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !document.hidden) primaryVideo?.play().catch(() => {});
    };
  }, [expanded]);

  function togglePlayback() {
    if (!video.current) return;
    if (video.current.paused) {
      manualPause.current = false;
      video.current.play().catch(() => setFailed(true));
    } else {
      manualPause.current = true;
      video.current.pause();
    }
  }

  return <>
    <figure ref={container} className={`studio-film ${compact ? "studio-film-compact" : ""}`} aria-label="The studio edit: an animated composition of original Instagram covers">
      <video ref={video} src={film} poster={poster} muted loop playsInline preload="metadata" aria-describedby={compact ? "work-film-caption" : "home-film-caption"} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} onTimeUpdate={event => {
        const element = event.currentTarget;
        timeline.current?.style.setProperty("--film-progress", `${element.duration ? element.currentTime / element.duration : 0}`);
        if (time.current) time.current.textContent = `00:${String(Math.floor(element.currentTime)).padStart(2, "0")}`;
      }} />
      <div className="film-shade" />
      <div className="film-topline"><span className="film-tag"><i /> THE STUDIO EDIT</span><span className="eyebrow">SOUND OFF. FEELING ON.</span></div>
      {!compact && <div className="film-title" aria-hidden="true">Made to<br /><em>move you.</em></div>}
      <div className="film-bottomline"><span className="film-time"><span ref={time}>00:00</span><span> / 00:11</span></span><div className="film-controls"><button onClick={togglePlayback} className="film-play" aria-label={playing ? "Pause studio film" : "Play studio film"}>{playing ? <span className="pause-symbol" aria-hidden="true"><i /><i /></span> : <span className="play-symbol" aria-hidden="true" />}<span>{playing ? "Pause" : "Play"}</span></button><button className="film-expand" onClick={() => setExpanded(true)} aria-label="Expand studio film"><span>View the edit</span><Arrow diagonal /></button></div></div>
      <span ref={timeline} className="film-timeline" aria-hidden="true"><span /></span>
      {failed && <p className="film-error" role="status">The film is unavailable. Explore the original frames below.</p>}
      <figcaption id={compact ? "work-film-caption" : "home-film-caption"}><span>GREYSCALE IN MOTION</span><span>A concept motion edit of original Instagram covers.</span><span>01 / 2026</span></figcaption>
    </figure>
    <dialog ref={dialog} className="film-dialog" aria-label="The studio edit — concept film" onCancel={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }}>
      <div className="film-dialog-top"><span className="eyebrow">THE STUDIO EDIT / CONCEPT MOTION FILM</span><button className="film-dialog-close" onClick={() => setExpanded(false)} aria-label="Close studio film">Close <span>×</span></button></div>
      <video ref={fullscreenVideo} src={expanded ? film : undefined} poster={poster} controls muted loop playsInline preload="none" aria-label="An animated edit of original Greyscale Socials portfolio covers" />
      <p>Original public reel covers, brought into motion for this website concept. Full reel footage pending.</p>
    </dialog>
  </>;
}
